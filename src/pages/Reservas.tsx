import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { CalendarIcon, Users } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface Room {
  id: string;
  name: string;
  price_per_night: number;
  max_guests: number;
}

const Reservas = () => {
  const [searchParams] = useSearchParams();
  const preSelectedRoomId = searchParams.get("room");

  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guestsCount, setGuestsCount] = useState("2");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRooms();
  }, []);

  useEffect(() => {
    if (preSelectedRoomId && rooms.length > 0) {
      setSelectedRoom(preSelectedRoomId);
    }
  }, [preSelectedRoomId, rooms]);

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from("rooms")
        .select("id, name, price_per_night, max_guests")
        .eq("status", "available")
        .order("price_per_night", { ascending: true });

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error("Erro ao carregar quartos:", error);
      toast.error("Erro ao carregar quartos disponíveis");
    }
  };

  const calculateTotal = (): number => {
    if (!checkIn || !checkOut || !selectedRoom) return 0;
    
    const room = rooms.find(r => r.id === selectedRoom);
    if (!room) return 0;

    const nights = differenceInDays(checkOut, checkIn);
    return nights * room.price_per_night;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoom || !checkIn || !checkOut || !guestName || !guestEmail || !guestPhone) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (checkIn >= checkOut) {
      toast.error("A data de check-out deve ser posterior ao check-in");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("bookings").insert({
        room_id: selectedRoom,
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone,
        check_in: format(checkIn, "yyyy-MM-dd"),
        check_out: format(checkOut, "yyyy-MM-dd"),
        guests_count: parseInt(guestsCount),
        total_amount: calculateTotal(),
        special_requests: specialRequests || null,
        status: "pending",
        payment_status: "pending",
      });

      if (error) throw error;

      toast.success("Reserva solicitada com sucesso! Entraremos em contato em breve.", {
        duration: 5000,
      });

      // Enviar notificação por WhatsApp
      const whatsappMessage = encodeURIComponent(
        `Nova reserva!\n\nHóspede: ${guestName}\nQuarto: ${rooms.find(r => r.id === selectedRoom)?.name}\nCheck-in: ${format(checkIn, "dd/MM/yyyy")}\nCheck-out: ${format(checkOut, "dd/MM/yyyy")}\nHóspedes: ${guestsCount}\nTotal: R$ ${calculateTotal().toLocaleString("pt-BR")}\n\nContato: ${guestPhone}\nEmail: ${guestEmail}`
      );
      
      window.open(`https://wa.me/5571991415729?text=${whatsappMessage}`, "_blank");

      // Reset form
      setSelectedRoom("");
      setCheckIn(undefined);
      setCheckOut(undefined);
      setGuestsCount("2");
      setGuestName("");
      setGuestEmail("");
      setGuestPhone("");
      setSpecialRequests("");
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      toast.error("Erro ao processar sua reserva. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="hero-text mb-6">Faça Sua Reserva</h1>
            <p className="text-xl text-muted-foreground">
              Preencha o formulário abaixo para reservar sua estadia na Villa dos Corais
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Detalhes da Reserva</CardTitle>
              <CardDescription>Complete as informações para confirmar sua reserva</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Room Selection */}
                <div className="space-y-2">
                  <Label htmlFor="room">Escolha a Suíte *</Label>
                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma suíte" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name} - R$ {room.price_per_night.toLocaleString("pt-BR")}/noite
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Check-in *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "PPP", { locale: ptBR }) : "Selecione a data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Check-out *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "PPP", { locale: ptBR }) : "Selecione a data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={(date) => date <= (checkIn || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <Label htmlFor="guests">Número de Hóspedes *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max={rooms.find(r => r.id === selectedRoom)?.max_guests || 4}
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Guest Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Seu nome"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="(71) 99999-9999"
                    required
                  />
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="requests">Pedidos Especiais (opcional)</Label>
                  <Textarea
                    id="requests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Alguma solicitação especial? (ex: cama extra, berço, aniversário...)"
                    rows={4}
                  />
                </div>

                {/* Summary */}
                {nights > 0 && total > 0 && (
                  <div className="bg-muted/50 rounded-lg p-6 space-y-2">
                    <h3 className="font-semibold text-lg mb-4">Resumo da Reserva</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Período:</span>
                      <span className="font-medium">{nights} {nights === 1 ? "noite" : "noites"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Valor por noite:</span>
                      <span className="font-medium">
                        R$ {rooms.find(r => r.id === selectedRoom)?.price_per_night.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="border-t border-border my-2 pt-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">R$ {total.toLocaleString("pt-BR")}</span>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Processando..." : "Confirmar Reserva"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Campos obrigatórios. Ao enviar, você receberá uma confirmação por email e entraremos em contato via WhatsApp.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reservas;
