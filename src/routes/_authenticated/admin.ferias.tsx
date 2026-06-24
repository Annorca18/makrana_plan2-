import { createFileRoute } from "@tanstack/react-router";
import { AdminStub } from "@/components/admin-stub";

export const Route = createFileRoute("/_authenticated/admin/ferias")({
  component: () => <AdminStub title="Ferias" description="Stock enviado y vendido en cada feria." phase="la Fase 4" />,
});
