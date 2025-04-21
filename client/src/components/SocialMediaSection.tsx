import { socialLinks } from "../data/links";

const SocialMediaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#EDF2F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-primary">Sígueme en Redes</h2>
          <p className="text-lg text-accent max-w-3xl mx-auto">
            Mantente conectado y no te pierdas mi contenido más reciente.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="block group">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform group-hover:scale-105">
              <div className="p-6 text-center">
                <i className="fab fa-instagram text-5xl text-[#E1306C] mb-4"></i>
                <h3 className="font-montserrat font-semibold text-xl mb-2">Instagram</h3>
                <p className="text-accent">@soyleopsicologo</p>
                <div className="mt-4 text-primary font-medium group-hover:text-secondary transition-colors">
                  Seguir <i className="fas fa-arrow-right ml-1"></i>
                </div>
              </div>
            </div>
          </a>
          
          <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="block group">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform group-hover:scale-105">
              <div className="p-6 text-center">
                <i className="fab fa-tiktok text-5xl text-black mb-4"></i>
                <h3 className="font-montserrat font-semibold text-xl mb-2">TikTok</h3>
                <p className="text-accent">@soyleopsicologo</p>
                <div className="mt-4 text-primary font-medium group-hover:text-secondary transition-colors">
                  Seguir <i className="fas fa-arrow-right ml-1"></i>
                </div>
              </div>
            </div>
          </a>
          
          <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="block group">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform group-hover:scale-105">
              <div className="p-6 text-center">
                <i className="fab fa-youtube text-5xl text-[#FF0000] mb-4"></i>
                <h3 className="font-montserrat font-semibold text-xl mb-2">YouTube</h3>
                <p className="text-accent">@soyleopsicologo</p>
                <div className="mt-4 text-primary font-medium group-hover:text-secondary transition-colors">
                  Suscribirse <i className="fas fa-arrow-right ml-1"></i>
                </div>
              </div>
            </div>
          </a>
          
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="block group">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform group-hover:scale-105">
              <div className="p-6 text-center">
                <i className="fab fa-facebook text-5xl text-[#1877F2] mb-4"></i>
                <h3 className="font-montserrat font-semibold text-xl mb-2">Facebook</h3>
                <p className="text-accent">lic.leomaiello</p>
                <div className="mt-4 text-primary font-medium group-hover:text-secondary transition-colors">
                  Seguir <i className="fas fa-arrow-right ml-1"></i>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
