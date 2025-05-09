import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import AdminLayout from '@/components/admin/admin-layout';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { ImageUpload } from '@/components/admin/image-upload';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PlusCircle, Edit, Trash2, Loader2, ArrowLeft, Calendar, Presentation } from 'lucide-react';

type Event = {
  id: number;
  title: string;
  venue: string;
  location: string;
  date: string;
  month: string;
  time: string;
  image: string;
  ticketUrl: string;
  eventType: "event" | "workshop";
  createdAt: string;
  updatedAt: string;
};

type EventFormData = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;

const emptyEventForm: EventFormData = {
  title: '',
  venue: '',
  location: '',
  date: '',
  month: '',
  time: '',
  image: '',
  ticketUrl: '',
  eventType: 'event',
};

export default function EventsPage() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<EventFormData>(emptyEventForm);
  const [eventType, setEventType] = useState<"event" | "workshop">("event");

  // Fetch events
  const { data: events, isLoading } = useQuery({
    queryKey: ['/api/admin/events'],
    queryFn: async () => {
      const response = await fetch('/api/admin/events');
      if (!response.ok) throw new Error('Error al cargar eventos');
      return response.json() as Promise<Event[]>;
    },
  });

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: async (data: EventFormData) => {
      const response = await apiRequest('POST', '/api/admin/events', data);
      return response.json();
    },
    onSuccess: () => {
      // Invalidar tanto las consultas de admin como las públicas
      queryClient.invalidateQueries({ queryKey: ['/api/admin/events'] });
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: 'Evento creado',
        description: 'El evento ha sido creado exitosamente.',
      });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Hubo un error al crear el evento.',
        variant: 'destructive',
      });
    },
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: EventFormData }) => {
      const response = await apiRequest('PUT', `/api/admin/events/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      // Invalidar tanto las consultas de admin como las públicas
      queryClient.invalidateQueries({ queryKey: ['/api/admin/events'] });
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: 'Evento actualizado',
        description: 'El evento ha sido actualizado exitosamente.',
      });
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Hubo un error al actualizar el evento.',
        variant: 'destructive',
      });
    },
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/admin/events/${id}`);
    },
    onSuccess: () => {
      // Invalidar tanto las consultas de admin como las públicas
      queryClient.invalidateQueries({ queryKey: ['/api/admin/events'] });
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: 'Evento eliminado',
        description: 'El evento ha sido eliminado exitosamente.',
      });
      setIsDeleteDialogOpen(false);
      setCurrentEvent(null);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Hubo un error al eliminar el evento.',
        variant: 'destructive',
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEventMutation.mutate(formData);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEvent) return;
    updateEventMutation.mutate({ id: currentEvent.id, data: formData });
  };

  const handleDeleteConfirm = () => {
    if (!currentEvent) return;
    deleteEventMutation.mutate(currentEvent.id);
  };

  const openEditDialog = (event: Event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      venue: event.venue,
      location: event.location,
      date: event.date,
      month: event.month,
      time: event.time,
      image: event.image,
      ticketUrl: event.ticketUrl,
      eventType: event.eventType || 'event',
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (event: Event) => {
    setCurrentEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData(emptyEventForm);
    setCurrentEvent(null);
  };

  const openCreateDialog = (type: "event" | "workshop") => {
    setFormData({...emptyEventForm, eventType: type});
    setIsCreateDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Eventos y Talleres</h1>
            <p className="text-muted-foreground">
              Administra los eventos, presentaciones y talleres.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : events && events.length > 0 ? (
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-[400px] grid-cols-2 mb-6">
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Eventos
              </TabsTrigger>
              <TabsTrigger value="workshops" className="flex items-center gap-2">
                <Presentation className="h-4 w-4" />
                Talleres
              </TabsTrigger>
            </TabsList>
            
            {/* Pestaña de Eventos */}
            <TabsContent value="events">
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={() => openCreateDialog("event")}
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  <span>Nuevo Evento</span>
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Lugar</TableHead>
                      <TableHead>Ciudad</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events
                      .filter(event => event.eventType === 'event')
                      .map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.title}</TableCell>
                          <TableCell>{event.venue}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.date} {event.month}</TableCell>
                          <TableCell>{event.time}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => openEditDialog(event)}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => openDeleteDialog(event)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    {events.filter(event => event.eventType === 'event').length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <p className="text-muted-foreground">No hay eventos disponibles</p>
                          <Button 
                            onClick={() => openCreateDialog("event")} 
                            variant="outline" 
                            className="mt-2"
                          >
                            <PlusCircle size={16} className="mr-2" />
                            Crear Primer Evento
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Pestaña de Talleres */}
            <TabsContent value="workshops">
              <div className="flex justify-end mb-4">
                <Button 
                  onClick={() => openCreateDialog("workshop")}
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  <span>Nuevo Taller</span>
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Lugar</TableHead>
                      <TableHead>Ciudad</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events
                      .filter(event => event.eventType === 'workshop')
                      .map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.title}</TableCell>
                          <TableCell>{event.venue}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.date} {event.month}</TableCell>
                          <TableCell>{event.time}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => openEditDialog(event)}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => openDeleteDialog(event)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    {events.filter(event => event.eventType === 'workshop').length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <p className="text-muted-foreground">No hay talleres disponibles</p>
                          <Button 
                            onClick={() => openCreateDialog("workshop")}
                            variant="outline" 
                            className="mt-2"
                          >
                            <PlusCircle size={16} className="mr-2" />
                            Crear Primer Taller
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border border-dashed rounded-lg">
            <p className="text-muted-foreground mb-4">No hay eventos ni talleres disponibles</p>
            <div className="flex gap-4">
              <Button 
                onClick={() => openCreateDialog("event")}
                className="flex items-center gap-2"
              >
                <Calendar size={16} />
                Crear Primer Evento
              </Button>
              <Button 
                onClick={() => openCreateDialog("workshop")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Presentation size={16} />
                Crear Primer Taller
              </Button>
            </div>
          </div>
        )}

        {/* Create Event Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Crear Nuevo {formData.eventType === 'event' ? 'Evento' : 'Taller'}
              </DialogTitle>
              <DialogDescription>
                Completa el formulario para crear un nuevo {formData.eventType === 'event' ? 'evento' : 'taller'}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder={`Título del ${formData.eventType === 'event' ? 'evento' : 'taller'}`}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue">Lugar</Label>
                  <Input
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    placeholder="Teatro, centro cultural, etc."
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Ciudad</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Ciudad"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <Input
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="Ej: 20:00 hs"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Día</Label>
                  <Input
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="Ej: 15"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="month">Mes</Label>
                  <Input
                    id="month"
                    name="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    placeholder="Ej: JUN"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">URL de Imagen</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder={`URL de la imagen del ${formData.eventType === 'event' ? 'evento' : 'taller'}`}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subir nueva imagen</Label>
                  <ImageUpload 
                    onImageUploaded={(imageUrl: string) => {
                      setFormData(prev => ({
                        ...prev,
                        image: imageUrl
                      }));
                    }}
                    defaultImageUrl={formData.image}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticketUrl">URL de Compra de Entradas</Label>
                <Input
                  id="ticketUrl"
                  name="ticketUrl"
                  value={formData.ticketUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.passline.com/eventos/..."
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enlace directo donde los asistentes pueden comprar entradas para este {formData.eventType === 'event' ? 'evento' : 'taller'}
                </p>
              </div>
              
              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="mr-2"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={createEventMutation.isPending}
                  className="px-6"
                >
                  {createEventMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando...
                    </>
                  ) : (
                    `Crear ${formData.eventType === 'event' ? 'Evento' : 'Taller'}`
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Event Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Editar {currentEvent?.eventType === 'workshop' ? 'Taller' : 'Evento'}
              </DialogTitle>
              <DialogDescription>
                Actualiza la información del {currentEvent?.eventType === 'workshop' ? 'taller' : 'evento'}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Título</Label>
                  <Input
                    id="edit-title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-venue">Lugar</Label>
                  <Input
                    id="edit-venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Ciudad</Label>
                  <Input
                    id="edit-location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-time">Hora</Label>
                  <Input
                    id="edit-time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Día</Label>
                  <Input
                    id="edit-date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-month">Mes</Label>
                  <Input
                    id="edit-month"
                    name="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-image">URL de Imagen</Label>
                  <Input
                    id="edit-image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subir nueva imagen</Label>
                  <ImageUpload 
                    onImageUploaded={(imageUrl: string) => {
                      setFormData(prev => ({
                        ...prev,
                        image: imageUrl
                      }));
                    }}
                    defaultImageUrl={formData.image}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-eventType">Tipo</Label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value) => handleSelectChange("eventType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">Evento</SelectItem>
                    <SelectItem value="workshop">Taller/Workshop</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Selecciona si es un evento o un taller/workshop
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-ticketUrl">URL de Compra de Entradas</Label>
                <Input
                  id="edit-ticketUrl"
                  name="ticketUrl"
                  value={formData.ticketUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.passline.com/eventos/..."
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enlace directo donde los asistentes pueden comprar entradas
                </p>
              </div>
              
              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="mr-2"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={updateEventMutation.isPending}
                  className="px-6"
                >
                  {updateEventMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Actualizando...
                    </>
                  ) : (
                    'Guardar Cambios'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Eliminar {currentEvent?.eventType === 'workshop' ? 'Taller' : 'Evento'}
              </DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar este {currentEvent?.eventType === 'workshop' ? 'taller' : 'evento'}? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <div className="pt-4">
              {currentEvent && (
                <div className="mb-4 p-4 bg-gray-50 rounded-md">
                  <p className="font-medium">{currentEvent.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentEvent.venue}, {currentEvent.location} - {currentEvent.date} {currentEvent.month} {currentEvent.time}
                  </p>
                </div>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteConfirm}
                  disabled={deleteEventMutation.isPending}
                >
                  {deleteEventMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Eliminando...
                    </>
                  ) : (
                    'Eliminar'
                  )}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}