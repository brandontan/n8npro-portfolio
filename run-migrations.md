# Run Supabase Migrations

To create the activities table in your Supabase database, follow these steps:

## Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to the SQL Editor (usually in the left sidebar)
3. Copy the entire contents of `supabase/migrations/20250120_create_activities_table.sql`
4. Paste it into the SQL editor
5. Click "Run" or "Execute"

## Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Link your project (if not already linked)
supabase link --project-ref xzxomhhuovfhukwzitxt

# Run the migration
supabase db push
```

## Option 3: Direct SQL Connection

If you have direct database access:

```bash
psql -h db.xzxomhhuovfhukwzitxt.supabase.co -U postgres -d postgres < supabase/migrations/20250120_create_activities_table.sql
```

## Verify the Migration

After running the migration, you can verify it worked by:

1. Going to the Table Editor in your Supabase dashboard
2. You should see a new `activities` table
3. Try creating a post in the editor again - it should save successfully

## Important Notes

- The current policy allows anyone to create activities (for development)
- In production, you should update the policy to require authentication
- The table includes indexes for performance on common queries