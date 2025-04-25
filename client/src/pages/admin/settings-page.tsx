import { useState, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2, Pencil, Grip, Eye, EyeOff, ArrowUp, ArrowDown, Save, LayoutGrid } from 'lucide-react';

// Interfaces
interface SectionConfig {
  id: string;
  name: string;
  componentName: string;
  visible: boolean;
  order: number;
  description: string;
  icon: string;
}

// Datos iniciales para las secciones
const initialSections: SectionConfig[] = [
  {
    id: 'hero',
    name: 'Hero Principal',
    componentName: 'Hero',
    visible: true,
    order: 1,
    description: 'Banner principal del sitio con imagen y llamada a la acción.',
    icon: '🌠',
  },
  {
    id: 'about',
    name: 'Sobre Mí',
    componentName: 'About',
    visible: true,
    order: 2,
    description: 'Información biográfica y detalles sobre el artista.',
    icon: '👤',
  },
  {
    id: 'events',
    name: 'Eventos',
    componentName: 'Events',
    visible: true,
    order: 3,
    description: 'Listado de próximos eventos y presentaciones.',
    icon: '📅',
  },
  {
    id: 'ebook',
    name: 'E-Book',
    componentName: 'Ebook',
    visible: true,
    order: 4,
    description: 'Promoción del libro electrónico con opción de compra.',
    icon: '📚',
  },
  {
    id: 'videos',
    name: 'Videos',
    componentName: 'Videos',
    visible: true,
    order: 5,
    description: 'Sección de videos y entrevistas destacadas.',
    icon: '🎬',
  },
  {
    id: 'social',
    name: 'Redes Sociales',
    componentName: 'Social',
    visible: true,
    order: 6,
    description: 'Integración con redes sociales y publicaciones recientes.',
    icon: '📱',
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    componentName: 'Newsletter',
    visible: true,
    order: 7,
    description: 'Formulario de suscripción al boletín de noticias.',
    icon: '✉️',
  },
  {
    id: 'contact',
    name: 'Contacto',
    componentName: 'Contact',
    visible: true,
    order: 8,
    description: 'Formulario de contacto y detalles de comunicación.',
    icon: '📝',
  },
];

