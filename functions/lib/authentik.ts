import type { Env, TokenResponse, AuthentikUserInfo } from '../types';

/**
 * Build the Authentik authorization URL
 */
export function buildAuthorizationUrl(
  env: Env,
  state: string,
  redirectUri: string
): string {
  const params = new URLSearchParams({
    client_id: env.AUTHENTIK_CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'openid profile email groups',
    state: state,
  });

  return `${env.AUTHENTIK_URL}/application/o/authorize/?${params.toString()}`;
}

/**
 * Exchange authorization code for tokens
 */
export async function exchangeCodeForTokens(
  env: Env,
  code: string,
  redirectUri: string
): Promise<TokenResponse> {
  const response = await fetch(`${env.AUTHENTIK_URL}/application/o/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: env.AUTHENTIK_CLIENT_ID,
      client_secret: env.AUTHENTIK_CLIENT_SECRET,
      code: code,
      redirect_uri: redirectUri,
    }).toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json() as Promise<TokenResponse>;
}

/**
 * Fetch user info from Authentik
 */
export async function fetchUserInfo(
  env: Env,
  accessToken: string
): Promise<AuthentikUserInfo> {
  const response = await fetch(`${env.AUTHENTIK_URL}/application/o/userinfo/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`User info fetch failed: ${error}`);
  }

  return response.json() as Promise<AuthentikUserInfo>;
}

/**
 * Build the Authentik logout URL
 */
export function buildLogoutUrl(env: Env, postLogoutRedirectUri: string): string {
  const params = new URLSearchParams({
    post_logout_redirect_uri: postLogoutRedirectUri,
  });

  return `${env.AUTHENTIK_URL}/application/o/irregularpedia/end-session/?${params.toString()}`;
}
