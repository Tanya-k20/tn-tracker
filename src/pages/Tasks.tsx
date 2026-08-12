import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { LoadingState, ErrorState, EmptyState } from "@/components/DataState";
import ConfirmDialog from "@/components/ConfirmDialog";
import TaskFormDialog, { TaskRecord, TaskValues } from "@/components/TaskFormDialog";
import { StatusBadge } from "@/components/StatusBadge";
import { useTasks, useTaskMutations } from "@/hooks/useTasks";
import { useProjects } from "@/hooks/useProjects";
import { useProfiles } from "@/hooks/useProfiles";
import { useAuth } from "@/hooks/useAuth";

const Tasks = () => {
  const { user } = useAuth();
  const { data, isLoading, isError, refetch } = useTasks();
  const { data: projects } = useProjects();
  const { data: profiles } = useProfiles();
  const { createTask, updateTask, deleteTask } = useTaskMutations();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<TaskRecord | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const projectMap = useMemo(
    () => Object.fromEntries((projects ?? []).map((p) => [p.id, p.name])),
    [projects],
  );
  const profileMap = useMemo(
    () => Object.fromEntries((profiles ?? []).map((p) => [p.id, p.full_name || p.email])),
    [profiles],
  );

  const filtered = useMemo(
    () =>
      (data ?? []).filter((t) => {
        const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || t.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [data, search, statusFilter],
  );

  const handleSubmit = (values: TaskValues) => {
    if (editing) {
      updateTask.mutate({ id: editing.id, values }, { onSuccess: () => { setFormOpen(false); setEditing(null); } });
    } else {
      createTask.mutate({ values, userId: user!.id }, { onSuccess: () => setFormOpen(false) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Tasks</h1>
          <p className="text-muted-foreground">Plan, assign and complete work across your projects.</p>
        </div>
        <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>All tasks {data ? `(${data.length})` : ""}</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  className="pl-10 w-full sm:w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="todo">To do</SelectItem>
                  <SelectItem value="in_progress">In progress</SelectItem>
                  <SelectItem value="review">In review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
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
              title={data?.length ? "No matching tasks" : "No tasks yet"}
              description={data?.length ? "Try a different search or filter." : "Create your first task to get started."}
              action={!data?.length ? <Button onClick={() => setFormOpen(true)}>Create task</Button> : undefined}
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.project_id ? projectMap[task.project_id] ?? "—" : "—"}</TableCell>
                      <TableCell>{task.assignee_id ? profileMap[task.assignee_id] ?? "—" : "Unassigned"}</TableCell>
                      <TableCell><StatusBadge value={task.status} /></TableCell>
                      <TableCell><StatusBadge value={task.priority} /></TableCell>
                      <TableCell>{task.due_date ? new Date(task.due_date).toLocaleDateString() : "—"}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" asChild aria-label="View task">
                            <Link to={`/tasks/${task.id}`}><Eye className="h-4 w-4" /></Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            aria-label="Edit task"
                            onClick={() => { setEditing(task); setFormOpen(true); }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" aria-label="Delete task" onClick={() => setDeleteId(task.id)}>
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

      <TaskFormDialog
        open={formOpen}
        onOpenChange={(open) => { setFormOpen(open); if (!open) setEditing(null); }}
        task={editing}
        projects={(projects ?? []).map((p) => ({ id: p.id, label: p.name }))}
        members={(profiles ?? []).map((p) => ({ id: p.id, label: p.full_name || p.email }))}
        submitting={createTask.isPending || updateTask.isPending}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete task?"
        description="This task will be permanently removed."
        loading={deleteTask.isPending}
        onConfirm={() => deleteId && deleteTask.mutate(deleteId, { onSuccess: () => setDeleteId(null) })}
      />
    </div>
  );
};

export default Tasks;
