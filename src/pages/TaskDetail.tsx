import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { LoadingState, ErrorState, EmptyState } from "@/components/DataState";
import ConfirmDialog from "@/components/ConfirmDialog";
import TaskFormDialog, { TaskValues } from "@/components/TaskFormDialog";
import { StatusBadge } from "@/components/StatusBadge";
import { useTask, useTaskMutations } from "@/hooks/useTasks";
import { useProjects } from "@/hooks/useProjects";
import { useProfiles } from "@/hooks/useProfiles";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: task, isLoading, isError, refetch } = useTask(id);
  const { data: projects } = useProjects();
  const { data: profiles } = useProfiles();
  const { updateTask, deleteTask } = useTaskMutations();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (isLoading) return <LoadingState rows={5} />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!task) {
    return (
      <EmptyState
        title="Task not found"
        description="It may have been deleted."
        action={<Button asChild><Link to="/tasks">Back to tasks</Link></Button>}
      />
    );
  }

  const project = projects?.find((p) => p.id === task.project_id);
  const assignee = profiles?.find((p) => p.id === task.assignee_id);

  const handleSubmit = (values: TaskValues) =>
    updateTask.mutate({ id: task.id, values }, { onSuccess: () => setEditOpen(false) });

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link to="/tasks"><ArrowLeft className="mr-2 h-4 w-4" /> Back to tasks</Link>
      </Button>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{task.title}</h1>
          <div className="flex flex-wrap gap-2">
            <StatusBadge value={task.status} />
            <StatusBadge value={task.priority} />
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
          <CardHeader><CardTitle>Description</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">
              {task.description || "No description provided."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Project</span>
              {project ? (
                <Link to={`/projects/${project.id}`} className="text-primary hover:underline text-right">
                  {project.name}
                </Link>
              ) : (
                <span>—</span>
              )}
            </div>
            <div className="flex justify-between"><span className="text-muted-foreground">Assignee</span><span>{assignee ? assignee.full_name || assignee.email : "Unassigned"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Due date</span><span>{task.due_date ? new Date(task.due_date).toLocaleDateString() : "—"}</span></div>
          </CardContent>
        </Card>
      </div>

      <TaskFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        task={task}
        projects={(projects ?? []).map((p) => ({ id: p.id, label: p.name }))}
        members={(profiles ?? []).map((p) => ({ id: p.id, label: p.full_name || p.email }))}
        submitting={updateTask.isPending}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete task?"
        description="This task will be permanently removed."
        loading={deleteTask.isPending}
        onConfirm={() => deleteTask.mutate(task.id, { onSuccess: () => navigate("/tasks") })}
      />
    </div>
  );
};

export default TaskDetail;
