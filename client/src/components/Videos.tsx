import { useState } from "react";

interface Interview {
  id: number;
  title: string;
  description: string;
  embedUrl: string;
}

interface Reel {
  id: number;
  embedUrl: string;
}

export default function Videos() {
  const [interviews] = useState<Interview[]>([
    {
      id: 1,
      title: "Entrevista con Canal 13",
      description: "Una conversación sobre vínculos modernos y relaciones digitales",
      embedUrl: "https://www.youtube.com/embed/nnKvpKCL_5E"
    },
    {
      id: 2,
      title: "Café con Psicólogos",
      description: "Debatiendo sobre los retos emocionales en la era de las redes sociales",
      embedUrl: "https://www.youtube.com/embed/BQSbX6eZoi4"
    },
    {
      id: 3,
      title: "Psicología en la Radio",
      description: "Conversando sobre las dinámicas de las relaciones contemporáneas",
      embedUrl: "https://www.youtube.com/embed/IypwlBv1kRQ"
    }
  ]);

  const [reels] = useState<Reel[]>([
    {
      id: 1,
      embedUrl: "https://www.youtube.com/embed/CiBEqVHQ7zc"
    },
    {
      id: 2,
      embedUrl: "https://www.youtube.com/embed/_8wAGKRaAfs"
    },
    {
      id: 3,
      embedUrl: "https://www.youtube.com/embed/omHUSsCirP0"
    }
  ]);

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-primary font-medium mb-2">Contenido destacado</h6>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Entrevistas y Videos</h2>
          <p className="max-w-2xl mx-auto text-gray-600">Mira mis entrevistas y contenido más reciente en YouTube.</p>
        </div>
        
        <div className="mb-16">
          <h3 className="font-heading text-2xl font-bold mb-8 pl-4 border-l-4 border-primary">Entrevistas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interviews.map((interview) => (
              <div key={interview.id} className="rounded-xl overflow-hidden shadow-md">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src={interview.embedUrl} 
                    title={interview.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-56"
                  ></iframe>
                </div>
                <div className="p-6 bg-white">
                  <h4 className="font-heading font-bold text-lg mb-2">{interview.title}</h4>
                  <p className="text-gray-600 text-sm">{interview.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-heading text-2xl font-bold mb-8 pl-4 border-l-4 border-primary">Reels y Contenido Corto</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reels.map((reel) => (
              <div key={reel.id} className="rounded-xl overflow-hidden shadow-md">
                <div className="aspect-w-9 aspect-h-16">
                  <iframe 
                    src={reel.embedUrl} 
                    title={`Reel ${reel.id}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-80"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://www.youtube.com/@soyleopsicologo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-full transition-colors"
            >
              <i className="fab fa-youtube mr-2"></i> Ver más en YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
