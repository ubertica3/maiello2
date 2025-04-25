import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Loader2, 
  Mail, 
  Send, 
  Calendar, 
  Clock, 
  Trash2, 
  Search,
  CheckCheck,
  Filter 
} from 'lucide-react';
import { Subscriber } from '@shared/schema';

// Interfaces
interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

interface ScheduledEmail {
  id: string;
  subject: string;
  recipients: string;
  date: string;
  time: string;
  status: 'scheduled' | 'sent' | 'failed';
}

// Datos iniciales para plantillas
const initialTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Bienvenida',
    subject: 'Bienvenido/a a la comunidad de Leo Maiello',
    content: `<p>¡Hola [nombre]!</p>
<p>Gracias por unirte a mi newsletter. Me alegra mucho que quieras formar parte de esta comunidad.</p>
<p>Te mantendré informado/a sobre:</p>
<ul>
  <li>Mis próximos eventos y charlas</li>
  <li>Nuevo contenido exclusivo</li>
  <li>Reflexiones sobre relaciones y bienestar emocional</li>
</ul>
<p>Mientras tanto, puedes seguirme en mis redes sociales para no perderte nada.</p>
<p>¡Saludos cordiales!</p>
<p>Leo Maiello</p>`,
  },
  {
    id: '2',
    name: 'Anuncio de Evento',
    subject: 'Nuevo evento: Te invito a mi próxima charla',
    content: `<p>¡Hola [nombre]!</p>
<p>Te escribo para invitarte a mi próximo evento que se realizará el [fecha] en [lugar].</p>
<p>En esta ocasión, hablaremos sobre:</p>
<ul>
  <li>Las relaciones en la era digital</li>
  <li>Cómo cultivar conexiones auténticas</li>
  <li>Estrategias para una comunicación efectiva</li>
</ul>
<p>¡No te lo pierdas! Las entradas ya están disponibles en mi sitio web.</p>
<p>¡Espero verte allí!</p>
<p>Leo Maiello</p>`,
  },
];

// Datos iniciales para emails programados
const initialScheduledEmails: ScheduledEmail[] = [];

