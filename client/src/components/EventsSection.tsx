import { forwardRef } from "react";
import { events } from "../data/events";

const EventsSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="events" className="py-16 md:py-24 bg-[#EDF2F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-primary">Próximos Eventos</h2>
          <p className="text-lg text-accent max-w-3xl mx-auto">
            Descubre dónde encontrarme y asiste a mis charlas, presentaciones y eventos en vivo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-secondary text-white text-center rounded p-2 mr-4">
                    <span className="block text-2xl font-bold">{event.day}</span>
                    <span className="block text-xs uppercase">{event.month}</span>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-xl">{event.title}</h3>
                    <p className="text-accent text-sm">{event.location}</p>
                  </div>
                </div>
                <p className="text-accent mb-4">{event.description}</p>
                <a 
                  href={event.actionLink} 
                  className="inline-block px-4 py-2 bg-primary text-white font-medium rounded hover:bg-primary/90 transition"
                >
                  {event.actionText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

EventsSection.displayName = "EventsSection";

export default EventsSection;
