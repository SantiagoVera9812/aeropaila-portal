import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAeropuertos } from "@/hooks/useAeropuertos";
import { useAuth } from "@/hooks/useAuth";
import { useReservas } from "@/hooks/useReservas";
import { useVuelos } from "@/hooks/useVuelos";
import { Calendar, FileText, LogOut, MapPin, Plane, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { vuelos } = useVuelos();
  const { aeropuertos } = useAeropuertos();
  const { reservas } = useReservas();
  const [activeTab, setActiveTab] = useState("resumen");

  // Calculate stats
  const today = new Date().toISOString().split('T')[0];
  
  const vuelosActivos = vuelos.filter(v => v.fechaSalida.startsWith(today)).length;
  const totalAeropuertos = aeropuertos.length;
  const reservasHoy = reservas.filter(r => r.fechaCreacion.startsWith(today)).length;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary-foreground rotate-45" />
            </div>
            <h1 className="text-xl font-bold">Aeropaila - Dashboard</h1>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="resumen">Resumen</TabsTrigger>
              <TabsTrigger value="vuelos" onClick={() => navigate("/vuelos")}>
                Vuelos
              </TabsTrigger>
              <TabsTrigger value="aeropuertos" onClick={() => navigate("/aeropuertos")}>
                Aeropuertos
              </TabsTrigger>
              <TabsTrigger value="reportes" onClick={() => navigate("/reportes")}>
                Reportes
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vuelos Activos</CardTitle>
              <Plane className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vuelosActivos}</div>
              <p className="text-xs text-muted-foreground">Operando hoy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aeropuertos</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAeropuertos}</div>
              <p className="text-xs text-muted-foreground">En la red</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservas Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservasHoy}</div>
              <p className="text-xs text-muted-foreground">Confirmadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-auto flex-col gap-2 py-6" 
              onClick={() => navigate("/vuelos/crear")}
            >
              <PlusCircle className="w-6 h-6" />
              <span>Crear Vuelo</span>
            </Button>
            <Button 
              variant="secondary"
              className="h-auto flex-col gap-2 py-6"
              onClick={() => navigate("/aeropuertos")}
            >
              <MapPin className="w-6 h-6" />
              <span>Gestionar Aeropuertos</span>
            </Button>
            <Button 
              variant="outline"
              className="h-auto flex-col gap-2 py-6"
              onClick={() => navigate("/reportes")}
            >
              <FileText className="w-6 h-6" />
              <span>Ver Reportes</span>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
