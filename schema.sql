-- D1 Database Schema for Theme Counter
CREATE TABLE IF NOT EXISTS theme_counter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    count INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial counter value
INSERT OR IGNORE INTO theme_counter (id, count) VALUES (1, 0);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_theme_counter_id ON theme_counter(id);

-- Shared Themes Table
CREATE TABLE IF NOT EXISTS shared_themes (
  id TEXT PRIMARY KEY,
  user_id TEXT, -- Nullable for anonymous shares
  name TEXT NOT NULL,
  description TEXT,
  config TEXT NOT NULL, -- JSON string
  is_public BOOLEAN DEFAULT 1,
  views INTEGER DEFAULT 0,
  tags TEXT DEFAULT '[]',
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_shared_themes_user_id ON shared_themes(user_id);

-- Comments Table
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  theme_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES shared_themes(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_comments_theme_id ON comments(theme_id);

-- Likes Table
CREATE TABLE IF NOT EXISTS likes (
  user_id TEXT NOT NULL,
  theme_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, theme_id),
  FOREIGN KEY (theme_id) REFERENCES shared_themes(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_likes_theme_id ON likes(theme_id);

-- Suggestions/Feedback Table
CREATE TABLE IF NOT EXISTS suggestions (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'bug', 'feature', 'other'
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'implemented'
  user_id TEXT, -- Optional, if user is logged in
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Add likes column to shared_themes if it doesn't exist (handled in worker migration usually, but good for reference)
-- ALTER TABLE shared_themes ADD COLUMN likes INTEGER DEFAULT 0;
