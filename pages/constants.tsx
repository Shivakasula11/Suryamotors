import {
  Wrench,
  Droplets,
  Disc,
  Hammer,
  Palette,
  Zap,
  Cog,
  FlaskConical,
  CircleDot,
  Armchair,
} from "lucide-react";
import { ServiceCategory, Testimonial, TeamMember } from "./types";
import {
  // --- Service images ---------------------------
  Wheel,
  Painting,
  Dent,
  Spares,
  Lubricant,
  Bridgestone,
  OilchangeService,
  GearBoxFitting,
  Brakepadfitting,
  LowerArmFixing,
  Fullwashing,
  InteriorVacuum,
  WaxingPolishing,
  Ceramiccoating,
  EngineBayCleaning,
  DeepCleaning,
  WashingServices,
  Alignment,
  WheelBalancing,
  TyreInspection,
  SuspensionCheck,
  NitrogenAir,
  DentPulling,
  SurfacePreparation,
  MetalWorks,
  PanelBeating,
  Electrician,
  BatteryCheck,
  FuseBox,
 WiringDiagnostics,
 LightRepair,
 ACElectricalWork,
 AudioInstallation,
 
  // --- Team member photos -----------------------
  ServiceAdvisor,
  Actech,
  Enginespecialist,
  Wheelalign,
  ChiefMechanic,
  Mechanics,
  ClutchRepair,
  SuspensionRepair,
} from "./pages/assests/images";

export const COMPANY_NAME = "Surya Multi Brand Car Services";
export const COMPANY_TAGLINE = "Complete Car Care Under One Roof";
export const COMPANY_PHONE = "+91 9948153518, +91 9291470852";
export const COMPANY_EMAIL = "suryamotorskvs@gmail.com";
export const COMPANY_ADDRESS =
  "Opposite Jio petrol Pump  Autonagar , Bodhan,Nizamabad, Telangana - 503185";

