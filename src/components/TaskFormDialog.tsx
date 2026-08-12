import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import type { Priority } from "./ProjectFormDialog";

export type TaskStatus = "todo" | "in_progress" | "review" | "completed";

export type TaskRecord = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  due_date: string | null;
  project_id: string | null;
  assignee_id: string | null;
};

export type TaskValues = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  due_date: string;
  project_id: string;
  assignee_id: string;
};

const emptyValues: TaskValues = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  due_date: "",
  project_id: "none",
  assignee_id: "none",
};

const schema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(150),
  description: z.string().trim().max(1000),
});

type Option = { id: string; label: string };

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: TaskRecord | null;
  projects?: Option[];
  members?: Option[];
  submitting?: boolean;
  lockedProjectId?: string;
  onSubmit: (values: TaskValues) => void;
};

const TaskFormDialog = ({
  open,
  onOpenChange,
  task,
  projects = [],
  members = [],
  submitting,
  lockedProjectId,
  onSubmit,
}: Props) => {
  const [values, setValues] = useState<TaskValues>(emptyValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setValues(
      task
        ? {
            title: task.title,
            description: task.description ?? "",
            status: task.status,
            priority: task.priority,
            due_date: task.due_date ?? "",
            project_id: task.project_id ?? "none",
            assignee_id: task.assignee_id ?? "none",
          }
        : { ...emptyValues, project_id: lockedProjectId ?? "none" },
    );
  }, [open, task, lockedProjectId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (fieldErrors[String(i.path[0])] = i.message));
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task ? "Edit task" : "New task"}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="t-title">Title *</Label>
            <Input id="t-title" value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="t-desc">Description</Label>
            <Textarea id="t-desc" value={values.description} onChange={(e) => setValues({ ...values, description: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={values.status} onValueChange={(v) => setValues({ ...values, status: v as TaskStatus })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="todo">To do</SelectItem>
                  <SelectItem value="in_progress">In progress</SelectItem>
                  <SelectItem value="review">In review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={values.priority} onValueChange={(v) => setValues({ ...values, priority: v as Priority })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-due">Due date</Label>
              <Input id="t-due" type="date" value={values.due_date} onChange={(e) => setValues({ ...values, due_date: e.target.value })} />
            </div>
            {!lockedProjectId && (
              <div className="space-y-2">
                <Label>Project</Label>
                <Select value={values.project_id} onValueChange={(v) => setValues({ ...values, project_id: v })}>
                  <SelectTrigger><SelectValue placeholder="No project" /></SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="none">No project</SelectItem>
                    {projects.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label>Assignee</Label>
              <Select value={values.assignee_id} onValueChange={(v) => setValues({ ...values, assignee_id: v })}>
                <SelectTrigger><SelectValue placeholder="Unassigned" /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="none">Unassigned</SelectItem>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {task ? "Save changes" : "Create task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
