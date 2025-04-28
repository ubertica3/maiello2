import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/admin-layout";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Edit, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/image-upload";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

const interviewSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
  embedUrl: z.string().min(1, "La URL de embed es obligatoria"),
  thumbnailImage: z.string().optional(),
  imagePosition: z.string().default("center center"),
  imageScale: z.number().min(0.5).max(2).default(1),
  displayOrder: z.number().int().default(0)
});

type Interview = z.infer<typeof interviewSchema> & { id: number };
type InterviewFormValues = z.infer<typeof interviewSchema>;

export default function InterviewsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentInterview, setCurrentInterview] = useState<Interview | null>(null);
  const [previewStyle, setPreviewStyle] = useState({});
  
  // Obtener todas las entrevistas
  const { data: interviews = [], isLoading, error } = useQuery<Interview[]>({
    queryKey: ['/api/admin/interviews'],
  });
  
  // Configurar el formulario
  const form = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      title: "",
      description: "",
      embedUrl: "",
      thumbnailImage: "",
      imagePosition: "center center",
      imageScale: 1,
      displayOrder: 0
    },
  });
  
  // Crear una nueva entrevista
  const createInterviewMutation = useMutation({
    mutationFn: async (data: InterviewFormValues) => {
      const res = await apiRequest("POST", "/api/admin/interviews", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Entrevista creada",
        description: "La entrevista ha sido creada con éxito.",
      });
      setIsDialogOpen(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/admin/interviews'] });
      queryClient.invalidateQueries({ queryKey: ['/api/interviews'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Error al crear la entrevista: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // Actualizar una entrevista existente
  const updateInterviewMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: InterviewFormValues }) => {
      const res = await apiRequest("PUT", `/api/admin/interviews/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Entrevista actualizada",
        description: "La entrevista ha sido actualizada con éxito.",
      });
      setIsDialogOpen(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/admin/interviews'] });
      queryClient.invalidateQueries({ queryKey: ['/api/interviews'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Error al actualizar la entrevista: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // Eliminar una entrevista
  const deleteInterviewMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/interviews/${id}`);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Entrevista eliminada",
        description: "La entrevista ha sido eliminada con éxito.",
      });
      setIsDeleteDialogOpen(false);
      setCurrentInterview(null);
      queryClient.invalidateQueries({ queryKey: ['/api/admin/interviews'] });
      queryClient.invalidateQueries({ queryKey: ['/api/interviews'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Error al eliminar la entrevista: ${error.message}`,
        variant: "destructive",
      });
    }
  });
  
  // Abrir el diálogo para crear una nueva entrevista
  const openCreateDialog = () => {
    form.reset({
      title: "",
      description: "",
      embedUrl: "",
      thumbnailImage: "",
      imagePosition: "center center",
      imageScale: 1,
      displayOrder: interviews.length
    });
    setCurrentInterview(null);
    setIsDialogOpen(true);
  };
  
  // Abrir el diálogo para editar una entrevista existente
  const openEditDialog = (interview: Interview) => {
    form.reset({
      title: interview.title,
      description: interview.description || "",
      embedUrl: interview.embedUrl,
      thumbnailImage: interview.thumbnailImage || "",
      imagePosition: interview.imagePosition || "center center",
      imageScale: interview.imageScale || 1,
      displayOrder: interview.displayOrder || 0
    });
    
    updatePreview(
      interview.imagePosition || "center center", 
      interview.imageScale || 1
    );
    
    setCurrentInterview(interview);
    setIsDialogOpen(true);
  };
  
  // Abrir el diálogo de confirmación para eliminar
  const openDeleteDialog = (interview: Interview) => {
    setCurrentInterview(interview);
    setIsDeleteDialogOpen(true);
  };
  
  // Actualizar la previsualización cuando cambian los valores
  const updatePreview = (position: string, scale: number) => {
    setPreviewStyle({
      objectPosition: position,
      transform: `scale(${scale})`,
    });
  };
  
  // Manejar los cambios en la posición de la imagen
  const handlePositionChange = (value: string) => {
    const currentScale = form.getValues("imageScale");
    updatePreview(value, currentScale);
    form.setValue("imagePosition", value);
  };
  
  // Manejar los cambios en la escala de la imagen
  const handleScaleChange = (value: number[]) => {
    const scale = value[0];
    const currentPosition = form.getValues("imagePosition");
    updatePreview(currentPosition, scale);
    form.setValue("imageScale", scale);
  };
  
  // Enviar el formulario
  const onSubmit = (data: InterviewFormValues) => {
    if (currentInterview) {
      updateInterviewMutation.mutate({ id: currentInterview.id, data });
    } else {
      createInterviewMutation.mutate(data);
    }
  };
  
  // Cambiar el orden de una entrevista
  const changeOrder = (interview: Interview, direction: "up" | "down") => {
    const currentIndex = interviews.findIndex(i => i.id === interview.id);
    let targetIndex;
    
    if (direction === "up" && currentIndex > 0) {
      targetIndex = currentIndex - 1;
    } else if (direction === "down" && currentIndex < interviews.length - 1) {
      targetIndex = currentIndex + 1;
    } else {
      return; // No se puede mover más arriba o más abajo
    }
    
    const targetInterview = interviews[targetIndex];
    
    // Intercambiar órdenes
    updateInterviewMutation.mutate({
      id: interview.id,
      data: { ...interview, displayOrder: targetInterview.displayOrder }
    });
    
    updateInterviewMutation.mutate({
      id: targetInterview.id,
      data: { ...targetInterview, displayOrder: interview.displayOrder }
    });
  };
  
  // Extraer el ID del video de YouTube de una URL de embed
  const getYoutubeEmbedId = (url: string) => {
    const match = url.match(/embed\/([\w-]+)/);
    return match ? match[1] : null;
  };
  
  return (
    <AdminLayout
      title="Administrar Entrevistas"
      description="Gestiona las entrevistas que aparecen en tu sitio web"
      backButton={true}
      backButtonLink="/admin"
    >
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Entrevistas</h2>
          <p className="text-sm text-muted-foreground">
            {interviews.length} entrevistas configuradas
          </p>
        </div>
        <Button onClick={openCreateDialog} className="flex items-center gap-2">
          <Plus size={16} />
          Agregar entrevista
        </Button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">Cargando entrevistas...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          Error al cargar las entrevistas
        </div>
      ) : interviews.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <p className="text-muted-foreground">
            No hay entrevistas configuradas. Haz clic en "Agregar entrevista" para comenzar.
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Orden</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Vista previa</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((interview) => (
                <TableRow key={interview.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => changeOrder(interview, "up")}
                        disabled={interview.displayOrder === 0}
                      >
                        <ArrowUp size={16} />
                      </Button>
                      <span>{interview.displayOrder}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => changeOrder(interview, "down")}
                        disabled={interview.displayOrder === interviews.length - 1}
                      >
                        <ArrowDown size={16} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{interview.title}</TableCell>
                  <TableCell className="line-clamp-2 max-w-xs">
                    {interview.description || "-"}
                  </TableCell>
                  <TableCell>
                    {interview.embedUrl && (
                      <div className="relative w-24 h-16 overflow-hidden rounded-md">
                        {interview.thumbnailImage ? (
                          <img
                            src={interview.thumbnailImage}
                            alt={interview.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={`https://img.youtube.com/vi/${getYoutubeEmbedId(interview.embedUrl)}/mqdefault.jpg`}
                            alt={interview.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                            <div className="w-0 h-0 border-y-4 border-y-transparent border-l-6 border-l-white ml-0.5"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditDialog(interview)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => openDeleteDialog(interview)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Diálogo para crear/editar entrevista */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentInterview ? "Editar" : "Crear"} entrevista
            </DialogTitle>
            <DialogDescription>
              {currentInterview
                ? "Actualiza los detalles de la entrevista seleccionada"
                : "Agrega una nueva entrevista para mostrar en tu sitio web"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Título de la entrevista
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormDescription>
                          Breve descripción o contexto de la entrevista (opcional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="embedUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de embed</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://www.youtube.com/embed/VIDEO_ID"
                          />
                        </FormControl>
                        <FormDescription>
                          URL de iframe para embeber el video (YouTube, Vimeo, etc.)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="thumbnailImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagen de miniatura (opcional)</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Imagen personalizada para mostrar como miniatura (si no se proporciona, se usará la miniatura por defecto del video)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="imagePosition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Posición de la imagen</FormLabel>
                          <div className="grid grid-cols-3 gap-2">
                            {["left top", "center top", "right top", 
                              "left center", "center center", "right center", 
                              "left bottom", "center bottom", "right bottom"].map((position) => (
                              <Button
                                key={position}
                                type="button"
                                variant={field.value === position ? "default" : "outline"}
                                onClick={() => handlePositionChange(position)}
                                className="h-10"
                              >
                                {position.replace(' ', '-')}
                              </Button>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="imageScale"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Escala de la imagen: {field.value.toFixed(2)}</FormLabel>
                          <FormControl>
                            <Slider
                              defaultValue={[field.value]}
                              min={0.5}
                              max={2}
                              step={0.01}
                              onValueChange={handleScaleChange}
                            />
                          </FormControl>
                          <FormDescription>
                            Ajusta el zoom de la imagen
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="displayOrder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Orden de visualización</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormDescription>
                            Número que determina el orden de la entrevista (menor número = aparece primero)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      disabled={createInterviewMutation.isPending || updateInterviewMutation.isPending}
                    >
                      {currentInterview ? "Actualizar" : "Crear"} entrevista
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
            
            <div>
              <Card className="p-1 overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  {form.getValues("thumbnailImage") ? (
                    <img 
                      src={form.getValues("thumbnailImage")} 
                      alt="Preview"
                      className="w-full h-full object-cover transition-transform duration-500"
                      style={previewStyle}
                    />
                  ) : form.getValues("embedUrl") && getYoutubeEmbedId(form.getValues("embedUrl")) ? (
                    <img 
                      src={`https://img.youtube.com/vi/${getYoutubeEmbedId(form.getValues("embedUrl"))}/mqdefault.jpg`}
                      alt="YouTube thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <p className="text-slate-500">Vista previa no disponible</p>
                    </div>
                  )}
                </div>
              </Card>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Vista previa del iframe</h3>
                {form.getValues("embedUrl") ? (
                  <div className="aspect-video w-full border rounded overflow-hidden">
                    <iframe
                      src={form.getValues("embedUrl")}
                      title={form.getValues("title") || "Vista previa"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-slate-100 border rounded flex items-center justify-center">
                    <p className="text-slate-500">Ingresa una URL de embed para ver la vista previa</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente la entrevista "{currentInterview?.title}".
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => currentInterview && deleteInterviewMutation.mutate(currentInterview.id)}
              className="bg-red-500 hover:bg-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}