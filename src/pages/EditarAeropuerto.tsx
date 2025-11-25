import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAeropuertos } from "@/hooks/useAeropuertos";
import { countries } from "@/lib/constants";
import { ArrowLeft, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditarAeropuerto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { aeropuertos, updateAeropuerto, isLoading } = useAeropuertos();
  const [formData, setFormData] = useState({
    codigoIATA: "",
    codigoICAO: "",
    nombre: "",
    ciudad: "",
    pais: ""
  });

  useEffect(() => {
    if (aeropuertos.length > 0 && id) {
      const aeropuerto = aeropuertos.find(a => a.codigoIATA === id);
      if (aeropuerto) {
        setFormData({
          codigoIATA: aeropuerto.codigoIATA,
          codigoICAO: aeropuerto.codigoICAO || "",
          nombre: aeropuerto.nombre,
          ciudad: aeropuerto.ciudad,
          pais: aeropuerto.pais
        });
      } else {
        toast.error("Aeropuerto no encontrado");
        navigate("/aeropuertos");
      }
    }
  }, [aeropuertos, id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    const success = await updateAeropuerto(id, formData);
    if (success) {
      navigate("/aeropuertos");
    }
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
          <h1 className="text-xl font-bold">Editar Aeropuerto</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Información del Aeropuerto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
             
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Aeropuerto</Label>
                <Input
                  id="nombre"
                  placeholder="El Dorado"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input
                    id="ciudad"
                    placeholder="Bogotá"
                    value={formData.ciudad}
                    onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pais">País</Label>
                  <Select 
                    value={formData.pais} 
                    onValueChange={(value) => setFormData({...formData, pais: value})}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar país" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Guardar Cambios"}
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={handleCancel} disabled={isLoading}>
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

export default EditarAeropuerto;
