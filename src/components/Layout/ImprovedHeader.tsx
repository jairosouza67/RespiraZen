'use client';

import { motion } from 'framer-motion';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ImprovedThemeContext";
// AuthButton removido
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { Moon, Sun, Menu, X, User, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export function ImprovedHeader() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Início', path: '/' },
    { name: 'Respirar', path: '/respirar' },
    { name: 'Meditações', path: '/meditacoes' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Comunidade', path: '/comunidade' },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso!",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erro ao fazer logout",
        description: "Houve um erro ao desconectar. Tente novamente.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl">🧘‍♀️</div>
              <span className="text-xl font-bold text-primary">RespiraZen</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-9 h-9 p-0 hover:bg-accent/80 text-foreground hover:text-accent-foreground"
                data-tour="theme-toggle"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <span className="sr-only">Alternar tema</span>
              </Button>

              {/* Auth */}
              <div className="hidden md:block">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        aria-label="User menu / logout on mobile"
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full border border-primary/20 hover:border-primary/40"
                        // On small screens, make the avatar act as a visible logout action
                        // (mobile users can tap the avatar to sign out)
                        onClick={(e) => {
                          try {
                            // Only trigger logout for mobile widths (< md)
                            if (typeof window !== 'undefined' && window.innerWidth < 768) {
                              e.stopPropagation();
                              handleLogout();
                              setIsMobileMenuOpen(false);
                            }
                          } catch (err) {
                            // ignore
                          }
                        }}
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/20 hover:bg-primary/30 rounded-full border-2 border-primary/30">
                          {user.photoURL ? (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.photoURL}
                              alt={user.displayName || user.email || 'User'}
                            />
                          ) : (
                            <User className="h-4 w-4 text-primary-foreground" />
                          )}
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          {user.displayName && (
                            <p className="font-medium text-foreground">{user.displayName}</p>
                          )}
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="flex items-center text-foreground hover:text-primary">
                          <User className="mr-2 h-4 w-4" />
                          <span>Perfil</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="flex items-center text-foreground hover:text-primary">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Configurações</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-700 dark:text-red-400 dark:focus:text-red-300 cursor-pointer bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    onClick={() => setIsAuthModalOpen(true)}
                    variant="default"
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Entrar
                  </Button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden w-9 h-9 p-0 hover:bg-accent/80 text-foreground hover:text-accent-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
                <span className="sr-only">Alternar menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden border-t bg-background/95 backdrop-blur"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Auth */}
                <div className="px-3 py-2">
                  {user ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                          {user.photoURL ? (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.photoURL}
                              alt={user.displayName || user.email || 'User'}
                            />
                          ) : (
                            <User className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          {user.displayName && (
                            <span className="text-sm font-medium">{user.displayName}</span>
                          )}
                          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {user.email}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 text-sm text-foreground hover:text-primary px-2 py-1 hover:bg-muted rounded"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Perfil</span>
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 px-2 py-1 hover:bg-red-50 dark:hover:bg-red-950 rounded w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sair</span>
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
