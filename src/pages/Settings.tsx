import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingState, ErrorState } from "@/components/DataState";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

const profileSchema = z.object({
  full_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  district: z.string().trim().max(100),
});

const Settings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [profileForm, setProfileForm] = useState({ full_name: "", district: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const profileQuery = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const settingsQuery = useQuery({
    queryKey: ["user_settings", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      if (data) return data;
      const { data: created, error: insertError } = await supabase
        .from("user_settings")
        .insert({ user_id: user!.id })
        .select()
        .single();
      if (insertError) throw insertError;
      return created;
    },
  });

  useEffect(() => {
    if (profileQuery.data) {
      setProfileForm({
        full_name: profileQuery.data.full_name ?? "",
        district: profileQuery.data.district ?? "",
      });
    }
  }, [profileQuery.data]);

  const saveProfile = useMutation({
    mutationFn: async (values: { full_name: string; district: string }) => {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user!.id,
          email: user!.email ?? "",
          full_name: values.full_name,
          district: values.district || null,
        })
        .eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const savePreference = useMutation({
    mutationFn: async (patch: Record<string, string | boolean>) => {
      const { error } = await supabase.from("user_settings").update(patch).eq("user_id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Preferences saved");
      queryClient.invalidateQueries({ queryKey: ["user_settings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const submitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (saveProfile.isPending) return;
    const parsed = profileSchema.safeParse(profileForm);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (fieldErrors[String(i.path[0])] = i.message));
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    saveProfile.mutate(profileForm);
  };

  const settings = settingsQuery.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and application preferences.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update the details other members can see.</CardDescription>
          </CardHeader>
          <CardContent>
            {profileQuery.isLoading ? (
              <LoadingState rows={3} />
            ) : profileQuery.isError ? (
              <ErrorState onRetry={() => profileQuery.refetch()} />
            ) : (
              <form className="space-y-4" onSubmit={submitProfile} noValidate>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email ?? ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full name *</Label>
                  <Input
                    id="full_name"
                    value={profileForm.full_name}
                    onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                  />
                  {errors.full_name && <p className="text-xs text-destructive">{errors.full_name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={profileForm.district}
                    onChange={(e) => setProfileForm({ ...profileForm, district: e.target.value })}
                    placeholder="e.g. Chennai"
                  />
                </div>
                <Button type="submit" disabled={saveProfile.isPending}>
                  {saveProfile.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save profile
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Choose how the app looks and how we reach you.</CardDescription>
          </CardHeader>
          <CardContent>
            {settingsQuery.isLoading ? (
              <LoadingState rows={3} />
            ) : settingsQuery.isError || !settings ? (
              <ErrorState onRetry={() => settingsQuery.refetch()} />
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(v) => savePreference.mutate({ theme: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(v) => savePreference.mutate({ language: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {[
                  { key: "email_notifications", label: "Email notifications", value: settings.email_notifications },
                  { key: "push_notifications", label: "Push notifications", value: settings.push_notifications },
                  { key: "weekly_digest", label: "Weekly digest", value: settings.weekly_digest },
                ].map((row) => (
                  <div key={row.key} className="flex items-center justify-between gap-4">
                    <Label htmlFor={row.key}>{row.label}</Label>
                    <Switch
                      id={row.key}
                      checked={row.value}
                      disabled={savePreference.isPending}
                      onCheckedChange={(checked) => savePreference.mutate({ [row.key]: checked })}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
