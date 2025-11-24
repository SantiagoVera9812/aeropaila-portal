import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Plane, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CrearVuelo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codigoVuelo: "",
    tipoAeronave: "",
    aeropuertoOrigen: "",
    aeropuertoDestino: "",
    fechaSalida: "",
    fechaLlegada: "",
    horarioSalida: "",
    horarioLlegada: "",
    precio: "",
    capacidadAsientos: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Vuelo creado exitosamente");
    navigate("/vuelos");
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
          <h1 className="text-xl font-bold">Crear Nuevo Vuelo</h1>
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
                  <Label htmlFor="codigoVuelo">Código de Vuelo</Label>
                  <Input
                    id="codigoVuelo"
                    placeholder="AP001"
                    value={formData.codigoVuelo}
                    onChange={(e) => setFormData({...formData, codigoVuelo: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoAeronave">Tipo de Aeronave</Label>
                  <Select 
                    value={formData.tipoAeronave}
                    onValueChange={(value) => setFormData({...formData, tipoAeronave: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boeing737">Boeing 737</SelectItem>
                      <SelectItem value="airbus320">Airbus A320</SelectItem>
                      <SelectItem value="boeing787">Boeing 787</SelectItem>
                      <SelectItem value="airbus330">Airbus A330</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aeropuertoOrigen">Aeropuerto de Origen</Label>
                  <Select 
                    value={formData.aeropuertoOrigen}
                    onValueChange={(value) => setFormData({...formData, aeropuertoOrigen: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar origen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bog">Bogotá - El Dorado (BOG)</SelectItem>
                      <SelectItem value="mde">Medellín - José María Córdova (MDE)</SelectItem>
                      <SelectItem value="clo">Cali - Alfonso Bonilla Aragón (CLO)</SelectItem>
                      <SelectItem value="ctg">Cartagena - Rafael Núñez (CTG)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aeropuertoDestino">Aeropuerto de Destino</Label>
                  <Select 
                    value={formData.aeropuertoDestino}
                    onValueChange={(value) => setFormData({...formData, aeropuertoDestino: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar destino" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bog">Bogotá - El Dorado (BOG)</SelectItem>
                      <SelectItem value="mde">Medellín - José María Córdova (MDE)</SelectItem>
                      <SelectItem value="clo">Cali - Alfonso Bonilla Aragón (CLO)</SelectItem>
                      <SelectItem value="ctg">Cartagena - Rafael Núñez (CTG)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaSalida">Fecha de Salida</Label>
                  <Input
                    id="fechaSalida"
                    type="date"
                    value={formData.fechaSalida}
                    onChange={(e) => setFormData({...formData, fechaSalida: e.target.value})}
                    required
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacidadAsientos">Capacidad de Asientos</Label>
                  <Input
                    id="capacidadAsientos"
                    type="number"
                    placeholder="180"
                    value={formData.capacidadAsientos}
                    onChange={(e) => setFormData({...formData, capacidadAsientos: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Crear Vuelo
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

export default CrearVuelo;
