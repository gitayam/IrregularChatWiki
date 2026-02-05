import type { Env } from '../../types';
import { getAuthContext } from '../../lib/auth';

// Common headers for API responses - no caching
const apiHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'Pragma': 'no-cache',
};

// GET /api/pages/:path - Get raw markdown content for a page
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, params } = context;

  // Get the page path from URL params
  const pagePath = Array.isArray(params.path) ? params.path.join('/') : params.path;

  if (!pagePath) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Page path is required',
    }), {
      status: 400,
      headers: apiHeaders,
    });
  }

  // Get Forgejo API token - required for private repos
  const forgejoToken = env.FORGEJO_API_TOKEN;
  if (!forgejoToken) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Forgejo API not configured',
    }), {
      status: 500,
      headers: apiHeaders,
    });
  }

  const authHeaders = {
    'Authorization': `token ${forgejoToken}`,
    'Accept': 'application/json',
  };

  try {
    // Fetch raw content from Forgejo
    const filePath = `src/content/docs/${pagePath}.md`;
    const apiUrl = `https://git.irregularchat.com/api/v1/repos/irregulars/IrregularChatWiki/contents/${filePath}`;

    const response = await fetch(apiUrl, {
      headers: authHeaders,
    });

    if (!response.ok) {
      // Try with /index.md for directory pages
      const indexPath = `src/content/docs/${pagePath}/index.md`;
      const indexResponse = await fetch(`https://git.irregularchat.com/api/v1/repos/irregulars/IrregularChatWiki/contents/${indexPath}`, {
        headers: authHeaders,
      });

      if (!indexResponse.ok) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Page not found',
        }), {
          status: 404,
          headers: apiHeaders,
        });
      }

      const indexData = await indexResponse.json() as { content: string; sha: string; path: string };
      const content = atob(indexData.content);

      return new Response(JSON.stringify({
        success: true,
        content,
        sha: indexData.sha,
        path: indexData.path,
      }), {
        status: 200,
        headers: apiHeaders,
      });
    }

    const data = await response.json() as { content: string; sha: string; path: string };
    const content = atob(data.content);

    return new Response(JSON.stringify({
      success: true,
      content,
      sha: data.sha,
      path: data.path,
    }), {
      status: 200,
      headers: apiHeaders,
    });
  } catch (error) {
    console.error('Failed to fetch page content:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch page content',
    }), {
      status: 500,
      headers: apiHeaders,
    });
  }
};

// PUT /api/pages/:path - Submit an edit (creates a PR)
export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { env, request, params } = context;

  // Require authentication
  const auth = await getAuthContext(request, env);
  if (!auth.isAuthenticated || !auth.user) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Authentication required',
    }), {
      status: 401,
      headers: apiHeaders,
    });
  }

  const pagePath = Array.isArray(params.path) ? params.path.join('/') : params.path;

  if (!pagePath) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Page path is required',
    }), {
      status: 400,
      headers: apiHeaders,
    });
  }

  try {
    const body = await request.json() as {
      content: string;
      sha: string;
      path: string;
      message?: string;
    };

    const { content, sha, path: filePath, message } = body;

    if (!content || !sha || !filePath) {
      return new Response(JSON.stringify({
        success: false,
        error: 'content, sha, and path are required',
      }), {
        status: 400,
        headers: apiHeaders,
      });
    }

    // Get Forgejo API token from environment
    const forgejoToken = env.FORGEJO_API_TOKEN;
    if (!forgejoToken) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Forgejo API not configured',
      }), {
        status: 500,
        headers: apiHeaders,
      });
    }

    // Create a unique branch name
    const branchName = `edit/${auth.user.username}/${Date.now()}`;
    const commitMessage = message || `Update ${pagePath} via wiki editor`;

    // Step 1: Get the default branch SHA
    const repoResponse = await fetch('https://git.irregularchat.com/api/v1/repos/irregulars/IrregularChatWiki', {
      headers: {
        'Authorization': `token ${forgejoToken}`,
        'Accept': 'application/json',
      },
    });

    if (!repoResponse.ok) {
      throw new Error('Failed to get repo info');
    }

    const repoData = await repoResponse.json() as { default_branch: string };
    const defaultBranch = repoData.default_branch || 'main';

    // Step 2: Get the latest commit SHA of the default branch
    const branchResponse = await fetch(`https://git.irregularchat.com/api/v1/repos/irregulars/IrregularChatWiki/branches/${defaultBranch}`, {
      headers: {
        'Authorization': `token ${forgejoToken}`,
        'Accept': 'application/json',
      },
    });

    if (!branchResponse.ok) {
      throw new Error('Failed to get branch info');
    }

    const branchData = await branchResponse.json() as { commit: { id: string } };
    const baseSha = branchData.commit.id;

    // Step 3: Create a new branch
    const createBranchResponse = await fetch('https://git.irregularchat.com/api/v1/repos/irregulars/IrregularChatWiki/git/refs', {
      method: 'POST',
      headers: {
        'Authorization': `token ${forgejoToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref: `refs/heads/${branchName}`,
        sha: baseSha,
      }),
    });

    if (!createBranchResponse.ok) {
      const error = await createBranchResponse.text();
      throw new Error(`Failed to create branch: ${error}`);
    }

    // Step 4: Update the file on the new branch
    const updateFileResponse = await fetch(`https://git.irregularchat.com/api/v1/repos/irregulars/IrregularChatWiki/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${forgejoToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: commitMessage,
        content: btoa(content),
        sha: sha,
        branch: branchName,
        author: {
          name: auth.user.username,
          email: auth.user.email || `${auth.user.username}@irregularchat.com`,
        },
      }),
    });

    if (!updateFileResponse.ok) {
      const error = await updateFileResponse.text();
      throw new Error(`Failed to update file: ${error}`);
    }

    // Step 5: Create a pull request
    const prResponse = await fetch('https://git.irregularchat.com/api/v1/repos/irregulars/IrregularChatWiki/pulls', {
      method: 'POST',
      headers: {
        'Authorization': `token ${forgejoToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: commitMessage,
        body: `Submitted by @${auth.user.username} via the wiki editor.\n\n---\n*This PR was created automatically by the Irregularpedia edit feature.*`,
        head: branchName,
        base: defaultBranch,
      }),
    });

    if (!prResponse.ok) {
      const error = await prResponse.text();
      throw new Error(`Failed to create PR: ${error}`);
    }

    const prData = await prResponse.json() as { number: number; html_url: string };

    // Log the edit submission
    await env.DB.prepare(`
      INSERT INTO edit_submissions (user_id, page_path, status, forgejo_pr_url, created_at)
      VALUES (?, ?, 'pending', ?, ?)
    `).bind(
      auth.user.userId,
      pagePath,
      prData.html_url,
      Date.now()
    ).run();

    return new Response(JSON.stringify({
      success: true,
      message: 'Edit submitted successfully',
      pr_number: prData.number,
      pr_url: prData.html_url,
    }), {
      status: 200,
      headers: apiHeaders,
    });
  } catch (error) {
    console.error('Failed to submit edit:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit edit',
    }), {
      status: 500,
      headers: apiHeaders,
    });
  }
};
