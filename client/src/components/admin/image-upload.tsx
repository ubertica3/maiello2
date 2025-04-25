import { useState, ChangeEvent, FormEvent } from 'react';
import { Upload, ImagePlus, Loader2, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  defaultImageUrl?: string;
  className?: string;
}

export function ImageUpload({ onImageUploaded, defaultImageUrl, className = '' }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validar que es una imagen
      if (!file.type.startsWith('image/')) {
        setError('El archivo seleccionado no es una imagen válida');
        return;
      }
      
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen es demasiado grande (máximo 5MB)');
        return;
      }
      
      setSelectedFile(file);
      setError(null);
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(defaultImageUrl || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Por favor seleccione una imagen');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al subir la imagen');
      }
      
      const data = await response.json();
      
      // Llamar al callback con la URL de la imagen
      onImageUploaded(data.url);
      
      toast({
        title: 'Imagen subida con éxito',
        description: 'La imagen se ha subido correctamente',
      });
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err instanceof Error ? err.message : 'Error al subir la imagen');
      
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Error al subir la imagen',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            id="image-upload"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            disabled={isUploading}
            className="flex-1"
          />
          {selectedFile && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={clearSelection}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {previewUrl && (
          <div className="relative border rounded-md overflow-hidden">
            <img 
              src={previewUrl} 
              alt="Vista previa" 
              className="w-full h-auto max-h-64 object-contain bg-slate-100" 
            />
            {defaultImageUrl === previewUrl && (
              <div className="absolute bottom-2 right-2 bg-slate-800 text-white text-xs py-1 px-2 rounded-md opacity-80">
                Imagen actual
              </div>
            )}
          </div>
        )}
        
        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!selectedFile || isUploading || previewUrl === defaultImageUrl}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Subir imagen
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}