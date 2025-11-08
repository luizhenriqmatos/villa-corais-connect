import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Contato = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whatsappNumber = "5571991415729";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de informações sobre a Villa dos Corais.");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="hero-text mb-6">Entre em Contato</h1>
            <p className="text-xl text-muted-foreground">
              Estamos prontos para atendê-lo e tirar todas as suas dúvidas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-medium">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Telefone</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+5571991415729" className="text-lg hover:text-primary transition-smooth">
                  (71) 99141-5729
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Conversar Agora
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>E-mail</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:henriquematos0101@gmail.com"
                  className="text-lg hover:text-primary transition-smooth break-all"
                >
                  henriquematos0101@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  Subaúma, Bahia
                  <br />
                  Linha Verde
                  <br />
                  Ao lado do Resort Tree Bies
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/30">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-serif font-bold mb-4">Horário de Atendimento</h3>
              <p className="text-lg mb-2">Segunda a Domingo</p>
              <p className="text-lg text-muted-foreground">8h às 22h</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
