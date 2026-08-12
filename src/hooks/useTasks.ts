import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { TaskRecord, TaskValues } from "@/components/TaskFormDialog";

const toPayload = (values: TaskValues) => ({
  title: values.title.trim(),
  description: values.description.trim() || null,
  status: values.status,
  priority: values.priority,
  due_date: values.due_date || null,
  project_id: values.project_id === "none" ? null : values.project_id,
  assignee_id: values.assignee_id === "none" ? null : values.assignee_id,
});

export const useTasks = (projectId?: string) =>
  useQuery({
    queryKey: ["tasks", "list", projectId ?? "all"],
    queryFn: async () => {
      let query = supabase.from("tasks").select("*").order("created_at", { ascending: false });
      if (projectId) query = query.eq("project_id", projectId);
      const { data, error } = await query;
      if (error) throw error;
      return data as TaskRecord[];
    },
  });

export const useTask = (id?: string) =>
  useQuery({
    queryKey: ["tasks", "detail", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("tasks").select("*").eq("id", id!).maybeSingle();
      if (error) throw error;
      return data as TaskRecord | null;
    },
  });

export const useTaskMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["tasks"] });

  const createTask = useMutation({
    mutationFn: async ({ values, userId }: { values: TaskValues; userId: string }) => {
      const { data, error } = await supabase
        .from("tasks")
        .insert({ ...toPayload(values), owner_id: userId })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Task created");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateTask = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: TaskValues }) => {
      const { error } = await supabase.from("tasks").update(toPayload(values)).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Task updated");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Task deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return { createTask, updateTask, deleteTask };
};
