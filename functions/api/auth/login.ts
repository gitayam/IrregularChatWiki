import type { Env } from '../../types';
import { generateState } from '../../lib/auth';
import { buildAuthorizationUrl } from '../../lib/authentik';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  try {
    const url = new URL(request.url);
    const returnTo = url.searchParams.get('return_to') || '/';
    const state = generateState();

    // Store state in KV for validation during callback
    await env.SESSIONS.put(
      `oauth_state:${state}`,
      JSON.stringify({ returnTo }),
      { expirationTtl: 300 }
    );

    const redirectUri = `${env.WIKI_URL}/api/auth/callback`;
    const authUrl = buildAuthorizationUrl(env, state, redirectUri);

    // Use HTML redirect as workaround for 302 issues
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=${authUrl}">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to login...</p>
  <p><a href="${authUrl}">Click here if not redirected</a></p>
</body>
</html>`;
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: true,
      message: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
