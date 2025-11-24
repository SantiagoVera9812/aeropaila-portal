import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Plane, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const CrearAeropuerto = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codigoIATA: "",
    nombreAeropuerto: "",
    ciudad: "",
    pais: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Aeropuerto creado exitosamente");
    navigate("/aeropuertos");
  };

  const handleCancel = () => {
    navigate("/aeropuertos");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/aeropuertos")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Plane className="w-5 h-5 text-primary-foreground rotate-45" />
          </div>
          <h1 className="text-xl font-bold">Crear Nuevo Aeropuerto</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Información del Aeropuerto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="codigoIATA">Código IATA</Label>
                  <Input
                    id="codigoIATA"
                    placeholder="BOG"
                    maxLength={3}
                    value={formData.codigoIATA}
                    onChange={(e) => setFormData({...formData, codigoIATA: e.target.value.toUpperCase()})}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Código de 3 letras</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nombreAeropuerto">Nombre del Aeropuerto</Label>
                  <Input
                    id="nombreAeropuerto"
                    placeholder="El Dorado"
                    value={formData.nombreAeropuerto}
                    onChange={(e) => setFormData({...formData, nombreAeropuerto: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input
                    id="ciudad"
                    placeholder="Bogotá"
                    value={formData.ciudad}
                    onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pais">País</Label>
                  <Input
                    id="pais"
                    placeholder="Colombia"
                    value={formData.pais}
                    onChange={(e) => setFormData({...formData, pais: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Crear Aeropuerto
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CrearAeropuerto;
