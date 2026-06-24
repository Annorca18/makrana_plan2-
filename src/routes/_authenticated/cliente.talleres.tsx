import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_authenticated/cliente/talleres")({
  component: () => (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl">Talleres inscritos</h1>
      <div className="mt-8 rounded-xl border border-dashed border-sand p-12 text-center bg-cream/40">
        <p className="text-muted-foreground">Aún no tienes inscripciones a talleres.</p>
      </div>
    </div>
  ),
});
