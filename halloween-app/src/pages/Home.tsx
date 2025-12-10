import { Button } from "../components/ui/button";
import { MapPin, Ghost, Candy, Star } from "lucide-react";
import { motion } from "framer-motion";
import halloweenHero from "../Halloween_Homepage.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-10" />
          <img 
            src={halloweenHero} 
            alt="Halloween Town" 
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        <div className="container relative z-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl text-primary drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mb-6">
              Des Bonbons ou un Sort ?
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-8 font-light drop-shadow-md">
              Trouvez les meilleurs endroits pour les bonbons dans votre quartier, ou afficher votre maison que les fantômes et gobelins sachent que vous participez cet halloween!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* TODO : Implement secure login */}
              <Button 
                onClick={() => window.location.href = '/auth'}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl h-14 px-8 rounded-full font-bold shadow-[0_0_20px_rgba(255,107,0,0.4)] animate-pulse-slow"
              >
                <Ghost className="mr-2 w-6 h-6" />
                Commencer
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-secondary-foreground mb-4 ">Comment ça Marche</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={MapPin}
              title="Localiser les maisons"
              description="Carte interactive montrant exactement quelles maisons distribuent des bonbons en temps réel."
              color="text-primary"
            />
              <FeatureCard 
                icon={Star}
                title="Noté par la communauté"
                description="Lisez les commentaires des autres chasseurs de bonbons pour trouver les meilleures décorations."
                color="text-accent"
              />
            <FeatureCard 
              icon={Candy}
              title="Afficher sa maison"
              description="Inscrivez votre maison pour que les chasseurs de bonbons sachent que vous distribuez des friandises."
              color="text-secondary"
            />
          </div>
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-card/50 backdrop-blur-sm border border-white/5 p-8 rounded-2xl text-center hover:border-primary/30 transition-colors"
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6 ${color}`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
