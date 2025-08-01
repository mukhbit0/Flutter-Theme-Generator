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
