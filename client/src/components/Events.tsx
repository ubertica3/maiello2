import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface Event {
  id: number;
  title: string;
  venue: string;
  location: string;
  date: string;
  month: string;
  time: string;
  image: string;
  ticketUrl: string;
}

export default function Events() {
  // Usando React Query para obtener los eventos - esto mejorará la sincronización con el panel admin
  const { 
    data: events = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['/api/events'],
    queryFn: async () => {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Error al cargar eventos');
      }
      return response.json() as Promise<Event[]>;
    },
    // Refrescar los datos más frecuentemente para ver los cambios del admin
    refetchInterval: 30000, // refrescar cada 30 segundos
    staleTime: 15000 // considerar los datos obsoletos después de 15 segundos
  });

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h6 className="text-primary font-medium mb-2">No te lo pierdas</h6>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Próximos Eventos</h2>
          <p className="max-w-2xl mx-auto text-gray-600">Encuentra dónde y cuándo podrás disfrutar de las charlas de Leo Maiello en vivo.</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error instanceof Error ? error.message : 'Error al cargar eventos'}</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className="event-card bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-2 duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative">
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4 bg-primary text-white text-center py-2 px-3 rounded-lg shadow-lg">
                    <span className="block text-xl font-bold">{event.date}</span>
                    <span className="block text-sm">{event.month}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl mb-2">{event.title}</h3>
                  <p className="text-gray-700 mb-4">{event.venue} - {event.location}</p>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">{event.time}</span>
                    </div>
                    <div className="flex justify-end gap-2 mt-1">
                      <a 
                        href={event.ticketUrl || "#"} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-[#009ee3] text-white rounded-md text-sm hover:bg-[#007eb5] transition-colors flex items-center"
                      >
                        <img 
                          src="/assets/mp-logo.svg" 
                          alt="MercadoPago" 
                          className="h-4 mr-1 inline"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        MP
                      </a>
                      <a 
                        href={event.paypalTicketUrl || event.ticketUrl || "#"} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-[#0070ba] text-white rounded-md text-sm hover:bg-[#003087] transition-colors flex items-center"
                      >
                        <img 
                          src="/assets/paypal-logo.svg" 
                          alt="PayPal" 
                          className="h-4 mr-1 inline"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        PayPal
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No hay eventos programados por el momento.</p>
          </div>
        )}
        
        {events.length > 0 && (
          <div className="text-center mt-12" data-aos="zoom-in" data-aos-delay="300">
            <a 
              href="#" 
              className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-full transition-colors transform hover:scale-105 duration-300"
            >
              Ver todos los eventos
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
