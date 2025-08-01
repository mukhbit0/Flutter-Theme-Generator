-- Migration: Create theme counter table
-- Created: 2025-08-01

CREATE TABLE IF NOT EXISTS theme_counter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    counter_key TEXT UNIQUE NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial counter record
INSERT OR IGNORE INTO theme_counter (counter_key, count) 
VALUES ('total_themes_generated', 12847);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_counter_key ON theme_counter(counter_key);
