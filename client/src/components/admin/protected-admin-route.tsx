import { Redirect, Route } from 'wouter';
import { Loader2 } from 'lucide-react';
import { useAdminAuth } from '@/hooks/use-admin-auth';

export function ProtectedAdminRoute({
  path,
  component: Component,
}: {
  path: string;
  component: React.ComponentType<any>;
}) {
  const { user, isLoading } = useAdminAuth();

  return (
    <Route path={path}>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : user ? (
        <Component />
      ) : (
        <Redirect to={`/admin/login?redirect=${encodeURIComponent(path)}`} />
      )}
    </Route>
  );
}