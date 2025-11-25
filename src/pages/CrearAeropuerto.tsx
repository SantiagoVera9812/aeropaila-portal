import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAeropuertos } from "@/hooks/useAeropuertos";
import { countries, popularAirports } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, ChevronsUpDown, Plane } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearAeropuerto = () => {
  const navigate = useNavigate();
  const { createAeropuerto, isLoading } = useAeropuertos();
  const [openCombobox, setOpenCombobox] = useState(false);
  const [formData, setFormData] = useState({
    codigoIATA: "",
    codigoICAO: "",
    nombre: "",
    ciudad: "",
    pais: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createAeropuerto(formData);
    if (success) {
      navigate("/aeropuertos");
    }
  };

  const handleSelectAirport = (airportCode: string) => {
    const airport = popularAirports.find(a => a.codigoIATA === airportCode);
    if (airport) {
      setFormData({
        codigoIATA: airport.codigoIATA,
        codigoICAO: airport.codigoICAO,
        nombre: airport.nombre,
        ciudad: airport.ciudad,
        pais: airport.pais
      });
      setOpenCombobox(false);
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
          <h1 className="text-xl font-bold">Crear Nuevo Aeropuerto</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Información del Aeropuerto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
               <Label className="mb-2 block">Buscar Aeropuerto Conocido (Opcional)</Label>
               <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCombobox}
                      className="w-full justify-between"
                    >
                      {formData.codigoIATA
                        ? popularAirports.find((a) => a.codigoIATA === formData.codigoIATA)?.nombre || "Seleccionar aeropuerto..."
                        : "Seleccionar aeropuerto..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar aeropuerto..." />
                      <CommandList>
                        <CommandEmpty>No se encontró aeropuerto.</CommandEmpty>
                        <CommandGroup>
                          {popularAirports.map((airport) => (
                            <CommandItem
                              key={airport.codigoIATA}
                              value={`${airport.nombre} ${airport.codigoIATA} ${airport.ciudad}`}
                              onSelect={() => handleSelectAirport(airport.codigoIATA)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.codigoIATA === airport.codigoIATA ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {airport.codigoIATA} - {airport.nombre}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codigoIATA">Código IATA</Label>
                  <Input
                    id="codigoIATA"
                    placeholder="BOG"
                    maxLength={3}
                    value={formData.codigoIATA}
                    onChange={(e) => setFormData({...formData, codigoIATA: e.target.value.toUpperCase()})}
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">Código de 3 letras</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="codigoICAO">Código ICAO</Label>
                  <Input
                    id="codigoICAO"
                    placeholder="SKBO"
                    maxLength={4}
                    value={formData.codigoICAO}
                    onChange={(e) => setFormData({...formData, codigoICAO: e.target.value.toUpperCase()})}
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">Código de 4 letras</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Aeropuerto</Label>
                <Input
                  id="nombre"
                  placeholder="Aeropuerto Internacional El Dorado"
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
                  {isLoading ? "Creando..." : "Crear Aeropuerto"}
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

export default CrearAeropuerto;
