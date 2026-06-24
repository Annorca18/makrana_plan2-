import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_authenticated/cliente/pedidos")({
  component: () => <EmptyState title="Mis pedidos" />,
});
function EmptyState({ title }: { title: string }) {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl">{title}</h1>
      <div className="mt-8 rounded-xl border border-dashed border-sand p-12 text-center bg-cream/40">
        <p className="text-muted-foreground">Aún no tienes registros aquí.</p>
        <p className="text-xs text-muted-foreground mt-2">Este módulo se conectará con las ventas reales cuando se publique la Fase 3.</p>
      </div>
    </div>
  );
}
