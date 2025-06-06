import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/subscribe", { name, email });
      
      toast({
        title: "¡Gracias por suscribirte!",
        description: "Recibirás pronto noticias sobre eventos y contenido exclusivo."
      });
      
      // Reset form
      setName("");
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu solicitud. Por favor intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="py-16 bg-primary bg-gradient-to-r from-primary to-purple-700">
      <div className="container mx-auto px-4">
        <div 
          className="max-w-3xl mx-auto text-center text-white"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 
            className="font-heading text-3xl md:text-4xl font-bold mb-4"
            data-aos="fade-up"
          >
            Mantente actualizado
          </h2>
          <p 
            className="mb-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Suscríbete para recibir información sobre mis próximos eventos, publicaciones y contenido exclusivo.
          </p>
          
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col md:flex-row gap-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <input 
              type="text" 
              placeholder="Nombre" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg transition-all" 
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg transition-all" 
              required
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-all hover:shadow-xl transform hover:scale-105 disabled:opacity-70 disabled:transform-none"
            >
              {isSubmitting ? "Enviando..." : "Suscribirme"}
            </button>
          </form>
          
          <p 
            className="mt-4 text-sm text-purple-200"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Al suscribirte, aceptas recibir emails con información y promociones.
          </p>
        </div>
      </div>
    </section>
  );
}
