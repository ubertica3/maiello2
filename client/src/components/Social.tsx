import { useState } from "react";

interface SocialPlatform {
  id: number;
  name: string;
  username: string;
  icon: string;
  color: string;
  hoverColor: string;
  url: string;
  buttonText: string;
}

interface InstagramPost {
  id: number;
  image: string;
  link: string;
}

export default function Social() {
  const [platforms] = useState<SocialPlatform[]>([
    {
      id: 1,
      name: "Instagram",
      username: "@soyleopsicologo",
      icon: "fa-instagram",
      color: "text-pink-600",
      hoverColor: "hover:bg-pink-600",
      url: "https://www.instagram.com/soyleopsicologo/",
      buttonText: "Seguir"
    },
    {
      id: 2,
      name: "TikTok",
      username: "@soyleopsicologo",
      icon: "fa-tiktok",
      color: "text-black",
      hoverColor: "hover:bg-black",
      url: "https://www.tiktok.com/@soyleopsicologo",
      buttonText: "Seguir"
    },
    {
      id: 3,
      name: "YouTube",
      username: "@soyleopsicologo",
      icon: "fa-youtube",
      color: "text-red-600",
      hoverColor: "hover:bg-red-600",
      url: "https://www.youtube.com/@soyleopsicologo",
      buttonText: "Suscribirse"
    },
    {
      id: 4,
      name: "Facebook",
      username: "lic.leomaiello",
      icon: "fa-facebook",
      color: "text-blue-600",
      hoverColor: "hover:bg-blue-600",
      url: "https://www.facebook.com/lic.leomaiello",
      buttonText: "Seguir"
    },
    {
      id: 5,
      name: "Spotify",
      username: "Leo Maiello",
      icon: "fa-spotify",
      color: "text-green-600",
      hoverColor: "hover:bg-green-600",
      url: "https://open.spotify.com/intl-es/artist/3VkRAMf0aKcAwFoVHATzi5",
      buttonText: "Escuchar"
    }
  ]);

  const [instagramPosts] = useState<InstagramPost[]>([
    {
      id: 1,
      image: "/images/1ae3d7cd-3c35-4a05-b3e8-0f0bc456ae7f.jpeg",
      link: "https://www.instagram.com/soyleopsicologo/"
    },
    {
      id: 2,
      image: "/images/40e32192-445e-4f87-ab03-5b5411846ccf.jpeg",
      link: "https://www.instagram.com/soyleopsicologo/"
    },
    {
      id: 3,
      image: "/images/6d25d542-2bea-4f9b-b5ec-d837024f7593.jpeg",
      link: "https://www.instagram.com/soyleopsicologo/"
    },
    {
      id: 4,
      image: "/images/efcffbc0-db1c-4d5c-982f-b8b6a2d066f1.jpeg",
      link: "https://www.instagram.com/soyleopsicologo/"
    },
    {
      id: 5,
      image: "/images/15.jpeg",
      link: "https://www.instagram.com/soyleopsicologo/"
    },
    {
      id: 6,
      image: "/images/19.jpeg",
      link: "https://www.instagram.com/soyleopsicologo/"
    }
  ]);

  return (
    <section id="social" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h6 className="text-primary font-medium mb-2">Sígueme en redes</h6>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Redes Sociales</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Conéctate conmigo a través de mis diferentes plataformas donde comparto contenido sobre relaciones, emociones y bienestar psicológico.
          </p>
        </div>
        
        {/* Contenedor único para redes sociales */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16" data-aos="zoom-in">
          <div className="p-8">
            <h3 className="font-heading text-2xl font-bold mb-6 text-center">Mis Redes</h3>
            
            <div className="flex flex-wrap justify-center gap-8">
              {platforms.map((platform) => (
                <a 
                  key={platform.id}
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`social-icon-btn flex flex-col items-center justify-center transition-all transform hover:scale-110`}
                  data-aos="zoom-in"
                  data-aos-delay={platform.id * 100}
                >
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full ${platform.color} border-2 border-current mb-2 ${platform.hoverColor} hover:text-white`}>
                    <i className={`fab ${platform.icon} text-2xl`}></i>
                  </div>
                  <span className="font-medium text-sm">{platform.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Instagram Feed Preview */}
        <div className="mt-20" data-aos="fade-up">
          <h3 className="font-heading text-2xl font-bold mb-8 pl-4 border-l-4 border-primary">Instagram Feed</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPosts.map((post, index) => (
              <a 
                key={post.id}
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block overflow-hidden rounded-lg transition-all hover:opacity-90 transform hover:scale-105"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <img 
                  src={post.image} 
                  alt="Instagram post" 
                  className="w-full h-full object-cover aspect-square"
                />
              </a>
            ))}
          </div>
          
          <div className="text-center mt-8" data-aos="fade-up">
            <a 
              href="https://www.instagram.com/soyleopsicologo/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              <i className="fab fa-instagram mr-2"></i> Ver todos
            </a>
          </div>
        </div>
        
        {/* Spotify Preview */}
        <div className="mt-20" data-aos="fade-up">
          <h3 className="font-heading text-2xl font-bold mb-8 pl-4 border-l-4 border-primary">Escucha en Spotify</h3>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6" data-aos="zoom-in">
            <iframe 
              src="https://open.spotify.com/embed/artist/3VkRAMf0aKcAwFoVHATzi5" 
              width="100%" 
              height="380" 
              title="Spotify Player"
              allow="encrypted-media"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
