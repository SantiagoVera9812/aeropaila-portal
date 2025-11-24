import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Plane, ArrowLeft, FileText, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Reportes = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("resumen");
  const [filters, setFilters] = useState({
    fechaDesde: "",
    fechaHasta: "",
    aeropuerto: "",
    estado: ""
  });

  // Mock data
  const stats = {
    vuelosTotales: 156,
    reservasTotales: 2340,
    asientosDisponibles: 1245
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary-foreground rotate-45" />
            </div>
            <h1 className="text-xl font-bold">Gestión de Reportes</h1>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar Reporte
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Filtros de Reporte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fechaDesde">Fecha Desde</Label>
                <Input
                  id="fechaDesde"
                  type="date"
                  value={filters.fechaDesde}
                  onChange={(e) => setFilters({...filters, fechaDesde: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaHasta">Fecha Hasta</Label>
                <Input
                  id="fechaHasta"
                  type="date"
                  value={filters.fechaHasta}
                  onChange={(e) => setFilters({...filters, fechaHasta: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aeropuerto">Aeropuerto</Label>
                <Select 
                  value={filters.aeropuerto}
                  onValueChange={(value) => setFilters({...filters, aeropuerto: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="bog">Bogotá (BOG)</SelectItem>
                    <SelectItem value="mde">Medellín (MDE)</SelectItem>
                    <SelectItem value="clo">Cali (CLO)</SelectItem>
                    <SelectItem value="ctg">Cartagena (CTG)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado del Vuelo</Label>
                <Select 
                  value={filters.estado}
                  onValueChange={(value) => setFilters({...filters, estado: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="disponible">Disponible</SelectItem>
                    <SelectItem value="lleno">Lleno</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Toggle */}
        <div className="mb-6">
          <Tabs value={activeView} onValueChange={setActiveView}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="resumen">Resumen General</TabsTrigger>
              <TabsTrigger value="vuelos">Vuelos y Rutas</TabsTrigger>
              <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vuelos Totales</CardTitle>
              <Plane className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.vuelosTotales}</div>
              <p className="text-xs text-muted-foreground">En el período seleccionado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservas Totales</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reservasTotales}</div>
              <p className="text-xs text-muted-foreground">Confirmadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Asientos Disponibles</CardTitle>
              <div className="h-4 w-4 rounded-full bg-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.asientosDisponibles}</div>
              <p className="text-xs text-muted-foreground">Para próximos vuelos</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Report */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              {activeView === "resumen" && "Resumen General"}
              {activeView === "vuelos" && "Reporte de Vuelos y Rutas"}
              {activeView === "estadisticas" && "Estadísticas Detalladas"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Seleccione los filtros arriba para generar el reporte</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Reportes;
