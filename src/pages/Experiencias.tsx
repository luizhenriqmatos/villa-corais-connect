import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Utensils, Palmtree, Camera } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import aerialImage from "@/assets/subauma-aerial.jpg";

const Experiencias = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const attractions = [
    {
      icon: Palmtree,
      title: "Piscinas Naturais",
      description: "Explore as famosas piscinas naturais de Subaúma durante a maré baixa. Águas cristalinas e vida marinha abundante.",
    },
    {
      icon: Camera,
      title: "Passeios Ecológicos",
      description: "Trilhas pela Mata Atlântica, observação de aves e descoberta da rica biodiversidade local.",
    },
    {
      icon: Utensils,
      title: "Gastronomia Baiana",
      description: "Restaurantes locais servindo moqueca, acarajé e frutos do mar frescos da região.",
    },
    {
      icon: MapPin,
      title: "Praias Vizinhas",
      description: "Imbassaí, Praia do Forte e Costa do Sauípe a poucos minutos de distância.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="hero-text mb-6">Experiências em Subaúma</h1>
            <p className="text-xl text-muted-foreground">
              Descubra as maravilhas naturais e culturais da Linha Verde da Bahia
            </p>
          </div>

          <div className="mb-16">
            <img
              src={aerialImage}
              alt="Vista aérea de Subaúma"
              className="w-full h-[500px] object-cover rounded-2xl shadow-strong"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {attractions.map((item, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-smooth">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold mb-4">Subaúma - Linha Verde</h3>
              <p className="text-lg opacity-90 mb-4">
                Localizada no litoral norte da Bahia, Subaúma é um destino paradisíaco conhecido por suas praias 
                intocadas, piscinas naturais e ambiente tranquilo. A região oferece o equilíbrio perfeito entre 
                natureza preservada e infraestrutura turística.
              </p>
              <p className="text-lg opacity-90">
                A Villa dos Corais está estrategicamente posicionada para você aproveitar o melhor da região, 
                ao lado do Resort Tree Bies e com fácil acesso a todos os atrativos locais.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Experiencias;
