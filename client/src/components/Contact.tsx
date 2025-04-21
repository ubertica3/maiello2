import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "¡Mensaje enviado!",
        description: "Gracias por tu mensaje. Te responderé a la brevedad."
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h6 className="text-primary font-medium mb-2">Hablemos</h6>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Contacto</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            ¿Interesado en llevar mi charla a tu ciudad o institución? ¿Tienes alguna consulta? Escríbeme y me pondré en contacto contigo.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-1/3 mb-8 md:mb-0" data-aos="fade-right" data-aos-duration="1000">
              <div className="bg-gray-50 p-6 rounded-xl h-full shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-xl mb-2">Información de contacto</h3>
                  <p className="text-gray-600">Estaré encantado de responder a tus preguntas.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start" data-aos="fade-up" data-aos-delay="100">
                    <div className="bg-primary text-white p-3 rounded-full mr-4 transform transition-transform hover:scale-110">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">Email</h4>
                      <a href="mailto:info@leomaiello.com" className="text-primary hover:underline">info@leomaiello.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start" data-aos="fade-up" data-aos-delay="200">
                    <div className="bg-primary text-white p-3 rounded-full mr-4 transform transition-transform hover:scale-110">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">Teléfono</h4>
                      <a href="tel:+5491136113290" className="hover:text-primary transition-colors">+54 9 11 3611-3290</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start" data-aos="fade-up" data-aos-delay="300">
                    <div className="bg-primary text-white p-3 rounded-full mr-4 transform transition-transform hover:scale-110">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">Ubicación</h4>
                      <p>Ciudad Autónoma de Buenos Aires, Argentina</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="400">
                  <h4 className="font-medium mb-4">Redes sociales</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.instagram.com/soyleopsicologo/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-pink-600 transition-all transform hover:scale-125"
                    >
                      <i className="fab fa-instagram text-xl"></i>
                    </a>
                    <a 
                      href="https://www.tiktok.com/@soyleopsicologo" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-black transition-all transform hover:scale-125"
                    >
                      <i className="fab fa-tiktok text-xl"></i>
                    </a>
                    <a 
                      href="https://www.youtube.com/@soyleopsicologo" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-red-600 transition-all transform hover:scale-125"
                    >
                      <i className="fab fa-youtube text-xl"></i>
                    </a>
                    <a 
                      href="https://www.facebook.com/lic.leomaiello" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-blue-600 transition-all transform hover:scale-125"
                    >
                      <i className="fab fa-facebook text-xl"></i>
                    </a>
                    <a 
                      href="https://open.spotify.com/intl-es/artist/3VkRAMf0aKcAwFoVHATzi5" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-green-600 transition-all transform hover:scale-125"
                    >
                      <i className="fab fa-spotify text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3" data-aos="fade-left" data-aos-duration="1000">
              <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div data-aos="fade-up" data-aos-delay="100">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    />
                  </div>
                  
                  <div data-aos="fade-up" data-aos-delay="200">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>
                
                <div className="mb-6" data-aos="fade-up" data-aos-delay="300">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                  />
                </div>
                
                <div className="mb-6" data-aos="fade-up" data-aos-delay="400">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                  ></textarea>
                </div>
                
                <div data-aos="fade-up" data-aos-delay="500">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg transition-all hover:shadow-lg transform hover:scale-105 disabled:opacity-70 disabled:transform-none"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
