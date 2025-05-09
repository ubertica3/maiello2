import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface HeroData {
  id: number;
  title: string;
  subtitle?: string;
  backgroundImage: string;
  buttonText1?: string;
  buttonLink1?: string;
  buttonText2?: string;
  buttonLink2?: string;
  imagePosition: string;
  imageScale: number;
}

export default function Hero() {
  const { data: heroSettings, isLoading, error } = useQuery<HeroData>({
    queryKey: ['/api/hero'],
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
  
  const [backgroundStyle, setBackgroundStyle] = useState({});
  
  useEffect(() => {
    if (heroSettings) {
      setBackgroundStyle({
        objectPosition: heroSettings.imagePosition || 'center center',
        transform: `scale(${heroSettings.imageScale || 1})`,
      });
    }
  }, [heroSettings]);
  
  // Fallback image mientras se carga la configuración real
  const defaultImage = "/assets/11.jpeg";
  
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <img 
            src={heroSettings?.backgroundImage || defaultImage}
            alt={heroSettings?.title || "Leo Maiello"} 
            className="w-full h-full object-cover transition-transform duration-500"
            style={backgroundStyle}
            data-aos="fade"
            data-aos-duration="1500"
          />
        )}
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center text-white">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-64 mx-auto bg-gray-700/50" />
            <Skeleton className="h-10 w-48 mx-auto bg-gray-700/50" />
            <div className="flex justify-center gap-4 mt-8">
              <Skeleton className="h-12 w-36 bg-gray-700/50 rounded-full" />
              <Skeleton className="h-12 w-36 bg-gray-700/50 rounded-full" />
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full mb-10">
            <img 
              src="/assets/images/leo-logo.png" 
              alt="Leo Maiello" 
              className="w-1/2 max-w-[600px] object-contain"
            />
          </div>
        ) : (
          <>
            <div
              className="flex justify-center items-center mb-6"
              data-aos="fade-down"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <img 
                src="/assets/images/leo-logo.png" 
                alt="Leo Maiello" 
                className="w-1/2 max-w-[600px] object-contain"
              />
            </div>
            
            {heroSettings?.subtitle && (
              <p 
                className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-duration="1000"
              >
                {heroSettings.subtitle}
              </p>
            )}
            
            <div 
              className="flex flex-wrap justify-center gap-4"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              {heroSettings?.buttonText1 && (
                <a 
                  href={heroSettings.buttonLink1 || "#events"} 
                  className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition-colors transform hover:scale-105"
                >
                  {heroSettings.buttonText1}
                </a>
              )}
              
              {heroSettings?.buttonText2 && (
                <a 
                  href={heroSettings.buttonLink2 || "#contact"} 
                  className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-8 rounded-full transition-colors transform hover:scale-105"
                >
                  {heroSettings.buttonText2}
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
