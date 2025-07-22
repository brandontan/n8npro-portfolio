# Local Ghost CMS

This is your local Ghost instance for the AIFlows portfolio.

## Quick Start

```bash
# Start Ghost
docker-compose up -d

# Access Ghost
# Frontend: http://localhost:2368
# Admin: http://localhost:2368/ghost
```

## First Time Setup

1. Go to http://localhost:2368/ghost
2. Create your admin account
3. Configure site settings
4. Create custom integration for API access

## Data Storage

- **Database**: `content/data/ghost.db` (SQLite)
- **Images**: `content/images/`
- **Themes**: `content/themes/`
- **Config**: `content/settings/`

## Stop Ghost

```bash
docker-compose down
```

## Update .env

After creating your integration, update the main project's `.env`:

```
VITE_GHOST_URL=http://localhost:2368
VITE_GHOST_CONTENT_KEY=your-new-local-key
```