export default function SettingsPage() {
  const { toast } = useToast();
  const [sections, setSections] = useState<SectionConfig[]>(initialSections);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isResetAlertOpen, setIsResetAlertOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<SectionConfig | null>(null);
  const [draggedSection, setDraggedSection] = useState<SectionConfig | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const dragOverItemIndex = useRef<number | null>(null);

  // Simular API para guardar configuración
  const saveSectionsMutation = useMutation({
    mutationFn: async (sections: SectionConfig[]) => {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Aquí se conectaría a la API real
      return sections;
    },
    onSuccess: () => {
      toast({
        title: 'Configuración guardada',
        description: 'Los cambios han sido guardados correctamente',
      });
      setHasUnsavedChanges(false);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudieron guardar los cambios',
        variant: 'destructive',
      });
    },
  });

  // Función para iniciar arrastre
  const handleDragStart = (section: SectionConfig) => {
    setDraggedSection(section);
    setIsDragging(true);
  };

  // Función para cuando se arrastra sobre otro elemento
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragOverItemIndex.current = index;
  };

  // Función para soltar el elemento
  const handleDrop = () => {
    if (draggedSection && dragOverItemIndex.current !== null) {
      const newSections = [...sections];
      const draggedItemIndex = sections.findIndex((s) => s.id === draggedSection.id);
      
      // Quitar el elemento arrastrado
      const [reorderedItem] = newSections.splice(draggedItemIndex, 1);
      
      // Insertar el elemento en la nueva posición
      newSections.splice(dragOverItemIndex.current, 0, reorderedItem);
      
      // Actualizar el orden
      const updatedSections = newSections.map((section, idx) => ({
        ...section,
        order: idx + 1,
      }));
      
      setSections(updatedSections);
      setHasUnsavedChanges(true);
      dragOverItemIndex.current = null;
    }
    setIsDragging(false);
    setDraggedSection(null);
  };

  // Función para cancelar arrastre
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedSection(null);
    dragOverItemIndex.current = null;
  };

  // Función para mover una sección hacia arriba
  const moveSectionUp = (id: string) => {
    const index = sections.findIndex((s) => s.id === id);
    if (index <= 0) return;
    
    const newSections = [...sections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    
    // Actualizar el orden
    const updatedSections = newSections.map((section, idx) => ({
      ...section,
      order: idx + 1,
    }));
    
    setSections(updatedSections);
    setHasUnsavedChanges(true);
  };

  // Función para mover una sección hacia abajo
  const moveSectionDown = (id: string) => {
    const index = sections.findIndex((s) => s.id === id);
    if (index >= sections.length - 1) return;
    
    const newSections = [...sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    
    // Actualizar el orden
    const updatedSections = newSections.map((section, idx) => ({
      ...section,
      order: idx + 1,
    }));
    
    setSections(updatedSections);
    setHasUnsavedChanges(true);
  };

  // Función para cambiar visibilidad
  const toggleSectionVisibility = (id: string) => {
    const newSections = sections.map((section) =>
      section.id === id ? { ...section, visible: !section.visible } : section
    );
    
    setSections(newSections);
    setHasUnsavedChanges(true);
  };

  // Función para abrir diálogo de edición
  const openEditDialog = (section: SectionConfig) => {
    setEditingSection(section);
    setIsEditDialogOpen(true);
  };

  // Función para guardar cambios
  const saveChanges = () => {
    saveSectionsMutation.mutate(sections);
  };

  // Función para restaurar configuración predeterminada
  const resetToDefault = () => {
    setSections(initialSections);
    setHasUnsavedChanges(true);
    setIsResetAlertOpen(false);
    toast({
      title: 'Configuración restaurada',
      description: 'Se ha restaurado la configuración predeterminada',
    });
  };

  // Ordenar secciones por el campo order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Configuración del Sitio</h1>
            <p className="text-muted-foreground">
              Personaliza las secciones visibles y su orden de aparición
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsResetAlertOpen(true)}
            >
              Restaurar predeterminado
            </Button>
            <Button
              onClick={saveChanges}
              disabled={!hasUnsavedChanges || saveSectionsMutation.isPending}
              className="flex items-center gap-2"
            >
              {saveSectionsMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Guardar Cambios</span>
                </>
              )}
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="sections" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sections" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              <span>Secciones</span>
            </TabsTrigger>
            <TabsTrigger value="appearance">Apariencia</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Organización de Secciones</CardTitle>
                <CardDescription>
                  Arrastra y suelta las secciones para cambiar su orden. Haz clic en el ícono de ojo para mostrar u ocultar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sortedSections.map((section, index) => (
                    <div
                      key={section.id}
                      draggable
                      onDragStart={() => handleDragStart(section)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={handleDrop}
                      onDragEnd={handleDragEnd}
                      className={`border rounded-md p-4 ${
                        isDragging && draggedSection?.id === section.id
                          ? 'opacity-50 border-dashed'
                          : ''
                      } ${
                        !section.visible ? 'bg-gray-50' : 'bg-white'
                      } hover:shadow-sm transition-all cursor-grab active:cursor-grabbing`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">{section.icon}</div>
                          <div className="flex flex-col">
                            <span className="font-medium">{section.name}</span>
                            <span className="text-sm text-muted-foreground hidden md:inline">
                              {section.description}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => toggleSectionVisibility(section.id)}
                            title={section.visible ? 'Ocultar sección' : 'Mostrar sección'}
                          >
                            {section.visible ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => moveSectionUp(section.id)}
                            disabled={index === 0}
                            title="Mover hacia arriba"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => moveSectionDown(section.id)}
                            disabled={index === sections.length - 1}
                            title="Mover hacia abajo"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          
                          <Button variant="ghost" size="icon" className="cursor-grab">
                            <Grip className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Las secciones invisibles no se mostrarán en el sitio web, pero se mantendrán en la configuración.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Personalización de Apariencia</CardTitle>
                <CardDescription>
                  Ajusta la apariencia general del sitio web
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="colors">
                    <AccordionTrigger>Colores</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 py-2">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="primary-color">Color Principal</Label>
                          <div className="flex items-center space-x-2">
                            <input
                              id="primary-color"
                              type="color"
                              value="#a72a2a"
                              className="w-10 h-10 rounded-md border"
                            />
                            <div>
                              <span className="font-mono text-sm ml-2">#a72a2a</span>
                              <p className="text-sm text-muted-foreground">
                                Color principal usado en botones y elementos destacados
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="secondary-color">Color Secundario</Label>
                          <div className="flex items-center space-x-2">
                            <input
                              id="secondary-color"
                              type="color"
                              value="#7e1e1e"
                              className="w-10 h-10 rounded-md border"
                            />
                            <div>
                              <span className="font-mono text-sm ml-2">#7e1e1e</span>
                              <p className="text-sm text-muted-foreground">
                                Color secundario para efectos de hover y énfasis
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="fonts">
                    <AccordionTrigger>Tipografías</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label>Familia Tipográfica de Títulos</Label>
                          <div className="flex items-center space-x-2">
                            <select className="w-full p-2 rounded-md border">
                              <option value="montserrat">Montserrat</option>
                              <option value="roboto">Roboto</option>
                              <option value="playfair">Playfair Display</option>
                              <option value="oswald">Oswald</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-1.5">
                          <Label>Familia Tipográfica de Texto</Label>
                          <div className="flex items-center space-x-2">
                            <select className="w-full p-2 rounded-md border">
                              <option value="opensans">Open Sans</option>
                              <option value="roboto">Roboto</option>
                              <option value="lato">Lato</option>
                              <option value="poppins">Poppins</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="animations">
                    <AccordionTrigger>Animaciones</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="animations-enabled" defaultChecked />
                          <Label htmlFor="animations-enabled">Activar animaciones</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Habilita o deshabilita las animaciones cuando se hace scroll en la página
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>Optimización para Motores de Búsqueda</CardTitle>
                <CardDescription>
                  Mejora la visibilidad de tu sitio en los resultados de búsqueda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-title">Título del Sitio</Label>
                    <input
                      id="site-title"
                      className="w-full p-2 rounded-md border"
                      defaultValue="Leo Maiello | Psicólogo"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="site-description">Descripción del Sitio</Label>
                    <textarea
                      id="site-description"
                      className="w-full p-2 rounded-md border resize-none h-20"
                      defaultValue="Leo Maiello - Psicólogo especializado en relaciones interpersonales en la era digital. Charlas, eventos y contenido sobre bienestar emocional."
                    />
                    <p className="text-xs text-muted-foreground">
                      Descripción breve que aparecerá en los resultados de búsqueda
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="site-keywords">Palabras Clave</Label>
                    <input
                      id="site-keywords"
                      className="w-full p-2 rounded-md border"
                      defaultValue="psicología, relaciones, bienestar emocional, Leo Maiello, charlas, eventos"
                    />
                    <p className="text-xs text-muted-foreground">
                      Palabras clave separadas por comas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Diálogo de Reset */}
        <AlertDialog open={isResetAlertOpen} onOpenChange={setIsResetAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Restaurar configuración predeterminada?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción restablecerá todas las secciones a su estado inicial, incluyendo su
                visibilidad y orden. Los cambios no guardados se perderán.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={resetToDefault}>
                Restaurar predeterminado
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}