import type { Env } from '../../types';
import { getAuthContext, touchSession, getSessionIdFromCookies } from '../../lib/auth';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  const auth = await getAuthContext(request, env);

  if (!auth.isAuthenticated || !auth.user) {
    return new Response(JSON.stringify({
      success: true,
      authenticated: false,
      user: null,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Touch session to extend TTL
  const sessionId = getSessionIdFromCookies(request.headers.get('Cookie'));
  if (sessionId) {
    await touchSession(env.SESSIONS, sessionId, auth.user);
  }

  return new Response(JSON.stringify({
    success: true,
    authenticated: true,
    user: {
      id: auth.user.userId,
      username: auth.user.username,
      email: auth.user.email,
      groups: auth.user.groups,
    },
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
