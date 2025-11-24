import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RecuperarContrasena from "./pages/RecuperarContrasena";
import Dashboard from "./pages/Dashboard";
import Vuelos from "./pages/Vuelos";
import CrearVuelo from "./pages/CrearVuelo";
import Aeropuertos from "./pages/Aeropuertos";
import CrearAeropuerto from "./pages/CrearAeropuerto";
import Reportes from "./pages/Reportes";
import NotFound from "./pages/NotFound";

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
          <Route path="/aeropuertos" element={<Aeropuertos />} />
          <Route path="/aeropuertos/crear" element={<CrearAeropuerto />} />
          <Route path="/reportes" element={<Reportes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
