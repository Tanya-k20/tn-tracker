import { ReactNode } from "react";
import { Loader2, AlertCircle, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingState = ({ rows = 4 }: { rows?: number }) => (
  <div className="space-y-3 py-4" role="status" aria-label="Loading">
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} className="h-12 w-full" />
    ))}
  </div>
);

export const InlineSpinner = () => (
  <div className="flex justify-center py-10">
    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
  </div>
);

export const ErrorState = ({
  message = "Something went wrong while loading data.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) => (
  <div className="flex flex-col items-center gap-3 py-12 text-center">
    <AlertCircle className="h-8 w-8 text-destructive" />
    <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
    {onRetry && (
      <Button variant="outline" size="sm" onClick={onRetry}>
        Try again
      </Button>
    )}
  </div>
);

export const EmptyState = ({
  title = "Nothing here yet",
  description,
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) => (
  <div className="flex flex-col items-center gap-3 py-12 text-center">
    <Inbox className="h-8 w-8 text-muted-foreground" />
    <div>
      <p className="font-medium text-foreground">{title}</p>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
    {action}
  </div>
);
