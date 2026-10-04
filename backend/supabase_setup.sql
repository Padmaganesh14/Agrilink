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

-- Create orders table
CREATE TABLE public.orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "orderId" TEXT NOT NULL UNIQUE,
    crop TEXT NOT NULL,
    "quantityKg" NUMERIC NOT NULL,
    "ratePerKg" NUMERIC NOT NULL,
    "totalValue" NUMERIC NOT NULL,
    status TEXT DEFAULT 'Payment Coordination',
    "buyerName" TEXT NOT NULL,
    "buyerLocation" TEXT,
    "pickupLocation" TEXT,
    "deliveryLocation" TEXT,
    "transportName" TEXT,
    "transportVehicle" TEXT,
    "transportCost" NUMERIC,
    "paymentCoordinated" BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create trackings table
CREATE TABLE public.trackings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "trackingId" TEXT NOT NULL UNIQUE,
    "orderId" TEXT NOT NULL REFERENCES public.orders("orderId") ON DELETE CASCADE,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    "currentCheckpoint" TEXT,
    "speedKmH" NUMERIC,
    "distanceKm" NUMERIC,
    "etaHours" NUMERIC,
    status TEXT DEFAULT 'In Transit',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create transporters table
CREATE TABLE public.transporters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    vehicle TEXT NOT NULL,
    "capacityKg" NUMERIC NOT NULL,
    "baseRateKm" NUMERIC NOT NULL,
    rating NUMERIC DEFAULT 4.5,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create buyer_profiles table
CREATE TABLE public.buyer_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "userId" UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    "businessName" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    location TEXT NOT NULL,
    "preferredCrops" TEXT[] NOT NULL,
    "maxVolumeKg" NUMERIC NOT NULL,
    "targetPricePerKg" NUMERIC,
    "paymentTerms" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert Seed Data
-- Demo Farmer
INSERT INTO public.users (id, name, mobile, password, role) VALUES 
('11111111-1111-1111-1111-111111111111', 'Farmer Ramanathan', '9876543210', 'password', 'farmer')
ON CONFLICT (mobile) DO NOTHING;

-- Demo Buyers
INSERT INTO public.users (id, name, mobile, password, role) VALUES 
('22222222-2222-2222-2222-222222222222', 'Koyambedu Wholesale Mart', '9999999991', 'password', 'buyer'),
('33333333-3333-3333-3333-333333333333', 'FreshDirect Chennai', '9999999992', 'password', 'buyer')
ON CONFLICT (mobile) DO NOTHING;

INSERT INTO public.buyer_profiles ("userId", "businessName", "businessType", location, "preferredCrops", "maxVolumeKg", "targetPricePerKg", "paymentTerms") VALUES
('22222222-2222-2222-2222-222222222222', 'Koyambedu Wholesale Mart', 'B2B Wholesale Buyer', 'Chennai', ARRAY['Tomato', 'Onion', 'Potato'], 5000, 34.0, 'WhatsApp-coordinated payment terms before vehicle dispatch'),
('33333333-3333-3333-3333-333333333333', 'FreshDirect Chennai', 'B2B Retail Aggregator', 'Chennai', ARRAY['Tomato', 'Carrot', 'Cabbage'], 2000, 33.5, 'WhatsApp-coordinated payment upon load inspection');

-- Demo Transporters
INSERT INTO public.transporters (name, vehicle, "capacityKg", "baseRateKm", rating, available) VALUES
('Tamil Nadu Agro Logistics', 'Eicher Pro 2049 (14 FT)', 3000, 15.0, 4.9, true),
('GreenRoute Agro Freight', 'Tata 407 LPT (14 FT)', 2500, 14.5, 4.7, true);

-- Note: Policies to allow all if RLS is enabled later
-- CREATE POLICY "allow all" ON public.orders FOR ALL USING (true);
-- CREATE POLICY "allow all" ON public.trackings FOR ALL USING (true);

-- Grant permissions for anon role (required if project enforces public schema restrictions)
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
