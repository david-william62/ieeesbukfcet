"use client";

import { useEffect, useState } from "react";

const API = {
  login: "/api/auth/login",
  verify: "/api/admin/verify",
  events: "/api/events",
  speakers: "/api/speakers",
  team: "/api/team",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ username: "", password: "" });

  useEffect(() => {
    fetch(API.verify).then((r) => setAuthed(r.ok)).finally(() => setLoading(false));
  }, []);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(API.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setAuthed(true);
  };

  if (loading) return <div className="p-8">Loading…</div>;

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <form onSubmit={onLogin} className="w-full max-w-sm border rounded-md p-4 space-y-3">
          <h1 className="text-xl font-bold">Admin Login</h1>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="w-full bg-black text-white rounded px-3 py-2" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return <AdminDashboard />;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <EventsManager />
      {/* <SpeakersManager /> */}
      <TeamManager />
    </div>
  );
}

function EventsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [draft, setDraft] = useState<any>({ title: "", date: "", link: "", category: "", image: "", featured: false });

  const load = () => fetch(API.events).then(r => r.json()).then(setItems);
  useEffect(() => { void fetch(API.events).then(r => r.json()).then(setItems); }, []);

  const create = async () => {
    await fetch(API.events, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
    setDraft({ title: "", date: "", link: "", category: "", image: "", featured: false });
    void fetch(API.events).then(r => r.json()).then(setItems);
  };
  const update = async (it: any) => { await fetch(API.events, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(it) }); void fetch(API.events).then(r => r.json()).then(setItems); };
  const remove = async (id: string) => { await fetch(API.events, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); void fetch(API.events).then(r => r.json()).then(setItems); };

  return (
    <Section title="Events">
      <div className="grid gap-2 md:grid-cols-2">
        <input className="border rounded px-2 py-1 text-white" placeholder="Title" value={draft.title} onChange={e=>setDraft({ ...draft, title: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="Date" value={draft.date} onChange={e=>setDraft({ ...draft, date: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="Link" value={draft.link} onChange={e=>setDraft({ ...draft, link: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="Category" value={draft.category} onChange={e=>setDraft({ ...draft, category: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="Image URL" value={draft.image} onChange={e=>setDraft({ ...draft, image: e.target.value })} />
        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.featured} onChange={e=>setDraft({ ...draft, featured: e.target.checked })} /> Featured</label>
      </div>
      <button className="bg-black text-white rounded px-3 py-1 w-fit" onClick={create}>Add Event</button>
      <ul className="divide-y">
        {items.map((it) => (
          <li key={it.id} className="py-2 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-black" aria-hidden />
            <input className="border px-2 py-1 flex-1 text-white" value={it.title} onChange={e=>it.title=e.target.value} />
            <button className="px-2 py-1 border rounded " onClick={()=>update(it)}>Save</button>
            <button className="px-2 py-1 border rounded " onClick={()=>remove(it.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function SpeakersManager() {
  const [items, setItems] = useState<any[]>([]);
  const [draft, setDraft] = useState<any>({ name: "", role: "", bio: "", image: "", linkedin: "", twitter: "", website: "" });

  useEffect(() => { void fetch(API.speakers).then(r => r.json()).then(setItems); }, []);

  const create = async () => { await fetch(API.speakers, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) }); setDraft({ name: "", role: "", bio: "", image: "", linkedin: "", twitter: "", website: "" }); void fetch(API.speakers).then(r => r.json()).then(setItems); };
  const update = async (it: any) => { await fetch(API.speakers, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(it) }); void fetch(API.speakers).then(r => r.json()).then(setItems); };
  const remove = async (id: string) => { await fetch(API.speakers, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); void fetch(API.speakers).then(r => r.json()).then(setItems); };

  return (
    <Section title="Speakers">
      <div className="grid gap-2 md:grid-cols-2">
        <input className="border rounded px-2 py-1 text-white" placeholder="Name" value={draft.name} onChange={e=>setDraft({ ...draft, name: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="Role" value={draft.role} onChange={e=>setDraft({ ...draft, role: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white " placeholder="Image URL" value={draft.image} onChange={e=>setDraft({ ...draft, image: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="LinkedIn" value={draft.linkedin} onChange={e=>setDraft({ ...draft, linkedin: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="Twitter" value={draft.twitter} onChange={e=>setDraft({ ...draft, twitter: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="Website" value={draft.website} onChange={e=>setDraft({ ...draft, website: e.target.value })} />
        <textarea className="border rounded px-2 py-1 md:col-span-2" placeholder="Bio" value={draft.bio} onChange={e=>setDraft({ ...draft, bio: e.target.value })} />
      </div>
      <button className="bg-black text-white rounded px-3 py-1 w-fit" onClick={create}>Add Speaker</button>
      <ul className="divide-y">
        {items.map((it) => (
          <li key={it.id} className="py-2 flex items-center gap-2">
            <input className="border px-2 py-1 flex-1 text-white" value={it.name} onChange={e=>it.name=e.target.value} />
            <button className="px-2 py-1 border rounded" onClick={()=>update(it)}>Save</button>
            <button className="px-2 py-1 border rounded" onClick={()=>remove(it.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </Section>
  );
};

function TeamManager() {
  const [items, setItems] = useState<any[]>([]);
  const [draft, setDraft] = useState<any>({ name: "", role: "",branch: "",rank: 0 ,image: "", linkedin: "", email: "", github: "" });

  useEffect(() => { void fetch(API.team).then(r => r.json()).then(setItems); }, []);

  const create = async () => { await fetch(API.team, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) }); setDraft({ name: "", role: "", image: "",branch: "",rank: 0 ,linkedin: "", email: "", github: "" }); void fetch(API.team).then(r => r.json()).then(setItems); };
  const update = async (it: any) => { await fetch(API.team, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(it) }); void fetch(API.team).then(r => r.json()).then(setItems); };
  const remove = async (id: string) => { await fetch(API.team, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); void fetch(API.team).then(r => r.json()).then(setItems); };

  return (
    <Section title="Team Members">
      <div className="grid gap-2 md:grid-cols-2">
        <input className="border rounded px-2 py-1 text-white" placeholder="Name" value={draft.name} onChange={e=>setDraft({ ...draft, name: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="Role" value={draft.role} onChange={e=>setDraft({ ...draft, role: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="Branch" value={draft.branch} onChange={e=>setDraft({ ...draft, branch: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="Rank" type="number" value={draft.rank} onChange={e=>setDraft({ ...draft, rank: parseInt(e.target.value) })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="Image URL" value={draft.image} onChange={e=>setDraft({ ...draft, image: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="LinkedIn" value={draft.linkedin} onChange={e=>setDraft({ ...draft, linkedin: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="Email" value={draft.email} onChange={e=>setDraft({ ...draft, email: e.target.value })} />
        <input className="border rounded px-2 py-1 text-white" placeholder="GitHub" value={draft.github} onChange={e=>setDraft({ ...draft, github: e.target.value })} />
      </div>
      <button className="bg-black text-white rounded px-3 py-1 w-fit" onClick={create}>Add Member</button>
      <ul className="divide-y">
        {items.map((it) => (
          <li key={it.id} className="py-2 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-black" aria-hidden />
            <input className="border px-2 py-1 flex-1 text-white" value={it.name} onChange={e=>it.name=e.target.value} />
            <button className="px-2 py-1 border rounded" onClick={()=>update(it)}>Save</button>
            <button className="px-2 py-1 border rounded" onClick={()=>remove(it.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </Section>
  );
}
