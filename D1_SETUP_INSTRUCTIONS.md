# Manual Cloudflare D1 Database Setup Instructions

## 1. Create D1 Database in Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** > **D1 SQL Database**
3. Click **"Create database"**
4. Name: `flutter-theme-counter`
5. Click **"Create"**

## 2. Get Database ID

After creating the database, you'll see a Database ID (something like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

## 3. Update wrangler.toml

Replace the `[[d1_databases]]` section in `wrangler.toml` with:

```toml
[[d1_databases]]
binding = "THEME_DB"
database_name = "flutter-theme-counter"
database_id = "YOUR_DATABASE_ID_HERE"  # Replace with actual ID from step 2
```

## 4. Initialize Database Schema

Run this command with your actual database ID:

```bash
npx wrangler d1 execute flutter-theme-counter --file=./schema.sql
```

Or manually run these SQL commands in the Cloudflare dashboard:

```sql
CREATE TABLE IF NOT EXISTS theme_counter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    counter_key TEXT UNIQUE NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_counter_key ON theme_counter(counter_key);

INSERT OR IGNORE INTO theme_counter (counter_key, count) 
VALUES ('total_themes_generated', 12847);
```

## 5. Deploy

After updating wrangler.toml with the correct database_id, deploy:

```bash
npx wrangler deploy
```

## Benefits of This Approach

✅ **Persistent Storage**: Counter survives redeployments
✅ **Better Performance**: Direct database access (no external API calls)
✅ **Reliability**: No dependency on third-party services
✅ **Scalability**: Cloudflare D1 handles global distribution
✅ **Cost Effective**: D1 has generous free tier

## API Endpoints

Your app will now use these local endpoints:
- `GET /api/counter` - Get current count
- `POST /api/counter/increment` - Increment count

## Fallback System

The service includes robust fallback mechanisms:
- LocalStorage caching
- Estimated growth calculation
- Graceful degradation when database is unavailable
