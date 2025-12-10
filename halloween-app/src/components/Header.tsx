import { Link, useLocation } from "wouter";
import { Ghost, Map as MapIcon, User, Menu, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { useState } from "react";
/*import { useAuth } from "../hooks/useAuth";*/

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  /*const { isAuthenticated } = useAuth();*/

  const NavLink = ({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon?: any }) => {
    const isActive = location === href;
    return (
      <Link 
        href={href}
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
        <Link href="/" className="flex items-center gap-2">
          <Ghost className="h-8 w-8 text-primary animate-bounce-slow" />
          <span className="font-display text-3xl text-primary tracking-wider">CarteFrayeur</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/map" icon={MapIcon}>Trouver des Bonbons</NavLink>
          {/* TODO : Implement secure login */}
          {/* isAuthenticated && <NavLink href="/dashboard" icon={User}>Mon Repaire</NavLink>}
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground font-bold"
              onClick={() => window.location.href = '/api/logout'}
            >
              <LogOut className="mr-2 w-4 h-4" />
              Déconnexion
            </Button>
          ) : */(
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
              onClick={() => window.location.href = '/api/login'}
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
            <SheetContent side="right" className="bg-card border-l border-white/10 w-[300px]">
              <div className="flex flex-col gap-6 mt-10">
                <NavLink href="/" icon={Ghost}>Accueil</NavLink>
                <NavLink href="/map" icon={MapIcon}>Trouver des Bonbons</NavLink>
                {/* {isAuthenticated && <NavLink href="/dashboard" icon={User}>Mon Repaire</NavLink>}
                {isAuthenticated ? (
                  <Button 
                    className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold mt-4"
                    onClick={() => window.location.href = '/api/logout'}
                  >
                    <LogOut className="mr-2 w-4 h-4" />
                    Déconnexion
                  </Button>
                ) : */ (
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold mt-4"
                    onClick={() => window.location.href = '/api/login'}
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
