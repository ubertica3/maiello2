import { useState } from "react";

interface SocialPlatform {
  id: number;
  name: string;
  username: string;
  icon: string;
  color: string;
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
      url: "https://www.instagram.com/soyleopsicologo/",
      buttonText: "Seguir"
    },
    {
      id: 2,
      name: "TikTok",
      username: "@soyleopsicologo",
      icon: "fa-tiktok",
      color: "text-black",
      url: "https://www.tiktok.com/@soyleopsicologo",
      buttonText: "Seguir"
    },
    {
      id: 3,
      name: "Facebook",
      username: "lic.leomaiello",
      icon: "fa-facebook",
      color: "text-blue-600",
      url: "https://www.facebook.com/lic.leomaiello",
      buttonText: "Seguir"
    },
    {
      id: 4,
      name: "Spotify",
      username: "Leo Maiello",
      icon: "fa-spotify",
      color: "text-green-600",
      url: "https://open.spotify.com/intl-es/artist/3VkRAMf0aKcAwFoVHATzi5",
      buttonText: "Escuchar"
    }
  ]);

  const [instagramPosts] = useState<InstagramPost[]>([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1569437061238-3cf1347cd92e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
      link: "https://www.instagram.com/soyleopsicologo/"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
      link: "https://www.instagram.com/soyleopsicologo/"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1518744744590-40f2466560ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
      link: "https://www.instagram.com/soyleopsicologo/"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
      link: "https://www.instagram.com/soyleopsicologo/"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
      link: "https://www.instagram.com/soyleopsicologo/"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1632307870906-dd18dcbdeea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80",
      link: "https://www.instagram.com/soyleopsicologo/"
    }
  ]);

  return (
    <section id="social" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-primary font-medium mb-2">Sígueme en redes</h6>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Redes Sociales</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Conéctate conmigo a través de mis diferentes plataformas donde comparto contenido sobre relaciones, emociones y bienestar psicológico.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {platforms.map((platform) => (
            <a 
              key={platform.id}
              href={platform.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-hover bg-white rounded-xl shadow-md overflow-hidden transition-all p-6 text-center"
            >
              <i className={`fab ${platform.icon} text-4xl ${platform.color} mb-4`}></i>
              <h3 className="font-heading font-bold text-xl mb-2">{platform.name}</h3>
              <p className="text-gray-600 mb-4">{platform.username}</p>
              <span className="inline-block text-primary font-medium">{platform.buttonText}</span>
            </a>
          ))}
        </div>
        
        {/* Instagram Feed Preview */}
        <div className="mt-20">
          <h3 className="font-heading text-2xl font-bold mb-8 pl-4 border-l-4 border-primary">Instagram Feed</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPosts.map((post) => (
              <a 
                key={post.id}
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block overflow-hidden rounded-lg transition-all hover:opacity-90"
              >
                <img 
                  src={post.image} 
                  alt="Instagram post" 
                  className="w-full h-full object-cover aspect-square"
                />
              </a>
            ))}
          </div>
          
          <div className="text-center mt-8">
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
        <div className="mt-20">
          <h3 className="font-heading text-2xl font-bold mb-8 pl-4 border-l-4 border-primary">Escucha en Spotify</h3>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
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
