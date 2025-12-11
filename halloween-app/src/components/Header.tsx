import { Link, useLocation, useNavigate } from "react-router-dom";
import { Ghost, Map as MapIcon, User, Menu, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabaseClient";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation().pathname;
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md h-16" />
    );
  }

  const NavLink = ({
    to,
    children,
    icon: Icon,
  }: {
    to: string;
    children: React.ReactNode;
    icon?: any;
  }) => {
    const isActive = location === to;

    return (
      <Link
        to={to}
        className={`flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary ${
          isActive ? "text-primary" : "text-foreground/80"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Ghost className="h-8 w-8 text-primary animate-bounce-slow" />
          <span className="font-display text-3xl text-primary tracking-wider">
            CarteFrayeur
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/map" icon={MapIcon}>
            Trouver des Bonbons
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/dashboard" icon={User}>
              Mon Repaire
            </NavLink>
          )}

          {isAuthenticated ? (
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
              onClick={async () => {
                await supabase.auth.signOut();
                setTimeout(() => navigate("/"), 150);
              }}
            >
              <LogOut className="mr-2 w-4 h-4" />
              Déconnexion
            </Button>
          ) : (
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
              onClick={() => navigate("/auth")}
            >
              Connexion / Rejoindre
            </Button>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-card border-l border-white/10 w-[300px]"
            >
              <div className="flex flex-col gap-6 mt-10">
                <NavLink to="/" icon={Ghost}>
                  Accueil
                </NavLink>

                <NavLink to="/map" icon={MapIcon}>
                  Trouver des Bonbons
                </NavLink>

                {isAuthenticated && (
                <NavLink to="/dashboard" icon={User}>
                  Mon Repaire
                </NavLink>
                )}
                {isAuthenticated ? (
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold mt-4"
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setTimeout(() => navigate("/"), 150);
                  }}
                >
                  <LogOut className="mr-2 w-4 h-4" />
                  Déconnexion
                </Button>
                ) : (
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold mt-4"
                  onClick={() => navigate("/auth")}
                >
                  Connexion / Rejoindre
                </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
