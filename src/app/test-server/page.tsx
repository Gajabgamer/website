'use client';

import { useState } from 'react';

type ServerTestResult = Record<string, unknown>;

export default function ServerTestPage() {
  const [result, setResult] = useState<ServerTestResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/test-supabase');
      const data = await response.json();
      
      if (!response.ok) {
        setError(JSON.stringify(data.error, null, 2));
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(`Network error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Server-Side Supabase Test</h1>
        
        <div className="text-center">
          <button
            onClick={handleTest}
            disabled={loading}
            className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Run Server Test'}
          </button>
        </div>
        
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <h3 className="text-red-800 font-medium">Error:</h3>
            <pre className="text-red-600 mt-2 whitespace-pre-wrap">{error}</pre>
          </div>
        )}
        
        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-green-800 font-medium">Result:</h3>
            <pre className="text-green-600 mt-2 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
        
        <div className="mt-8 text-sm text-gray-600">
          <h3 className="font-medium mb-2">What this test does:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Calls a server-side API route that connects to Supabase</li>
            <li>Attempts to insert test data into the &apos;leads&apos; table</li>
            <li>Bypasses browser/client-side issues</li>
            <li>Tests the actual server-to-database connection</li>
          </ul>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p><strong>Note:</strong> If this test fails but the server can connect to Supabase, the issue is likely with Row Level Security (RLS) policies in your Supabase dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
