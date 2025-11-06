-- ============================================
-- Financial Reports Database Schema
-- This SQL can be run on any PostgreSQL database
-- ============================================

-- Create reports table for storing financial reports
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  report_name TEXT NOT NULL,
  report_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  income_data JSONB,
  assets_data JSONB,
  expenses_data JSONB,
  liabilities_data JSONB,
  data_sources JSONB,
  notes TEXT,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (if using Supabase/PostgREST)
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create policies for user access (if using Supabase Auth)
-- Note: These policies assume auth.uid() function exists (Supabase)
-- For custom Postgres, you'll need to adapt authentication
CREATE POLICY "Users can view their own reports" 
ON public.reports 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reports" 
ON public.reports 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reports" 
ON public.reports 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reports" 
ON public.reports 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_reports_updated_at
BEFORE UPDATE ON public.reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON public.reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports(created_at DESC);

-- ============================================
-- Notes for Custom Postgres Setup:
-- ============================================
-- 1. Remove RLS policies if not using Supabase/PostgREST
-- 2. Replace auth.uid() with your own authentication mechanism
-- 3. Ensure UUID extension is enabled: CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 4. Adapt user_id references to match your user management system
-- ============================================
