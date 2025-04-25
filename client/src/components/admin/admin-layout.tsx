import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Mail,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  active: boolean;
}

function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <Link href={href}>
      <a
        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
          active
            ? 'bg-primary text-white'
            : 'text-gray-700 hover:bg-accent'
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </a>
    </Link>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return null; // Protected route will handle redirect
  }

  const navItems = [
    {
      href: '/admin/dashboard',
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
    },
    {
      href: '/admin/events',
      icon: <Calendar size={20} />,
      label: 'Eventos',
    },
    {
      href: '/admin/blog',
      icon: <FileText size={20} />,
      label: 'Blog',
    },
    {
      href: '/admin/ebook',
      icon: <BookOpen size={20} />,
      label: 'E-book',
    },
    {
      href: '/admin/subscribers',
      icon: <Mail size={20} />,
      label: 'Suscriptores',
    },
    {
      href: '/admin/contacts',
      icon: <Users size={20} />,
      label: 'Contactos',
    },
    {
      href: '/admin/settings',
      icon: <Settings size={20} />,
      label: 'Configuración',
    },
  ];

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden mr-2"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <Link href="/admin/dashboard">
              <a className="text-xl font-semibold text-primary">Admin Panel</a>
            </Link>
          </div>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <span>{user.name || user.username}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <a className="flex items-center w-full">Ver sitio web</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} disabled={logoutMutation.isPending}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="absolute top-0 left-0 bottom-0 w-64 bg-white p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="mt-8 space-y-1">
                {navItems.map((item) => (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    active={location === item.href}
                  />
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <div className="hidden md:block w-64 bg-white shadow-sm p-4">
          <nav className="mt-8 space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={location === item.href}
              />
            ))}
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}