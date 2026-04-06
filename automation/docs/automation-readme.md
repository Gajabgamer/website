# Webate Automation Architecture

This folder contains the automation infrastructure for the Webate platform. The system uses **n8n** to catch webhooks emitted by **Supabase**. 

## Supabase Event Triggers
You must manually set up the Webhooks in your Supabase project dashboard to point to your live n8n instance.

1. **New User Signup**
   - Table: \`users\` (or \`auth.users\` depending on schema architecture)
   - Event: \`INSERT\`
   - HTTP Request: POST to \`[n8n-url]/webhook/supabase-webhook-signup\`

2. **New Quote Request**
   - Table: \`quote_requests\`
   - Event: \`INSERT\`
   - HTTP Request: POST to \`[n8n-url]/webhook/supabase-webhook-quote\`

3. **New Audit Request**
   - Table: \`audit_requests\`
   - Event: \`INSERT\`
   - HTTP Request: POST to \`[n8n-url]/webhook/supabase-webhook-audit\`

## Scripts
- **lead-score.ts**: Handles dynamic incrementing of the \`lead_score\` column inside Supabase based on user interaction (+10 for signups, +30 for quotes, +40 for audits). Also contains retry-logic for notifying admins of high-intent leads (Score >= 40).
- **email-templates.ts**: Stores the raw string templates for all outgoing email confirmations natively signed by \`webatexyz@outlook.com\`.

## Analytics
The \`lead-score.ts\` script logs all actions into an \`analytics_events\` table inside Supabase, allowing frontend dashboards to map Daily Signups, Audit Requests, and Quote Requests linearly based on timestamps.
