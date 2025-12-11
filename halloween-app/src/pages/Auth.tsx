import { useState } from "react";
import { motion } from "framer-motion";
import { Ghost, UserPlus, LogIn, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import halloweenHero from "../Halloween_Homepage.png";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        // LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (error) throw error;

        // check if signup profile data is stored
        const pending = localStorage.getItem("pendingProfile");

        if (pending) {
          const profile = JSON.parse(pending);
          const { data: authData } = await supabase.auth.getUser();

          if (!authData.user) {
            throw new Error("User not found after login");
          }

          await supabase
            .from("profiles")
            .update(profile)
            .eq("id", authData.user.id);

          localStorage.removeItem("pendingProfile");
        }

        navigate("/");
      } else {
        // SIGNUP
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });

        if (error) throw error;

        // temporarily store profile data
        localStorage.setItem("pendingProfile", JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          address: form.address,
        }));

        alert("Compte créé ! Vérifiez votre email ✉️");
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

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
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              variant="outline"
              className={`border-primary font-bold transition-colors
                ${mode === "login"
                  ? "text-primary bg-primary text-primary-foreground"
                  : "text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              onClick={() => setMode("login")}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Connexion
            </Button>

            <Button
              variant="outline"
              className={`border-primary font-bold transition-colors
                ${mode === "signup"
                  ? "text-primary bg-primary text-primary-foreground"
                  : "text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              onClick={() => setMode("signup")}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Inscription
            </Button>
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <>
                <div>
                  <Label htmlFor="firstName" className="text-primary font-bold">Prénom</Label>
                  <Input id="firstName" type="text" onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-primary font-bold">Nom</Label>
                  <Input id="lastName" type="text" onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="address" className="text-primary font-bold">Adresse</Label>
                  <Input id="address" type="text" onChange={handleChange} required />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email" className="text-primary font-bold">Email</Label>
              <Input id="email" type="email" onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="password" className="text-primary font-bold">Mot de passe</Label>
              <Input id="password" type="password" onChange={handleChange} required />
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 rounded-full shadow-[0_0_20px_rgba(255,107,0,0.4)] mt-4"
            >
              {loading ? "Chargement..." :
                mode === "login" ? (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Se Connecter
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Créer un Compte
                  </>
                )
              }
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
