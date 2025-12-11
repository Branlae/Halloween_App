import { Ghost } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-black/10 bg-black/90 py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Ghost className="h-4 w-4" />
          <span className="text-sm">© 2024 CarteFrayeur. Restez effrayants.</span>
        </div>
        
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Politique de Confidentialité</a>
          <a href="#" className="hover:text-primary transition-colors">Conditions</a>
          <a href="#" className="hover:text-primary transition-colors">Nous contater</a>
        </div>
      </div>
    </footer>
  );
}