import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVuelos } from "@/hooks/useVuelos";
import {
  ArrowLeft, Calendar, DollarSign,
  Edit,
  Filter,
  Plane,
  Plus,
  Search,
  Trash2,
  Users
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Vuelos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { vuelos, isLoading, deleteVuelo } = useVuelos();

  const filteredVuelos = vuelos.filter(v => 
    (v.numeroVuelo && v.numeroVuelo.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (v.aerolinea && v.aerolinea.toLowerCase().includes(searchTerm.toLowerCase())) ||
    v.origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.destino.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center py-8">
            Cargando vuelos...
          </TableCell>
        </TableRow>
      );
    }

    if (filteredVuelos.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center py-8">
            No se encontraron vuelos
          </TableCell>
        </TableRow>
      );
    }

    return filteredVuelos.map((vuelo) => (
      <TableRow key={vuelo.id}>
        <TableCell className="font-medium">{vuelo.numeroVuelo || vuelo.aerolinea || 'N/A'}</TableCell>
        <TableCell>
          <div>
            <div className="font-medium flex items-center gap-2">
              {vuelo.origen}
              <span className="text-muted-foreground">→</span>
              {vuelo.destino}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span className="font-medium">{new Date(vuelo.fechaSalida).toLocaleString()}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-muted-foreground" />
            {vuelo.precio}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-muted-foreground" />
            {vuelo.asientosDisponibles} {vuelo.capacidadTotal ? `/ ${vuelo.capacidadTotal}` : ''}
          </div>
        </TableCell>
        <TableCell>
          <Badge 
            variant={(vuelo.asientosDisponibles || 0) > 0 ? "default" : "destructive"}
            className={(vuelo.asientosDisponibles || 0) > 0 ? "bg-success" : ""}
          >
            {(vuelo.asientosDisponibles || 0) > 0 ? "Disponible" : "Lleno"}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge variant="outline" className="font-normal">
            {vuelo.estado || 'N/A'}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(`/vuelos/editar/${vuelo.id}`)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => vuelo.id && deleteVuelo(vuelo.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    ));
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
            <h1 className="text-xl font-bold">Gestión de Vuelos</h1>
          </div>
          <Button onClick={() => navigate("/vuelos/crear")}>
            <Plus className="w-4 h-4 mr-2" />
            Crear Vuelo
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar vuelos por código o ruta..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoy">Hoy</SelectItem>
                  <SelectItem value="semana">Esta Semana</SelectItem>
                  <SelectItem value="mes">Este Mes</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Precio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bajo">Bajo a Alto</SelectItem>
                  <SelectItem value="alto">Alto a Bajo</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Disponibilidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disponible">Disponible</SelectItem>
                  <SelectItem value="lleno">Lleno</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Flights Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vuelo</TableHead>
                <TableHead>Ruta</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Capacidad</TableHead>
                <TableHead>Disponibilidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {renderTableBody()}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default Vuelos;
