import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold">Villa dos Corais</h3>
            <p className="text-sm opacity-90">
              Seu refúgio paradisíaco na Linha Verde da Bahia
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="opacity-90 hover:opacity-100 transition-smooth">Início</Link></li>
              <li><Link to="/acomodacoes" className="opacity-90 hover:opacity-100 transition-smooth">Acomodações</Link></li>
              <li><Link to="/reservas" className="opacity-90 hover:opacity-100 transition-smooth">Reservar</Link></li>
              <li><Link to="/experiencias" className="opacity-90 hover:opacity-100 transition-smooth">Experiências</Link></li>
              <li><Link to="/contato" className="opacity-90 hover:opacity-100 transition-smooth">Contato</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+5571991415729" className="opacity-90 hover:opacity-100 transition-smooth">
                  (71) 99141-5729
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:henriquematos0101@gmail.com" className="opacity-90 hover:opacity-100 transition-smooth">
                  henriquematos0101@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">Subaúma, Bahia - Linha Verde</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Redes Sociais</h4>
            <div className="space-y-2 text-sm">
              <p className="opacity-90">Siga-nos nas redes sociais e acompanhe nossas novidades</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-90">
          <p>&copy; {currentYear} Villa dos Corais. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
