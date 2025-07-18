import React, { useState, useEffect } from 'react';
import {
  Play,
  Shield,
  Clock,
  Star,
  Check,
  MessageCircle,
  Smartphone,
  Tv,
  Download,
  Zap,
  Globe,
  Lock,
  Award,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import Notification from './Notification';

// Importações dos logótipos (removidos os que causavam erro)
// Se você adicionar os ficheiros de imagem na pasta 'src/assets/logos', pode descomentar estas linhas
// import NetflixLogo from './assets/logos/netflix.png';
// import PrimeVideoLogo from './assets/logos/prime_video.png';
// import DisneyPlusLogo from './assets/logos/disney_plus.png';
// import HboMaxLogo from './assets/logos/hbo_max.png';
// import AppleTvPlusLogo from './assets/logos/apple_tv_plus.png';
// import HuluLogo from './assets/logos/hulu.png';
// import PeacockLogo from './assets/logos/globo_play.png';
// import ParamountPlusLogo from './assets/logos/paramount_plus.png';
// import StarzLogo from './assets/logos/starz.png';

// Dados para as notificações
const fakeNames = ["Maria S.", "João P.", "Ana C.", "Lucas M.", "Sofia L.", "Pedro H.", "Julia A."];
const fakeContent = ["Superman: O Legado", "A Casa do Dragão", "Deadpool & Wolverine", "Divertida-Mente 2", "O Urso", "The Boys", "The Last of Us"];

function App() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 59,
    seconds: 59
  });
  
  const [notification, setNotification] = useState<string | null>(null);

  // Efeitos para scripts, temporizador e notificações...
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); }
  }, []);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedSite');
    if (!hasVisited) {
      const currentVisits = parseInt(localStorage.getItem('siteVisits') || '0', 10);
      localStorage.setItem('siteVisits', (currentVisits + 1).toString());
      sessionStorage.setItem('hasVisitedSite', 'true');
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    let notificationInterval: NodeJS.Timeout;
    const showRandomNotification = () => {
      const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      const randomContent = fakeContent[Math.floor(Math.random() * fakeContent.length)];
      const message = `<strong>${randomName}</strong> acabou de gerar seu teste grátis e está assistindo <strong>${randomContent}</strong>`;
      setNotification(message);
    };
    const initialTimeout = setTimeout(() => {
      showRandomNotification();
      notificationInterval = setInterval(showRandomNotification, 8000);
    }, 2000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(notificationInterval);
    };
  }, []);

  const benefits = [
    { icon: <Tv className="w-8 h-8 text-brand-accent" />, title: "Filmes e Séries Ilimitados", description: "Acesso completo a milhares de títulos em HD e 4K" },
    { icon: <Download className="w-8 h-8 text-brand-accent" />, title: "Download Offline", description: "Baixe seus conteúdos favoritos e assista sem internet" },
    { icon: <Zap className="w-8 h-8 text-brand-accent" />, title: "Streaming Ultra Rápido", description: "Tecnologia de ponta para streaming sem travamentos" },
    { icon: <Smartphone className="w-8 h-8 text-brand-accent" />, title: "Assista em Qualquer Lugar", description: "Compatível com TV, celular, tablet e computador" },
    { icon: <MessageCircle className="w-8 h-8 text-brand-accent" />, title: "O Melhor Suporte do Brasil", description: "Atendimento 7 dias por semana para o que precisar" },
    { icon: <Globe className="w-8 h-8 text-brand-accent" />, title: "Conteúdo Nacional e Internacional", description: "O melhor do cinema e TV do Brasil e do mundo" }
  ];

  const testimonials = [
    { name: "Marina Silva", image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop", text: "Incrível! Consegui cancelar minha TV paga e economizar mais de R$ 200 por mês. O catálogo é gigante!", rating: 5 },
    { name: "Carlos Santos", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop", text: "Uso há 6 meses e não troco por nada. Qualidade excelente e funciona perfeitamente na minha Smart TV.", rating: 5 },
    { name: "Ana Rodrigues", image: "https://plus.unsplash.com/premium_photo-1664537980500-30bb5ec506e1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", text: "Meus filhos amam! Tem desenhos, filmes infantis e eu posso assistir minhas séries favoritas. Perfeito!", rating: 5 },
    { name: "Roberto Lima", image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop", text: "Teste grátis virou assinatura definitiva. Melhor investimento que fiz em entretenimento!", rating: 5 }
  ];

  const steps = [
    { number: "1", title: "Clique em 'Gerar meu Teste'", description: "Processo rápido e sem complicações" },
    { number: "2", title: "Acesse Instantaneamente", description: "Comece a assistir em segundos" },
    { number: "3", title: "Aproveite seu Teste VIP", description: "4 horas completas de entretenimento grátis" }
  ];
  
  const handleCTAClick = () => {
    const currentClicks = parseInt(localStorage.getItem('testClicks') || '0', 10);
    localStorage.setItem('testClicks', (currentClicks + 1).toString());
    window.open('https://wa.me/5511916126544?text=Olá! Quero gerar meu teste grátis do Meu Mundo Play!', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Play className="w-8 h-8 text-brand-accent" />
              <h1 className="text-2xl font-bold text-gray-900">Meu Mundo Play</h1>
            </div>
            <button onClick={handleCTAClick} className="hidden md:block bg-brand-accent text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Teste Grátis
            </button>
          </div>
        </div>
      </header>

      <section className="bg-brand-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Você Ganhou um teste grátis no<br />
            <span className="text-white">Meu Mundo Play</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Descubra um mundo de entretenimento sem limites. Experimente grátis agora mesmo!
          </p>
          <div className="max-w-4xl mx-auto mb-8">
            <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
              <iframe 
                src="https://player.vimeo.com/video/863788039?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}} 
                title="ACESSE AGORA NOSSO SITE">
              </iframe>
            </div>
          </div>
          <div className="mb-8">
            <p className="text-xl font-bold mb-4 text-yellow-300 animate-pulse">
              🎁 Você já ganhou seu teste VIP, clique para ativar!
            </p>
            <button onClick={handleCTAClick} className="bg-brand-accent text-white px-8 py-4 rounded-lg text-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg">
              Gerar meu Teste Agora
            </button>
          </div>
          <div className="flex justify-center items-center space-x-6 text-sm">
            <div className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-2" /><span>Teste 4 horas grátis</span></div>
            <div className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-2" /><span>Sem compromisso</span></div>
            <div className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-2" /><span>Cancele quando quiser</span></div>
          </div>
        </div>
      </section>

      <section className="bg-brand-accent text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8">
            <p className="font-semibold">🔥 Oferta válida por tempo limitado!</p>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Oferta expira em:</span>
              <div className="flex space-x-2">
                <div className="bg-white text-brand-accent px-3 py-1 rounded font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <span>:</span>
                <div className="bg-white text-brand-accent px-3 py-1 rounded font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <span>:</span>
                <div className="bg-white text-brand-accent px-3 py-1 rounded font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              </div>
            </div>
            <p className="text-sm">⚡ Últimas vagas disponíveis!</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Por que escolher o Meu Mundo Play?</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Junte-se a mais de 50 mil usuários satisfeitos que já descobriram o melhor streaming do Brasil</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">{benefit.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pare de Pagar Caro por Múltiplas Assinaturas
            </h3>
            <p className="text-xl text-gray-600">
              Veja quanto custaria assinar os principais serviços de streaming individualmente no Brasil.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">Assinaturas Individuais</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex justify-between"><span>Netflix (com anúncios)</span> <span>R$ 20,90</span></li>
                <li className="flex justify-between"><span>Prime Video</span> <span>R$ 19,90</span></li>
                <li className="flex justify-between"><span>Disney+ (com anúncios)</span> <span>R$ 27,99</span></li>
                <li className="flex justify-between"><span>Max (com anúncios)</span> <span>R$ 29,90</span></li>
                <li className="flex justify-between"><span>Apple TV+</span> <span>R$ 21,90</span></li>
                <li className="flex justify-between"><span>Paramount+</span> <span>R$ 18,90</span></li>
                <li className="flex justify-between"><span>Starzplay</span> <span>R$ 14,90</span></li>
              </ul>
              <div className="border-t my-6"></div>
              <div className="text-center">
                <p className="text-gray-600">Total por Mês:</p>
                <p className="text-4xl font-bold text-brand-accent line-through">R$ 154,39</p>
                <p className="mt-4 text-sm text-gray-500">... e a confusão de gerir 7 senhas e 7 faturas diferentes!</p>
              </div>
            </div>
            <div className="bg-brand-primary text-white p-8 rounded-lg shadow-2xl text-center">
              <h4 className="text-3xl font-bold mb-4">Meu Mundo Play</h4>
              <p className="text-lg text-gray-200 mb-6">Todo o conteúdo. Um único lugar. Uma única assinatura.</p>
              <p className="text-gray-100">Nosso Preço Mensal:</p>
              <p className="text-6xl font-bold text-white my-4">R$ 30</p>
            </div>
          </div>
          <div className="mt-16 bg-green-100 border-l-4 border-green-500 text-green-800 p-6 rounded-lg text-center max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold">Sua Economia Anual é de Quase R$ 1.500!</h4>
            <p className="text-lg mt-2">Ao escolher o Meu Mundo Play, você deixa de gastar mais de <span className="font-bold">R$ 124 por mês</span>. Isso representa uma economia de <span className="font-bold">mais de R$ 1.490 por ano!</span></p>
          </div>
          <div className="text-center mt-12">
             <button 
              onClick={handleCTAClick}
              className="bg-brand-accent text-white px-8 py-4 rounded-lg text-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
              Quero Economizar Agora!
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">O que nossos usuários dizem</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Depoimentos reais de quem já está aproveitando o melhor streaming do Brasil</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">{[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-current" />))}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Como Funciona?</h3>
            <p className="text-xl text-gray-600">Em apenas 3 passos simples você já estará assistindo</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-brand-accent text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{step.number}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Não perca esta oportunidade única!</h3>
          <p className="text-xl mb-8 text-gray-200">Vagas limitadas restantes hoje. Garante já o seu teste VIP gratuito!</p>
          <button onClick={handleCTAClick} className="bg-brand-accent text-white px-8 py-4 rounded-lg text-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg">
            Quero Meu Teste Grátis Agora!
          </button>
          <div className="flex justify-center items-center space-x-6 text-sm mt-8">
            <div className="flex items-center"><Shield className="w-5 h-5 text-gray-300 mr-2" /><span>100% Seguro</span></div>
            <div className="flex items-center"><Clock className="w-5 h-5 text-gray-300 mr-2" /><span>Acesso Imediato</span></div>
            <div className="flex items-center"><Lock className="w-5 h-5 text-gray-300 mr-2" /><span>Sem Compromisso</span></div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4"><Play className="w-6 h-6 text-brand-accent" /><h4 className="text-xl font-bold">Meu Mundo Play</h4></div>
              <p className="text-gray-400 mb-4">O melhor streaming do Brasil com milhares de filmes e séries.</p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Contato</h5>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center"><Phone className="w-4 h-4 mr-2" /><span>(11) 91612-6544</span></div>
                <div className="flex items-center"><Mail className="w-4 h-4 mr-2" /><span>assista.mundoplay@gmail.com</span></div>
                <div className="flex items-center"><MessageCircle className="w-4 h-4 mr-2" /><span>WhatsApp: (11) 91612-6544</span></div>
              </div>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Segurança</h5>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400"><Shield className="w-4 h-4 mr-2" /><span>SSL Certificado</span></div>
                <div className="flex items-center text-gray-400"><Award className="w-4 h-4 mr-2" /><span>Pagamentos Seguros</span></div>
                <div className="flex items-center text-gray-400"><Lock className="w-4 h-4 mr-2" /><span>Dados Protegidos</span></div>
              </div>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Suporte</h5>
              <p className="text-gray-400 mb-4">Atendimento 24/7 via WhatsApp</p>
              <button onClick={handleCTAClick} className="bg-brand-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />Falar no WhatsApp
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Meu Mundo Play. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-primary p-4 z-50 shadow-lg">
        <button onClick={handleCTAClick} className="w-full bg-brand-accent text-white py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-colors">
          Teste Grátis Agora! 🎁
        </button>
      </div>

      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;