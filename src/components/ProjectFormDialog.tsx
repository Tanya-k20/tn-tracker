import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { z } from "zod";

export type ProjectStatus = "planning" | "active" | "on_hold" | "completed" | "cancelled";
export type Priority = "low" | "medium" | "high" | "urgent";

export type ProjectRecord = {
  id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  priority: Priority;
  district: string | null;
  budget: number | null;
  progress: number;
  start_date: string | null;
  end_date: string | null;
};

export type ProjectValues = {
  name: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  district: string;
  budget: string;
  progress: string;
  start_date: string;
  end_date: string;
};

const emptyValues: ProjectValues = {
  name: "",
  description: "",
  status: "planning",
  priority: "medium",
  district: "",
  budget: "",
  progress: "0",
  start_date: "",
  end_date: "",
};

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  description: z.string().trim().max(1000),
  district: z.string().trim().max(100),
  budget: z.string().refine((v) => v === "" || !Number.isNaN(Number(v)), "Budget must be a number"),
  progress: z
    .string()
    .refine((v) => v === "" || (Number(v) >= 0 && Number(v) <= 100), "Progress must be between 0 and 100"),
});

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: ProjectRecord | null;
  submitting?: boolean;
  onSubmit: (values: ProjectValues) => void;
};

const ProjectFormDialog = ({ open, onOpenChange, project, submitting, onSubmit }: Props) => {
  const [values, setValues] = useState<ProjectValues>(emptyValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setValues(
      project
        ? {
            name: project.name,
            description: project.description ?? "",
            status: project.status,
            priority: project.priority,
            district: project.district ?? "",
            budget: project.budget?.toString() ?? "",
            progress: project.progress?.toString() ?? "0",
            start_date: project.start_date ?? "",
            end_date: project.end_date ?? "",
          }
        : emptyValues,
    );
  }, [open, project]);

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
          <DialogTitle>{project ? "Edit project" : "New project"}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="p-name">Name *</Label>
            <Input id="p-name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="p-desc">Description</Label>
            <Textarea id="p-desc" value={values.description} onChange={(e) => setValues({ ...values, description: e.target.value })} />
            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={values.status} onValueChange={(v) => setValues({ ...values, status: v as ProjectStatus })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on_hold">On hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
              <Label htmlFor="p-district">District</Label>
              <Input id="p-district" value={values.district} onChange={(e) => setValues({ ...values, district: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-budget">Budget (₹)</Label>
              <Input id="p-budget" inputMode="decimal" value={values.budget} onChange={(e) => setValues({ ...values, budget: e.target.value })} />
              {errors.budget && <p className="text-xs text-destructive">{errors.budget}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-progress">Progress (%)</Label>
              <Input id="p-progress" inputMode="numeric" value={values.progress} onChange={(e) => setValues({ ...values, progress: e.target.value })} />
              {errors.progress && <p className="text-xs text-destructive">{errors.progress}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-start">Start date</Label>
              <Input id="p-start" type="date" value={values.start_date} onChange={(e) => setValues({ ...values, start_date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-end">End date</Label>
              <Input id="p-end" type="date" value={values.end_date} onChange={(e) => setValues({ ...values, end_date: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {project ? "Save changes" : "Create project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
