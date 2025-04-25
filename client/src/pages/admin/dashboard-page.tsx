import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import AdminLayout from '@/components/admin/admin-layout';
import { MetricsDashboard } from '@/components/admin/metrics-dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Loader2, 
  Users, 
  Calendar, 
  FileText, 
  Mail, 
  BarChart3, 
  SendHorizontal,
  Settings,
  Plus,
  ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    eventsCount: 0,
    subscribersCount: 0,
    contactsCount: 0,
    blogPostsCount: 0,
  });

  // Events data
  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ['/api/admin/events'],
    queryFn: async () => {
      const response = await fetch('/api/admin/events');
      if (!response.ok) throw new Error('Error al cargar eventos');
      return response.json();
    },
  });

  // Subscribers data
  const { data: subscribers, isLoading: isLoadingSubscribers } = useQuery({
    queryKey: ['/api/admin/subscribers'],
    queryFn: async () => {
      const response = await fetch('/api/admin/subscribers');
      if (!response.ok) throw new Error('Error al cargar suscriptores');
      return response.json();
    },
  });

  // Contact messages data
  const { data: contacts, isLoading: isLoadingContacts } = useQuery({
    queryKey: ['/api/admin/contacts'],
    queryFn: async () => {
      const response = await fetch('/api/admin/contacts');
      if (!response.ok) throw new Error('Error al cargar mensajes');
      return response.json();
    },
  });

  // Blog posts data
  const { data: blogPosts, isLoading: isLoadingBlogPosts } = useQuery({
    queryKey: ['/api/admin/blog'],
    queryFn: async () => {
      const response = await fetch('/api/admin/blog');
      if (!response.ok) throw new Error('Error al cargar posts del blog');
      return response.json();
    },
  });

  // Update stats when data is loaded
  useEffect(() => {
    setStats({
      eventsCount: events?.length || 0,
      subscribersCount: subscribers?.length || 0,
      contactsCount: contacts?.length || 0,
      blogPostsCount: blogPosts?.length || 0,
    });
  }, [events, subscribers, contacts, blogPosts]);

  const isLoading = isLoadingEvents || isLoadingSubscribers || isLoadingContacts || isLoadingBlogPosts;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Información general y estadísticas de tu sitio.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Vista General</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analíticas</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Link href="/admin/events">
                    <a className="block w-full">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Eventos
                          </CardTitle>
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stats.eventsCount}</div>
                          <p className="text-xs text-muted-foreground">
                            Eventos programados
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>

                  <Link href="/admin/subscribers">
                    <a className="block w-full">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Suscriptores
                          </CardTitle>
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stats.subscribersCount}</div>
                          <p className="text-xs text-muted-foreground">
                            Suscriptores al newsletter
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>

                  <Link href="/admin/contacts">
                    <a className="block w-full">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Mensajes
                          </CardTitle>
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stats.contactsCount}</div>
                          <p className="text-xs text-muted-foreground">
                            Mensajes de contacto
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>

                  <Link href="/admin/blog">
                    <a className="block w-full">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Blog
                          </CardTitle>
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stats.blogPostsCount}</div>
                          <p className="text-xs text-muted-foreground">
                            Artículos publicados
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Eventos próximos</CardTitle>
                        <CardDescription>
                          Los eventos más cercanos en el calendario
                        </CardDescription>
                      </div>
                      <Link href="/admin/events">
                        <a>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Calendar className="h-4 w-4" />
                            <span className="hidden sm:inline">Ver todos</span>
                          </Button>
                        </a>
                      </Link>
                    </CardHeader>
                    <CardContent>
                      {isLoadingEvents ? (
                        <div className="flex justify-center py-4">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                      ) : events && events.length > 0 ? (
                        <div className="space-y-4">
                          {events.slice(0, 3).map((event: any) => (
                            <div key={event.id} className="flex justify-between items-center border-b pb-2">
                              <div>
                                <p className="font-medium">{event.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {event.venue}, {event.location}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  {event.date} {event.month}
                                </p>
                                <p className="text-xs text-muted-foreground">{event.time}</p>
                              </div>
                            </div>
                          ))}
                          
                          <div className="pt-2 text-center">
                            <Link href="/admin/events">
                              <a className="text-sm text-primary hover:underline inline-flex items-center">
                                Ver todos los eventos
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </a>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-sm text-muted-foreground mb-4">
                            No hay eventos programados
                          </p>
                          <Link href="/admin/events">
                            <a>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Plus className="h-4 w-4" />
                                <span>Crear evento</span>
                              </Button>
                            </a>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Newsletter</CardTitle>
                          <CardDescription>
                            Gestión de comunicaciones
                          </CardDescription>
                        </div>
                        <Link href="/admin/subscribers">
                          <a>
                            <Button variant="outline" size="sm" className="gap-1">
                              <SendHorizontal className="h-4 w-4" />
                              <span className="hidden sm:inline">Gestionar</span>
                            </Button>
                          </a>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-medium text-sm mb-1">Suscriptores</h4>
                          <p className="text-2xl font-bold">{stats.subscribersCount}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Acciones rápidas</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <Link href="/admin/subscribers">
                              <a>
                                <Button variant="outline" className="w-full text-left justify-start gap-2">
                                  <SendHorizontal className="h-4 w-4" />
                                  <span>Enviar email</span>
                                </Button>
                              </a>
                            </Link>
                            <Link href="/admin/subscribers?tab=templates">
                              <a>
                                <Button variant="outline" className="w-full text-left justify-start gap-2">
                                  <FileText className="h-4 w-4" />
                                  <span>Plantillas</span>
                                </Button>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Últimos mensajes</CardTitle>
                      <CardDescription>
                        Mensajes recientes del formulario de contacto
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoadingContacts ? (
                        <div className="flex justify-center py-4">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                      ) : contacts && contacts.length > 0 ? (
                        <div className="space-y-4">
                          {contacts.slice(0, 3).map((contact: any) => (
                            <div key={contact.id} className="flex justify-between items-center border-b pb-2">
                              <div>
                                <p className="font-medium">{contact.name}</p>
                                <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                  {contact.subject}
                                </p>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(contact.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-center text-muted-foreground py-4">
                          No hay mensajes recientes
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Configuración del Sitio</CardTitle>
                          <CardDescription>
                            Personalización y estructura
                          </CardDescription>
                        </div>
                        <Link href="/admin/settings">
                          <a>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Settings className="h-4 w-4" />
                              <span className="hidden sm:inline">Configurar</span>
                            </Button>
                          </a>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Configuración rápida</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <Link href="/admin/settings?tab=sections">
                              <a>
                                <Button variant="outline" className="w-full text-left justify-start gap-2">
                                  <Settings className="h-4 w-4" />
                                  <span>Secciones</span>
                                </Button>
                              </a>
                            </Link>
                            <Link href="/admin/settings?tab=appearance">
                              <a>
                                <Button variant="outline" className="w-full text-left justify-start gap-2">
                                  <Settings className="h-4 w-4" />
                                  <span>Apariencia</span>
                                </Button>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="analytics">
            <MetricsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}