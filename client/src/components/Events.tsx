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
  eventType: "event" | "workshop";
}

// Componente para mostrar una tarjeta de evento
const EventCard = ({ event, index }: { event: Event, index: number }) => (
  <div 
    key={event.id} 
    className="event-card bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-2 duration-300"
    data-aos="fade-up"
    data-aos-delay={index * 100}
  >
    <div className="relative">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
      <div className={`absolute top-4 left-4 ${event.eventType === 'workshop' ? 'bg-secondary' : 'bg-primary'} text-white text-center py-2 px-3 rounded-lg shadow-lg`}>
        <span className="block text-xl font-bold">{event.date}</span>
        <span className="block text-sm">{event.month}</span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-heading font-bold text-xl mb-2">{event.title}</h3>
      <p className="text-gray-700 mb-4">{event.venue} - {event.location}</p>
      
      {/* Mostrar precio para el taller */}
      {event.eventType === 'workshop' && (
        <p className="text-lg font-semibold text-secondary mb-3">Precio: $5.000</p>
      )}
      
      <div className="flex justify-between items-center">
        <span className="text-gray-500">{event.time}</span>
        <a 
          href={event.ticketUrl} 
          target="_blank"
          rel="noopener noreferrer"
          className={`${event.eventType === 'workshop' ? 'text-secondary hover:text-secondary/80' : 'text-primary hover:text-secondary'} font-medium transition-colors duration-300 hover:underline`}
        >
          {event.eventType === 'workshop' ? "Inscribirse →" : "Comprar entradas →"}
        </a>
      </div>
    </div>
  </div>
);

// Componente principal de eventos
export default function Events() {
  // Usando React Query para obtener los eventos
  const { 
    data: allEvents = [], 
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
    refetchInterval: 30000,
    staleTime: 15000
  });

  // Separar eventos y talleres
  const concerts = allEvents.filter(event => event.eventType === 'event');
  const workshops = allEvents.filter(event => event.eventType === 'workshop');

  // Renderizar mensaje de error o carga
  const renderLoadingOrError = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error instanceof Error ? error.message : 'Error al cargar eventos'}</p>
        </div>
      );
    }
    
    return null;
  };

  // Renderizar lista de eventos
  const renderEventsList = (events: Event[], emptyMessage: string) => {
    if (events.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border border-dashed rounded-lg">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Sección de Conciertos */}
      <section id="events" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h6 className="text-primary font-medium mb-2">No te lo pierdas</h6>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Próximos Eventos</h2>
            <p className="max-w-2xl mx-auto text-gray-600">Encuentra dónde y cuándo podrás disfrutar de las charlas de Leo Maiello en vivo.</p>
          </div>
          
          {renderLoadingOrError() || renderEventsList(concerts, "No hay eventos programados por el momento.")}
          
          {concerts.length > 0 && (
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

      {/* Sección de Talleres */}
      <section id="workshops" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h6 className="text-secondary font-medium mb-2">Capacitación</h6>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Talleres y Workshops</h2>
            <p className="max-w-2xl mx-auto text-gray-600">Aprende y crece con nuestros talleres diseñados para mejorar tus habilidades y relaciones interpersonales.</p>
          </div>
          
          {renderLoadingOrError() || renderEventsList(workshops, "No hay talleres programados por el momento.")}
          
          {workshops.length > 0 && (
            <div className="text-center mt-12" data-aos="zoom-in" data-aos-delay="300">
              <a 
                href="#" 
                className="inline-block border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold py-3 px-8 rounded-full transition-colors transform hover:scale-105 duration-300"
              >
                Ver todos los talleres
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
