import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import AdminLayout from '@/components/admin/admin-layout';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { ArrowLeft, Loader2, Trash, ExternalLink, Mail, Calendar } from 'lucide-react';
import { Link } from 'wouter';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';

type Contact = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export default function ContactsPage() {
  const { toast } = useToast();
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);

  // Fetch contacts
  const { data: contacts, isLoading } = useQuery({
    queryKey: ['/api/admin/contacts'],
    queryFn: async () => {
      const response = await fetch('/api/admin/contacts');
      if (!response.ok) {
        throw new Error('Error al cargar los mensajes de contacto');
      }
      return response.json() as Promise<Contact[]>;
    },
  });

  // Delete contact mutation
  const deleteContactMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/admin/contacts/${id}`);
      if (!response.ok) {
        throw new Error('Error al eliminar el mensaje');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contacts'] });
      toast({
        title: 'Mensaje eliminado',
        description: 'El mensaje ha sido eliminado exitosamente.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Hubo un error al eliminar el mensaje.',
        variant: 'destructive',
      });
    },
  });

  const handleDeleteContact = (id: number) => {
    setContactToDelete(null);
    deleteContactMutation.mutate(id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mensajes de Contacto</h1>
            <p className="text-muted-foreground">
              Gestiona los mensajes recibidos a través del formulario de contacto.
            </p>
          </div>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </div>

        {contacts && contacts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {contacts.map((contact) => (
              <Card key={contact.id} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{contact.subject}</CardTitle>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 h-8 w-8 p-0"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción eliminará permanentemente el mensaje y no se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteContact(contact.id)}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <CardDescription className="flex flex-col space-y-1">
                    <span className="flex items-center">
                      <Mail className="h-3 w-3 mr-1 inline" />
                      <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                        {contact.name} &lt;{contact.email}&gt;
                      </a>
                    </span>
                    <span className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1 inline" />
                      {formatDate(contact.createdAt)}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line text-sm">{contact.message}</p>
                </CardContent>
                <CardFooter className="pt-2 flex justify-end">
                  <a 
                    href={`mailto:${contact.email}?subject=Re: ${contact.subject}`} 
                    className="inline-flex items-center text-xs text-primary hover:underline"
                  >
                    Responder
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg text-center font-medium">No hay mensajes de contacto</p>
              <p className="text-muted-foreground text-center mt-1">
                Cuando recibas mensajes a través del formulario de contacto, aparecerán aquí.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}