import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/cliente/")({
  component: ClientDashboard,
});

function ClientDashboard() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUser(data.user)); }, []);
  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-4xl">Hola{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(" ")[0]}` : ""} 👋</h1>
      <p className="text-muted-foreground mt-1">Bienvenida a tu espacio Makrana.</p>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <Card><CardHeader><CardTitle className="text-base">Mis pedidos</CardTitle></CardHeader><CardContent>Revisa el estado de tus compras.</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Comprobantes</CardTitle></CardHeader><CardContent>Descarga las notas de venta.</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-base">Talleres</CardTitle></CardHeader><CardContent>Tus inscripciones y próximas fechas.</CardContent></Card>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="hero"><Link to="/catalogo">Ver catálogo</Link></Button>
        <Button asChild variant="outline"><Link to="/talleres">Ver talleres</Link></Button>
      </div>

      <p className="text-xs text-muted-foreground mt-10">Los módulos completos del cliente (pedidos, comprobantes, cursos) se habilitarán cuando se publiquen las Fases 3 y 5 de la plataforma.</p>
    </div>
  );
}
