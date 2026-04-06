type HighIntentLead = {
    name: string;
    email: string;
    website?: string;
    action: string;
    score: number;
};

export const emailTemplates = {
    welcome: (name: string) => ({
        subject: "Welcome to Webate 🚀",
        message: `Hi ${name},\n\nThank you for joining Webate.\n\nYou can now request website audits, explore growth tools, and build high-performance websites for your business.\n\nBest regards,\nWebate Team\nwebate.xyz\nwebatexyz@outlook.com`,
    }),
    quoteRequest: (name: string) => ({
        subject: "Your Webate Quote Request Has Been Received",
        message: `Hi ${name},\n\nWe have received your quote request.\n\nOur team is reviewing your requirements and will send a proposal soon.\n\nWebate Team\nwebate.xyz\nwebatexyz@outlook.com`,
    }),
    auditRequest: (name: string) => ({
        subject: "Your Website Audit Has Started 🔍",
        message: `Hi ${name},\n\nYour website audit request has been received.\n\nOur system is analyzing your website for SEO, performance, and growth opportunities.\n\nYou will receive the results shortly.\n\nWebate Team\nwebate.xyz\nwebatexyz@outlook.com`,
    }),
    newHighIntentLead: (lead: HighIntentLead) => ({
        subject: "New High-Intent Lead Detected 🔥",
        message: `New high-intent lead detected:\n\nName: ${lead.name}\nEmail: ${lead.email}\nWebsite: ${lead.website || "N/A"}\nAction Performed: ${lead.action}\nLead Score: ${lead.score}\n\nInternal Notification System`,
    })
};
