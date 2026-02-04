import type { Env } from '../../types';
import { getAuthContext } from '../../lib/auth';

// GET /api/bookmarks - Get user's bookmarks or check if page is bookmarked
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const auth = await getAuthContext(request, env);

  if (!auth.isAuthenticated || !auth.user) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Authentication required',
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const path = url.searchParams.get('path');

  try {
    if (path) {
      // Check if specific page is bookmarked
      const bookmark = await env.DB.prepare(`
        SELECT id FROM bookmarks
        WHERE user_id = ? AND page_path = ?
      `).bind(auth.user.userId, path).first();

      return new Response(JSON.stringify({
        success: true,
        bookmarked: !!bookmark,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // Get all bookmarks for user
      const bookmarks = await env.DB.prepare(`
        SELECT id, page_path, page_title, created_at
        FROM bookmarks
        WHERE user_id = ?
        ORDER BY created_at DESC
      `).bind(auth.user.userId).all();

      return new Response(JSON.stringify({
        success: true,
        bookmarks: bookmarks.results,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Failed to get bookmarks:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to get bookmarks',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST /api/bookmarks - Add a bookmark
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const auth = await getAuthContext(request, env);

  if (!auth.isAuthenticated || !auth.user) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Authentication required',
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json() as { page_path: string; page_title: string };
    const { page_path, page_title } = body;

    if (!page_path) {
      return new Response(JSON.stringify({
        success: false,
        error: 'page_path is required',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert or ignore if already exists
    await env.DB.prepare(`
      INSERT OR IGNORE INTO bookmarks (user_id, page_path, page_title)
      VALUES (?, ?, ?)
    `).bind(auth.user.userId, page_path, page_title || '').run();

    return new Response(JSON.stringify({
      success: true,
      message: 'Bookmark added',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to add bookmark:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to add bookmark',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE /api/bookmarks - Remove a bookmark
export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const auth = await getAuthContext(request, env);

  if (!auth.isAuthenticated || !auth.user) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Authentication required',
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const path = url.searchParams.get('path');

  if (!path) {
    return new Response(JSON.stringify({
      success: false,
      error: 'path is required',
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await env.DB.prepare(`
      DELETE FROM bookmarks
      WHERE user_id = ? AND page_path = ?
    `).bind(auth.user.userId, path).run();

    return new Response(JSON.stringify({
      success: true,
      message: 'Bookmark removed',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to remove bookmark:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to remove bookmark',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
