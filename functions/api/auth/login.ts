import type { Env } from '../../types';
import { generateState } from '../../lib/auth';
import { buildAuthorizationUrl } from '../../lib/authentik';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  // Get the return URL from query params (where to redirect after login)
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('return_to') || '/';

  // Generate state parameter (includes return URL)
  const state = generateState();

  // Store state temporarily in KV (5 minute TTL)
  await env.SESSIONS.put(
    `oauth_state:${state}`,
    JSON.stringify({ returnTo }),
    { expirationTtl: 300 }
  );

  // Build redirect URI
  const redirectUri = `${env.WIKI_URL}/api/auth/callback`;

  // Build authorization URL
  const authUrl = buildAuthorizationUrl(env, state, redirectUri);

  // Redirect to Authentik
  return Response.redirect(authUrl, 302);
};
