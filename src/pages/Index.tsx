import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Users, Bed, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import heroImage from "@/assets/hero-beach.jpg";
import roomImage from "@/assets/room-ocean-view.jpg";
import gardenImage from "@/assets/tropical-garden.jpg";
import aerialImage from "@/assets/subauma-aerial.jpg";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Waves,
      title: "À Beira-Mar",
      description: "Acesso direto à praia de Subaúma, com águas cristalinas e piscinas naturais",
    },
    {
      icon: Bed,
      title: "Suítes Premium",
      description: "Quartos confortáveis com vista para o mar ou jardim tropical",
    },
    {
      icon: MapPin,
      title: "Localização Privilegiada",
      description: "Na Linha Verde, ao lado do Resort Tree Bies, próximo a tudo",
    },
    {
      icon: Users,
      title: "Atendimento Exclusivo",
      description: "Equipe dedicada para tornar sua estadia inesquecível",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="hero-text mb-6 animate-fade-in">
            Villa dos Corais
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Seu paraíso particular na Linha Verde da Bahia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" asChild className="text-lg">
              <Link to="/reservas">Reserve Sua Estadia</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg bg-white/10 backdrop-blur-sm border-white hover:bg-white hover:text-primary">
              <Link to="/acomodacoes">Ver Acomodações</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Por Que Escolher a Villa dos Corais?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experiência única onde o conforto encontra a natureza exuberante da Bahia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <h2 className="section-title mb-6">Acomodações de Luxo</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Nossas suítes foram cuidadosamente projetadas para oferecer máximo conforto e privacidade. 
                Com vistas deslumbrantes para o mar ou nosso jardim tropical, cada quarto é um refúgio perfeito.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>Ar-condicionado e TV Smart em todas as suítes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>Varandas privativas com vista panorâmica</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>Roupa de cama premium e amenidades de luxo</span>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link to="/acomodacoes">Explorar Quartos</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={roomImage}
                alt="Suíte de luxo com vista para o mar"
                className="rounded-2xl shadow-strong w-full h-[500px] object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={aerialImage}
                alt="Vista aérea de Subaúma"
                className="rounded-2xl shadow-strong w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="section-title mb-6">Paraíso Natural</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Localizada na famosa Linha Verde da Bahia, Subaúma é conhecida por suas praias intocadas, 
                piscinas naturais e rica biodiversidade marinha. Um destino perfeito para quem busca tranquilidade 
                e contato com a natureza.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Nossa pousada está estrategicamente posicionada para que você aproveite o melhor da região, 
                com fácil acesso a restaurantes locais, passeios ecológicos e pontos turísticos.
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link to="/experiencias">Descobrir a Região</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${gardenImage})` }}
        >
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="section-title mb-6">Pronto Para Sua Experiência Inesquecível?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Reserve agora e garanta as melhores tarifas para sua estadia na Villa dos Corais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg">
              <Link to="/reservas">Fazer Reserva</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
