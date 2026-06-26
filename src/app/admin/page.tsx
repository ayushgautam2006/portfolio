"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  GripVertical,
  Lock,
  LogOut,
  Pencil,
  Plus,
  Save,
  Star,
  StarOff,
  Trash2,
  X,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
}

// ─── Toast ───────────────────────────────────────────────

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium shadow-2xl border ${
        type === "success"
          ? "bg-[#0A0A0A] border-green-500/30 text-green-400"
          : "bg-[#0A0A0A] border-red-500/30 text-red-400"
      }`}
    >
      {type === "success" ? (
        <Check className="w-4 h-4 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
      )}
      {message}
      <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100">
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

// ─── Tag Input ───────────────────────────────────────────

function TagInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");

  function addTag() {
    const val = input.trim();
    if (val && !tags.includes(val)) {
      onChange([...tags, val]);
    }
    setInput("");
  }

  return (
    <div className="flex flex-wrap gap-2 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] min-h-[48px]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
          }
        }}
        onBlur={addTag}
        placeholder="Add tag…"
        className="flex-1 min-w-[80px] bg-transparent text-xs text-white placeholder-[#333] outline-none"
      />
    </div>
  );
}

// ─── Project Editor Modal ─────────────────────────────────

function ProjectModal({
  project,
  onSave,
  onClose,
}: {
  project: Project;
  onSave: (p: Project) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Project>({ ...project });

  function field(key: keyof Project) {
    return {
      value: form[key] as string,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white text-sm placeholder-[#333] outline-none focus:border-accent/40 focus:bg-accent/[0.03] transition-all duration-200";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0A0A0A] border border-white/[0.06] rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto relative"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent rounded-t-3xl" />

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-accent text-[10px] font-semibold uppercase tracking-[0.25em] mb-1">
              {form.id ? "Edit Project" : "New Project"}
            </p>
            <h2 className="text-white font-bold text-xl">
              {form.title || "Untitled"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-[#555] hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#333] font-semibold mb-2">
              Title
            </label>
            <input {...field("title")} placeholder="Project name" className={inputCls} />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#333] font-semibold mb-2">
              Description
            </label>
            <textarea
              {...field("description")}
              placeholder="What does this project do?"
              rows={3}
              className={inputCls + " resize-none"}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#333] font-semibold mb-2">
              Tags <span className="text-[#222] normal-case">(Enter or comma to add)</span>
            </label>
            <TagInput
              tags={form.tags}
              onChange={(tags) => setForm((f) => ({ ...f, tags }))}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#333] font-semibold mb-2">
              GitHub URL
            </label>
            <input {...field("github")} placeholder="https://github.com/..." className={inputCls} />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#333] font-semibold mb-2">
              Live Demo URL
            </label>
            <input {...field("demo")} placeholder="https://..." className={inputCls} />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div>
              <p className="text-sm font-medium text-white">Featured on Homepage</p>
              <p className="text-xs text-[#555] mt-0.5">Shows in &quot;Selected Work&quot; section</p>
            </div>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                form.featured ? "bg-accent" : "bg-white/[0.08]"
              }`}
            >
              <motion.div
                animate={{ x: form.featured ? 20 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/[0.06] text-[#555] text-sm font-medium hover:border-white/[0.12] hover:text-white transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!form.id) form.id = form.title.toLowerCase().replace(/\s+/g, "-");
              onSave(form);
            }}
            className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors duration-200 flex items-center justify-center gap-2"
            style={{ boxShadow: "0 0 20px rgba(255,90,0,0.25)" }}
          >
            <Check className="w-4 h-4" /> Apply Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Project Row ─────────────────────────────────────────

function ProjectRow({
  project,
  index,
  total,
  onEdit,
  onDelete,
  onToggleFeatured,
  onMoveUp,
  onMoveDown,
}: {
  project: Project;
  index: number;
  total: number;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFeatured: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="group flex items-center gap-4 p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-200"
    >
      {/* Drag handle / order buttons */}
      <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="p-0.5 text-[#333] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <GripVertical className="w-3.5 h-3.5 text-[#222] mx-auto" />
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="p-0.5 text-[#333] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Order number */}
      <span className="text-[#222] font-mono text-xs w-5 text-center flex-shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-white font-semibold text-sm truncate">
            {project.title}
          </h3>
          {project.featured && (
            <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] font-bold uppercase tracking-wider">
              Featured
            </span>
          )}
        </div>
        <p className="text-[#555] text-xs truncate">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.05] text-[#555] text-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-lg text-[#333] hover:text-white hover:bg-white/[0.04] transition-all"
          title="GitHub"
        >
          <Github className="w-3.5 h-3.5" />
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-lg text-[#333] hover:text-accent hover:bg-accent/[0.04] transition-all"
          title="Demo"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={onToggleFeatured}
          title={project.featured ? "Remove from homepage" : "Feature on homepage"}
          className={`p-2 rounded-lg transition-all ${
            project.featured
              ? "text-accent hover:text-white hover:bg-white/[0.04]"
              : "text-[#333] hover:text-accent hover:bg-accent/[0.04]"
          }`}
        >
          {project.featured ? (
            <Star className="w-3.5 h-3.5" />
          ) : (
            <StarOff className="w-3.5 h-3.5" />
          )}
        </button>
        <button
          onClick={onEdit}
          className="p-2 rounded-lg text-[#333] hover:text-white hover:bg-white/[0.04] transition-all"
          title="Edit"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg text-[#333] hover:text-red-400 hover:bg-red-500/[0.06] transition-all"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Admin Page ─────────────────────────────────────

const BLANK_PROJECT: Project = {
  id: "",
  title: "",
  description: "",
  tags: [],
  github: "",
  demo: "",
  featured: false,
};

export default function AdminPage() {
  // ── Auth state
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState("");
  const [showPw, setShowPw] = useState(false);

  // ── Data state
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  // ── UI state
  const [editing, setEditing] = useState<Project | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
  }, []);

  // ── Load projects
  const loadProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProjects(data);
    } catch {
      showToast("Failed to load projects", "error");
    }
  }, [showToast]);

  // ── Check session status
  const checkSession = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/session");
      if (res.ok) {
        setAuthed(true);
        await loadProjects();
      }
    } catch {
      // Quietly ignore: user is not logged in yet
    } finally {
      setLoading(false);
    }
  }, [loadProjects]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwInput }),
      });
      if (!res.ok) {
        const err = await res.json();
        setPwError(err.error || "Invalid password");
        return;
      }
      setPwInput("");
      setAuthed(true);
      await loadProjects();
    } catch {
      setPwError("Connection error — try again");
    } finally {
      setLoading(false);
    }
  }

  // ── Save
  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Cookie is sent automatically by the browser
        body: JSON.stringify(projects),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      setDirty(false);
      showToast("Projects saved successfully!", "success");
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  // ── CRUD helpers
  function updateProject(updated: Project) {
    setProjects((prev) =>
      prev.some((p) => p.id === updated.id)
        ? prev.map((p) => (p.id === updated.id ? updated : p))
        : [...prev, updated]
    );
    setDirty(true);
    setEditing(null);
  }

  function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDirty(true);
  }

  function toggleFeatured(id: string) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
    setDirty(true);
  }

  function moveProject(index: number, direction: -1 | 1) {
    const next = [...projects];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setProjects(next);
    setDirty(true);
  }

  const featuredCount = projects.filter((p) => p.featured).length;

  // ── Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px]"
            style={{ background: "rgba(255,90,0,0.03)" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 items-center justify-center mb-5">
              <Lock className="w-6 h-6 text-accent" />
            </div>
            <h1
              className="text-3xl font-black text-white mb-2"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              ADMIN PANEL
            </h1>
            <p className="text-[#555] text-sm">Portfolio projects manager</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-[#0A0A0A] border border-white/[0.06] rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#333] font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={pwInput}
                    onChange={(e) => setPwInput(e.target.value)}
                    placeholder="Enter admin password"
                    className={`w-full px-4 py-3.5 rounded-xl border text-white text-sm placeholder-[#333] outline-none transition-all duration-200 pr-12 ${
                      pwError
                        ? "border-red-500/40 bg-red-500/[0.04]"
                        : "border-white/[0.06] bg-white/[0.02] focus:border-accent/40 focus:bg-accent/[0.03]"
                    }`}
                    autoFocus
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#333] hover:text-white transition-colors"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {pwError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-2 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {pwError}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-accent text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-all"
                style={{ boxShadow: "0 0 25px rgba(255,90,0,0.25)" }}
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                {loading ? "Loading…" : "Sign In"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── Admin dashboard
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Grid bg */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,90,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,90,0,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%,black 20%,transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">

        {/* ── Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 bg-accent rounded-full" />
              <h1
                className="text-4xl text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
              >
                PROJECTS MANAGER
              </h1>
            </div>
            <p className="text-[#555] text-sm ml-4">
              {projects.length} total &middot; {featuredCount} featured on homepage
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[#555] hover:text-white hover:border-white/[0.12] transition-all text-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Site
            </a>
            <button
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                setAuthed(false);
                setPwInput("");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[#555] hover:text-white hover:border-white/[0.12] transition-all text-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* ── Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Projects", value: projects.length },
            {
              label: "Featured (Homepage)",
              value: featuredCount,
              accent: true,
            },
            {
              label: "Not Featured",
              value: projects.length - featuredCount,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-[#0A0A0A] border border-white/[0.04] p-5 text-center"
            >
              <div
                className={`text-3xl font-black mb-1 ${
                  stat.accent ? "text-accent" : "text-white"
                }`}
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-[#555] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-accent text-[10px] font-semibold uppercase tracking-[0.25em]">
              All Projects
            </span>
            <div className="w-8 h-px bg-accent/30" />
          </div>
          <div className="flex items-center gap-3">
            {dirty && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-[#555] flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Unsaved changes
              </motion.span>
            )}
            <button
              onClick={() => setEditing({ ...BLANK_PROJECT })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[#999] hover:text-white hover:border-white/[0.1] transition-all text-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Project
            </button>
            <motion.button
              onClick={handleSave}
              disabled={saving || !dirty}
              whileHover={dirty ? { scale: 1.02 } : {}}
              whileTap={dirty ? { scale: 0.97 } : {}}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                dirty
                  ? "bg-accent text-white hover:bg-accent/90"
                  : "bg-white/[0.04] text-[#333] border border-white/[0.06] cursor-not-allowed"
              }`}
              style={dirty ? { boxShadow: "0 0 20px rgba(255,90,0,0.25)" } : {}}
            >
              {saving ? (
                <span className="animate-spin w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              {saving ? "Saving…" : "Save Changes"}
            </motion.button>
          </div>
        </div>

        {/* ── Homepage featured callout */}
        <div className="mb-4 p-3 rounded-xl border border-accent/[0.12] bg-accent/[0.04] flex items-center gap-3">
          <Star className="w-4 h-4 text-accent flex-shrink-0" />
          <p className="text-xs text-[#999]">
            <span className="text-white font-medium">Tip:</span> Toggle the{" "}
            <span className="text-accent">★</span> star on any project to feature it
            in the homepage <span className="text-white">&quot;Selected Work&quot;</span> section. Order here controls order on the page.
          </p>
        </div>

        {/* ── Project list */}
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                onEdit={() => setEditing({ ...project })}
                onDelete={() => deleteProject(project.id)}
                onToggleFeatured={() => toggleFeatured(project.id)}
                onMoveUp={() => moveProject(index, -1)}
                onMoveDown={() => moveProject(index, 1)}
              />
            ))}
          </AnimatePresence>

          {projects.length === 0 && (
            <div className="text-center py-16 text-[#333]">
              <Plus className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No projects yet. Add one above.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Edit modal */}
      <AnimatePresence>
        {editing && (
          <ProjectModal
            project={editing}
            onSave={updateProject}
            onClose={() => setEditing(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            key={toast.message}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
