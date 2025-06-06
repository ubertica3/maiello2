import { useState, useEffect } from "react";
// Importar Swiper y sus estilos
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Interview {
  id: number;
  title: string;
  description?: string;
  embedUrl: string;
  thumbnailImage?: string;
  imagePosition?: string;
  imageScale?: number;
  displayOrder: number;
}

interface Reel {
  id: number;
  embedUrl: string;
}

export default function Videos() {
  // Obtener entrevistas desde la API
  const { data: apiInterviews, isLoading: isLoadingInterviews } = useQuery<Interview[]>({
    queryKey: ['/api/interviews'],
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

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
    },
    {
      id: 4,
      embedUrl: "https://www.youtube.com/embed/CiBEqVHQ7zc"
    },
    {
      id: 5,
      embedUrl: "https://www.youtube.com/embed/_8wAGKRaAfs"
    }
  ]);

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h6 className="text-primary font-medium mb-2">Contenido destacado</h6>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Entrevistas y Videos</h2>
          <p className="max-w-2xl mx-auto text-gray-600">Mira mis entrevistas y contenido más reciente en YouTube.</p>
        </div>
        
        {/* Carrusel para entrevistas */}
        <div className="mb-16" data-aos="fade-up">
          <h3 className="font-heading text-2xl font-bold mb-8 pl-4 border-l-4 border-primary">Entrevistas</h3>
          
          {isLoadingInterviews ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-md h-full">
                  <Skeleton className="w-full h-56" />
                  <div className="p-6 bg-white">
                    <Skeleton className="w-3/4 h-5 mb-2" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-2/3 h-4 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : !apiInterviews || apiInterviews.length === 0 ? (
            <div className="text-center p-10 border rounded-lg">
              <p className="text-gray-500">No hay entrevistas disponibles actualmente.</p>
            </div>
          ) : (
            <div className="interviews-carousel relative" data-aos="zoom-in">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="py-10"
              >
                {apiInterviews
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((interview) => (
                  <SwiperSlide key={interview.id}>
                    <div className="rounded-xl overflow-hidden shadow-md h-full">
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
                        {interview.description && (
                          <p className="text-gray-600 text-sm">{interview.description}</p>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
        
        {/* Carrusel para reels con efecto AOS */}
        <div data-aos="fade-up">
          <h3 className="font-heading text-2xl font-bold mb-8 pl-4 border-l-4 border-primary">Reels y Contenido Corto</h3>
          
          <div className="reels-carousel relative mb-12" data-aos="zoom-in">
            <Swiper
              modules={[EffectCoverflow, Pagination, Autoplay]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                },
                768: {
                  slidesPerView: 2.5,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="py-10"
            >
              {reels.map((reel) => (
                <SwiperSlide key={reel.id}>
                  <div className="rounded-xl overflow-hidden shadow-md mx-auto" style={{ maxWidth: '300px' }}>
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          <div className="text-center mt-12" data-aos="fade-up">
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
