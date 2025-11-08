-- Tabela de quartos
CREATE TABLE public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price_per_night DECIMAL(10,2) NOT NULL,
  max_guests INTEGER NOT NULL,
  amenities JSONB DEFAULT '[]'::jsonb,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'unavailable', 'maintenance')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de reservas
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
  guest_name VARCHAR(100) NOT NULL,
  guest_email VARCHAR(100) NOT NULL,
  guest_phone VARCHAR(20) NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  guests_count INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de disponibilidade
CREATE TABLE public.availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT true,
  price_adjustment DECIMAL(10,2),
  UNIQUE(room_id, date)
);

-- Enable RLS
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para visualização pública
CREATE POLICY "Quartos visíveis para todos"
  ON public.rooms FOR SELECT
  USING (true);

CREATE POLICY "Disponibilidade visível para todos"
  ON public.availability FOR SELECT
  USING (true);

-- Políticas RLS para reservas (leitura pública, criação pública)
CREATE POLICY "Reservas visíveis para todos"
  ON public.bookings FOR SELECT
  USING (true);

CREATE POLICY "Qualquer um pode criar reservas"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Inserir quartos iniciais
INSERT INTO public.rooms (name, description, price_per_night, max_guests, amenities, images, status) VALUES
('Suíte Vista Mar Premium', 'Suíte luxuosa com vista panorâmica para o mar, varanda privativa e acabamento requintado. Perfeita para casais em busca de romance e tranquilidade.', 450.00, 2, 
  '["Ar condicionado", "TV Smart 50\"", "Varanda privativa", "Vista para o mar", "Frigobar", "Cofre", "Wi-Fi de alta velocidade", "Roupas de cama premium"]'::jsonb, 
  ARRAY['room1-1.jpg', 'room1-2.jpg', 'room1-3.jpg'], 
  'available'),
  
('Suíte Jardim Tropical', 'Aconchegante suíte com vista para o jardim tropical, ideal para quem busca contato com a natureza sem abrir mão do conforto.', 380.00, 2, 
  '["Ar condicionado", "TV Smart 42\"", "Vista para jardim", "Frigobar", "Cofre", "Wi-Fi", "Hidromassagem"]'::jsonb, 
  ARRAY['room2-1.jpg', 'room2-2.jpg'], 
  'available'),
  
('Suíte Família Confort', 'Espaçosa suíte projetada para famílias, com até 4 hóspedes. Ambiente amplo e acolhedor para momentos inesquecíveis.', 520.00, 4, 
  '["Ar condicionado", "2 TVs Smart", "Varanda", "Frigobar", "Cofre", "Wi-Fi", "Berço disponível", "Área de estar"]'::jsonb, 
  ARRAY['room3-1.jpg', 'room3-2.jpg', 'room3-3.jpg'], 
  'available'),
  
('Suíte Master Luxo', 'Nossa suíte mais exclusiva com banheira de hidromassagem, sala de estar privativa e vista deslumbrante. A escolha perfeita para uma experiência premium.', 650.00, 2, 
  '["Ar condicionado dual", "TV Smart 55\"", "Banheira hidromassagem", "Varanda ampla", "Vista mar", "Frigobar premium", "Cofre", "Wi-Fi premium", "Sala de estar", "Roupão e chinelos"]'::jsonb, 
  ARRAY['room4-1.jpg', 'room4-2.jpg', 'room4-3.jpg', 'room4-4.jpg'], 
  'available');