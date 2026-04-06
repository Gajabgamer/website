# Webate Automation Architecture

This directory contains the complete backend automation system for the Webate platform. It uses Supabase webhooks to trigger n8n workflows based on user interactions.

## Folder Structure
- `/n8n`: Contains the exported n8n workflow JSON files.
- `/email-templates`: Contains the templates for automated emails.
- `/scripts`: Contains backend scripts like lead scoring.

## System Workflow
1. **User Action on Website**: User signs up, requests a quote, or requests an audit.
2. **Data Stored in Supabase**: The action is recorded in the corresponding table (`users`, `quote_requests`, `audit_requests`).
3. **Webhook Triggered**: Supabase fires a webhook to n8n whenever a new row is inserted.
4. **n8n Automation Runs**: The workflow processes the event.
5. **Emails & Notifications Sent**: 
   - A confirmation email is sent to the user from `webatexyz@outlook.com`.
   - If the user's `lead_score` reaches 40 or more, an admin notification is sent internally.
6. **Lead Score Updated**: The `users` table is updated with the new `lead_score`.

## How to Add New Workflows
1. Create a new trigger in Supabase mapping to your n8n webhook URL.
2. Import or create the workflow in n8n, ensuring it catches the payload.
3. Use the existing scripts in `/scripts` to interact with the database, or create new ones as needed.
4. Export the updated JSON into `/n8n` to keep this repository in sync.

## Documentation
- All automated emails are strictly configured to send from `webatexyz@outlook.com`.
- The system includes a 3-retry mechanism for failed email/notification deliveries.
