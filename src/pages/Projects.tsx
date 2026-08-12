import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { LoadingState, ErrorState, EmptyState } from "@/components/DataState";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProjectFormDialog, { ProjectRecord, ProjectValues } from "@/components/ProjectFormDialog";
import { StatusBadge } from "@/components/StatusBadge";
import { useProjects, useProjectMutations } from "@/hooks/useProjects";
import { useAuth } from "@/hooks/useAuth";

const Projects = () => {
  const { user } = useAuth();
  const { data, isLoading, isError, refetch } = useProjects();
  const { createProject, updateProject, deleteProject } = useProjectMutations();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectRecord | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return (data ?? []).filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.district ?? "").toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  const handleSubmit = (values: ProjectValues) => {
    if (editing) {
      updateProject.mutate(
        { id: editing.id, values },
        { onSuccess: () => { setFormOpen(false); setEditing(null); } },
      );
    } else {
      createProject.mutate({ values, userId: user!.id }, { onSuccess: () => setFormOpen(false) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Projects</h1>
          <p className="text-muted-foreground">Track heritage and development projects across Tamil Nadu.</p>
        </div>
        <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>All projects {data ? `(${data.length})` : ""}</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10 w-full sm:w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on_hold">On hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState onRetry={() => refetch()} />
          ) : !filtered.length ? (
            <EmptyState
              title={data?.length ? "No matching projects" : "No projects yet"}
              description={data?.length ? "Try a different search or filter." : "Create your first project to get started."}
              action={
                !data?.length ? (
                  <Button onClick={() => { setEditing(null); setFormOpen(true); }}>Create project</Button>
                ) : undefined
              }
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project) => (
                <Card key={project.id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{project.district ?? "No district"}</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button variant="ghost" size="sm" asChild aria-label="View project">
                          <Link to={`/projects/${project.id}`}><Eye className="h-4 w-4" /></Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label="Edit project"
                          onClick={() => { setEditing(project); setFormOpen(true); }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label="Delete project"
                          onClick={() => setDeleteId(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 flex-1">
                    {project.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge value={project.status} />
                      <StatusBadge value={project.priority} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                    {project.budget != null && (
                      <p className="text-sm text-muted-foreground">
                        Budget: ₹{Number(project.budget).toLocaleString("en-IN")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ProjectFormDialog
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditing(null); }}
        project={editing}
        submitting={createProject.isPending || updateProject.isPending}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete project?"
        description="This will permanently delete the project and all of its tasks."
        loading={deleteProject.isPending}
        onConfirm={() =>
          deleteId && deleteProject.mutate(deleteId, { onSuccess: () => setDeleteId(null) })
        }
      />
    </div>
  );
};

export default Projects;