// Images sourced from Unsplash for better relevance
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "mechanic",
    title: "Mechanic",
    description: "Expert mechanical repairs for engine and gearbox issues.",
    icon: Wrench,
    image: Mechanics,
    subServices: [
      { name: " Engine Oil Change" },
      { name: "Gear Box Repair" },
      { name: "Clutch repair" },
      { name: "Brake Pads Fitting" },
      { name: "suspension repair" },
      { name: "Lower Arm Fixing" },
    ],
    gallery: [
      {
        title: "Oil Change",
        url: OilchangeService,
      },
      {
        title: "Gear Box Fitting",
        url: GearBoxFitting,
      },
      {
        title: "clutch Repair",
        url: ClutchRepair,
      },
      {
        title: "Brake Pads Fitting",
        url: Brakepadfitting,
      },
      {
        title: "suspension repair",
        url: SuspensionRepair,
      },

      {
        title: "Lower Arm Fixing",
        url: LowerArmFixing,
      },
    ],
  },
  {
    id: "washing",
    title: "Washing",
    description: "Premium car wash services for a sparkling clean look.",
    icon: Droplets,
    image: WashingServices,
    subServices: [
      { name: "Full Body Wash" },
      { name: "Interior Cleaning" },
      { name: "Waxing & Polishing" },
      { name: " Deep Cleaning & Protection " },
      { name: " Ceramic coating" },
      { name: "Engine Bay Cleaning" },
    ],
    gallery: [
      {
        title: "Full Body Wash",
        url: Fullwashing,
      },
      {
        title: "Interior Vacuum",
        url: InteriorVacuum,
      },
      {
        title: " Waxing & Polishing",
        url: WaxingPolishing,
      },
      {
        title: "Ceramic coating",
        url: Ceramiccoating,
      },
      {
        title: "Engine Bay Cleaning",
        url: EngineBayCleaning,
      },
      {
        title: "Deep Cleaning",
        url: DeepCleaning,
      },
    ],
  },
  {
    id: "alignment",
    title: "Wheel Alignment",
    description: "Precision alignment and balancing for smooth driving.",
    icon: Disc,
    image: Wheel,
    subServices: [
      { name: "Wheel Alignment" },
      { name: "Balancing" },
      { name: "Tyre Rotation" },
      { name: "Suspension Check" },
      { name: "3D Alignment" },
      { name: "Nitrogen" },
    ],
    gallery: [
      {
        title: "3D Alignment",
        url: Alignment,
      },
      {
        title: "Wheel Balancing",
        url: WheelBalancing,
      },
      {
        title: "Tyre Inspection",
        url: TyreInspection,
      },
      {
        title: "Suspension Check",
        url: SuspensionCheck,
      },
      {
        title: "Nitrogen",
        url: NitrogenAir,
      },
    ],
  },
  {
    id: "denting",
    title: "Denting",
    description: "Professional dent removal to restore your car’s shape.",
    icon: Hammer,
    image: Dent,
    subServices: [
      { name: "Dent Removal" },
      { name: "Body Repair" },
      { name: "Panel Beating" },
      { name: "Metal Works" },
      { name: "Paintless Dent Removal " },
      { name: "Welding Works" },
    ],
    gallery: [
      {
        title: "Dent Pulling",
        url: DentPulling,
      },
      {
        title: "Surface Preparation",
        url: SurfacePreparation,
      },
      {
        title: "Metal Works",
        url: MetalWorks,
      },
      {
        title: "Panel Beating",
        url: PanelBeating,
      },
    ],
  },
  {
    id: "painting",
    title: "Painting",
    description: "High-quality painting and scratch removal services.",
    icon: Palette,
    image: Painting,
    subServices: [
      { name: "Full Body Painting" },
      { name: "Scratch Removal" },
      { name: "Panel Painting" },
      { name: "Touch-up Painting" },
      { name: "Bumper Painting" },
      { name: "Alloy Wheel Painting" },
      { name: "Undercoating" },
      { name: "Anti Rust" },
    ],
    gallery: [
      {
        title: "Spray Painting",
        url: "https://racepaint.com.au/wp-content/uploads/2023/12/Custom-Car-Painting.jpg",
      },
      {
        title: "Color Matching",
        url: "https://tse1.explicit.bing.net/th/id/OIP.cUgYE_TZ8De-jGxLJ8BwwwHaFj?w=800&h=600&rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        title: "Scratch Repair",
        url: "https://www.detailingdevils.com/uploads/blogs/scrblog.webp",
      },
      {
        title: "Polishing",
        url: "https://static.vecteezy.com/system/resources/previews/003/582/888/non_2x/car-detailing-male-mechanic-holding-car-polishing-machine-auto-industry-car-polishing-and-painting-and-repair-shop-free-photo.jpg",
      },

      {
        title: "Anti Rust Coating",
        url: "https://th.bing.com/th/id/R.0b2b575e01574edd1f3397ea8b916dd6?rik=1goKS%2fWYPpO1%2fw&riu=http%3a%2f%2fsanghvicarshoppe.com%2fwp-content%2fuploads%2f2023%2f12%2fanti-rust-coating-.png&ehk=6NHiYo42v%2fqGz5%2b8OnYXG5V7f2WNkVyLoMKHAQm9Jeo%3d&risl=&pid=ImgRaw&r=0",
      },

      {
        title: "Alloy Wheel Painting",
        url: "https://cncwheels.com.au/wp-content/uploads/2022/10/IS_POWDER_COATING_WHEELS_A_GOOD_IDEA.jpg",
      },
    ],
  },
  {
    id: "electrician",
    title: "Electrician",
    description: "Expert electrical diagnostics and battery services.",
    icon: Zap,
    image: Electrician,
    subServices: [
      { name: "Battery Service" },
      { name: "Lighting Repairs" },
      { name: "Wiring Issues" },
      { name: "Ac Electricial work" },
      { name: "Starter Motor Repair" },
      { name: "Central Locking System" },
      { name: "Sensor &Ecu Related Services" },
      { name: "Audio & Accessories Installation" },
    ],
    gallery: [
      {
        title: "Battery Check",
        url: BatteryCheck,
      },
      {
        title: "Fuse Box",
        url: FuseBox,
      },
      {
        title: "Wiring Diagnostics",
        url: WiringDiagnostics,
      },
      {
        title: "Light Repair",
        url: LightRepair,
      },

      {
        title: "AC Electrical Work",
        url: ACElectricalWork,
      },
      {
        title: "Audio Installation",
        url: AudioInstallation,
      },
    ],
  },
  {
    id: "spares",
    title: "Spares",
    description: "Genuine spare parts for all major car brands.",
    icon: Cog,
    image: Spares,
    subServices: [
      { name: "Genuine Spare Parts" },
      { name: "Filters" },
      { name: "Clutch Plates" },
      { name: "Shock Absorbers" },
      { name: "Wipers" },
      { name: "Bumper" },
    ],

    gallery: [
      {
        title: "Engine Parts",
        url: "https://tse1.mm.bing.net/th/id/OIP.HfWwqKOXfmSyfiQZ3fBwiAHaHa?pid=ImgDet&w=474&h=474&rs=1&o=7&rm=3",
      },
      {
        title: "Filters",
        url: "https://th.bing.com/th/id/R.8386f9b4d8c31e759e56f80154e51a7f?rik=54RngUTquPLzGA&riu=http%3a%2f%2fsl-filters.com%2fproducts%2f2_oil_filter_01.jpg&ehk=q%2fJDYvHEewv7zruQ%2fql4dUnqRtzpm0TCW8dNF9SBBhc%3d&risl=&pid=ImgRaw&r=0",
      },
      {
        title: "Belts",
        url: "https://tse3.mm.bing.net/th/id/OIP.danKwnLtmyY3QHerSjeE3AHaEN?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        title: "Body Covers",
        url: "https://5.imimg.com/data5/SELLER/Default/2023/12/366799266/JW/TY/SV/124235632/jungle-print-waterproof-car-body-covers-500x500.jpeg",
      },

      {
        title: "Clutch Plates",
        url: "https://tse4.mm.bing.net/th/id/OIP.yBhpOLZ7NeD1dplQAie7pgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
      },

      {
        title: "Bumper",
        url: "https://guangjin.sg/wp-content/uploads/2023/05/bumper.jpg",
      },
    ],
  },
  {
    id: "lubricants",
    title: "Lubricants",
    description: "Top-grade oils and coolants for engine health.",
    icon: FlaskConical,
    image: Lubricant,

    subServices: [
      { name: "Engine Oil" },
      { name: "Brake Oil" },
      { name: "Coolant" },
      { name: "Transmission Fluid" },
      { name: "Power Steering Fluid" },
      { name: "Grease & Lubricants" },
    ],
    gallery: [
      {
        title: "Engine Oil",
        url: "https://tse1.mm.bing.net/th/id/OIP.I72XgFTX2n-bc8FP8XB5zgHaGi?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        title: "Brake Fluid",
        url: "https://cdn.shopify.com/s/files/1/0670/2750/1370/products/BOSCHBRAKEFLUIDDOT3.jpg?v=1667610738&width=1946",
      },
      {
        title: "Coolant",
        url: "https://tse4.mm.bing.net/th/id/OIP.xhsHs2wGYFDtjo_0HSPjjgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        title: "Grease",
        url: "https://m.media-amazon.com/images/I/71xfVHvsBsL._SL1500_.jpg",
      },

      {
        title: "Hydraulic Fluid",
        url: "https://5.imimg.com/data5/SELLER/Default/2022/8/JQ/AY/MF/157325237/hp-hydraulic-oil-68-1000x1000.jpg",
      },
      {
        title: "Gear Oil",
        url: "https://5.imimg.com/data5/HO/CV/MY-4019847/gear-hp-oil-500x500.jpg",
      },
    ],
  },
  {
    id: "tyres",
    title: "Tyres",
    description: "New tyres, rotation, and puncture repairs.",
    icon: CircleDot,
    image: Bridgestone,
    subServices: [
      { name: "Bridge Stone" },
      { name: "Jk Tyre" },
      { name: "Good Years" },
      { name: "MRF Tyres" },
      { name: "Local Tyres" },
      { name: "Ceat Tyres" },
    ],
    gallery: [
      {
        title: "Bridge stone Tyres",
        url: "https://tse1.mm.bing.net/th/id/OIP.ledqFzAajBnd7-p9rGyVvwHaD5?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        title: "JK Tyres",
        url: "https://mir-s3-cdn-cf.behance.net/projects/404/4373e997147229.Y3JvcCwxMzgwLDEwODAsMjE1LDA.png",
      },
      {
        title: "MRF Tyres",
        url: "https://brandtamizha.com/wp-content/uploads/2023/04/tyre1.jpg",
      },
      {
        title: "Good Years",
        url: "https://www.geomargulfllc.com/wp-content/uploads/2022/04/Goodyear-Tires-1400-1024x512-1.jpg",
      },

      {
        title: "Ceat Tyres",
        url: "https://5.imimg.com/data5/SELLER/Default/2025/1/480773831/HL/AG/KJ/136769402/ceat-car-tyres-1000x1000.jpg",
      },

      {
        title: "Local Tyres",
        url: "https://tse4.mm.bing.net/th/id/OIP.GBUY-m6o7tA3CDOwuT3E4QHaC9?w=1000&h=400&rs=1&pid=ImgDetMain&o=7&rm=3",
      },
    ],
  },
  {
    id: "decors",
    title: "Car Decors",
    description: "Enhance your car interior with premium accessories.",
    icon: Armchair,
    image:
      "https://www.techyv.com/sites/default/2022/10/users/Proofreader1/car-accessories.jpg",
    subServices: [
      { name: "Seat Covers" },
      { name: "Floor Mats" },
      { name: "Interior Accessories" },
      { name: "Full Matting" },
      { name: "Led Lights" },
      { name: "Micro Fiber Clothes" },
    ],
    gallery: [
      {
        title: "Luxury Seats",
        url: "https://tse1.mm.bing.net/th/id/OIP.jIG2pGPovgby6YiXcOJaxwHaHa?w=800&h=800&rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        title: "Premium  Perfumes",
        url: "https://smsupermall.in/product-img/Lia-Car-Gel-Citric-Tango-Lasts-1703850801.jpg",
      },
      {
        title: "Custom Mats",
        url: "https://m.media-amazon.com/images/I/81ghkPZNpDL._AC_SL1500_.jpg",
      },
      {
        title: "Idols & Figurines",
        url: "https://m.media-amazon.com/images/I/8175fYybvJL._SL1500_.jpg",
      },

      {
        title: " Wheel Covers",
        url: "https://m.media-amazon.com/images/I/71Ix7fSSLsL._SL1500_.jpg",
      },

      {
        title: "Andriod system",
        url: "https://mediacloud.carbuyer.co.uk/image/private/s--ekbHr281--/v1579645224/carbuyer/2019/05/android_auto_1.jpg",
      },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Regular Customer",
    comment:
      "Excellent service! My car feels brand new after the full service package.",
    avatar: "https://picsum.photos/id/1005/100/100",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Business Owner",
    comment:
      "Very professional staff and transparent pricing. Highly recommended.",
    avatar: "https://picsum.photos/id/1011/100/100",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Car Enthusiast",
    comment:
      "The detailing work is top-notch. They really care about the vehicles.",
    avatar: "https://picsum.photos/id/1012/100/100",
  },
];

export const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Rouf",
    role: "Chief Mechanic",
    image: ChiefMechanic,
    experience: "13 Years",
  },
  {
    id: 2,
    name: "KOTESH",
    role: "Service Advisor",
    image: ServiceAdvisor,
    experience: "5 Years",
  },
  {
    id: 3,
    name: "RIZWAN",
    role: "Paint Specialist",
    image: Painting,
    experience: "11 Years",
  },

  {
    id: 4,
    name: "SURESH REDDY",
    role: "AC Technician",
    image: Actech,
    experience: "6 Years",
  },
  {
    id: 5,
    name: "JAVEED",
    role: "Engine Specialist",
    image: Enginespecialist,
    experience: "9 Years",
  },
  {
    id: 6,
    name: "MUJEEB",
    role: "Wheel Alignment Technician",
    image: Wheelalign,
    experience: "7 Years",
  },
];
