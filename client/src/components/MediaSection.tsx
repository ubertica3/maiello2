import { forwardRef, useState } from "react";
import { interviews, reels, spotifyEmbedUrl, socialLinks } from "../data/links";

const MediaSection = forwardRef<HTMLElement>((_, ref) => {
  const [activeTab, setActiveTab] = useState<"entrevistas" | "reels" | "spotify">("entrevistas");

  return (
    <section ref={ref} id="media" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-primary">Media</h2>
          <p className="text-lg text-accent max-w-3xl mx-auto">
            Entrevistas, apariciones en medios y contenido destacado.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto" aria-label="Tabs">
              <button 
                onClick={() => setActiveTab("entrevistas")} 
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium ${
                  activeTab === "entrevistas"
                    ? "border-secondary text-secondary"
                    : "border-transparent text-accent hover:text-primary hover:border-gray-300"
                }`}
              >
                Entrevistas
              </button>
              <button 
                onClick={() => setActiveTab("reels")} 
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium ${
                  activeTab === "reels"
                    ? "border-secondary text-secondary"
                    : "border-transparent text-accent hover:text-primary hover:border-gray-300"
                }`}
              >
                Reels
              </button>
              <button 
                onClick={() => setActiveTab("spotify")} 
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium ${
                  activeTab === "spotify"
                    ? "border-secondary text-secondary"
                    : "border-transparent text-accent hover:text-primary hover:border-gray-300"
                }`}
              >
                Spotify
              </button>
            </nav>
          </div>
        </div>
        
        {/* Tab Content: Entrevistas */}
        <div className={activeTab === "entrevistas" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interviews.map((interview) => (
              <div key={interview.id} className="bg-[#EDF2F4] rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    className="w-full h-56" 
                    src={interview.embedUrl} 
                    title={interview.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="font-montserrat font-semibold text-lg mb-2">{interview.title}</h3>
                  <p className="text-accent text-sm">{interview.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tab Content: Reels */}
        <div className={activeTab === "reels" ? "block" : "hidden"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reels.map((reel) => (
              <div key={reel.id} className="bg-[#EDF2F4] rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-w-9 aspect-h-16">
                  <iframe 
                    className="w-full h-96" 
                    src={reel.embedUrl} 
                    title={reel.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="font-montserrat font-semibold text-lg mb-2">{reel.title}</h3>
                  <p className="text-accent text-sm">{reel.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tab Content: Spotify */}
        <div className={activeTab === "spotify" ? "block" : "hidden"}>
          <div className="max-w-4xl mx-auto">
            <iframe 
              style={{ borderRadius: "12px" }} 
              src={spotifyEmbedUrl} 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            ></iframe>
            
            <div className="mt-8 text-center">
              <a 
                href={socialLinks.spotify} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block px-6 py-3 bg-[#1DB954] text-white font-medium rounded hover:bg-[#1AA34A] transition"
              >
                <i className="fab fa-spotify mr-2"></i> Seguir en Spotify
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

MediaSection.displayName = "MediaSection";

export default MediaSection;
