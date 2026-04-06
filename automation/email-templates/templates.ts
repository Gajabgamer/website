type InternalHighIntentLead = {
    name: string;
    email: string;
    website?: string;
    action: string;
    score: number;
};

export const templates = {
    signup: (name: string) => ({
        subject: "Welcome to Webate 🚀",
        message: `Hi ${name},\n\nWelcome to Webate.\n\nYou can now explore website tools, request audits, and build high-performance websites for your business.\n\nWebate Team\nwebate.xyz\nwebatexyz@outlook.com`,
    }),
    quote: (name: string) => ({
        subject: "Your Webate Quote Request Has Been Received",
        message: `Hi ${name},\n\nWe have received your quote request.\n\nOur team will review your requirements and send a proposal soon.\n\nWebate Team\nwebatexyz@outlook.com`,
    }),
    audit: (name: string) => ({
        subject: "Your Website Audit Has Started 🔍",
        message: `Hi ${name},\n\nYour website audit request has been received.\n\nOur system is currently analyzing your website for SEO, performance, and growth opportunities.\n\nYou will receive the results shortly.\n\nWebate Team\nwebatexyz@outlook.com`,
    }),
    internalHighIntent: (lead: InternalHighIntentLead) => ({
        subject: "High-Intent Lead Detected 🔥",
        message: `Name: ${lead.name}\nEmail: ${lead.email}\nWebsite: ${lead.website || "N/A"}\nAction Performed: ${lead.action}\nLead Score: ${lead.score}`,
    })
};
