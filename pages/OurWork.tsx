import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import {
  MoveHorizontal,
  Calendar,
  Wrench,
  Award,
  Phone,
  ArrowRight,
  Search,
  ClipboardCheck,
  Truck,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { COMPANY_PHONE } from "../constants";
import * as img from "./Ourworkimgs/images";

/* ═══════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════ */
interface WorkItem {
  id: number;
  title: string;
  category: string;
  car: string;
  date: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  tags: string[];
  highlights?: string[];
  quote?: { text: string; author: string };
}

const WORKS: WorkItem[] = [
  {
    id: 1,
    title: "Front-End Collision Repair",
    category: "Denting & Painting",
    car: "Hyundai i20",
    date: "October 2025",
    description:
      "Heavy front-end damage restored with paintless dent removal and a colour-matched full repaint. Saved the customer ₹40,000+ versus a replacement quote from the dealership.",
    beforeImage: img.denting1,
    afterImage: img.painting1,
    tags: ["Dent Repair", "Paint Match", "Bumper"],
    highlights: [
      "Original bumper saved — no replacement needed",
      "Factory-grade colour matching using spectrophotometer",
      "Seven-day turnaround, end to end",
    ],
    quote: {
      text: "Brought it in expecting a write-off. Drove it out feeling brand new.",
      author: "Rajesh K., Hyundai i20 owner",
    },
  },
  {
    id: 2,
    title: "Full-Body Ceramic Coating",
    category: "Detailing & Wash",
    car: "Honda City",
    date: "September 2025",
    description:
      "Complete exterior decontamination, paint correction, and 3-year ceramic coating. Showroom-grade finish with hydrophobic protection.",
    beforeImage: img.ceramic,
    afterImage: img.ceramic2,
    tags: ["Ceramic Coating", "Paint Correction", "Detailing"],
  },
  {
    id: 3,
    title: "Interior Deep Cleaning",
    category: "Detailing & Wash",
    car: "Maruti Swift",
    date: "September 2025",
    description:
      "Steam-cleaned upholstery, dashboard restoration, carpet shampoo, and full vacuum. The cabin looked and smelled brand new.",
    beforeImage: img.interiorBf,
    afterImage: img.interiorAf,
    tags: ["Interior", "Steam Clean", "Shampoo"],
  },
  {
    id: 4,
    title: "Side-Panel Dent Removal",
    category: "Denting & Painting",
    car: "Toyota Innova",
    date: "August 2025",
    description:
      "Multiple side-panel dents removed using paintless dent removal (PDR). No repaint required — original factory paint preserved.",
    beforeImage: img.dentBf,
    afterImage: img.dentAf,
    tags: ["PDR", "Panel Repair", "No Paint"],
  },
  {
    id: 5,
    title: "Engine Overhaul & Service",
    category: "Mechanical",
    car: "Mahindra Bolero",
    date: "August 2025",
    description:
      "Full engine teardown, ring & bearing replacement, head-gasket renewal, and timing-belt service. Backed by a one-year workshop warranty.",
    beforeImage: img.engineOverhaulBf,
    afterImage: img.engineOverhaulAf,
    tags: ["Engine", "Overhaul", "Warranty"],
  },
  {
    id: 6,
    title: "Alloy Wheel Refinish",
    category: "Restoration",
    car: "Kia Seltos",
    date: "July 2025",
    description:
      "Curb-rash on all four alloys repaired, sanded, and refinished in metallic gunmetal. Wheels returned to a factory-fresh look.",
    beforeImage: img.alloyBf,
    afterImage: img.alloyAf,
    tags: ["Alloy", "Refinish", "Powder Coat"],
  },
  {
    id: 7,
    title: "Headlight Restoration & Electrical Check",
    category: "Electrical",
    car: "Hyundai Verna",
    date: "June 2025",
    description:
      "Foggy, yellowed headlights restored to crystal clarity, plus full wiring diagnostic and faulty fuse replacement. Night-driving safety dramatically improved.",
    beforeImage:
      img.HeadlightRestoreBf,
    afterImage:
      img.HeadlightRestoreAf,
    tags: ["Headlight Restoration", "Wiring", "Diagnostics"],
  },
  {
    id: 8,
    title: "3D Alignment & Wheel Balancing",
    category: "Wheel Alignment",
    car: "Ford EcoSport",
    date: "June 2025",
    description:
      "Customer complained of the steering pulling left and uneven tyre wear. Full 3D alignment, four-wheel balancing, and nitrogen fill restored handling to factory spec.",
    beforeImage: img.wheelAlignmentBf,
    afterImage: img.wheelAlignmentAf,
    tags: ["3D Alignment", "Balancing", "Nitrogen"],
  },
  {
    id: 9,
    title: "New MRF Tyre Set Installation",
    category: "Tyres",
    car: "Maruti Brezza",
    date: "May 2025",
    description:
      "All four tyres replaced with a fresh MRF ZLX set after the originals fell below the safe tread limit. Customer drove home in a measurably safer car.",
    beforeImage: img.tyresBf,
      
    afterImage: img.tyresAf,
    tags: ["MRF Tyres", "Full Set", "Safety"],
  },
  {
    id: 10,
    title: "Premium Cabin Upgrade",
    category: "Car Decors",
    car: "Tata Nexon",
    date: "May 2025",
    description:
      "Custom seat covers, premium floor mats, ambient LED footwell lighting, and Android infotainment installed. The cabin went from stock to showroom-grade.",
    beforeImage:
      img.cabinUpgradeBf,
    afterImage:
      img.cabinUpgradeAf,
    tags: ["Seat Covers", "LED", "Android System"],
  },
  {
    id: 11,
    title: "Synthetic Oil & Filter Service",
    category: "Lubricants",
    car: "Renault Kwid",
    date: "April 2025",
    description:
      "Old contaminated engine oil drained, fresh fully-synthetic 5W-30 filled, and both oil & air filters replaced. Engine ran noticeably quieter on the test drive.",
    beforeImage:
      img.OilchangeBf,
    afterImage:
      img.OilchangeAf,
    tags: ["Synthetic Oil", "5W-30", "Filter Change"],
  },
  {
    id: 12,
    title: "Genuine OEM Brake Pad Replacement",
    category: "Spares",
    car: "Volkswagen Polo",
    date: "April 2025",
    description:
      "Severely worn brake pads replaced with OEM genuine spares. Pedal feel restored and stopping distance reduced significantly — a real safety upgrade.",
    beforeImage:
      img.BrakepadsBf,
    afterImage:
      img.BrakepadsAf,
    tags: ["Brake Pads", "OEM", "Safety"],
  },

  /* ─── Denting & Painting (extras) ─── */
  {
    id: 13,
    title: "Rear Bumper Repaint",
    category: "Denting & Painting",
    car: "Maruti Baleno",
    date: "July 2025",
    description:
      "Deep scratches and minor dents on the rear bumper completely refinished with a colour-matched repaint. Bumper looks factory-new.",
    beforeImage:
      img.BalenoBf,
    afterImage:
      img.BalenoAf,
    tags: ["Bumper", "Repaint", "Scratch"],
  },
  {
    id: 14,
    title: "Door Scratch & Dent Repair",
    category: "Denting & Painting",
    car: "Honda Amaze",
    date: "July 2025",
    description:
      "Long scratch and pressure dent on the driver door fixed without panel replacement. Original colour matched to perfection.",
    beforeImage:
      img.AmazeBf,
    afterImage: img.AmazeAf,
    tags: ["Door Repair", "Scratch", "Paint"],
  },
  {
    id: 15,
    title: "Full Body Repaint",
    category: "Denting & Painting",
    car: "Skoda Rapid",
    date: "June 2025",
    description:
      "Faded factory paint stripped and resprayed in metallic blue. Three-stage prep, base coat, clear coat — true showroom finish.",
    beforeImage:
      img.SkodaBf,
    afterImage:
      img.SkodaAf,
    tags: ["Full Repaint", "Metallic", "Three-Stage"],
  },

  /* ─── Detailing & Wash (extras) ─── */
  {
    id: 16,
    title: "Headlight Polish & UV Seal",
    category: "Detailing & Wash",
    car: "Toyota Etios",
    date: "July 2025",
    description:
      "Yellowed, hazy headlights polished back to crystal clarity and sealed with UV-resistant coating. Lights look 5 years younger.",
    beforeImage: img.HeadlightBf,
    afterImage:
      img.HeadlightAf,
    tags: ["Headlight Polish", "UV Coating", "Restoration"],
  },
  {
    id: 17,
    title: "Engine Bay Deep Cleaning",
    category: "Detailing & Wash",
    car: "Hyundai Creta",
    date: "June 2025",
    description:
      "Years of grime and oil residue removed from the engine bay. Plastics restored with dressing, metal surfaces protected from corrosion.",
    beforeImage:
      img.CreataBf,
    afterImage:
      img.CreataAf,
    tags: ["Engine Bay", "Degrease", "Detail"],
  },
  {
    id: 18,
    title: "Exterior Polish & Carnauba Wax",
    category: "Detailing & Wash",
    car: "Mahindra Scorpio",
    date: "June 2025",
    description:
      "Paint correction to remove swirl marks and light scratches, followed by hand-applied carnauba wax for that wet-look shine.",
    beforeImage:
      img.SwirlmarksBf,
    afterImage: img.SwirlmarksAf,
    tags: ["Polish", "Carnauba Wax", "Paint Correction"],
  },

  /* ─── Mechanical (extras) ─── */
  {
    id: 19,
    title: "Clutch Plate Replacement",
    category: "Mechanical",
    car: "Maruti Swift Dzire",
    date: "July 2025",
    description:
      "Worn clutch and pressure plate replaced. Slipping issue eliminated, pedal feel restored to factory specification.",
    beforeImage:
      img.ClutchPlateBf,
    afterImage:
      img.ClutchPlateAf,
    tags: ["Clutch", "Pressure Plate", "Transmission"],
  },
  {
    id: 20,
    title: "Full Suspension Overhaul",
    category: "Mechanical",
    car: "Hyundai i10",
    date: "June 2025",
    description:
      "Worn shocks, bushings, and lower arms replaced. Ride quality transformed from rattly to smooth in a single visit.",
    beforeImage:
      img.FullSuspensionBf,
    afterImage:
      img.FullSuspensionAf,
    tags: ["Suspension", "Shocks", "Overhaul"],
  },
  {
    id: 21,
    title: "Brake System Service",
    category: "Mechanical",
    car: "Honda Brio",
    date: "May 2025",
    description:
      "Front and rear brake pads replaced, rotors machined, brake fluid flushed. Pedal response significantly improved.",
    beforeImage:
      img.BrakeSystemBf,
    afterImage:
      img.BrakeSystemAf,
    tags: ["Brakes", "Rotors", "Fluid"],
  },
  {
    id: 22,
    title: "Gearbox Repair & Service",
    category: "Mechanical",
    car: "Ford Figo",
    date: "April 2025",
    description:
      "Hard-shifting gearbox stripped, worn synchros replaced, reassembled with fresh oil. Shifts now smooth across all gears.",
    beforeImage:
      img.GearboxRepairBf,
    afterImage:
      img.GearboxRepairAf,
    tags: ["Gearbox", "Synchros", "Repair"],
  },

  /* ─── Restoration (extras) ─── */
  {
    id: 23,
    title: "Anti-Rust Underbody Treatment",
    category: "Restoration",
    car: "Maruti 800 (Classic)",
    date: "June 2025",
    description:
      "Surface rust treated and underbody coated with industrial-grade anti-rust compound. Extended this classic\u2019s lifespan significantly.",
    beforeImage:
      img.Antirustbf,
    afterImage:
      img.AntirustAF,
    tags: ["Anti-Rust", "Underbody", "Classic"],
  },
  {
    id: 24,
    title: "Vintage Body Restoration",
    category: "Restoration",
    car: "Hindustan Ambassador",
    date: "May 2025",
    description:
      "Full body refresh with metal repair, primer, and a period-correct cream paint job. A true Ambassador, brought back to its prime.",
    beforeImage:
      img.CarBf,
    afterImage:
      img.CarAf,
    tags: ["Vintage", "Body Work", "Heritage"],
  },
  {
    id: 25,
    title: "Chrome & Trim Restoration",
    category: "Restoration",
    car: "Mahindra Thar (Old)",
    date: "April 2025",
    description:
      "Faded chrome trim and grille re-polished and re-coated. Decades of oxidation removed, mirror finish achieved.",
    beforeImage:
      img.TharBf,
    afterImage:
      img.Tharaf,
    tags: ["Chrome", "Trim", "Polish"],
  },
  {
    id: 26,
    title: "Interior Plastics Restoration",
    category: "Restoration",
    car: "Nissan",
    date: "March 2025",
    description:
      "Sun-damaged dashboard, door cards, and trim panels rejuvenated with industrial restorer. Cabin looks 10 years younger.",
    beforeImage:
      img.NissanBf,
    afterImage:
      img.NissanAf,
    tags: ["Interior", "Plastics", "UV Damage"],
  },

  /* ─── Electrical (extras) ─── */
  {
    id: 27,
    title: "Battery Replacement & Service",
    category: "Electrical",
    car: "Hyundai Grand i10",
    date: "May 2025",
    description:
      "Dead battery replaced with Exide unit, terminals cleaned and treated, charging system verified. Quick crank restored.",
    beforeImage:
      img.ExideBf,
    afterImage:
      img.ExideAf,
    tags: ["Battery", "Exide", "Service"],
  },
  {
    id: 28,
    title: "Air Conditioning Compressor & Sensor Repair",
    category: "Electrical",
    car: "Toyota Innova Crysta",
    date: "May 2025",
    description:
      "Faulty AC compressor relay and pressure sensor diagnosed and replaced. Cabin cools to factory spec within 2 minutes again.",
    beforeImage:
      img.CompressorBf,
    afterImage:
      img.CompressorAf,
    tags: ["AC", "Compressor", "Sensor"],
  },
  {
    id: 29,
    title: "Central Locking & Remote Repair",
    category: "Electrical",
    car: "Maruti Wagon R",
    date: "April 2025",
    description:
      "Non-functional central locking and key fob diagnosed — actuator motor and remote PCB replaced. All four doors lock smoothly.",
    beforeImage:
      img.CentralLockingBf,
    afterImage:
      img.CentralLockingAf,
    tags: ["Central Lock", "Remote", "Actuator"],
  },
  {
    id: 30,
    title: "Premium Audio Installation",
    category: "Electrical",
    car: "Tata Tiago",
    date: "March 2025",
    description:
      "JBL component speakers, subwoofer, and amplifier installed with sound deadening. Concert-hall acoustics in a hatchback.",
    beforeImage:
      img.AudioinstallationBf,
    afterImage:
      img.AudioinstallationAf,
    tags: ["Audio", "JBL", "Subwoofer"],
  },

  /* ─── Wheel Alignment (extras) ─── */
  {
    id: 31,
    title: "Suspension Geometry Check",
    category: "Wheel Alignment",
    car: "Honda WR-V",
    date: "May 2025",
    description:
      "Camber, caster, and toe angles inspected and adjusted on 3D alignment rig. Steering wander completely eliminated.",
    beforeImage:
      img.SuspensionBF,
    afterImage:
      img.SuspensionAF,
    tags: ["Geometry", "Camber", "Caster"],
  },
  {
    id: 32,
    title: "Tyre Rotation & Re-Balancing",
    category: "Wheel Alignment",
    car: "Maruti Ciaz",
    date: "April 2025",
    description:
      "Cross-rotation pattern applied and all four wheels re-balanced. Vibration above 80 km/h gone, even wear restored.",
    beforeImage:
      img.TyreRotationBF,
    afterImage:
      img.TyreRotationAf,
    tags: ["Rotation", "Balancing", "Vibration"],
  },
  {
    id: 33,
    title: "Performance Alignment Set-up",
    category: "Wheel Alignment",
    car: "Hyundai Tucson",
    date: "April 2025",
    description:
      "Slight negative camber and adjusted toe-in for sharper cornering response. Customer loved the more planted feel.",
    beforeImage:
      img.PerformanceAlignmentBF,
    afterImage:
      img.PerformanceAlignmentAf,
    tags: ["Performance", "Camber", "Toe-in"],
  },
  {
    id: 34,
    title: "Nitrogen Fill & Pressure Set",
    category: "Wheel Alignment",
    car: "Volkswagen Vento",
    date: "March 2025",
    description:
      "All four tyres purged and refilled with nitrogen for stable pressure. Reduced sidewall flex, better highway mileage.",
    beforeImage:
      img.NitrogenBf,
    afterImage:
      img.NitrogenAF,
    tags: ["Nitrogen", "Pressure", "Mileage"],
  },

  /* ─── Tyres (extras) ─── */
  {
    id: 35,
    title: "Bridgestone Premium Set",
    category: "Tyres",
    car: "Honda Jazz",
    date: "May 2025",
    description:
      "Premium Bridgestone Turanza set installed for quieter cabin and improved wet grip. Highway noise noticeably reduced.",
    beforeImage:
      img.BridgestoneBf,
    afterImage:
      img.BridgestoneAf,
    tags: ["Bridgestone", "Premium", "Performance"],
  },
  {
    id: 36,
    title: "Goodyear All-Season Set",
    category: "Tyres",
    car: "Hyundai Aura",
    date: "April 2025",
    description:
      "Full set of Goodyear Assurance tyres with balancing and alignment. Excellent grip for monsoon driving conditions.",
    beforeImage:
      img.GoodyearBF,
    afterImage:
      img.GoodyearAF,
    tags: ["Goodyear", "All-Season", "Monsoon"],
  },
  {
    id: 37,
    title: "Ceat Comfort Set",
    category: "Tyres",
    car: "Renault Triber",
    date: "March 2025",
    description:
      "Ceat MileHRX set fitted with full balancing. Budget-friendly without compromising on safety or comfort.",
    beforeImage:
      img.CeatBf,
    afterImage:
      img.CeatAf,
    tags: ["Ceat", "Comfort", "Value"],
  },
  {
    id: 38,
    title: "JK Tyre Set with Alignment",
    category: "Tyres",
    car: "Maruti Alto",
    date: "March 2025",
    description:
      "JK Tyres UX1 fitted along with full wheel alignment and balancing. Smooth ride restored, vibrations gone.",
    beforeImage:
      img.JkBF,
    afterImage:
      img.JkAF,
    tags: ["JK Tyre", "Set Fit", "Alignment"],
  },

  /* ─── Car Decors (extras) ─── */
  {
    id: 39,
    title: "Custom Leather Seat Covers",
    category: "Car Decors",
    car: "Hyundai Venue",
    date: "May 2025",
    description:
      "Tailored Nappa-grade leather seat covers in cream-and-brown two-tone. Premium look and feel transformation.",
    beforeImage:
      img.SeatCoversBf,
    afterImage:
      img.SeatCoversAF,
    tags: ["Leather", "Seat Covers", "Two-Tone"],
  },
  {
    id: 40,
    title: "Premium 7D Floor Mats",
    category: "Car Decors",
    car: "Maruti Baleno",
    date: "April 2025",
    description:
      "7D-cut PU floor mats with full coverage and easy-clean surface. Protects original carpet completely.",
    beforeImage:
      img.FloorMatsBf,
    afterImage:
      img.FloorMatsAF,
    tags: ["7D Mats", "PU", "Floor Protection"],
  },
  {
    id: 41,
    title: "Ambient LED Lighting Kit",
    category: "Car Decors",
    car: "Tata Harrier",
    date: "April 2025",
    description:
      "RGB ambient LED kit installed across footwell, dashboard, and door cards. App-controlled with 16 colour options.",
    beforeImage:
      img.lightbf,
    afterImage:
      img.lightaf,
    tags: ["LED", "Ambient", "RGB"],
  },
  {
    id: 42,
    title: "Android Infotainment Upgrade",
    category: "Car Decors",
    car: "Mahindra XUV300",
    date: "March 2025",
    description:
      "10-inch Android Auto head unit installed with reverse camera, GPS, and Bluetooth. Modern infotainment in an instant.",
    beforeImage:
      img.Systembf,
    afterImage:
      img.Systemaf,
    tags: ["Android Auto", "10-inch", "GPS"],
  },

  /* ─── Lubricants (extras) ─── */
  {
    id: 43,
    title: "Brake Fluid Flush Service",
    category: "Lubricants",
    car: "Hyundai Aura",
    date: "May 2025",
    description:
      "Old hygroscopic brake fluid completely flushed and replaced with DOT 4. Pedal feel firmer, braking confidence restored.",
    beforeImage: img.BrakeBF,
    afterImage:
      img.BrakeAF,
    tags: ["Brake Fluid", "DOT 4", "Flush"],
  },
  {
    id: 44,
    title: "Coolant System Service",
    category: "Lubricants",
    car: "Ford Aspire",
    date: "April 2025",
    description:
      "Old coolant drained, system flushed, and refilled with long-life coolant. No more overheating in summer traffic.",
    beforeImage:
      img.CoolantBF,
    afterImage:
      img.CoolantAF,
    tags: ["Coolant", "Flush", "Long-Life"],
  },
  {
    id: 45,
    title: "Manual Gearbox Oil Change",
    category: "Lubricants",
    car: "Tata Indica",
    date: "March 2025",
    description:
      "Old gear oil drained and refilled with high-grade synthetic gear lubricant. Shifts noticeably smoother across all gears.",
    beforeImage:
      img.GearOilBF,
    afterImage:
      img.GearOilAF,
    tags: ["Gear Oil", "Synthetic", "Manual"],
  },
  {
    id: 46,
    title: "Power Steering Fluid Service",
    category: "Lubricants",
    car: "Mahindra Xylo",
    date: "March 2025",
    description:
      "Whining power steering pump silenced by fresh fluid and full system bleed. Steering effort lighter, no more noise.",
    beforeImage: img.SteeringoilBF,
    afterImage:
      img.SteeringoilAF,
    tags: ["Power Steering", "Fluid", "Bleed"],
  },

  /* ─── Spares (extras) ─── */
  {
    id: 47,
    title: "Air & Cabin Filter Replacement",
    category: "Spares",
    car: "Maruti Vitara Brezza",
    date: "May 2025",
    description:
      "Both air intake and cabin AC filters replaced with OEM spares. Engine breathes better, cabin air noticeably fresher.",
    beforeImage:
      img.AirfilterBf,
    afterImage:
      img.AirfilterAF,
    tags: ["Air Filter", "Cabin Filter", "OEM"],
  },
  {
    id: 48,
    title: "Timing Belt & Tensioner Set",
    category: "Spares",
    car: "Tata Indigo",
    date: "April 2025",
    description:
      "Worn timing belt and tensioner replaced before failure. Critical preventive service — avoided potential engine damage.",
    beforeImage:
      img.TimingbeltBf,
    afterImage:
      img.TimingbeltAF,
    tags: ["Timing Belt", "Tensioner", "Preventive"],
  },
  {
    id: 49,
    title: "Front Shock Absorber Pair",
    category: "Spares",
    car: "Hyundai Eon",
    date: "April 2025",
    description:
      "Front pair of shock absorbers replaced with Gabriel units. Bouncy ride completely eliminated.",
    beforeImage:
      img.ShockAbsorberBf,
    afterImage:
      img.ShockAbsorberAF,
    tags: ["Shocks", "Gabriel", "Front Pair"],
  },
  {
    id: 50,
    title: "Wiper Blades & Washer Set",
    category: "Spares",
    car: "Honda WR-V",
    date: "March 2025",
    description:
      "Worn wiper blades, washer nozzles, and reservoir cap replaced. Crystal-clear visibility for monsoon driving.",
    beforeImage:
      img.WiperbladesBf,
    afterImage: img.WiperbladesAF,
    tags: ["Wiper Blades", "Washer", "Visibility"],
  },
];

const STATS = [
  { value: "500+", label: "Projects Completed" },
  { value: "1000+", label: "Happy Customers" },
  { value: "8+", label: "Years Experience" },
  { value: "15+", label: "Brands Serviced" },
];

const PROCESS = [
  {
    icon: Search,
    step: "01",
    title: "Inspect",
    description:
      "Detailed assessment with photos shared on WhatsApp before any work begins.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Quote",
    description:
      "Transparent line-item pricing. No hidden charges, no surprise add-ons.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Repair",
    description:
      "Genuine parts, certified technicians, progress updates whenever you ask.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Deliver",
    description:
      "Final quality check, road test, and a complimentary wash before handover.",
  },
];

const TRUST_BADGES = [
  { label: "Free Inspection", icon: Search },
  { label: "Workshop Warranty", icon: ShieldCheck },
  { label: "Insurance Support", icon: Award },
  { label: "Pickup & Drop", icon: Truck },
];


const CATEGORIES = [
  "All",
  "Denting & Painting",
  "Detailing & Wash",
  "Mechanical",
  "Wheel Alignment",
  "Electrical",
  "Tyres",
  "Lubricants",
  "Spares",
  "Car Decors",
  "Restoration",
];

/* ═══════════════════════════════════════════════════════════════════════
   IN-VIEW HOOK + FADE-IN WRAPPER (scroll-triggered animations)
   ═══════════════════════════════════════════════════════════════════════ */
const useInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
};

