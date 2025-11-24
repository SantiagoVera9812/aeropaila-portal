import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plane } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="text-center space-y-8 px-4">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Plane className="w-12 h-12 text-primary-foreground rotate-45" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            Aeropaila
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sistema integral de gestión aeroportuaria para administradores
          </p>
        </div>

        <div className="pt-8">
          <Button 
            size="lg" 
            onClick={() => navigate("/login")}
            className="px-8 py-6 text-lg"
          >
            Portal de Empleados
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
