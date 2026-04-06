import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error("Missing Supabase configuration");
            return NextResponse.json(
                { error: "Internal server configuration error" },
                { status: 500 }
            );
        }

        // Filter only the columns that exist in the Supabase 'leads' table
        const payload = {
            name: body.name,
            email: body.email,
            phone: body.phone,
            website: body.website,
            social: body.social || body.project_details, // Best effort catch
            source: body.source,
        };

        // Remove undefined properties before stringifying
        Object.keys(payload).forEach(key => {
            if (payload[key as keyof typeof payload] === undefined) {
                delete payload[key as keyof typeof payload];
            }
        });

        const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
            method: "POST",
            headers: {
                "apikey": supabaseKey,
                "Authorization": `Bearer ${supabaseKey}`,
                "Content-Type": "application/json",
                "Prefer": "return=minimal",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));

            // Handle Supabase unique constraint violation codes specifically
            if (errorData.code === "23505" || res.status === 409) {
                return NextResponse.json(
                    { error: "Thank you. We already received your request." },
                    { status: 409 }
                );
            }

            console.error("Supabase REST API Error:", errorData);
            return NextResponse.json(
                { error: errorData.message || errorData.details || "Failed to submit lead data to the database." },
                { status: res.status }
            );
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("API /api/lead error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred processing your request." },
            { status: 500 }
        );
    }
}
