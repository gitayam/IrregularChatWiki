-- Users table (synced from Authentik on login)
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  authentik_id TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  email TEXT,
  groups TEXT,  -- JSON array of group names
  created_at INTEGER DEFAULT (unixepoch()),
  last_login INTEGER
);

CREATE INDEX idx_users_authentik ON users(authentik_id);

-- Edit submissions
CREATE TABLE edit_submissions (
  id TEXT PRIMARY KEY,
  page_path TEXT NOT NULL,
  original_content TEXT NOT NULL,
  proposed_content TEXT NOT NULL,
  summary TEXT,

  user_id TEXT,
  username TEXT,
  anonymous_id TEXT,

  status TEXT DEFAULT 'pending',
  reviewed_by TEXT,
  reviewed_at INTEGER,
  review_note TEXT,

  created_at INTEGER DEFAULT (unixepoch()),
  forgejo_pr_url TEXT,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_submissions_status ON edit_submissions(status, created_at DESC);
CREATE INDEX idx_submissions_page ON edit_submissions(page_path);

-- Annotations
CREATE TABLE annotations (
  id TEXT PRIMARY KEY,
  page_path TEXT NOT NULL,

  anchor_prefix TEXT,
  anchor_exact TEXT NOT NULL,
  anchor_suffix TEXT,
  anchor_page_version TEXT,

  body TEXT NOT NULL,
  parent_id TEXT,

  user_id TEXT,
  username TEXT,
  anonymous_id TEXT,

  status TEXT DEFAULT 'visible',
  upvotes INTEGER DEFAULT 0,

  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (parent_id) REFERENCES annotations(id)
);

CREATE INDEX idx_annotations_page ON annotations(page_path, status);
CREATE INDEX idx_annotations_parent ON annotations(parent_id);

-- Bookmarks
CREATE TABLE bookmarks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  folder TEXT,
  notes TEXT,
  created_at INTEGER DEFAULT (unixepoch()),

  UNIQUE(user_id, page_path),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);

-- Reading history
CREATE TABLE reading_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  visited_at INTEGER DEFAULT (unixepoch()),
  time_on_page INTEGER,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_history_user ON reading_history(user_id, visited_at DESC);

-- User preferences
CREATE TABLE user_preferences (
  user_id TEXT PRIMARY KEY,
  theme TEXT DEFAULT 'auto',
  sidebar_collapsed INTEGER DEFAULT 0,
  annotation_visibility TEXT DEFAULT 'all',
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Annotation votes (prevent duplicate votes)
CREATE TABLE annotation_votes (
  annotation_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at INTEGER DEFAULT (unixepoch()),

  PRIMARY KEY (annotation_id, user_id),
  FOREIGN KEY (annotation_id) REFERENCES annotations(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
