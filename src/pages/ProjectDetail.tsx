import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Edit, Trash2, Plus, Eye } from "lucide-react";
import { LoadingState, ErrorState, EmptyState } from "@/components/DataState";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProjectFormDialog, { ProjectValues } from "@/components/ProjectFormDialog";
import TaskFormDialog, { TaskRecord, TaskValues } from "@/components/TaskFormDialog";
import { StatusBadge } from "@/components/StatusBadge";
import { useProject, useProjectMutations } from "@/hooks/useProjects";
import { useTasks, useTaskMutations } from "@/hooks/useTasks";
import { useProfiles } from "@/hooks/useProfiles";
import { useAuth } from "@/hooks/useAuth";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: project, isLoading, isError, refetch } = useProject(id);
  const { data: tasks, isLoading: tasksLoading } = useTasks(id);
  const { data: profiles } = useProfiles();
  const { updateProject, deleteProject } = useProjectMutations();
  const { createTask, updateTask, deleteTask } = useTaskMutations();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskRecord | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const profileMap = useMemo(
    () => Object.fromEntries((profiles ?? []).map((p) => [p.id, p.full_name || p.email])),
    [profiles],
  );

  if (isLoading) return <LoadingState rows={6} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        description="It may have been deleted."
        action={<Button asChild><Link to="/projects">Back to projects</Link></Button>}
      />
    );
  }

  const handleProjectSubmit = (values: ProjectValues) =>
    updateProject.mutate({ id: project.id, values }, { onSuccess: () => setEditOpen(false) });

  const handleTaskSubmit = (values: TaskValues) => {
    const payload = { ...values, project_id: project.id };
    if (editingTask) {
      updateTask.mutate(
        { id: editingTask.id, values: payload },
        { onSuccess: () => { setTaskFormOpen(false); setEditingTask(null); } },
      );
    } else {
      createTask.mutate({ values: payload, userId: user!.id }, { onSuccess: () => setTaskFormOpen(false) });
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link to="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> Back to projects</Link>
      </Button>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{project.name}</h1>
          <div className="flex flex-wrap gap-2">
            <StatusBadge value={project.status} />
            <StatusBadge value={project.priority} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{project.description || "No description provided."}</p>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">District</span><span>{project.district ?? "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Budget</span><span>{project.budget != null ? `₹${Number(project.budget).toLocaleString("en-IN")}` : "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Start</span><span>{project.start_date ? new Date(project.start_date).toLocaleDateString() : "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">End</span><span>{project.end_date ? new Date(project.end_date).toLocaleDateString() : "—"}</span></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tasks {tasks ? `(${tasks.length})` : ""}</CardTitle>
            <Button size="sm" onClick={() => { setEditingTask(null); setTaskFormOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Add task
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {tasksLoading ? (
            <LoadingState rows={3} />
          ) : !tasks?.length ? (
            <EmptyState title="No tasks for this project" description="Add the first task to start tracking work." />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.assignee_id ? profileMap[task.assignee_id] ?? "—" : "Unassigned"}</TableCell>
                      <TableCell><StatusBadge value={task.status} /></TableCell>
                      <TableCell>{task.due_date ? new Date(task.due_date).toLocaleDateString() : "—"}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" asChild aria-label="View task">
                            <Link to={`/tasks/${task.id}`}><Eye className="h-4 w-4" /></Link>
                          </Button>
                          <Button variant="ghost" size="sm" aria-label="Edit task" onClick={() => { setEditingTask(task); setTaskFormOpen(true); }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" aria-label="Delete task" onClick={() => setDeleteTaskId(task.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <ProjectFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        project={project}
        submitting={updateProject.isPending}
        onSubmit={handleProjectSubmit}
      />

      <TaskFormDialog
        open={taskFormOpen}
        onOpenChange={(open) => { setTaskFormOpen(open); if (!open) setEditingTask(null); }}
        task={editingTask}
        lockedProjectId={project.id}
        members={(profiles ?? []).map((p) => ({ id: p.id, label: p.full_name || p.email }))}
        submitting={createTask.isPending || updateTask.isPending}
        onSubmit={handleTaskSubmit}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete project?"
        description="The project and all of its tasks will be permanently removed."
        loading={deleteProject.isPending}
        onConfirm={() => deleteProject.mutate(project.id, { onSuccess: () => navigate("/projects") })}
      />

      <ConfirmDialog
        open={!!deleteTaskId}
        onOpenChange={(open) => !open && setDeleteTaskId(null)}
        title="Delete task?"
        loading={deleteTask.isPending}
        onConfirm={() => deleteTaskId && deleteTask.mutate(deleteTaskId, { onSuccess: () => setDeleteTaskId(null) })}
      />
    </div>
  );
};

export default ProjectDetail;