const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}> = ({ children, delay = 0, className = "", y = 24 }) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   BEFORE / AFTER SLIDER
   ═══════════════════════════════════════════════════════════════════════ */
const BeforeAfterSlider: React.FC<{
  before: string;
  after: string;
  title: string;
}> = ({ before, after, title }) => {
  const [pos, setPos] = useState(50);
  const [interacted, setInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setInteracted(true);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="relative w-full h-full overflow-hidden bg-gray-200 dark:bg-gray-800 cursor-ew-resize select-none touch-none"
    >
      {/* AFTER side — clipped from the LEFT, symmetric to BEFORE */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <img
          src={after}
          alt={`${title} – After`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          loading="lazy"
        />
        <span className="absolute top-4 right-4 z-10 bg-blue-600 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-sm tracking-[0.2em]">
          AFTER
        </span>
      </div>

      {/* BEFORE side — clipped from the RIGHT, symmetric to AFTER */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${title} – Before`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          loading="lazy"
        />
        <span className="absolute top-4 left-4 z-10 bg-blue-600 backdrop-blur-sm text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-sm tracking-[0.2em]">
          BEFORE
        </span>
      </div>

      {/* Subtle top gradient for label readability */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-[5]" />

      {/* Vertical divider */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white pointer-events-none"
        style={{
          left: `${pos}%`,
          transform: "translateX(-50%)",
          boxShadow: "0 0 12px rgba(0,0,0,0.5)",
        }}
      />

      {/* Circular handle with pulse animation until first interaction */}
      <div
        className="absolute top-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full shadow-2xl flex items-center justify-center pointer-events-none"
        style={{
          left: `${pos}%`,
          transform: "translate(-50%, -50%)",
          animation: interacted ? "none" : "ba-pulse 2s ease-in-out infinite",
        }}
      >
        <MoveHorizontal
          className="w-5 h-5 sm:w-5 sm:h-5 text-blue-600"
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════ */
const OurWork: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const featured = WORKS[0];
  const restOfWorks = useMemo(() => WORKS.slice(1), []);

  const filteredWorks = useMemo(
    () =>
      activeCategory === "All"
        ? restOfWorks
        : restOfWorks.filter((w) => w.category === activeCategory),
    [activeCategory, restOfWorks],
  );

  const INITIAL_VISIBLE = 9;
  const LOAD_STEP = 9;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [activeCategory]);
  const displayedWorks = useMemo(
    () => filteredWorks.slice(0, visibleCount),
    [filteredWorks, visibleCount],
  );
  const hasMore = visibleCount < filteredWorks.length;

  const telHref = `tel:${COMPANY_PHONE.split(",")[0].replace(/\s+/g, "")}`;
  const primaryPhone = COMPANY_PHONE.split(",")[0].trim();

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
      {/* Inline animations + utility styles */}
      <style>{`
        @keyframes ba-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.55), 0 8px 24px rgba(0,0,0,0.25); }
          50%      { box-shadow: 0 0 0 12px rgba(37, 99, 235, 0),     0 8px 24px rgba(0,0,0,0.25); }
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .eyebrow {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }
        .num-mono {
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════
          HERO — cinematic dark with workshop background image
          ═══════════════════════════════════════════════════════════════ */}
          
          <section className="relative bg-gray-950 text-white overflow-hidden 
  min-h-[100dvh] sm:min-h-[640px] md:min-h-[720px] 
  lg:min-h-[100dvh]
  flex items-center md:block">
    <img
  fetchpriority="high" src={img.ourWorkHero}
  alt="Workshop team"
  aria-hidden="true"
  loading="eager"
  className="absolute inset-0 w-full h-full object-cover object-[65%_center] sm:object-[80%_center] md:object-top"
/>

        
      <div
  aria-hidden="true"
  className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/40 sm:from-black/85 sm:via-black/60 sm:to-black/30 md:from-black/70 md:via-black/30 md:to-transparent"
/>

        <div className="relative w-full max-w-7xl 2xl:max-w-[1600px] mx-auto px-5 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-8 sm:py-28 md:py-40 lg:py-52 xl:py-60">
        

          <FadeIn delay={100}>
            <h1
              className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] tracking-tight max-w-[80%] sm:max-w-5xl"
              style={{
                textShadow:
                  "0 4px 32px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.5)",
              }}
            >
              Our Works,
              <br />
              <span className="text-blue-400">In Detail.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex items-start gap-4 mt-8 sm:mt-10 max-w-[85%] sm:max-w-2xl">
  <span className="block h-px w-12 mt-3 sm:mt-4 bg-blue-500/60 shrink-0" />
  <p
    className="text-sm sm:text-lg md:text-xl leading-relaxed font-medium"
  style={{
    color: "#F0FCFF",
    textShadow:
      "0 2px 12px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,1), 0 0 32px rgba(0,0,0,0.8)",
  }}
>
                Real cars. Real damage. Real results. Every project below is a
                vehicle we restored — drag the slider on each image to see the
                transformation our team delivered.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED PROJECT — editorial 2-column
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-5 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-16 sm:py-20 md:py-24 lg:py-28">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8 text-blue-600 dark:text-blue-400">
              <span className="eyebrow">Featured Project</span>
              <span className="h-px w-16 bg-blue-600/40 dark:bg-blue-400/40" />
              <span className="num-mono text-sm font-semibold text-gray-500 dark:text-gray-400">
                /&nbsp;01
              </span>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
            <FadeIn className="lg:col-span-7" delay={100}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/10 dark:shadow-black/40 ring-1 ring-gray-200 dark:ring-gray-800">
                <BeforeAfterSlider
                  before={featured.beforeImage}
                  after={featured.afterImage}
                  title={featured.title}
                />
              </div>
            </FadeIn>

            <FadeIn className="lg:col-span-5" delay={200}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-[0.18em]">
                  {featured.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 num-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  {featured.date}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-gray-900 dark:text-white mb-3">
                {featured.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 font-medium mb-6">
                {featured.car}
              </p>

              <p className="text-[15px] sm:text-base text-gray-700 dark:text-gray-300 leading-[1.75] mb-7">
                {featured.description}
              </p>

              {featured.highlights && (
                <ul className="space-y-3 mb-7">
                  {featured.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-sm sm:text-[15px] text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {featured.quote && (
                <figure className="relative bg-white dark:bg-gray-800/60 border-l-4 border-blue-600 dark:border-blue-400 rounded-r-lg p-5 sm:p-6 my-7 shadow-sm">
                  <div
                    aria-hidden
                    className="absolute top-3 right-4 text-6xl leading-none text-blue-100 dark:text-blue-900/40 font-serif select-none pointer-events-none"
                  >
                    &ldquo;
                  </div>
                  <blockquote className="text-base sm:text-lg italic text-gray-800 dark:text-gray-200 leading-relaxed relative z-10">
                    {featured.quote.text}
                  </blockquote>
                  <figcaption className="mt-3 text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wide">
                    — {featured.quote.author}
                  </figcaption>
                </figure>
              )}

              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          GRID — More recent work with filter
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-gray-950 transition-colors border-t border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-5 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-16 sm:py-20 md:py-24">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
                  <span className="eyebrow">Gallery</span>
                  <span className="h-px w-12 bg-blue-600/40 dark:bg-blue-400/40" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                  More Recent Work
                </h2>
                <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl">
                  Drag any slider to reveal what we delivered. Filter by service
                  category to narrow the view.
                </p>
              </div>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-2 md:justify-end md:max-w-[60%]">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Numbered project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {displayedWorks.map((work, idx) => {
              const idxLabel = String(idx + 2).padStart(2, "0"); // featured = 01
              return (
                <FadeIn key={work.id} delay={idx * 60}>
                  <article className="group h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-blue-600/40 dark:hover:ring-blue-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-900/10 dark:hover:shadow-black/40 flex flex-col">
                    <div className="aspect-[4/3] w-full">
                      <BeforeAfterSlider
                        before={work.beforeImage}
                        after={work.afterImage}
                        title={work.title}
                      />
                    </div>

                    <div className="p-6 sm:p-7 flex flex-col flex-grow">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="num-mono text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                          / {idxLabel}
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 num-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          {work.date}
                        </span>
                      </div>

                      <div className="mb-3">
                        <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                          {work.category}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-1 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {work.title}
                      </h3>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                        {work.car}
                      </p>

                      <p className="text-sm sm:text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-5 flex-grow">
                        {work.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100 dark:border-gray-800">
                        {work.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>

          {/* ── Load More ───────────────────────────────────────── */}
          {hasMore && (
            <FadeIn>
              <div className="mt-12 sm:mt-14 flex flex-col items-center gap-4">
                <p className="num-mono text-xs sm:text-sm text-gray-500 dark:text-gray-400 tracking-wide">
                  Showing{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {displayedWorks.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {filteredWorks.length}
                  </span>{" "}
                  projects
                </p>
                {/* Progress bar */}
                <div className="w-40 sm:w-48 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(displayedWorks.length / filteredWorks.length) * 100}%`,
                    }}
                  />
                </div>
                <button
                  onClick={() => setVisibleCount((c) => c + LOAD_STEP)}
                  className="group mt-2 inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-full font-semibold text-sm sm:text-base shadow-lg shadow-gray-900/10 dark:shadow-black/40 transition-all hover:-translate-y-0.5"
                >
                  Load More Projects
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-y-0.5" />
                </button>
              </div>
            </FadeIn>
          )}

          {filteredWorks.length === 0 && (
            <FadeIn>
              <div className="text-center py-16 sm:py-20 px-6 bg-gray-50 dark:bg-gray-900/60 rounded-2xl ring-1 ring-gray-200 dark:ring-gray-800">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
                  <Wrench className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Photos coming soon
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6">
                  We handle {activeCategory.toLowerCase()} jobs every week —
                  we're still adding photos to the gallery. Give us a call and
                  we'll send recent project shots on WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={telHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-blue-500 rounded-lg font-semibold text-sm transition-colors"
                  >
                    Send an Enquiry
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PROCESS — How we work
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-gray-900 transition-colors border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-5 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-16 sm:py-20 md:py-24">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
                <span className="h-px w-12 bg-blue-600/40 dark:bg-blue-400/40" />
                <span className="eyebrow">How We Work</span>
                <span className="h-px w-12 bg-blue-600/40 dark:bg-blue-400/40" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Four Steps. Zero Surprises.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The same process applied to every job, whether it's a basic wash
                or a full restoration.
              </p>
            </div>
          </FadeIn>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="hidden lg:block absolute top-[68px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-600/30 dark:via-blue-400/30 to-transparent" />

            {PROCESS.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeIn key={p.step} delay={i * 80}>
                  <div className="relative bg-white dark:bg-gray-800/60 rounded-2xl p-6 sm:p-7 ring-1 ring-gray-200 dark:ring-gray-700 h-full">
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-[72px] sm:h-[72px] mx-auto mb-5 bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-700 rounded-2xl">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-center">
                      <div className="num-mono text-xs font-bold tracking-[0.25em] text-blue-600 dark:text-blue-400 mb-2">
                        STEP {p.step}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {p.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA — dramatic dark close
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950" />
        <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 grid-bg pointer-events-none" />

        <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-5 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-20 sm:py-24 md:py-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <FadeIn className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-5 text-blue-300">
                <Sparkles className="w-4 h-4" />
                <span className="eyebrow">Let's Talk</span>
                <span className="h-px w-12 bg-blue-400/40" />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5">
                Your car deserves
                <br />
                <span className="text-blue-400">the same care.</span>
              </h2>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
                Whether it's a small dent, a full restoration, or a deep detail
                — we'll give it the same craftsmanship you just saw, without the
                dealership price.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={telHref}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-gray-900 hover:bg-blue-50 rounded-lg font-bold text-sm sm:text-base shadow-xl transition-colors"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="num-mono">{primaryPhone}</span>
                </a>
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm sm:text-base transition-colors"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn className="lg:col-span-5" delay={150}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {TRUST_BADGES.map((b) => {
                  const I = b.icon;
                  return (
                    <div
                      key={b.label}
                      className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-5 hover:bg-white/[0.07] transition-colors"
                    >
                      <I className="w-6 h-6 sm:w-7 sm:h-7 text-blue-300 mb-3" />
                      <div className="text-sm sm:text-base font-semibold text-white">
                        {b.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWork;