export type LeadData = {
  name: string;
  email: string; // Required by DB
  phone: string; // Required by DB
  business: string; // Required by DB
  industry: string; // Required by DB
  city: string; // Required by DB
  website?: string;
  social?: string;
  project_details?: string;
  source: "audit" | "quote" | "calculator" | "website";
  [key: string]: unknown;
};

export async function submitLead(data: LeadData) {
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      // Pass the specific user-friendly error from the API down to the UI components
      throw new Error(result.error || "Failed to submit lead data.");
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("An unexpected error occurred during submission.");
  }
}
