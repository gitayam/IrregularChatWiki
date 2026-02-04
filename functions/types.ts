// Cloudflare environment bindings
export interface Env {
  // D1 Database
  DB: D1Database;

  // KV Namespace
  SESSIONS: KVNamespace;

  // Environment variables
  AUTHENTIK_URL: string;
  AUTHENTIK_CLIENT_ID: string;
  AUTHENTIK_CLIENT_SECRET: string;
  WIKI_URL: string;

  // Optional integrations
  FORGEJO_API_TOKEN?: string;
  SIGNAL_BOT_URL?: string;
  SIGNAL_BOT_TOKEN?: string;
  SIGNAL_MODERATOR_GROUP_ID?: string;
}

// Session stored in KV
export interface Session {
  userId: string;
  authentikId: string;
  username: string;
  email: string | null;
  groups: string[];
  createdAt: number;
  lastActive: number;
}

// User from D1
export interface User {
  id: string;
  authentik_id: string;
  username: string;
  email: string | null;
  groups: string | null;  // JSON string in DB
  created_at: number;
  last_login: number | null;
}

// Authentik token response
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  id_token?: string;
}

// Authentik user info
export interface AuthentikUserInfo {
  sub: string;
  preferred_username: string;
  email?: string;
  email_verified?: boolean;
  groups?: string[];
}

// API response helpers
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Auth context passed to handlers
export interface AuthContext {
  user: Session | null;
  isAuthenticated: boolean;
  hasGroup: (group: string) => boolean;
}
