import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type ProfileRecord = {
  id: string;
  full_name: string;
  email: string;
  district: string | null;
  status: string;
  created_at: string;
};

export type AppRole = "admin" | "manager" | "editor" | "user";

export const useProfiles = () =>
  useQuery({
    queryKey: ["profiles", "list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ProfileRecord[];
    },
  });

export const useRoles = () =>
  useQuery({
    queryKey: ["user_roles", "list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("*");
      if (error) throw error;
      return data as { id: string; user_id: string; role: AppRole }[];
    },
  });

export const useProfileMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["profiles"] });
    queryClient.invalidateQueries({ queryKey: ["user_roles"] });
  };

  const updateProfile = useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: string;
      values: { full_name: string; district: string; status: string };
    }) => {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: values.full_name.trim(),
          district: values.district.trim() || null,
          status: values.status,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("User updated");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const setRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      const { error: deleteError } = await supabase.from("user_roles").delete().eq("user_id", userId);
      if (deleteError) throw deleteError;
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Role updated");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteProfile = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("profiles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("User removed");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return { updateProfile, setRole, deleteProfile };
};
