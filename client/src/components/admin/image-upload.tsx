import { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value);
  const { toast } = useToast();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo y tamaño
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Formato no soportado',
        description: 'Por favor, usa imágenes en formato JPG, PNG, WebP o GIF.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Imagen demasiado grande',
        description: 'El tamaño máximo permitido es 5MB.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await apiRequest('POST', '/api/admin/upload', formData, {
        headers: {},
        skipContentType: true
      });

      const data = await response.json();

      if (response.ok) {
        setPreviewUrl(data.url);
        onChange(data.url);
        toast({
          title: 'Imagen subida',
          description: 'La imagen se ha subido correctamente.',
        });
      } else {
        throw new Error(data.message || 'Error al subir la imagen');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al subir la imagen',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setPreviewUrl('');
    onChange('');
  };

  return (
    <div className="space-y-4">
      {previewUrl ? (
        <div className="relative rounded-md overflow-hidden border">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-48 object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
            onClick={clearImage}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div className="border border-dashed rounded-md p-8 text-center bg-muted/30">
          <div className="flex flex-col items-center justify-center gap-2">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Arrastra y suelta tu imagen aquí o haz clic para seleccionarla
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, WebP o GIF (máx. 5MB)
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id="image-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('image-upload')?.click()}
          disabled={uploading}
          className="w-full"
        >
          {uploading ? (
            <>Subiendo...</>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {previewUrl ? 'Cambiar imagen' : 'Subir imagen'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}