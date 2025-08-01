# Cloudflare D1 Database Setup for Theme Counter

This project now uses Cloudflare D1 (SQLite) database for persistent theme counter storage instead of external services.

## Setup Instructions

### 1. Create D1 Database

```bash
# Create the database
npx wrangler d1 create flutter-theme-counter

# This will output something like:
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 2. Update wrangler.toml

Update the `database_id` in `wrangler.toml` with the actual ID from step 1:

```toml
[[d1_databases]]
binding = "THEME_DB"
database_name = "flutter-theme-counter"
database_id = "your-actual-database-id-here"
```

### 3. Run Database Migrations

```bash
# Apply the initial migration
npx wrangler d1 execute flutter-theme-counter --file=./migrations/0001_create_theme_counter.sql

# For local development
npx wrangler d1 execute flutter-theme-counter --local --file=./migrations/0001_create_theme_counter.sql
```

### 4. Test Database (Optional)

```bash
# Query the database to verify setup
npx wrangler d1 execute flutter-theme-counter --command="SELECT * FROM theme_counter;"

# For local testing
npx wrangler d1 execute flutter-theme-counter --local --command="SELECT * FROM theme_counter;"
```

## API Endpoints

The worker now provides these API endpoints:

- `GET /api/counter` - Get current theme count
- `POST /api/counter/increment` - Increment theme count

## Features

✅ **Persistent Storage**: Counter survives deployments
✅ **Automatic Fallback**: Works offline with intelligent estimation
✅ **Robust Error Handling**: Graceful degradation if database is unavailable
✅ **CORS Support**: Proper headers for cross-origin requests
✅ **Transaction Safety**: Atomic increment operations
✅ **Auto-initialization**: Database tables created automatically

## Database Schema

```sql
CREATE TABLE theme_counter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    counter_key TEXT UNIQUE NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Development

For local development with D1:

```bash
# Start local development with D1 database
npx wrangler dev --local

# Or using npm script
npm run dev:local
```

## Deployment

The database configuration is automatically deployed with:

```bash
npm run deploy
```

## Migration from External API

The service automatically handles migration from the old countapi.xyz system:
- Maintains existing counter value as starting point (12,847)
- Provides fallback estimation during transition
- Backward compatible API for existing components
