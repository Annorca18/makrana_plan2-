import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/cliente/perfil")({ component: Profile });

function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>({ full_name: "", phone: "", location: "" });
  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data } = await supabase.from("profiles").select("*").eq("id", u.user.id).maybeSingle();
      if (data) setProfile(data);
      setLoading(false);
    })();
  }, []);
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const { error } = await supabase.from("profiles").update({
      full_name: profile.full_name, phone: profile.phone, location: profile.location,
    }).eq("id", u.user.id);
    setSaving(false);
    if (error) toast.error(error.message); else toast.success("Perfil actualizado.");
  }
  if (loading) return <p>Cargando...</p>;
  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl">Mi perfil</h1>
      <form onSubmit={save} className="mt-6 grid gap-4">
        <div className="grid gap-2"><Label>Nombre</Label><Input value={profile.full_name ?? ""} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} /></div>
        <div className="grid gap-2"><Label>Celular</Label><Input value={profile.phone ?? ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></div>
        <div className="grid gap-2"><Label>Ubicación</Label><Input value={profile.location ?? ""} onChange={(e) => setProfile({ ...profile, location: e.target.value })} /></div>
        <Button type="submit" variant="hero" disabled={saving} className="justify-self-start">{saving ? "Guardando..." : "Guardar cambios"}</Button>
      </form>
    </div>
  );
}
