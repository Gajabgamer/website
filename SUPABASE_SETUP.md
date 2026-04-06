# Supabase Setup Instructions

To make the database operations work properly, you need to configure environment variables and Row Level Security (RLS) policies in your Supabase dashboard.

## Environment Variables

For the server-side architecture, you need to add these environment variables to your `.env.local` file:

```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

The SERVICE_ROLE_KEY has elevated privileges and should only be used on the server-side, never exposed to the browser.

## Enable RLS and Create Policies

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Navigate to your project
3. Click on "Table Editor" in the sidebar
4. For each table, enable RLS and create appropriate policies:

### For the `leads` table:
1. Go to the `leads` table
2. Click on the "Row Level Security" tab
3. Enable "Enable Row Level Security"
4. Create a new policy with these settings:
   - **Policy Name**: `Allow public insert`
   - **For**: `INSERT`
   - **With check**: `WITH CHECK (true)`
   - **Description**: `Allow anyone to insert leads`

### For the `demo_requests` table:
1. Go to the `demo_requests` table
2. Click on the "Row Level Security" tab
3. Enable "Enable Row Level Security"
4. Create a new policy with these settings:
   - **Policy Name**: `Allow public insert`
   - **For**: `INSERT`
   - **With check**: `WITH CHECK (true)`
   - **Description**: `Allow anyone to insert demo requests`

### SQL Commands (Alternative Method)
You can also run these SQL commands in the SQL Editor:

```sql
-- Enable RLS for leads table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy for leads table
CREATE POLICY "Allow public insert for leads"
ON leads FOR INSERT
TO public
WITH CHECK (true);

-- Enable RLS for demo_requests table
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for demo_requests table
CREATE POLICY "Allow public insert for demo_requests"
ON demo_requests FOR INSERT
TO public
WITH CHECK (true);
```

## Verification

After setting up the RLS policies:
1. The "Get Free Audit" form should successfully save data to the `leads` table via the `/api/audit` endpoint
2. The "Generate My Website Preview" form should successfully save data to the `demo_requests` table via the `/api/demo-request` endpoint
3. The welcome modal should save data to the `leads` table via the `/api/welcome-lead` endpoint when an email is provided

## Troubleshooting

If you still encounter issues:
1. Make sure your environment variables are correctly set in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` (for client-side operations if any remain)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (for client-side operations if any remain)
   - `SUPABASE_URL` (for server-side operations)
   - `SUPABASE_SERVICE_ROLE_KEY` (for server-side operations with elevated privileges)
2. Check the browser console and server logs for specific error messages
3. Verify that the tables exist in your database
4. Ensure the column names in your code match the table schema