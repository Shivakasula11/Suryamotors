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
 SprayPainting,
 ColorMatching,
 ScratchRepair,
 Polishing,
 AntiRustCoating,
 AlloyAf,
 EngineParts,
 Filters,
 Belts,
 Covers,
 Clutchplate,
 Bumpers,
 Castrol,
 Brakeoil,
 Coolant,
 Grease,
 Hp,
 Servo,
//  ---tyres
 BridgestoneTyre,
 JkTyre,
 MrfTyre,
 Ceat,
 ChinaTyre,
 GoodYear,

// Decors
Cardecors,
Wheelcaps,
System,
Seats,
Mats,
Idols,
Perfume,

  // --- Team member photos -----------------------
  ServiceAdvisor,
  Actech,
  Enginespecialist,
  Wheelalign,
  ChiefMechanic,
  Mechanics,
  ClutchRepair,
  SuspensionRepair,

  //----Reviews-----
  Review1,  
  Review2,
  Review3,
  Review4,
  Review5,
  Review6,

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
        url: SprayPainting,
      },
      {
        title: "Color Matching",
        url: ColorMatching,
      },
      {
        title: "Scratch Repair",
        url: ScratchRepair,
      },
      {
        title: "Polishing",
        url: Polishing,
      },

      {
        title: "Anti Rust Coating",
        url: AntiRustCoating,
      },

      {
        title: "Alloy Wheel Painting",
        url: AlloyAf,
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
        url: EngineParts,
      },
      {
        title: "Filters",
        url: Filters,
      },
      {
        title: "Belts",
        url: Belts,
      },
      {
        title: "Body Covers",
        url: Covers,
      },

      {
        title: "Clutch Plates",
        url: Clutchplate,
      },

      {
        title: "Bumper",
        url: Bumpers,
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
        url: Castrol,
      },
      {
        title: "Brake Fluid",
        url: Brakeoil,
      },
      {
        title: "Coolant",
        url: Coolant,
      },
      {
        title: "Grease",
        url: Grease,
      },

      {
        title: "Hydraulic Fluid",
        url: Hp,
      },
      {
        title: "Gear Oil",
        url: Servo,
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
        url: BridgestoneTyre,
      },
      {
        title: "JK Tyres",
        url: JkTyre,
      },
      {
        title: "MRF Tyres",
        url: MrfTyre,
      },
      {
        title: "Good Years",
        url: GoodYear,
      },

      {
        title: "Ceat Tyres",
        url: Ceat,
      },

      {
        title: "Local Tyres",
        url: ChinaTyre,
      },
    ],
  },
  {
    id: "decors",
    title: "Car Decors",
    description: "Enhance your car interior with premium accessories.",
    icon: Armchair,
    image: Cardecors,
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
        url: Seats,
      },
      {
        title: "Premium  Perfumes",
        url: Perfume,
      },
      {
        title: "Custom Mats",
        url: Mats,
      },
      {
        title: "Idols & Figurines",
        url: Idols,
      },

      {
        title: " Wheel Covers",
        url: Wheelcaps,
      },

      {
        title: "Andriod system",
        url: System,
      },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  
  {
    id: 1,
    name: "Ramesh K",
    role: "Regular Customer",
    comment:
      "Got my Baleno serviced here. The team explained the work clearly before starting and delivered the car on time. Really satisfied with the service.",
    avatar: Review1,
  },
  {
    id: 2,
    name: "Sai Kumar",
    role: "Happy Customer",
    comment:
      "Visited for AC service and a general check-up. The cooling is much better now and the staff kept me updated throughout the service.",
    avatar: Review2,
  },
  {
    id: 3,
    name: "Praveen Reddy",
    role: "Car Owner",
    comment:
      "I brought my Creta for detailing and polishing. The finish came out really well and most of the visible swirl marks were gone. Good work by the team.",
    avatar: Review3,
  },
  {
    id: 4,
    name: "Arun Kumar",
    role: "Regular Customer",
    comment:
      "I have visited Surya Motors a few times for regular maintenance. The service has been consistent and they explain the charges properly before doing any additional work.",
    avatar: Review4,
  },
  {
    id: 5,
    name: "Naveen",
    role: "Happy Customer",
    comment:
      "Had an issue with the brakes and gave the car here for inspection. They identified the problem quickly and fixed it the same day. Overall a good experience.",
    avatar: Review5,
  },
  {
    id: 6,
    name: "Manisha",
    role: "Car Owner",
    comment:
      "Good service and reasonable pricing. They called me before replacing any parts, which I really appreciated. The car is running smoothly after the service.",
    avatar: Review6,
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
