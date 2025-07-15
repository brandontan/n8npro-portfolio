# n8n MCP Update Quick Reference

## Current Status (Jan 15, 2025)
- **Total Templates**: 2,154 (499 default + 1,655 BeyondAman)
- **Database Size**: 40.9 MB
- **Location**: `/Users/brtan/Projects/n8npro-portfolio/data/nodes.db`
- **Claude Desktop**: ✅ Configured to use persistent database

## ⚠️ CRITICAL: Never Update MCP Without This Process!

NPX updates = Fresh database = Lost templates!

## Safe Update Steps (When MCP Has New Version)

### 1. Run Safety Script First
```bash
cd ~/Projects/n8npro-portfolio
./scripts/simple_safe_update.sh
```

This will:
- ✅ Backup your database
- ✅ Export custom templates
- ✅ Create persistent copy
- ✅ Show health checks
- ✅ Give you restore commands

### 2. Only When You See "SAFE TO PROCEED"
```bash
npm exec --yes n8n-mcp@latest --version
```

### 3. Restore Your Templates
The script gives you exact commands, but typically:
```bash
# Find new database
NEW_DB=$(find ~/.npm/_npx -name 'nodes.db' -mtime -1 | head -1)

# Import your templates
sqlite3 "$NEW_DB" < ~/n8n-mcp-backups/beyondaman_templates_[timestamp].sql

# Copy to persistent location
cp "$NEW_DB" data/nodes.db
```

## Quick Checks

### Check Current Template Count
```bash
sqlite3 data/nodes.db "SELECT COUNT(*) FROM templates;"
# Should show: 2154
```

### Check BeyondAman Templates
```bash
sqlite3 data/nodes.db "SELECT COUNT(*) FROM templates WHERE author_name='BeyondAman';"
# Should show: 1655
```

### Find Your Database
```bash
# Your persistent copy (safe)
ls -lh data/nodes.db

# NPX cache (unsafe, gets replaced)
find ~/.npm/_npx -name "nodes.db" -size +40M
```

## Backups Location
```
~/n8n-mcp-backups/
├── nodes_backup_20250715_*.db     (full backups)
└── beyondaman_templates_*.sql      (custom templates only)
```

## Claude Desktop Config
Already configured at: `~/Library/Application Support/Claude/claude_desktop_config.json`

Points to: `/Users/brtan/Projects/n8npro-portfolio/scripts/run-mcp-with-data.js`

This wrapper ensures Claude always uses `data/nodes.db`

## If Something Goes Wrong

### Restore from backup:
```bash
# List backups
ls -la ~/n8n-mcp-backups/

# Restore
cp ~/n8n-mcp-backups/nodes_backup_[newest].db data/nodes.db
```

### Restart Claude Desktop:
1. Quit Claude Desktop completely
2. Reopen
3. MCP will reload with your database

## Remember
- **ALWAYS** run `simple_safe_update.sh` before updating
- **NEVER** trust NPX to keep your data
- **ALWAYS** work from project directory: `cd ~/Projects/n8npro-portfolio`
- Your templates are safe in `data/nodes.db`

## Why This Works
- n8n-mcp checks `./data/nodes.db` first
- Your wrapper forces it to run from project directory
- Updates can't touch your persistent database
- You control when to merge new templates

---
*Last successful import: Jan 15, 2025 - 1,655 BeyondAman workflows*