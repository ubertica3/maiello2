import { useState, useEffect } from "react";
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
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/events');
        
        if (!response.ok) {
          throw new Error('Error al cargar eventos');
        }
        
        const data = await response.json();
        setEvents(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('No se pudieron cargar los eventos. Por favor, intenta más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
            <p className="text-red-500">{error}</p>
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
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">{event.time}</span>
                    <a 
                      href={event.ticketUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary font-medium transition-colors duration-300 hover:underline"
                    >
                      Comprar entradas →
                    </a>
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