export default function SubscribersPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('subscribers');
  const [selectedSubscribers, setSelectedSubscribers] = useState<{[key: number]: boolean}>({});
  const [selectAll, setSelectAll] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(initialTemplates);
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>(initialScheduledEmails);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  
  // Estado para diálogos
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [composeData, setComposeData] = useState({
    subject: '',
    content: '',
    template: '',
  });
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
  });

  // Obtener suscriptores
  const { data: subscribers, isLoading } = useQuery({
    queryKey: ['/api/admin/subscribers'],
    queryFn: async () => {
      const response = await fetch('/api/admin/subscribers');
      if (!response.ok) throw new Error('Error al cargar suscriptores');
      return response.json() as Promise<Subscriber[]>;
    },
  });

  // Mutación para eliminar suscriptor
  const deleteSubscriberMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/subscribers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar suscriptor');
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/subscribers'] });
      toast({
        title: 'Suscriptor eliminado',
        description: 'El suscriptor ha sido eliminado correctamente',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al eliminar suscriptor',
        variant: 'destructive',
      });
    },
  });

  // Manejo de selección de todos los suscriptores
  useEffect(() => {
    if (subscribers) {
      const newSelection = { ...selectedSubscribers };
      subscribers.forEach((sub) => {
        newSelection[sub.id] = selectAll;
      });
      setSelectedSubscribers(newSelection);
    }
  }, [selectAll, subscribers]);

  // Toggle para seleccionar un suscriptor
  const toggleSubscriber = (id: number) => {
    setSelectedSubscribers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Obtener cantidad de suscriptores seleccionados
  const getSelectedCount = () => {
    return Object.values(selectedSubscribers).filter(Boolean).length;
  };

  // Filtrar suscriptores
  const getFilteredSubscribers = () => {
    if (!subscribers) return [];
    return subscribers.filter(
      (sub) =>
        sub.name.toLowerCase().includes(filterText.toLowerCase()) ||
        sub.email.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  // Manejar apertura de compose dialog
  const handleComposeOpen = (template?: EmailTemplate) => {
    if (template) {
      setComposeData({
        subject: template.subject,
        content: template.content,
        template: template.id,
      });
      setSelectedTemplate(template);
    } else {
      setComposeData({
        subject: '',
        content: '',
        template: '',
      });
      setSelectedTemplate(null);
    }
    setIsComposeOpen(true);
  };

  // Manejar cambio de plantilla
  const handleTemplateChange = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === templateId);
    if (template) {
      setComposeData({
        subject: template.subject,
        content: template.content,
        template: templateId,
      });
      setSelectedTemplate(template);
    }
  };

  // Manejar envío de email
  const handleSendEmail = () => {
    // Simulación de envío
    const recipientCount = getSelectedCount();
    
    toast({
      title: 'Email enviado correctamente',
      description: `El email ha sido enviado a ${recipientCount} suscriptores.`,
    });
    
    setIsComposeOpen(false);
    setSelectedSubscribers({});
    setSelectAll(false);
  };

  // Manejar programación de email
  const handleScheduleEmail = () => {
    if (!scheduleData.date || !scheduleData.time) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor selecciona fecha y hora.',
        variant: 'destructive',
      });
      return;
    }
    
    const recipients = getSelectedCount();
    const newScheduledEmail: ScheduledEmail = {
      id: Date.now().toString(),
      subject: composeData.subject,
      recipients: `${recipients} suscriptor${recipients !== 1 ? 'es' : ''}`,
      date: scheduleData.date,
      time: scheduleData.time,
      status: 'scheduled',
    };
    
    setScheduledEmails([...scheduledEmails, newScheduledEmail]);
    
    toast({
      title: 'Email programado',
      description: `El email ha sido programado para el ${scheduleData.date} a las ${scheduleData.time}.`,
    });
    
    setIsScheduleOpen(false);
    setIsComposeOpen(false);
    setSelectedSubscribers({});
    setSelectAll(false);
  };

  // Manejar eliminación de email programado
  const handleDeleteScheduledEmail = (id: string) => {
    setScheduledEmails(scheduledEmails.filter((email) => email.id !== id));
    toast({
      title: 'Email eliminado',
      description: 'El email programado ha sido eliminado.',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Suscriptores del Newsletter</h1>
            <p className="text-muted-foreground">
              Gestiona tus suscriptores y envía comunicaciones
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="subscribers" className="gap-2">
              <Mail className="h-4 w-4" />
              <span>Suscriptores</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-2">
              <CheckCheck className="h-4 w-4" />
              <span>Plantillas</span>
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Programados</span>
            </TabsTrigger>
          </TabsList>

          {/* Pestaña de Suscriptores */}
          <TabsContent value="subscribers" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Buscar suscriptores..."
                        className="pl-8"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon" title="Filtrar">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleComposeOpen()}
                      disabled={getSelectedCount() === 0}
                      className="flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>Enviar Email</span>
                    </Button>
                  </div>
                </div>

                {subscribers && subscribers.length > 0 ? (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox
                              checked={selectAll}
                              onCheckedChange={() => setSelectAll(!selectAll)}
                            />
                          </TableHead>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Fecha de suscripción</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredSubscribers().map((subscriber) => (
                          <TableRow key={subscriber.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedSubscribers[subscriber.id] || false}
                                onCheckedChange={() => toggleSubscriber(subscriber.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{subscriber.name}</TableCell>
                            <TableCell>{subscriber.email}</TableCell>
                            <TableCell>
                              {new Date(subscriber.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteSubscriberMutation.mutate(subscriber.id)}
                                aria-label="Eliminar suscriptor"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border border-dashed rounded-lg">
                    <Mail className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      {filterText ? 'No se encontraron suscriptores' : 'No hay suscriptores aún'}
                    </p>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          {/* Pestaña de Plantillas */}
          <TabsContent value="templates" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Plantillas de Email</h2>
              <Button>Nueva Plantilla</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {emailTemplates.map((template) => (
                <div
                  key={template.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{template.subject}</p>
                  </div>
                  <div className="p-4 bg-gray-50 max-h-32 overflow-hidden">
                    <div
                      className="text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: template.content.substring(0, 150) + '...',
                      }}
                    />
                  </div>
                  <div className="p-3 border-t flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleComposeOpen(template)}
                    >
                      Usar
                    </Button>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Pestaña de Emails Programados */}
          <TabsContent value="scheduled" className="space-y-4">
            <h2 className="text-lg font-semibold">Emails Programados</h2>

            {scheduledEmails.length > 0 ? (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asunto</TableHead>
                      <TableHead>Destinatarios</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledEmails.map((email) => (
                      <TableRow key={email.id}>
                        <TableCell className="font-medium">{email.subject}</TableCell>
                        <TableCell>{email.recipients}</TableCell>
                        <TableCell>{email.date}</TableCell>
                        <TableCell>{email.time}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs capitalize ${
                              email.status === 'scheduled'
                                ? 'bg-yellow-100 text-yellow-800'
                                : email.status === 'sent'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {email.status === 'scheduled'
                              ? 'Programado'
                              : email.status === 'sent'
                              ? 'Enviado'
                              : 'Fallido'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteScheduledEmail(email.id)}
                            disabled={email.status === 'sent'}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border border-dashed rounded-lg">
                <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No hay emails programados</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Diálogo de Composición de Email */}
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Enviar Email ({getSelectedCount()} destinatarios)</DialogTitle>
              <DialogDescription>
                Crea un email para enviar a los suscriptores seleccionados
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="template">Usar plantilla (opcional)</Label>
                <Select
                  value={composeData.template}
                  onValueChange={handleTemplateChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plantilla" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  value={composeData.subject}
                  onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                  placeholder="Asunto del email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenido</Label>
                <div className="border rounded-md">
                  <Textarea
                    id="content"
                    value={composeData.content}
                    onChange={(e) => setComposeData({ ...composeData, content: e.target.value })}
                    placeholder="Escribe el contenido del email..."
                    className="min-h-[200px] resize-none"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Usa [nombre] para personalizar el mensaje con el nombre del suscriptor.
                </p>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setIsScheduleOpen(true)}
                className="gap-2 sm:flex-1"
              >
                <Calendar className="h-4 w-4" />
                <span>Programar</span>
              </Button>
              <Button onClick={handleSendEmail} className="gap-2 sm:flex-1">
                <Send className="h-4 w-4" />
                <span>Enviar ahora</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo de Programación de Email */}
        <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Programar Email</DialogTitle>
              <DialogDescription>
                Selecciona la fecha y hora para enviar este email
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={scheduleData.date}
                  onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Hora</Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduleData.time}
                  onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsScheduleOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleScheduleEmail}>Programar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}