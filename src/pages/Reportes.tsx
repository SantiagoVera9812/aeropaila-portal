import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReportes } from "@/hooks/useReportes";
import { ReporteDestinosPopularesDTO, ReporteOcupacionDTO } from "@/types/api";
import { ArrowLeft, Download, FileText, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Reportes = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("ocupacion");
  const [filters, setFilters] = useState({
    fechaDesde: "",
    fechaHasta: "",
  });
  
  const { isLoading, getReporteOcupacion, getReporteDestinosPopulares } = useReportes();
  
  const [ocupacionData, setOcupacionData] = useState<ReporteOcupacionDTO[]>([]);
  const [destinosData, setDestinosData] = useState<ReporteDestinosPopularesDTO[]>([]);

  const fetchData = async () => {
    if (activeView === "ocupacion") {
      const data = await getReporteOcupacion(filters.fechaDesde, filters.fechaHasta);
      setOcupacionData(data);
    } else if (activeView === "destinos") {
      const data = await getReporteDestinosPopulares();
      setDestinosData(data);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView]); // Fetch when view changes

  const handleSearch = () => {
    fetchData();
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-8">Cargando reporte...</div>;
    }

    if (activeView === "ocupacion") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vuelo</TableHead>
              <TableHead>Ruta</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Capacidad</TableHead>
              <TableHead>Ocupados</TableHead>
              <TableHead>% Ocupación</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ocupacionData.map((item) => (
              <TableRow key={item.vueloId}>
                <TableCell>{item.numeroVuelo}</TableCell>
                <TableCell>{item.origen} - {item.destino}</TableCell>
                <TableCell>{new Date(item.fechaSalida).toLocaleString()}</TableCell>
                <TableCell>{item.capacidadTotal}</TableCell>
                <TableCell>{item.asientosOcupados}</TableCell>
                <TableCell>{item.porcentajeOcupacion.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    if (activeView === "destinos") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Origen</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Cantidad Reservas</TableHead>
              <TableHead>Total Pasajeros</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {destinosData.map((item, index) => (
              <TableRow key={`${item.origen}-${item.destino}-${index}`}>
                <TableCell>{item.origen}</TableCell>
                <TableCell>{item.destino}</TableCell>
                <TableCell>{item.cantidadReservas}</TableCell>
                <TableCell>{item.totalPasajeros}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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

              <Button onClick={handleSearch}>Generar Reporte</Button>
            </div>
          </CardContent>
        </Card>

        {/* View Toggle */}
        <div className="mb-6">
          <Tabs value={activeView} onValueChange={setActiveView}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="ocupacion">Ocupación</TabsTrigger>
              <TabsTrigger value="destinos">Destinos Populares</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Detailed Report */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              {activeView === "ocupacion" && "Reporte de Ocupación"}
              {activeView === "destinos" && "Destinos Más Populares"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Reportes;
