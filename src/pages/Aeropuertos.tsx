import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Plus, Edit, Trash2, ArrowLeft, Plane } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Aeropuertos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const aeropuertos = [
    {
      codigo: "BOG",
      nombre: "El Dorado",
      ciudad: "Bogotá",
      pais: "Colombia",
      estado: "activo"
    },
    {
      codigo: "MDE",
      nombre: "José María Córdova",
      ciudad: "Medellín",
      pais: "Colombia",
      estado: "activo"
    },
    {
      codigo: "CLO",
      nombre: "Alfonso Bonilla Aragón",
      ciudad: "Cali",
      pais: "Colombia",
      estado: "activo"
    },
    {
      codigo: "CTG",
      nombre: "Rafael Núñez",
      ciudad: "Cartagena",
      pais: "Colombia",
      estado: "mantenimiento"
    },
  ];

  const aeropuertosActivos = aeropuertos.filter(a => a.estado === "activo").length;
  const aeropuertosMantenimiento = aeropuertos.filter(a => a.estado === "mantenimiento").length;

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
            <h1 className="text-xl font-bold">Gestión de Aeropuertos</h1>
          </div>
          <Button onClick={() => navigate("/aeropuertos/crear")}>
            <Plus className="w-4 h-4 mr-2" />
            Agregar Aeropuerto
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Aeropuertos</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{aeropuertos.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
              <div className="h-3 w-3 rounded-full bg-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{aeropuertosActivos}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Mantenimiento</CardTitle>
              <div className="h-3 w-3 rounded-full bg-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{aeropuertosMantenimiento}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por código, nombre o ciudad..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Card>

        {/* Airports Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Aeropuerto</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aeropuertos.map((aeropuerto) => (
                <TableRow key={aeropuerto.codigo}>
                  <TableCell className="font-bold">{aeropuerto.codigo}</TableCell>
                  <TableCell className="font-medium">{aeropuerto.nombre}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      {aeropuerto.ciudad}, {aeropuerto.pais}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={aeropuerto.estado === "activo" ? "default" : "secondary"}
                      className={aeropuerto.estado === "activo" ? "bg-success" : "bg-warning"}
                    >
                      {aeropuerto.estado === "activo" ? "Activo" : "Mantenimiento"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default Aeropuertos;
