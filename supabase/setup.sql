-- setup.sql
-- Run this in the Supabase SQL Editor

-- 1. Create the base tables if they don't exist
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    phone TEXT,
    business TEXT,
    website TEXT,
    industry TEXT,
    city TEXT,
    lead_score INTEGER DEFAULT 0,
    stars_ranking TEXT DEFAULT '⭐',
    visit_count INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    business TEXT,
    website TEXT,
    social TEXT,
    industry TEXT,
    project_details TEXT,
    city TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name TEXT,
    email TEXT,
    industry TEXT,
    city TEXT,
    color_theme TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS demo_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name TEXT,
    email TEXT,
    industry TEXT,
    city TEXT,
    color_theme TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calculator_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    website TEXT,
    social_url TEXT,
    project_type TEXT,
    budget_range TEXT,
    features TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Configure Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow public insert for forms
CREATE POLICY "Allow public insert" ON leads FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public insert" ON audit_requests FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public insert" ON demo_requests FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public insert" ON quote_requests FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public insert" ON calculator_requests FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public insert" ON users FOR INSERT TO public WITH CHECK (true);

-- 3. Create Star Ranking Logic
CREATE OR REPLACE FUNCTION calculate_stars_ranking(score INTEGER) 
RETURNS TEXT AS $$
BEGIN
    IF score >= 100 THEN
        RETURN '⭐⭐⭐⭐⭐ 🔥';
    ELSIF score >= 70 THEN
        RETURN '⭐⭐⭐⭐';
    ELSIF score >= 40 THEN
        RETURN '⭐⭐⭐';
    ELSIF score >= 20 THEN
        RETURN '⭐⭐';
    ELSE
        RETURN '⭐';
    END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 4. Create UPSERT Lead Logic
CREATE OR REPLACE FUNCTION upsert_lead_score(
    p_email TEXT,
    p_name TEXT,
    p_phone TEXT,
    p_business TEXT,
    p_website TEXT,
    p_industry TEXT,
    p_points INTEGER
) RETURNS VOID AS $$
DECLARE
    v_id UUID;
    v_current_score INTEGER;
BEGIN
    IF p_email IS NULL OR TRIM(p_email) = '' THEN 
        RETURN; 
    END IF;

    -- Check if lead exists
    SELECT id, lead_score INTO v_id, v_current_score
    FROM leads
    WHERE email = p_email
    LIMIT 1;

    IF FOUND THEN
        -- Update existing
        UPDATE leads
        SET 
            lead_score = v_current_score + p_points,
            stars_ranking = calculate_stars_ranking(v_current_score + p_points),
            visit_count = visit_count + 1,
            last_updated = NOW(),
            name = COALESCE(leads.name, p_name),
            phone = COALESCE(leads.phone, p_phone),
            business = COALESCE(leads.business, p_business),
            website = COALESCE(leads.website, p_website),
            industry = COALESCE(leads.industry, p_industry)
        WHERE id = v_id;
    ELSE
        -- Insert new
        INSERT INTO leads (
            email, 
            name, 
            phone, 
            business, 
            website, 
            industry, 
            lead_score, 
            stars_ranking
        ) VALUES (
            p_email,
            COALESCE(p_name, 'Guest'),
            p_phone,
            p_business,
            p_website,
            COALESCE(p_industry, 'Unknown'),
            p_points,
            calculate_stars_ranking(p_points)
        );
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 5. Create Trigger Functions for each action
-- Audit Request Trigger (+40 points)
CREATE OR REPLACE FUNCTION trg_audit_request_score()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM upsert_lead_score(
        NEW.email,
        NEW.name,
        NEW.phone,
        NEW.business,
        NEW.website,
        NEW.industry,
        40
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Quote/Demo Request Trigger (+30 points)
CREATE OR REPLACE FUNCTION trg_quote_request_score()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM upsert_lead_score(
        NEW.email,
        NEW.business_name,
        NULL,
        NEW.business_name,
        NULL,
        NEW.industry,
        30
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Calculator Usage Trigger (+20 points)
CREATE OR REPLACE FUNCTION trg_calculator_request_score()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM upsert_lead_score(
        NEW.email,
        NEW.name,
        NULL,
        NULL,
        NEW.website,
        NULL,
        20
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Attach Triggers to Tables
DROP TRIGGER IF EXISTS on_audit_request ON audit_requests;
CREATE TRIGGER on_audit_request
AFTER INSERT ON audit_requests
FOR EACH ROW EXECUTE FUNCTION trg_audit_request_score();

DROP TRIGGER IF EXISTS on_demo_request ON demo_requests;
CREATE TRIGGER on_demo_request
AFTER INSERT ON demo_requests
FOR EACH ROW EXECUTE FUNCTION trg_quote_request_score();

DROP TRIGGER IF EXISTS on_quote_request ON quote_requests;
CREATE TRIGGER on_quote_request
AFTER INSERT ON quote_requests
FOR EACH ROW EXECUTE FUNCTION trg_quote_request_score();

DROP TRIGGER IF EXISTS on_calculator_request ON calculator_requests;
CREATE TRIGGER on_calculator_request
AFTER INSERT ON calculator_requests
FOR EACH ROW EXECUTE FUNCTION trg_calculator_request_score();
