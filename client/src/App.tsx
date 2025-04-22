import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/admin/login-page";
import DashboardPage from "@/pages/admin/dashboard-page";
import EventsPage from "@/pages/admin/events-page";
import { ProtectedAdminRoute } from "@/components/admin/protected-admin-route";
import { AdminAuthProvider } from "@/hooks/use-admin-auth";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      
      {/* Admin routes */}
      <Route path="/admin/login" component={LoginPage} />
      <ProtectedAdminRoute path="/admin/dashboard" component={DashboardPage} />
      <ProtectedAdminRoute path="/admin/events" component={EventsPage} />
      
      {/* 404 route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <Toaster />
          <Router />
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
