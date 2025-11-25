import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aeropuertos from "./pages/Aeropuertos";
import CrearAeropuerto from "./pages/CrearAeropuerto";
import CrearVuelo from "./pages/CrearVuelo";
import Dashboard from "./pages/Dashboard";
import EditarAeropuerto from "./pages/EditarAeropuerto";
import EditarVuelo from "./pages/EditarVuelo";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RecuperarContrasena from "./pages/RecuperarContrasena";
import Reportes from "./pages/Reportes";
import Vuelos from "./pages/Vuelos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vuelos" element={<Vuelos />} />
          <Route path="/vuelos/crear" element={<CrearVuelo />} />
          <Route path="/vuelos/editar/:id" element={<EditarVuelo />} />
          <Route path="/aeropuertos" element={<Aeropuertos />} />
          <Route path="/aeropuertos/crear" element={<CrearAeropuerto />} />
          <Route path="/aeropuertos/editar/:id" element={<EditarAeropuerto />} />
          <Route path="/reportes" element={<Reportes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
