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
import SubscribersPage from "@/pages/admin/subscribers-page";
import BlogPage from "@/pages/admin/blog-page";
import SettingsPage from "@/pages/admin/settings-page";
import EbookPage from "@/pages/admin/ebook-page";
import ContactsPage from "@/pages/admin/contacts-page";
import HeroPage from "@/pages/admin/hero-page";
import InterviewsPage from "@/pages/admin/interviews-page";
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
      <ProtectedAdminRoute path="/admin/hero" component={HeroPage} />
      <ProtectedAdminRoute path="/admin/interviews" component={InterviewsPage} />
      <ProtectedAdminRoute path="/admin/events" component={EventsPage} />
      <ProtectedAdminRoute path="/admin/subscribers" component={SubscribersPage} />
      <ProtectedAdminRoute path="/admin/contacts" component={ContactsPage} />
      <ProtectedAdminRoute path="/admin/blog" component={BlogPage} />
      <ProtectedAdminRoute path="/admin/ebook" component={EbookPage} />
      <ProtectedAdminRoute path="/admin/settings" component={SettingsPage} />
      
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
