-- Create user_data_sources table for persistent data sources across all statements
CREATE TABLE public.user_data_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  section TEXT NOT NULL, -- 'income', 'expenses', 'assets', 'liabilities'
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_data_sources ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own data sources" 
ON public.user_data_sources 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own data sources" 
ON public.user_data_sources 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own data sources" 
ON public.user_data_sources 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own data sources" 
ON public.user_data_sources 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_data_sources_updated_at
BEFORE UPDATE ON public.user_data_sources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better query performance
CREATE INDEX idx_user_data_sources_user_id ON public.user_data_sources(user_id);
CREATE INDEX idx_user_data_sources_section ON public.user_data_sources(section);