import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVuelos } from "@/hooks/useVuelos";
import { ArrowLeft, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditarVuelo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { vuelos, updateVuelo, isLoading } = useVuelos();
  const [formData, setFormData] = useState({
    aerolinea: "",
    origen: "",
    destino: "",
    fechaSalida: "",
    fechaLlegada: "",
    horarioSalida: "",
    horarioLlegada: "",
    precio: "",
    capacidadTotal: ""
  });

  useEffect(() => {
    if (vuelos.length > 0 && id) {
      const vuelo = vuelos.find(v => v.id === id);
      if (vuelo) {
        const [fechaSalida, horaSalidaFull] = vuelo.fechaSalida.split('T');
        const [fechaLlegada, horaLlegadaFull] = vuelo.fechaLlegada.split('T');
        
        setFormData({
          aerolinea: vuelo.aerolinea || "",
          origen: vuelo.origen,
          destino: vuelo.destino,
          fechaSalida: fechaSalida,
          fechaLlegada: fechaLlegada,
          horarioSalida: horaSalidaFull.substring(0, 5),
          horarioLlegada: horaLlegadaFull.substring(0, 5),
          precio: vuelo.precio.toString(),
          capacidadTotal: vuelo.capacidadTotal?.toString() || ""
        });
      } else {
        toast.error("Vuelo no encontrado");
        navigate("/vuelos");
      }
    }
  }, [vuelos, id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    const fechaSalidaISO = `${formData.fechaSalida}T${formData.horarioSalida}:00`;
    const fechaLlegadaISO = `${formData.fechaLlegada}T${formData.horarioLlegada}:00`;

    const vueloDTO = {
      aerolinea: formData.aerolinea,
      origen: formData.origen,
      destino: formData.destino,
      fechaSalida: fechaSalidaISO,
      fechaLlegada: fechaLlegadaISO,
      precio: Number.parseFloat(formData.precio),
      capacidadTotal: Number.parseInt(formData.capacidadTotal)
    };

    const success = await updateVuelo(id, vueloDTO);
    if (success) {
      navigate("/vuelos");
    }
  };

  const handleCancel = () => {
    navigate("/vuelos");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/vuelos")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Plane className="w-5 h-5 text-primary-foreground rotate-45" />
          </div>
          <h1 className="text-xl font-bold">Editar Vuelo</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Información del Vuelo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aerolinea">Aerolínea</Label>
                  <Input
                    id="aerolinea"
                    placeholder="Avianca"
                    value={formData.aerolinea}
                    onChange={(e) => setFormData({...formData, aerolinea: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="origen">Aeropuerto de Origen</Label>
                  <Input
                    id="origen"
                    placeholder="BOG"
                    value={formData.origen}
                    onChange={(e) => setFormData({...formData, origen: e.target.value.toUpperCase()})}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destino">Aeropuerto de Destino</Label>
                  <Input
                    id="destino"
                    placeholder="MDE"
                    value={formData.destino}
                    onChange={(e) => setFormData({...formData, destino: e.target.value.toUpperCase()})}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaSalida">Fecha de Salida</Label>
                  <Input
                    id="fechaSalida"
                    type="date"
                    value={formData.fechaSalida}
                    onChange={(e) => setFormData({...formData, fechaSalida: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaLlegada">Fecha de Llegada</Label>
                  <Input
                    id="fechaLlegada"
                    type="date"
                    value={formData.fechaLlegada}
                    onChange={(e) => setFormData({...formData, fechaLlegada: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horarioSalida">Horario de Salida</Label>
                  <Input
                    id="horarioSalida"
                    type="time"
                    value={formData.horarioSalida}
                    onChange={(e) => setFormData({...formData, horarioSalida: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horarioLlegada">Horario de Llegada</Label>
                  <Input
                    id="horarioLlegada"
                    type="time"
                    value={formData.horarioLlegada}
                    onChange={(e) => setFormData({...formData, horarioLlegada: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="precio">Precio (COP)</Label>
                  <Input
                    id="precio"
                    type="number"
                    placeholder="150000"
                    value={formData.precio}
                    onChange={(e) => setFormData({...formData, precio: e.target.value})}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacidadTotal">Capacidad de Asientos</Label>
                  <Input
                    id="capacidadTotal"
                    type="number"
                    placeholder="180"
                    value={formData.capacidadTotal}
                    onChange={(e) => setFormData({...formData, capacidadTotal: e.target.value})}
                    required
                    disabled={isLoading}
                  />
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

export default EditarVuelo;
