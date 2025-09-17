import { Link } from "react-router-dom";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
// AuthButton removido
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { Play, LogOut, User } from "lucide-react";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Imagem de fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: 'url(/water-background.jpg)'
        }}
      ></div>
      
      {/* Overlay gradiente para melhor legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 via-cyan-300/10 to-blue-400/20"></div>
      <SEO
        title="RespiraZen — Respiração Guiada e Meditações Curtas"
        description="Respiração guiada com animações e meditações de 1 a 5 minutos. Acalme-se em instantes com sons ambientes e lembretes."
        canonical="https://dee8e0b5-6fae-437f-832b-1a7bfb719b7b.lovableproject.com/"
      />

      {/* Efeito de ondas de água */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-4 border-white/20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-2 border-white/15 animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/10 animate-pulse delay-1000"></div>
      </div>

  <section className="container mx-auto px-6 pt-[2px] pb-4 md:pt-[4px] md:pb-6 flex flex-col justify-center min-h-screen relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-left max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3 mt-0">
              Respiração Guiada e<br />Meditação, em 1<br />minuto
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
              Reduza ansiedade, foque melhor e durma com mais facilidade. Sessões simples, vibração opcional e sons ambientes relaxantes.
            </p>
            
            <div className="flex flex-col items-center gap-4 mb-12">
              {user ? (
                // Usuário logado - mostrar botão principal e opções de usuário
                <div className="flex flex-col items-center gap-4">
                  <Link to="/respirar">
                    <Button 
                      variant="default" 
                      size="lg" 
                      className="px-10 py-4 text-xl font-bold transition-all duration-300 shadow-lg hover:scale-105 bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-white rounded-2xl border-4 border-green-400/30"
                    >
                      <Play className="w-6 h-6 mr-2" />
                      Começar Sessão
                    </Button>
                  </Link>
                  
                  {/* Informações do usuário logado + Logout */}
                  <div className="flex items-center gap-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || user.email || 'Avatar'}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center border border-primary/30">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <div className="flex flex-col min-w-[140px]">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[160px]">
                        {user.displayName || user.email?.split('@')[0] || 'Usuário'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
                        {user.email}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                      className="flex items-center gap-1 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sair</span>
                    </Button>
                  </div>
                </div>
              ) : (
                // Usuário não logado - mostrar botões de ação
                <div className="flex flex-col items-center gap-4">
                  <Link to="/respirar">
                    <Button 
                      variant="default" 
                      size="lg" 
                      className="px-10 py-4 text-xl font-bold transition-all duration-300 shadow-lg hover:scale-105 bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-white rounded-2xl border-4 border-green-400/30"
                    >
                      Experimentar Grátis
                    </Button>
                  </Link>
                  
                  {/* (Login removido — se quiser reativar um modal, basta pedir) */}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium">Sessões de 1-10 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium">Lembretes inteligentes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium">Progresso personalizado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Autenticação */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </main>
  );
};

export default Index;
