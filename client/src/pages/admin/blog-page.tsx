import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
} from '@/components/ui/alert-dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Loader2, 
  PlusCircle, 
  MoreVertical, 
  Calendar, 
  Edit, 
  Trash2,
  Eye,
  EyeOff,
  Search,
  Layout,
  List
} from 'lucide-react';
import { BlogPost } from '@shared/schema';

export default function BlogPage() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const initialFormData = {
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    coverImage: '',
    published: true,
  };
  
  const [formData, setFormData] = useState(initialFormData);

  // Fetch blog posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ['/api/admin/blog'],
    queryFn: async () => {
      const response = await fetch('/api/admin/blog');
      if (!response.ok) throw new Error('Error al cargar posts');
      return response.json() as Promise<BlogPost[]>;
    },
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear post');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog'] });
      toast({
        title: 'Post creado',
        description: 'El post ha sido creado correctamente',
      });
      setIsCreateDialogOpen(false);
      setFormData(initialFormData);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al crear post',
        variant: 'destructive',
      });
    },
  });

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<typeof formData> }) => {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar post');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog'] });
      toast({
        title: 'Post actualizado',
        description: 'El post ha sido actualizado correctamente',
      });
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al actualizar post',
        variant: 'destructive',
      });
    },
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar post');
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog'] });
      toast({
        title: 'Post eliminado',
        description: 'El post ha sido eliminado correctamente',
      });
      setIsDeleteAlertOpen(false);
      setSelectedPost(null);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al eliminar post',
        variant: 'destructive',
      });
    },
  });

  // Toggle post visibility mutation
  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, published }: { id: number; published: boolean }) => {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al cambiar visibilidad');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/blog'] });
      toast({
        title: 'Visibilidad actualizada',
        description: 'La visibilidad del post ha sido actualizada',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al cambiar visibilidad',
        variant: 'destructive',
      });
    },
  });

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Auto-generate slug from title if slug is empty
    if (name === 'title' && (!formData.slug || formData.slug === '')) {
      setFormData({
        ...formData,
        title: value,
        slug: value
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-'),
      });
    }
  };

  // Handle switch change
  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, published: checked });
  };

  // Handle form submit for create
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate(formData);
  };

  // Handle form submit for edit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPost) {
      updatePostMutation.mutate({ id: selectedPost.id, data: formData });
    }
  };

  // Open edit dialog
  const openEditDialog = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      coverImage: post.coverImage || '',
      published: post.published,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete alert
  const openDeleteAlert = (post: BlogPost) => {
    setSelectedPost(post);
    setIsDeleteAlertOpen(true);
  };

  // Toggle post visibility
  const toggleVisibility = (post: BlogPost) => {
    toggleVisibilityMutation.mutate({ id: post.id, published: !post.published });
  };

  // Filter posts by search query
  const filteredPosts = posts
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
            <p className="text-muted-foreground">
              Administra las publicaciones del blog
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar posts..."
                className="pl-8 w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusCircle size={16} />
                  <span>Nuevo Post</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Post</DialogTitle>
                  <DialogDescription>
                    Completa el formulario para crear un nuevo post para el blog.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleCreateSubmit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Título del post"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="slug-del-post"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      El slug se usa para la URL del post, por ejemplo: /blog/slug-del-post
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coverImage">URL de imagen de portada</Label>
                    <Input
                      id="coverImage"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleInputChange}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Extracto</Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      placeholder="Breve descripción del post..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Contenido</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Contenido del post..."
                      rows={8}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="published">Publicar inmediatamente</Label>
                  </div>
                  
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={createPostMutation.isPending}
                    >
                      {createPostMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        'Crear Post'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            
            <div className="hidden sm:flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                className="rounded-none"
                onClick={() => setViewMode('grid')}
                size="icon"
              >
                <Layout size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                className="rounded-none"
                onClick={() => setViewMode('list')}
                size="icon"
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="published">Publicados</TabsTrigger>
            <TabsTrigger value="draft">Borradores</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {renderPostsContent(filteredPosts)}
          </TabsContent>
          
          <TabsContent value="published" className="space-y-4">
            {renderPostsContent(filteredPosts.filter(post => post.published))}
          </TabsContent>
          
          <TabsContent value="draft" className="space-y-4">
            {renderPostsContent(filteredPosts.filter(post => !post.published))}
          </TabsContent>
        </Tabs>
        
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Editar Post</DialogTitle>
              <DialogDescription>
                Modifica los detalles del post.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleEditSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Título del post"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-slug">Slug</Label>
                <Input
                  id="edit-slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="slug-del-post"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-coverImage">URL de imagen de portada</Label>
                <Input
                  id="edit-coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-excerpt">Extracto</Label>
                <Textarea
                  id="edit-excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Breve descripción del post..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-content">Contenido</Label>
                <Textarea
                  id="edit-content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Contenido del post..."
                  rows={8}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-published"
                  checked={formData.published}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="edit-published">
                  {formData.published ? 'Publicado' : 'Borrador'}
                </Label>
              </div>
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={updatePostMutation.isPending}
                >
                  {updatePostMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    'Guardar Cambios'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Delete Alert */}
        <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente este post
                del blog.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => selectedPost && deletePostMutation.mutate(selectedPost.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                {deletePostMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Eliminando...
                  </>
                ) : (
                  'Eliminar'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );

  // Helper function to render posts based on view mode
  function renderPostsContent(posts: BlogPost[]) {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (!posts || posts.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">No hay posts disponibles</p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>Crear Primer Post</Button>
        </div>
      );
    }

    return viewMode === 'grid' ? (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            {post.coverImage && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="truncate">{post.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => openEditDialog(post)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleVisibility(post)}>
                      {post.published ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          <span>Despublicar</span>
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Publicar</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => openDeleteAlert(post)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4 opacity-70" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    post.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {post.published ? 'Publicado' : 'Borrador'}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.excerpt || post.content.substring(0, 150)}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditDialog(post)}
              >
                Editar
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleVisibility(post)}
                title={post.published ? 'Despublicar' : 'Publicar'}
              >
                {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    ) : (
      <div className="border rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left font-medium text-sm">Título</th>
              <th className="px-4 py-3 text-left font-medium text-sm">Fecha</th>
              <th className="px-4 py-3 text-left font-medium text-sm">Estado</th>
              <th className="px-4 py-3 text-right font-medium text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-t hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium">{post.title}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      post.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.published ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleVisibility(post)}
                    title={post.published ? 'Despublicar' : 'Publicar'}
                  >
                    {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(post)}
                    title="Editar"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openDeleteAlert(post)}
                    className="text-red-500 hover:text-red-700"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}