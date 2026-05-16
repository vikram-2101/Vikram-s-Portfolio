import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, LogOut, Settings, PlusCircle, Trash2, Edit, Save, X, ToggleLeft, ToggleRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const ADMIN_TOKEN = "harshit-admin-2025"; // This would be env var in production

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  previewVideo: string;
  fullVideo: string;
  liveUrl: string;
  githubUrl: string;
  tags: string[];
  sortOrder: number;
}

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [activeTab, setActiveTab] = useState<"projects" | "settings">("projects");
  const [showExperience, setShowExperience] = useState(true);
  const [showTestimonials, setShowTestimonials] = useState(true);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "AI Document Assistant",
      description: "RAG-powered document Q&A system",
      fullDescription: "A sophisticated RAG system for document Q&A.",
      previewVideo: "",
      fullVideo: "",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/vikram-2101",
      tags: ["Next.js", "LangChain", "OpenAI"],
      sortOrder: 1,
    },
  ]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newTagInput, setNewTagInput] = useState("");

  useEffect(() => {
    const storedAuth = localStorage.getItem("admin-auth");
    if (storedAuth === ADMIN_TOKEN) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (token === ADMIN_TOKEN) {
      localStorage.setItem("admin-auth", token);
      setIsAuthenticated(true);
      toast({ title: "Welcome back!", description: "You're now logged in." });
    } else {
      toast({ title: "Invalid token", description: "Please try again.", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    setIsAuthenticated(false);
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Project description",
      fullDescription: "",
      previewVideo: "",
      fullVideo: "",
      liveUrl: "",
      githubUrl: "",
      tags: [],
      sortOrder: projects.length + 1,
    };
    setProjects([...projects, newProject]);
    setEditingProject(newProject);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast({ title: "Project deleted" });
  };

  const handleSaveProject = () => {
    if (!editingProject) return;
    setProjects(projects.map((p) => (p.id === editingProject.id ? editingProject : p)));
    setEditingProject(null);
    toast({ title: "Project saved!" });
  };

  const handleAddTag = () => {
    if (!editingProject || !newTagInput.trim()) return;
    setEditingProject({
      ...editingProject,
      tags: [...editingProject.tags, newTagInput.trim()],
    });
    setNewTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      tags: editingProject.tags.filter((t) => t !== tag),
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Lock className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h1 className="font-display text-3xl font-bold text-foreground uppercase tracking-tight mb-2">
              Admin Access
            </h1>
            <p className="text-muted-foreground font-body text-sm">
              Enter your access token to continue
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Access Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="bg-card border-border text-foreground"
            />
            <Button onClick={handleLogin} className="w-full">
              Authenticate
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-foreground uppercase tracking-tight">
            Dashboard
          </h1>
          <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground">
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 font-body text-sm rounded-lg transition-colors ${activeTab === "projects"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 font-body text-sm rounded-lg transition-colors ${activeTab === "settings"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Settings size={16} className="inline mr-2" />
            Settings
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-display text-2xl font-bold text-foreground uppercase tracking-tight">
                Manage Projects
              </h2>
              <Button onClick={handleAddProject}>
                <PlusCircle size={18} className="mr-2" />
                Add Project
              </Button>
            </div>

            {/* Project List */}
            <div className="grid gap-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  className="admin-card flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-display font-bold text-foreground">{project.title}</h3>
                    <p className="text-muted-foreground text-sm font-body">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingProject(project)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Edit Modal */}
            {editingProject && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display text-xl font-bold text-foreground uppercase">
                      Edit Project
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setEditingProject(null)}>
                      <X size={20} />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-body text-muted-foreground mb-1 block">Title</label>
                      <Input
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-body text-muted-foreground mb-1 block">Short Description</label>
                      <Input
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-body text-muted-foreground mb-1 block">Full Description</label>
                      <Textarea
                        value={editingProject.fullDescription}
                        onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                        className="bg-background"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-body text-muted-foreground mb-1 block">Preview Video (MP4)</label>
                        <Input
                          value={editingProject.previewVideo}
                          onChange={(e) => setEditingProject({ ...editingProject, previewVideo: e.target.value })}
                          placeholder="https://..."
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-body text-muted-foreground mb-1 block">Full Video (YouTube/Loom)</label>
                        <Input
                          value={editingProject.fullVideo}
                          onChange={(e) => setEditingProject({ ...editingProject, fullVideo: e.target.value })}
                          placeholder="https://..."
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-body text-muted-foreground mb-1 block">Live URL</label>
                        <Input
                          value={editingProject.liveUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                          placeholder="https://..."
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-body text-muted-foreground mb-1 block">GitHub URL</label>
                        <Input
                          value={editingProject.githubUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                          placeholder="https://..."
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-body text-muted-foreground mb-1 block">Tags</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {editingProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full flex items-center gap-2"
                          >
                            {tag}
                            <button onClick={() => handleRemoveTag(tag)} className="hover:text-foreground">
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newTagInput}
                          onChange={(e) => setNewTagInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                          placeholder="Add tag..."
                          className="bg-background"
                        />
                        <Button variant="outline" onClick={handleAddTag}>
                          Add
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                      <Button variant="outline" onClick={() => setEditingProject(null)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProject}>
                        <Save size={18} className="mr-2" />
                        Save Project
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground uppercase tracking-tight">
              Site Settings
            </h2>

            <div className="admin-card space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-foreground">Show Experience Section</h3>
                  <p className="text-muted-foreground text-sm font-body">
                    Toggle the experience timeline on your portfolio
                  </p>
                </div>
                <Switch
                  checked={showExperience}
                  onCheckedChange={setShowExperience}
                />
              </div>

              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-foreground">Show Testimonials Section</h3>
                    <p className="text-muted-foreground text-sm font-body">
                      Toggle the testimonials marquee on your portfolio
                    </p>
                  </div>
                  <Switch
                    checked={showTestimonials}
                    onCheckedChange={setShowTestimonials}
                  />
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm font-body">
              Note: Connect Lovable Cloud to persist these settings to your database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
