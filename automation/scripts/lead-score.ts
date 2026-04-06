import { createClient } from '@supabase/supabase-js';
import { templates } from '../email-templates/templates';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

interface ActionPayload {
    email: string;
    name: string;
    action: 'signup' | 'quote' | 'audit';
    website?: string;
}

interface HighIntentLead {
    name: string;
    email: string;
    website?: string;
    action: ActionPayload['action'];
    score: number;
}

export async function processUserAction(payload: ActionPayload) {
    let points = 0;

    if (payload.action === 'signup') points = 10;
    if (payload.action === 'quote') points = 30;
    if (payload.action === 'audit') points = 40;

    try {
        const { data: user } = await supabase
            .from('users')
            .select('id, lead_score')
            .eq('email', payload.email)
            .single();

        let newScore = points;

        if (user) {
            newScore = (user.lead_score || 0) + points;

            await supabase
                .from('users')
                .update({ lead_score: newScore })
                .eq('id', user.id);
        } else {
            // If user doesn't exist, Supabase insert could be handled here or by main web app
        }

        if (newScore >= 40) {
            await sendAdminNotification({
                name: payload.name,
                email: payload.email,
                website: payload.website,
                action: payload.action,
                score: newScore
            }, 0);
        }

        return { success: true, score: newScore };

    } catch (error) {
        console.error("Error processing user action", error);
        return { success: false, error };
    }
}

async function sendAdminNotification(leadData: HighIntentLead, retryCount: number) {
    try {
        const emailData = templates.internalHighIntent(leadData);
        // Execute Native NodeMailer / SendGrid / API call to dispatch email from webatexyz@outlook.com
        console.log(`Sending from webatexyz@outlook.com: ${emailData.subject}`);

        // Simulate successful send
        return true;
    } catch (error) {
        if (retryCount < 3) {
            console.log(`Notification failed, retrying (${retryCount + 1}/3)...`);
            await sendAdminNotification(leadData, retryCount + 1);
        } else {
            console.error("Failed to send admin notification after 3 retries", error);
        }
    }
}
