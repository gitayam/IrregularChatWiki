import type { Env } from '../../types';
import {
  getSessionIdFromCookies,
  deleteSession,
  createLogoutCookie,
} from '../../lib/auth';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  // Get session ID from cookie
  const cookieHeader = request.headers.get('Cookie');
  const sessionId = getSessionIdFromCookies(cookieHeader);

  // Delete session from KV if exists
  if (sessionId) {
    await deleteSession(env.SESSIONS, sessionId);
  }

  // Build response that clears cookie
  const headers = new Headers();
  headers.set('Set-Cookie', createLogoutCookie());
  headers.set('Content-Type', 'application/json');

  return new Response(JSON.stringify({
    success: true,
    message: 'Logged out successfully',
  }), {
    status: 200,
    headers,
  });
};

// Also support GET for simple logout links
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  // Get session ID from cookie
  const cookieHeader = request.headers.get('Cookie');
  const sessionId = getSessionIdFromCookies(cookieHeader);

  // Delete session from KV if exists
  if (sessionId) {
    await deleteSession(env.SESSIONS, sessionId);
  }

  // Use HTML redirect with cookie to clear session
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=${env.WIKI_URL}">
  <title>Logging out...</title>
</head>
<body>
  <p>Logging out...</p>
  <p><a href="${env.WIKI_URL}">Click here if not redirected</a></p>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'Set-Cookie': createLogoutCookie(),
    },
  });
};
