import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AdminUser = {
  id: number;
  username: string;
  name?: string;
  email?: string;
  role: string;
};

type AuthContextType = {
  user: AdminUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<AdminUser, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
};

type LoginData = {
  username: string;
  password: string;
};

export const AdminAuthContext = createContext<AuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const {
    data: sessionData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["/api/admin/session"],
    queryFn: async ({ signal }) => {
      const response = await fetch("/api/admin/session", { signal });
      if (!response.ok) {
        throw new Error("Error al verificar sesión");
      }
      const data = await response.json();
      return data;
    },
  });

  const user = sessionData?.authenticated ? sessionData.user : null;

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/admin/login", credentials);
      const data = await res.json();
      return data.user;
    },
    onSuccess: (user: AdminUser) => {
      queryClient.setQueryData(["/api/admin/session"], { authenticated: true, user });
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido, ${user.name || user.username}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error de autenticación",
        description: error.message || "Error al iniciar sesión. Verifique sus credenciales.",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/admin/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/admin/session"], { authenticated: false, user: null });
      toast({
        title: "Sesión cerrada",
        description: "Se ha cerrado la sesión correctamente.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Error al cerrar sesión",
        variant: "destructive",
      });
    },
  });

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth debe ser usado dentro de un AdminAuthProvider");
  }
  return context;
}