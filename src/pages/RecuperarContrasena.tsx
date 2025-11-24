import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Plane, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const RecuperarContrasena = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Por favor ingrese su correo corporativo");
      return;
    }

    toast.success("Se han enviado las instrucciones a su correo");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Plane className="w-8 h-8 text-primary-foreground rotate-45" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Recuperar Contraseña</CardTitle>
          <CardDescription className="text-center">
            Ingrese su correo corporativo para recibir instrucciones de recuperación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleRecovery} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Corporativo</Label>
              <Input
                id="email"
                type="email"
                placeholder="empleado@aeropaila.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar Instrucciones
            </Button>
          </form>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio de sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecuperarContrasena;
