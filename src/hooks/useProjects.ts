import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { ProjectRecord, ProjectValues } from "@/components/ProjectFormDialog";

const toPayload = (values: ProjectValues) => ({
  name: values.name.trim(),
  description: values.description.trim() || null,
  status: values.status,
  priority: values.priority,
  district: values.district.trim() || null,
  budget: values.budget === "" ? null : Number(values.budget),
  progress: values.progress === "" ? 0 : Math.round(Number(values.progress)),
  start_date: values.start_date || null,
  end_date: values.end_date || null,
});

export const useProjects = () =>
  useQuery({
    queryKey: ["projects", "list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ProjectRecord[];
    },
  });

export const useProject = (id?: string) =>
  useQuery({
    queryKey: ["projects", "detail", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id!).maybeSingle();
      if (error) throw error;
      return data as ProjectRecord | null;
    },
  });

export const useProjectMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["projects"] });

  const createProject = useMutation({
    mutationFn: async ({ values, userId }: { values: ProjectValues; userId: string }) => {
      const { data, error } = await supabase
        .from("projects")
        .insert({ ...toPayload(values), owner_id: userId })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Project created");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateProject = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: ProjectValues }) => {
      const { error } = await supabase.from("projects").update(toPayload(values)).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Project updated");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Project deleted");
      invalidate();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return { createProject, updateProject, deleteProject };
};
