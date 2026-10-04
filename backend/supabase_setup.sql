-- Create users table
CREATE TABLE public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('farmer', 'buyer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create crops table
CREATE TABLE public.crops (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "cropName" TEXT NOT NULL,
    "tamilName" TEXT,
    grade TEXT NOT NULL,
    location TEXT NOT NULL,
    "quantityAvailable" NUMERIC NOT NULL,
    "pricePerKg" NUMERIC NOT NULL,
    "sellerId" UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'in-transit')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Note: No RLS enabled for hackathon speed (since using anon key in backend for simplicity)
-- But if RLS is required:
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "allow all" ON public.users FOR ALL USING (true);
-- CREATE POLICY "allow all" ON public.crops FOR ALL USING (true);
