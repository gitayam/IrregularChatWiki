import type { Env } from '../../types';
import {
  getSessionIdFromCookies,
  deleteSession,
  createLogoutCookie,
} from '../../lib/auth';
import { buildLogoutUrl } from '../../lib/authentik';

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

  // Redirect to home with cleared cookie
  const headers = new Headers();
  headers.set('Set-Cookie', createLogoutCookie());
  headers.set('Location', env.WIKI_URL);

  return new Response(null, {
    status: 302,
    headers,
  });
};
