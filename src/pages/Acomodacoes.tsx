import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Wifi, Wind, Tv, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface Room {
  id: string;
  name: string;
  description: string;
  price_per_night: number;
  max_guests: number;
  amenities: string[];
  images: string[];
  status: string;
}

const Acomodacoes = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("status", "available")
        .order("price_per_night", { ascending: true });

      if (error) throw error;
      
      const transformedData = data?.map(room => ({
        id: room.id,
        name: room.name,
        description: room.description,
        price_per_night: room.price_per_night,
        max_guests: room.max_guests,
        images: room.images,
        status: room.status,
        amenities: (Array.isArray(room.amenities) 
          ? room.amenities 
          : typeof room.amenities === 'string' 
            ? JSON.parse(room.amenities) 
            : []
        ).map(a => String(a))
      })) as Room[] || [];
      
      setRooms(transformedData);
    } catch (error) {
      console.error("Erro ao carregar quartos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes("wi-fi")) return <Wifi className="h-4 w-4" />;
    if (amenity.toLowerCase().includes("ar")) return <Wind className="h-4 w-4" />;
    if (amenity.toLowerCase().includes("tv")) return <Tv className="h-4 w-4" />;
    if (amenity.toLowerCase().includes("frigobar")) return <Coffee className="h-4 w-4" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="hero-text mb-6">Nossas Acomodações</h1>
            <p className="text-xl text-muted-foreground">
              Escolha a suíte perfeita para sua estadia. Cada quarto oferece conforto excepcional e vistas deslumbrantes.
            </p>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">Carregando acomodações...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {rooms.map((room) => (
                <Card key={room.id} className="overflow-hidden shadow-medium hover:shadow-strong transition-smooth">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          Disponível
                        </Badge>
                        <span className="text-2xl font-bold">
                          R$ {room.price_per_night.toLocaleString("pt-BR")}
                          <span className="text-sm font-normal opacity-90">/noite</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-2xl">{room.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-2 text-base">
                      <Users className="h-4 w-4" />
                      <span>Até {room.max_guests} hóspedes</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">{room.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Comodidades</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {room.amenities.slice(0, 6).map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            {getAmenityIcon(amenity)}
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                      {room.amenities.length > 6 && (
                        <p className="text-xs text-muted-foreground mt-2">
                          +{room.amenities.length - 6} comodidades adicionais
                        </p>
                      )}
                    </div>
                    
                    <Button className="w-full" size="lg" asChild>
                      <Link to={`/reservas?room=${room.id}`}>Reservar Esta Suíte</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Acomodacoes;
