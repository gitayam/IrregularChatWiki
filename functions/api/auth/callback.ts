import type { Env, Session } from '../../types';
import {
  generateSessionId,
  storeSession,
  createSessionCookie,
} from '../../lib/auth';
import {
  exchangeCodeForTokens,
  fetchUserInfo,
} from '../../lib/authentik';

// Helper to create HTML redirect with cookie
function htmlRedirectWithCookie(url: string, cookieValue?: string): Response {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=${url}">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting...</p>
  <p><a href="${url}">Click here if not redirected</a></p>
</body>
</html>`;
  const headers: Record<string, string> = {
    'Content-Type': 'text/html',
  };
  if (cookieValue) {
    headers['Set-Cookie'] = cookieValue;
  }
  return new Response(html, {
    status: 200,
    headers,
  });
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const url = new URL(request.url);

  // Get authorization code and state from query params
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  // Handle OAuth errors
  if (error) {
    console.error(`OAuth error: ${error} - ${errorDescription}`);
    return htmlRedirectWithCookie(`${env.WIKI_URL}/?error=auth_failed`);
  }

  if (!code || !state) {
    return htmlRedirectWithCookie(`${env.WIKI_URL}/?error=missing_params`);
  }

  // Verify state parameter
  const stateData = await env.SESSIONS.get(`oauth_state:${state}`);
  if (!stateData) {
    console.error('Invalid or expired state parameter');
    return htmlRedirectWithCookie(`${env.WIKI_URL}/?error=invalid_state`);
  }

  // Delete used state
  await env.SESSIONS.delete(`oauth_state:${state}`);

  // Parse state data
  let returnTo = '/';
  try {
    const parsed = JSON.parse(stateData);
    returnTo = parsed.returnTo || '/';
  } catch {
    // Use default
  }

  try {
    // Exchange code for tokens
    const redirectUri = `${env.WIKI_URL}/api/auth/callback`;
    const tokens = await exchangeCodeForTokens(env, code, redirectUri);

    // Fetch user info
    const userInfo = await fetchUserInfo(env, tokens.access_token);

    // Generate session ID
    const sessionId = generateSessionId();

    // Create session object
    const session: Session = {
      userId: userInfo.sub,
      authentikId: userInfo.sub,
      username: userInfo.preferred_username,
      email: userInfo.email || null,
      groups: userInfo.groups || [],
      createdAt: Date.now(),
      lastActive: Date.now(),
    };

    // Store session in KV
    await storeSession(env.SESSIONS, sessionId, session);

    // Upsert user in D1
    await env.DB.prepare(`
      INSERT INTO users (id, authentik_id, username, email, groups, last_login)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT (authentik_id) DO UPDATE SET
        username = excluded.username,
        email = excluded.email,
        groups = excluded.groups,
        last_login = excluded.last_login
    `).bind(
      userInfo.sub,
      userInfo.sub,
      userInfo.preferred_username,
      userInfo.email || null,
      JSON.stringify(userInfo.groups || []),
      Date.now()
    ).run();

    // Create response with session cookie using HTML redirect
    return htmlRedirectWithCookie(
      `${env.WIKI_URL}${returnTo}`,
      createSessionCookie(sessionId)
    );

  } catch (err) {
    console.error('Auth callback error:', err);
    return htmlRedirectWithCookie(`${env.WIKI_URL}/?error=auth_failed`);
  }
};
