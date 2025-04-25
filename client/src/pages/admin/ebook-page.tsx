import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import AdminLayout from '@/components/admin/admin-layout';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { ImageUpload } from '@/components/admin/image-upload';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, Plus, Trash, ArrowLeft } from 'lucide-react';

type Ebook = {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  price: string;
  salePrice?: string;
  buyLink: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
};

type EbookFormData = Omit<Ebook, 'id' | 'createdAt' | 'updatedAt'>;

export default function EbookPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<EbookFormData>({
    title: '',
    description: '',
    coverImage: '',
    price: '',
    salePrice: '',
    buyLink: '',
    features: []
  });
  const [newFeature, setNewFeature] = useState('');

  // Fetch ebook
  const { data: ebook, isLoading } = useQuery({
    queryKey: ['/api/admin/ebook'],
    queryFn: async () => {
      const response = await fetch('/api/admin/ebook');
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Error al cargar información del e-book');
      }
      return response.json() as Promise<Ebook>;
    },
  });

  // Update effect to set form data when ebook is loaded
  useEffect(() => {
    if (ebook) {
      setFormData({
        title: ebook.title,
        description: ebook.description,
        coverImage: ebook.coverImage,
        price: ebook.price,
        salePrice: ebook.salePrice || '',
        buyLink: ebook.buyLink,
        features: Array.isArray(ebook.features) ? ebook.features : []
      });
    }
  }, [ebook]);

  // Update ebook mutation
  const updateEbookMutation = useMutation({
    mutationFn: async (data: EbookFormData) => {
      const response = await apiRequest('PUT', '/api/admin/ebook', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ebook'] });
      toast({
        title: 'E-book actualizado',
        description: 'La información del e-book ha sido actualizada exitosamente.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Hubo un error al actualizar el e-book.',
        variant: 'destructive',
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEbookMutation.mutate(formData);
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">E-book</h1>
          <p className="text-muted-foreground">
            Gestiona la información del e-book que se muestra en tu sitio web.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
                <CardDescription>
                  Datos básicos del e-book
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Título del e-book"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descripción del e-book"
                    className="min-h-[120px]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="coverImage">URL de la Imagen de Portada</Label>
                  <Input
                    id="coverImage"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleInputChange}
                    placeholder="URL de la imagen de portada"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalles de Compra</CardTitle>
                <CardDescription>
                  Precios y enlaces
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio Regular</Label>
                    <Input
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Ej: $49.99"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salePrice">Precio de Oferta (opcional)</Label>
                    <Input
                      id="salePrice"
                      name="salePrice"
                      value={formData.salePrice}
                      onChange={handleInputChange}
                      placeholder="Ej: $39.99"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="buyLink">Enlace de Compra</Label>
                  <Input
                    id="buyLink"
                    name="buyLink"
                    value={formData.buyLink}
                    onChange={handleInputChange}
                    placeholder="URL para comprar el e-book"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Características del E-book</CardTitle>
                <CardDescription>
                  Agrega los puntos clave o beneficios del e-book
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Nueva característica o beneficio"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleAddFeature}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar
                  </Button>
                </div>
                
                <div className="space-y-2 mt-4">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 border rounded-md bg-slate-50">
                      <div className="flex-1">{feature}</div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveFeature(index)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  
                  {formData.features.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">No hay características agregadas</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="ml-auto" 
                  disabled={updateEbookMutation.isPending}
                >
                  {updateEbookMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar Cambios
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}