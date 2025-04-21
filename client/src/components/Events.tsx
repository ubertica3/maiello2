import { useState } from "react";

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
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "TE QUIERO HASTA AHÍ",
      venue: "Teatro Gran Rex",
      location: "Buenos Aires",
      date: "15",
      month: "JUN",
      time: "20:00 hs",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      ticketUrl: "#"
    },
    {
      id: 2,
      title: "RELACIONES MODERNAS",
      venue: "Centro Cultural Konex",
      location: "Buenos Aires",
      date: "22",
      month: "JUL",
      time: "19:30 hs",
      image: "https://images.unsplash.com/photo-1560439513-74b037a25d84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      ticketUrl: "#"
    },
    {
      id: 3,
      title: "WORKSHOP: VÍNCULOS SALUDABLES",
      venue: "Teatro Opera",
      location: "Córdoba",
      date: "8",
      month: "AGO",
      time: "18:00 hs",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      ticketUrl: "#"
    }
  ]);

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-primary font-medium mb-2">No te lo pierdas</h6>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Próximos Eventos</h2>
          <p className="max-w-2xl mx-auto text-gray-600">Encuentra dónde y cuándo podrás disfrutar de las charlas de Leo Maiello en vivo.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="event-card bg-white rounded-xl shadow-md overflow-hidden transition-all">
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-primary text-white text-center py-2 px-3 rounded-lg">
                  <span className="block text-xl font-bold">{event.date}</span>
                  <span className="block text-sm">{event.month}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl mb-2">{event.title}</h3>
                <p className="text-gray-700 mb-4">{event.venue} - {event.location}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{event.time}</span>
                  <a href={event.ticketUrl} className="text-primary hover:text-secondary font-medium">Comprar entradas →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-8 rounded-full transition-colors"
          >
            Ver todos los eventos
          </a>
        </div>
      </div>
    </section>
  );
}
