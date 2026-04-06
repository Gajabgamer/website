import { NextResponse } from 'next/server';

type DatabaseErrorDetails = string | null;

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let dbStatus = 'unconfigured';
    let dbDetails: DatabaseErrorDetails = null;

    if (supabaseUrl && supabaseKey) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
          method: "HEAD",
          headers: {
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`
          }
        });

        if (response.ok) {
          dbStatus = 'connected';
        } else {
          dbStatus = 'error';
          dbDetails = `HTTP ${response.status}`;
        }
      } catch (e: unknown) {
        dbStatus = 'error';
        dbDetails = e instanceof Error ? e.message : 'Unknown database error';
      }
    }

    return NextResponse.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      message: 'API is running',
      databaseCheck: dbStatus,
      databaseError: dbDetails
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({
      status: 'Error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
