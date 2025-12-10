import { useState } from "react";
import { motion } from "framer-motion";
import { Ghost, UserPlus, LogIn, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import halloweenHero from "../Halloween_Homepage.png";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background z-10" />
        <img
          src={halloweenHero}
          alt="Halloween Town"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-24 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg bg-card/60 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-10"
        >
          
          {/* Title */}
          <div className="text-center mb-8">
            <Ghost className="w-12 h-12 text-primary mx-auto mb-3 animate-bounce-slow" />
            <h1 className="text-4xl font-display text-primary drop-shadow-lg">
              {mode === "login" ? "Connexion" : "Créer un Compte"}
            </h1>

            <p className="text-muted-foreground mt-2">
              {mode === "login"
                ? "Ravi de vous revoir !"
                : "Rejoignez l’aventure des chasseurs de bonbons !"}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button 
              variant={mode === "login" ? "default" : "outline"} 
              onClick={() => setMode("login")}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Connexion
            </Button>

            <Button 
              variant={mode === "signup" ? "default" : "outline"} 
              onClick={() => setMode("signup")}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Inscription
            </Button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-6">
            
            {mode === "signup" && (
              <>
                {/* First name */}
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" type="text" placeholder="Votre prénom" required />
                </div>

                {/* Last name */}
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" type="text" placeholder="Votre nom" required />
                </div>

                {/* Address */}
                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" type="text" placeholder="Ex: 123 Rue des Citrouilles" required />
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" required />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" placeholder="Votre mot de passe" required />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 rounded-full shadow-[0_0_20px_rgba(255,107,0,0.4)] mt-4"
            >
              {mode === "login" ? (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Se Connecter
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Créer un Compte
                </>
              )}
            </Button>
          </form>

          {/* Back Home */}
          <div className="text-center mt-6">
            <Button
              variant="ghost"
              onClick={() => (window.location.href = "/")}
              className="text-muted-foreground hover:text-primary"
            >
              <Home className="w-5 h-5 mr-2" />
              Retour à l'accueil
            </Button>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
