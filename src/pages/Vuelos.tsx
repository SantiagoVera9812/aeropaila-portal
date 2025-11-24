import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Plane, Search, Filter, Plus, Edit, Trash2, 
  ArrowLeft, Calendar, DollarSign, Users 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Vuelos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const vuelos = [
    {
      id: "AP001",
      origen: "BOG",
      destino: "MDE",
      aeropuertoOrigen: "El Dorado",
      aeropuertoDestino: "José María Córdova",
      horario: "08:30",
      fecha: "2024-01-15",
      precio: "$150.000",
      asientosDisponibles: 45,
      estado: "disponible"
    },
    {
      id: "AP002",
      origen: "CLO",
      destino: "BOG",
      aeropuertoOrigen: "Alfonso Bonilla Aragón",
      aeropuertoDestino: "El Dorado",
      horario: "14:00",
      fecha: "2024-01-15",
      precio: "$180.000",
      asientosDisponibles: 0,
      estado: "lleno"
    },
    {
      id: "AP003",
      origen: "MDE",
      destino: "CTG",
      aeropuertoOrigen: "José María Córdova",
      aeropuertoDestino: "Rafael Núñez",
      horario: "16:45",
      fecha: "2024-01-15",
      precio: "$200.000",
      asientosDisponibles: 23,
      estado: "disponible"
    },
  ];

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

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Origen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bog">Bogotá (BOG)</SelectItem>
                  <SelectItem value="mde">Medellín (MDE)</SelectItem>
                  <SelectItem value="clo">Cali (CLO)</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Destino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bog">Bogotá (BOG)</SelectItem>
                  <SelectItem value="mde">Medellín (MDE)</SelectItem>
                  <SelectItem value="ctg">Cartagena (CTG)</SelectItem>
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
                <TableHead>Asientos Disponibles</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vuelos.map((vuelo) => (
                <TableRow key={vuelo.id}>
                  <TableCell className="font-medium">{vuelo.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {vuelo.origen}
                        <span className="text-muted-foreground">→</span>
                        {vuelo.destino}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {vuelo.aeropuertoOrigen} → {vuelo.aeropuertoDestino}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="font-medium">{vuelo.horario}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{vuelo.fecha}</div>
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
                      {vuelo.asientosDisponibles}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={vuelo.estado === "disponible" ? "default" : "destructive"}
                      className={vuelo.estado === "disponible" ? "bg-success" : ""}
                    >
                      {vuelo.estado === "disponible" ? "Disponible" : "Lleno"}
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

export default Vuelos;
