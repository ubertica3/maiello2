export interface Event {
  id: number;
  title: string;
  location: string;
  description: string;
  day: number;
  month: string;
  image: string;
  actionText: string;
  actionLink: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Te Quiero Hasta Ahí",
    location: "Teatro Gran Rex, Buenos Aires",
    description: "Una charla dinámica que aborda los dilemas emocionales y relacionales en un mundo cada vez más digital.",
    day: 15,
    month: "Junio",
    image: "https://images.unsplash.com/photo-1559694097-8c1ce0887238?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    actionText: "Obtener Entradas",
    actionLink: "#"
  },
  {
    id: 2,
    title: "Psicología Digital",
    location: "Universidad de Buenos Aires",
    description: "Conferencia sobre el impacto de la tecnología en nuestras relaciones interpersonales.",
    day: 22,
    month: "Julio",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1370&q=80",
    actionText: "Más Información",
    actionLink: "#"
  },
  {
    id: 3,
    title: "Podcast en Vivo",
    location: "Centro Cultural Konex",
    description: "Grabación de podcast en vivo sobre relaciones modernas y salud mental.",
    day: 10,
    month: "Agosto",
    image: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80",
    actionText: "Reservar Lugar",
    actionLink: "#"
  }
];
