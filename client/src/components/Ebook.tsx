import { useQuery } from "@tanstack/react-query";
import { Loader2, CheckCircle } from "lucide-react";

interface Ebook {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  price: string;
  salePrice?: string;
  buyLink: string;
  features: string[];
}

export default function Ebook() {
  // Usando React Query para obtener los datos del ebook - esto mejorará la sincronización con el panel admin
  const { 
    data: ebook, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['/api/ebook'],
    queryFn: async () => {
      // Añadimos timestamp para evitar el caché del navegador
      const timestamp = Date.now();
      const response = await fetch(`/api/ebook?_t=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          // No ebook found, return default data
          return {
            id: 0,
            title: "Descarga mi E-Book",
            description: "\"Vínculos Digitales: Encontrar conexiones auténticas en la era de las relaciones virtuales\" es mi nuevo E-Book donde comparto reflexiones y estrategias para cultivar relaciones significativas en un mundo hiperconectado.",
            coverImage: "/assets/ebecdf83-957e-4c03-a0f1-1fd610cf3b3a.jpeg",
            price: "$19.99",
            buyLink: "#",
            features: [
              "Estrategias para reconocer relaciones saludables",
              "Cómo superar la idealización en las relaciones digitales",
              "Herramientas para comunicarte efectivamente en línea"
            ]
          } as Ebook;
        }
        throw new Error('Error al cargar información del e-book');
      }
      
      return response.json() as Promise<Ebook>;
    },
    // Refrescar los datos más frecuentemente para ver los cambios del admin
    refetchInterval: 30000, // refrescar cada 30 segundos
    staleTime: 15000, // considerar los datos obsoletos después de 15 segundos
  });

  if (isLoading) {
    return (
      <section id="ebook" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      </section>
    );
  }

  if (error || !ebook) {
    return (
      <section id="ebook" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 flex justify-center items-center h-64">
          <p className="text-white">{error instanceof Error ? error.message : "No se encontró información del e-book."}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="ebook" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-2/5 order-2 md:order-1" data-aos="fade-right" data-aos-duration="1000">
            <h6 className="text-red-200 font-medium mb-2">Nuevo Lanzamiento</h6>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">{ebook.title}</h2>
            <p className="mb-6 leading-relaxed">
              {ebook.description}
            </p>
            <ul className="mb-8 space-y-3">
              {ebook.features.map((feature, index) => (
                <li key={index} className="flex items-start" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                  <CheckCircle className="mt-1 mr-3 text-yellow-300 h-5 w-5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center mb-6">
              {ebook.salePrice ? (
                <>
                  <span className="text-2xl font-bold mr-3">{ebook.salePrice}</span>
                  <span className="text-lg line-through text-red-200">{ebook.price}</span>
                </>
              ) : (
                <span className="text-2xl font-bold">{ebook.price}</span>
              )}
            </div>
            <a 
              href={ebook.buyLink} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors transform hover:scale-105 hover:shadow-lg"
              data-aos="zoom-in" 
              data-aos-delay="400"
            >
              Comprar Ahora
            </a>
          </div>
          <div 
            className="md:w-3/5 order-1 md:order-2 flex justify-center"
            data-aos="fade-left" 
            data-aos-duration="1000"
          >
            <img 
              src={ebook.coverImage.startsWith("http") 
                  ? ebook.coverImage 
                  : ebook.coverImage.startsWith("/uploads") 
                    ? ebook.coverImage 
                    : `/uploads/${ebook.coverImage.replace(/^\//, "")}`} 
              alt={`Portada del E-Book: ${ebook.title}`} 
              className="max-w-full h-auto rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              onError={(e) => {
                // Fallback a una imagen de attached_assets si hay error
                (e.target as HTMLImageElement).src = "/assets/ebecdf83-957e-4c03-a0f1-1fd610cf3b3a.jpeg";
                console.log("Error cargando imagen de e-book:", ebook.coverImage);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
