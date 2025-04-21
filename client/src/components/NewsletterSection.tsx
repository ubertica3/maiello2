import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const subscribeSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Por favor, ingresa un email válido" }),
  terms: z.boolean().refine(val => val === true, { message: "Debes aceptar los términos" }),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

const NewsletterSection = forwardRef<HTMLElement>((_, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      name: "",
      email: "",
      terms: false,
    },
  });

  const onSubmit = async (data: SubscribeFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/subscribe", data);
      
      toast({
        title: "Suscripción exitosa",
        description: "¡Gracias por suscribirte! Pronto recibirás novedades.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu suscripción. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="py-16 md:py-24 bg-primary text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">Suscríbete a mi Newsletter</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Recibe información sobre mis próximos eventos, contenido exclusivo y reflexiones que no comparto en redes sociales.
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nombre</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Tu nombre" 
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:ring-secondary"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="tu@email.com" 
                        type="email"
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:ring-secondary" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-white/80 text-sm font-normal">
                        Acepto recibir emails y comunicaciones
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Suscribirme"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
});

NewsletterSection.displayName = "NewsletterSection";

export default NewsletterSection;
