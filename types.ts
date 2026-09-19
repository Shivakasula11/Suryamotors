  import { LucideIcon } from 'lucide-react';

  export interface SubService {
    name: string;
  }

  export interface ServiceImage {
    url: string;
    title: string;
  }

  export interface ServiceCategory {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    image: string;
    subServices: SubService[];
    gallery: ServiceImage[];
  }

  export interface Testimonial {
    id: number;
    name: string;
    role: string;
    comment: string;
    avatar: string;
  }

  export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
     experience: string;
  }