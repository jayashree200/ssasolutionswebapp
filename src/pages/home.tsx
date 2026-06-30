import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import logoNoBg from "../assets/ssa_logo_nobg.png";
import zeptoLogo from "../assets/clients/zepto.png";
import amazonLogo from "../assets/clients/amazon.png";
import hitechaudioLogo from "../assets/clients/hitechaudio.png";
import simpliworkLogo from "../assets/clients/simpliwork.png";
import mmClinicLogo from "../assets/clients/mm_clinic.png";
import bigbasketLogo from "../assets/clients/bigbasket.png";
import grantThorntonLogo from "../assets/clients/grant_thornton.jpeg";
import herbalSpaLogo from "../assets/clients/herbal_spa.jpeg";
import vinfastLogo from "../assets/clients/vinfast.jpeg";
import sobhaLogo from "../assets/clients/sobha.jpeg";
import {
  Brush,
  Coffee,
  UserCheck,
  Shield,
  Zap,
  Droplet,
  ThermometerSnowflake,
  Hammer,
  Users,
  CalendarDays,
  SprayCan,
  Bug,
  Send,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Star,
  Target,
  Lightbulb,
  HeartHandshake,
  PhoneCall,
  X,
  Quote,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const services = [
  { name: "Housekeeping", type: "soft", icon: Brush, desc: "Daily cleaning, sanitation and upkeep of your premises" },
  { name: "Pantry Service", type: "soft", icon: Coffee, desc: "Beverages, snacks, consumable stocking and vendor management" },
  { name: "Front Office Support", type: "soft", icon: UserCheck, desc: "Trained reception and visitor-facing staff" },
  { name: "Security Services", type: "soft", icon: Shield, desc: "Access control and on-site security personnel" },
  { name: "Electrical Maintenance", type: "hard", icon: Zap, desc: "Wiring, lighting, CCTV, audio-visual and automation systems" },
  { name: "Plumbing Services", type: "hard", icon: Droplet, desc: "Plumbing works, sump and tank maintenance" },
  { name: "HVAC Maintenance", type: "hard", icon: ThermometerSnowflake, desc: "Air conditioning, ventilation and climate control" },
  { name: "Civil Repairs", type: "hard", icon: Hammer, desc: "POP work, granite fixing, painting and civil works" },
  { name: "Manpower Supply", type: "support", icon: Users, desc: "Skilled and unskilled workforce on demand" },
  { name: "Event Support Staff", type: "support", icon: CalendarDays, desc: "Staff for internal meetings, conferences and corporate events" },
  { name: "Industrial Cleaning", type: "support", icon: SprayCan, desc: "Commercial, carpet, window and rest-room cleaning" },
  { name: "Pest Control", type: "support", icon: Bug, desc: "Rat, bird, termite, rodent, mosquito and vector control" },
];

const coreValues = [
  { title: "Customer Satisfaction", icon: HeartHandshake, desc: "Every decision is made with the client's experience at its centre." },
  { title: "Continuous Improvement", icon: Star, desc: "We never stop refining our processes, people and practices." },
  { title: "Superior Quality", icon: CheckCircle2, desc: "World-class standards applied across every service we deliver." },
  { title: "Teamwork", icon: Users, desc: "Our strength comes from collaboration — across teams and with clients." },
  { title: "Positive Can-Do Attitude", icon: Lightbulb, desc: "No challenge is too complex when approached with the right mindset." },
];

const clients = [
  { name: "Zepto", logo: zeptoLogo },
  { name: "Amazon", logo: amazonLogo },
  { name: "BigBasket", logo: bigbasketLogo },
  { name: "HiTech Audio", logo: hitechaudioLogo },
  { name: "Simpliwork", logo: simpliworkLogo },
  { name: "Grant Thornton", logo: grantThorntonLogo },
  { name: "MM Speciality Clinic", logo: mmClinicLogo },
  { name: "Sobha", logo: sobhaLogo },
  { name: "Herbal Ground Spa", logo: herbalSpaLogo },
  { name: "VinFast", logo: vinfastLogo },
];

const siteTypes = ["Office", "Warehouse", "Retail", "Hospital", "Industrial"];

const testimonials = [
  { name: "Rajesh Kumar", role: "Facility Manager, Simpliwork", rating: 5, text: "SSA Solutions transformed our office maintenance. Punctual, professional and thorough — our workplace has never looked better." },
  { name: "Priya Nair", role: "Operations Head, Apollo Dental", rating: 5, text: "Exceptional housekeeping and pantry services. The team is always courteous and goes above and beyond client expectations." },
  { name: "Arjun Mehta", role: "Admin Manager, Grant Thornton", rating: 5, text: "Reliable, cost-effective and responsive. SSA Solutions has been our facilities partner for over a year and we could not be happier." },
];

const formSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  siteType: z.string().min(1, "Please select a site type"),
  area: z.coerce.number().min(100, "Area must be at least 100 sq.ft"),
  visits: z.coerce.number().min(1, "At least 1 visit is required"),
  priority: z.array(z.number()).length(1),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const typeLabelMap: Record<string, string> = {
  all: "All Services",
  soft: "Soft Services",
  hard: "Hard Services",
  support: "Support Services",
};

export default function Home() {
  const [filter, setFilter] = useState<"all" | "soft" | "hard" | "support">("all");
  const [waOpen, setWaOpen] = useState(false);
  const waRef = useRef<HTMLDivElement>(null);
  const [cbOpen, setCbOpen] = useState(false);
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbDone, setCbDone] = useState(false);
  const [rvName, setRvName] = useState("");
  const [rvRating, setRvRating] = useState(5);
  const [rvHover, setRvHover] = useState(0);
  const [rvText, setRvText] = useState("");
  const [rvDone, setRvDone] = useState(false);

  function handleReview(e: React.FormEvent) {
    e.preventDefault();
    const stars = "★".repeat(rvRating) + "☆".repeat(5 - rvRating);
    const subject = encodeURIComponent(`New Review from ${rvName}`);
    const body = encodeURIComponent(`New Client Review\n\nName: ${rvName}\nRating: ${stars} (${rvRating}/5)\n\nReview:\n${rvText}`);
    window.location.href = `mailto:ssasolutions108@gmail.com?subject=${subject}&body=${body}`;
    setRvDone(true);
    setTimeout(() => { setRvDone(false); setRvName(""); setRvRating(5); setRvText(""); }, 3000);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (waRef.current && !waRef.current.contains(e.target as Node)) {
        setWaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleCallback(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Callback Request from Website");
    const body = encodeURIComponent(`Callback Request\n\nName: ${cbName}\nPhone: ${cbPhone}\n\nPlease call this person back at your earliest convenience.`);
    window.location.href = `mailto:ssasolutions108@gmail.com?subject=${subject}&body=${body}`;
    setCbDone(true);
    setTimeout(() => { setCbOpen(false); setCbDone(false); setCbName(""); setCbPhone(""); }, 2500);
  }

  const waNumbers = [
    { label: "SSA Solutions 1", number: "919916897009" },
    { label: "SSA Solutions 2", number: "919535254541" },
  ];

  const [summary, setSummary] = useState<{
    service: string; siteType: string; area: number;
    visits: number; effort: string; team: string; priority: number; notes?: string;
  } | null>(null);

  const filteredServices = services.filter((s) => filter === "all" || s.type === filter);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { service: "", siteType: "", area: 1000, visits: 4, priority: [2], notes: "" },
  });

  function onSubmit(values: FormValues) {
    const effort = values.area > 3000 ? "High" : values.area > 1500 ? "Medium" : "Low";
    const team = values.area > 3000 ? "5–6 staff" : values.area > 1500 ? "3–4 staff" : "2 staff";
    setSummary({ service: values.service, siteType: values.siteType, area: values.area, visits: values.visits, effort, team, priority: values.priority[0], notes: values.notes });
  }

  function handleEmail() {
    if (!summary) return;
    const priorityLabel = summary.priority === 1 ? "Low" : summary.priority === 2 ? "Normal" : "High";
    const subject = encodeURIComponent(`Service Request: ${summary.service}`);
    const body = encodeURIComponent(
      `Service: ${summary.service}\nSite Type: ${summary.siteType}\nArea: ${summary.area} sq.ft\nVisits per month: ${summary.visits}\nPriority: ${priorityLabel}\nEstimated Effort: ${summary.effort}\nRecommended Team: ${summary.team}\nNotes: ${summary.notes || "None"}`
    );
    window.location.href = `mailto:ssasolutions108@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-1">
            <img src={logoNoBg} alt="SSA Solutions logo" className="h-16 w-auto" />
            <div className="leading-tight -ml-1">
              <div className="font-extrabold text-base tracking-wide text-secondary">SSA SOLUTIONS</div>
              <div className="text-xs text-muted-foreground italic">We Are Happy to Help You</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#clients" className="hover:text-primary transition-colors">Clients</a>
            <a href="#request">
              <Button size="sm" className="font-semibold" data-testid="nav-request">
                Get a Quote
              </Button>
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-secondary text-white pt-24 pb-32 px-6">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 70% 50%, hsl(25 95% 60%) 0%, transparent 60%)"}} />
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: text */}
              <div>
                <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 font-medium" data-testid="badge-category">
                  Total Facility and Servicing Management
                </Badge>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-primary">
                  SSA Solutions
                </h1>
                <p className="text-2xl md:text-3xl font-light text-white/80 italic mb-8">
                  We Are Happy to Help You
                </p>
                <p className="text-lg text-white/70 mb-10 leading-relaxed">
                  A professional service provider delivering complete, world-class facility management across all business sectors — backed by a team with vast experience in service excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-12 px-8 font-semibold bg-primary hover:bg-primary/90 text-white" asChild>
                    <a href="#request">Request a Service <ChevronRight className="ml-1 w-4 h-4" /></a>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8 font-semibold border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                    <a href="#services">Explore Services</a>
                  </Button>
                </div>
              </div>
              {/* Right: logo */}
              <div className="hidden md:flex items-center justify-center">
                <img
                  src={logoNoBg}
                  alt="SSA Solutions"
                  className="w-[560px] h-[560px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">About Us</p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-secondary">
                  Building long-term relationships for generations to come
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  SSA SOLUTIONS is a professional service provider with an aim to provide a complete range of world-class services across all business sectors. We are backed by a team with vast experience in service providing.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We stand out among our peers by bringing together the best practices of the facility and service management industry. Our business takes care of essential support services, adding value at every step of the service management path.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We enable our clients to concentrate on delivering their core strategies, while we handle the rest — professionally, reliably and with complete peace of mind.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <Card className="border-l-4 border-l-primary shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Target className="w-8 h-8 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-secondary mb-2">Vision</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">To be globally identified as a leading services provider with best-in-class solutions resulting in complete customer satisfaction.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-secondary shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Lightbulb className="w-8 h-8 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-secondary mb-2">Mission</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">To deploy the best and most innovative captive solutions for all your service management requirements and ensuring complete peace of mind.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">What We Stand For</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-secondary">Core Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {coreValues.map((v) => (
                <Card key={v.title} className="text-center shadow-sm border-border/50 hover:shadow-md hover:border-primary/30 transition-all">
                  <CardContent className="p-6">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <v.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm text-secondary mb-2">{v.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section id="services" className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">What We Do</p>
                <h2 className="text-3xl font-extrabold tracking-tight text-secondary mb-2">Our Services</h2>
                <p className="text-muted-foreground max-w-xl">Comprehensive facility management tailored to the exact needs of your physical environment.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["all", "soft", "hard", "support"] as const).map((t) => (
                  <Button
                    key={t}
                    variant={filter === t ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(t)}
                    className={filter === t ? "bg-secondary hover:bg-secondary/90 text-white" : ""}
                    data-testid={`filter-${t}`}
                  >
                    {typeLabelMap[t]}
                  </Button>
                ))}
              </div>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.18 }}
                    key={service.name}
                    data-testid={`card-service-${service.name.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    <Card className="h-full border-border/50 hover:border-primary/40 transition-all shadow-sm hover:shadow-md group">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="p-3 bg-primary/10 rounded-lg text-primary mb-4 w-fit group-hover:bg-primary group-hover:text-white transition-colors">
                          <service.icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-secondary mb-2">{service.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.desc}</p>
                        <Badge
                          variant="secondary"
                          className={`mt-4 w-fit capitalize text-xs ${
                            service.type === "soft" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            service.type === "hard" ? "bg-orange-50 text-orange-700 border-orange-200" :
                            "bg-green-50 text-green-700 border-green-200"
                          }`}
                        >
                          {service.type} Service
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── CLIENTS ── */}
        <section id="clients" className="py-16 px-6 bg-secondary/5 border-y border-border/40">
          <div className="container mx-auto max-w-6xl text-center">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Growing Client List</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-secondary mb-10">Trusted By Leading Organisations</h2>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {clients.map((c) => (
                <div
                  key={c.name}
                  className="h-16 w-36 flex items-center justify-center bg-white border border-border/60 rounded-xl shadow-sm hover:border-primary/40 hover:shadow-md transition-all p-3"
                  data-testid={`badge-client-${c.name.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <img
                    src={c.logo}
                    alt={`${c.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section id="reviews" className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Client Feedback</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-secondary mb-3">What Our Clients Say</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Real feedback from the organisations that trust us with their facilities every day.</p>
            </div>

            {/* Testimonial cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {testimonials.map((t, i) => (
                <Card key={i} className="shadow-sm border-border/50 hover:shadow-md hover:border-primary/30 transition-all" data-testid={`card-review-${i}`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="w-7 h-7 text-primary/30 mb-3 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 italic">"{t.text}"</p>
                    <div className="flex items-center gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={`w-4 h-4 ${s < t.rating ? "fill-primary text-primary" : "text-muted"}`} />
                      ))}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-secondary">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Leave a review form */}
            <div className="max-w-xl mx-auto">
              <Card className="border-primary/20 shadow-md">
                <CardContent className="p-8">
                  {rvDone ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                      data-testid="review-success"
                    >
                      <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <p className="font-bold text-secondary text-lg">Thank you for your feedback!</p>
                      <p className="text-sm text-muted-foreground mt-1">Your review has been sent to our team.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleReview} className="space-y-5">
                      <div className="text-center mb-2">
                        <h3 className="text-lg font-extrabold text-secondary">Leave a Review</h3>
                        <p className="text-xs text-muted-foreground mt-1">Share your experience with SSA Solutions</p>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-foreground block mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={rvName}
                          onChange={(e) => setRvName(e.target.value)}
                          placeholder="Enter your name"
                          className="w-full text-sm px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                          data-testid="input-review-name"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-foreground block mb-2">Rating</label>
                        <div className="flex gap-1" data-testid="input-review-rating">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setRvRating(s + 1)}
                              onMouseEnter={() => setRvHover(s + 1)}
                              onMouseLeave={() => setRvHover(0)}
                              className="p-0.5 transition-transform hover:scale-110"
                              data-testid={`star-${s + 1}`}
                            >
                              <Star className={`w-7 h-7 transition-colors ${(rvHover || rvRating) > s ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                            </button>
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground self-center">
                            {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][(rvHover || rvRating)]}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-foreground block mb-1">Your Review</label>
                        <textarea
                          required
                          value={rvText}
                          onChange={(e) => setRvText(e.target.value)}
                          placeholder="Tell us about your experience..."
                          rows={4}
                          className="w-full text-sm px-3 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                          data-testid="input-review-text"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold text-sm py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        data-testid="button-submit-review"
                      >
                        <Send className="w-4 h-4" />
                        Submit Review
                      </button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Scan to connect */}
            <div className="max-w-xl mx-auto mt-10">
              <p className="text-center text-sm font-semibold text-secondary mb-6">Scan to Connect</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a
                  href="https://www.instagram.com/ssa.solutions108/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border/50 bg-white shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                  data-testid="link-instagram-qr"
                >
                  <img
                    src="/qr/instagram-qr.png"
                    alt="Instagram QR code for @SSA.SOLUTIONS108"
                    className="w-36 h-36 rounded-lg"
                  />
                  <div className="text-center">
                    <p className="text-sm font-bold text-secondary">Instagram</p>
                    <p className="text-xs text-muted-foreground mt-0.5">@SSA.SOLUTIONS108</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/919916897009?text=Hello%20SSA%20Solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border/50 bg-white shadow-sm hover:shadow-md hover:border-[#25D366]/40 transition-all"
                  data-testid="link-whatsapp-qr"
                >
                  <img
                    src="/qr/whatsapp-qr.png"
                    alt="WhatsApp QR code for SSA Solutions"
                    className="w-36 h-36 rounded-lg"
                  />
                  <div className="text-center">
                    <p className="text-sm font-bold text-secondary">WhatsApp</p>
                    <p className="text-xs text-muted-foreground mt-0.5">9916897009</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── REQUEST FORM ── */}
        <section id="request" className="py-24 px-6 bg-slate-50">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Get Started</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-secondary mb-3">Service Inquiry</h2>
              <p className="text-muted-foreground">Describe your facility requirements and we will estimate the effort and team needed — then send the details straight to our team.</p>
            </div>

            <Card className="shadow-lg border-border/50">
              <CardContent className="p-6 md:p-10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Required</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-service">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {services.map((s) => (
                                  <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="siteType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Site Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-sitetype">
                                  <SelectValue placeholder="Select site type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {siteTypes.map((t) => (
                                  <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Area (sq.ft)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} data-testid="input-area" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="visits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Visits per Month</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} data-testid="input-visits" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-end mb-2">
                            <FormLabel>Priority Level</FormLabel>
                            <span className="text-sm font-semibold text-primary">
                              {field.value[0] === 1 ? "Low" : field.value[0] === 2 ? "Normal" : "High"}
                            </span>
                          </div>
                          <FormControl>
                            <Slider
                              min={1} max={3} step={1}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                              className="py-4"
                              data-testid="slider-priority"
                            />
                          </FormControl>
                          <FormDescription className="flex justify-between text-xs">
                            <span>Flexible</span>
                            <span>Standard</span>
                            <span>Urgent</span>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Requirements</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any specific instructions, constraints or requirements..."
                              className="resize-none h-24"
                              {...field}
                              data-testid="input-notes"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full h-12 text-base font-semibold bg-secondary hover:bg-secondary/90" data-testid="button-submit">
                      Calculate Requirements
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <AnimatePresence>
              {summary && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="mt-8"
                  data-testid="summary-card"
                >
                  <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-bold text-secondary">{summary.service} — Estimate Summary</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-white rounded-lg border border-border/50">
                          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Estimated Effort</p>
                          <p className="font-bold text-lg text-secondary" data-testid="text-effort">{summary.effort}</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-border/50">
                          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Recommended Team</p>
                          <p className="font-bold text-lg text-secondary" data-testid="text-team">{summary.team}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-border/50 mb-6 text-sm leading-relaxed text-muted-foreground" data-testid="text-summary">
                        <span className="font-semibold text-foreground">{summary.service}</span> for a{" "}
                        <span className="font-semibold text-foreground">{summary.siteType}</span>.{" "}
                        Area: <span className="font-semibold text-foreground">{summary.area} sq.ft</span>,{" "}
                        Visits: <span className="font-semibold text-foreground">{summary.visits}/month</span>.
                        {summary.notes && <><br /><span className="italic">Notes: {summary.notes}</span></>}
                      </div>
                      <Button
                        onClick={handleEmail}
                        size="lg"
                        className="w-full gap-2 h-12 font-semibold bg-primary hover:bg-primary/90"
                        data-testid="button-email"
                      >
                        <Send className="w-4 h-4" />
                        Send Inquiry via Email
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* ── CALLBACK FLOATING BUTTON ── */}
      <AnimatePresence>
        {cbOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-24 right-6 z-50 w-72 bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden"
            data-testid="callback-popup"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-secondary text-white">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">Request a Callback</span>
              </div>
              <button onClick={() => { setCbOpen(false); setCbDone(false); }} className="text-white/60 hover:text-white transition-colors" data-testid="button-close-callback">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              {cbDone ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-4"
                  data-testid="callback-success"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  <p className="font-semibold text-secondary text-sm">Request Sent!</p>
                  <p className="text-xs text-muted-foreground mt-1">We will call you back shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleCallback} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={cbName}
                      onChange={(e) => setCbName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full text-sm px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                      data-testid="input-callback-name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={cbPhone}
                      onChange={(e) => setCbPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full text-sm px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                      data-testid="input-callback-phone"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                    data-testid="button-submit-callback"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Request Callback
                  </button>
                  <p className="text-xs text-muted-foreground text-center">We typically call back within 2 hours</p>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email floating button */}
      <div className="fixed bottom-6 right-24 z-50">
        <a
          href={`mailto:ssasolutions108@gmail.com?subject=${encodeURIComponent("Service Request — SSA Solutions")}&body=${encodeURIComponent("Hello SSA Solutions,\n\nI would like to request a facility management service. Could you please get in touch with me?\n\nName:\nPhone:\nService Needed:\n\nThank you.")}`}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          aria-label="Send Email"
          title="Send us an email"
        >
          <Mail className="w-6 h-6 text-white" />
        </a>
      </div>

      {/* Call / Callback floating button */}
      <div className="fixed bottom-6 right-44 z-50">
        <button
          onClick={() => { setCbOpen((o) => !o); setWaOpen(false); }}
          className="w-14 h-14 rounded-full bg-secondary hover:bg-secondary/90 shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          aria-label="Request a callback"
          data-testid="button-callback"
        >
          <PhoneCall className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <div ref={waRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {waOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden w-56"
              data-testid="whatsapp-popup"
            >
              <div className="px-4 py-3 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wide">
                Chat with us on WhatsApp
              </div>
              {waNumbers.map((wa) => (
                <a
                  key={wa.number}
                  href={`https://wa.me/${wa.number}?text=${encodeURIComponent("Hello SSA Solutions,\n\nI would like to request a facility management service. Could you please get in touch with me?\n\nThank you.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors border-b border-border/30"
                  data-testid={`link-whatsapp-${wa.number}`}
                  onClick={() => setWaOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.528 5.845L.057 23.568a.5.5 0 0 0 .609.61l5.77-1.488A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.072-1.384l-.362-.214-3.757.968.999-3.671-.236-.378A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{wa.label}</div>
                    <div className="text-xs text-muted-foreground">+{wa.number.replace("91", "91 ")}</div>
                  </div>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setWaOpen((o) => !o)}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          aria-label="Chat on WhatsApp"
          data-testid="button-whatsapp"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.528 5.845L.057 23.568a.5.5 0 0 0 .609.61l5.77-1.488A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.072-1.384l-.362-.214-3.757.968.999-3.671-.236-.378A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
        </button>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-secondary text-white/70 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="mb-4">
                <img src={logoNoBg} alt="SSA Solutions logo" className="h-14 w-auto brightness-0 invert" />
              </div>
              <p className="text-white/60 text-sm italic mb-4">We Are Happy to Help You</p>
              <p className="text-white/50 text-sm leading-relaxed">Total Facility and Servicing Management — delivering world-class support to corporate and industrial clients across India.</p>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-white/60">#14,15 2nd Cross, Erappa Reddy Layout,<br />Hosa Road, Bangalore – 560 100</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="text-white/60 text-xs leading-relaxed">
                    9916897009 &nbsp;/&nbsp; 9535254541<br />
                    8095352540 &nbsp;/&nbsp; 8095352541
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <a href="mailto:ssasolutions108@gmail.com" className="text-white/60 hover:text-primary transition-colors block" data-testid="link-email-primary">ssasolutions108@gmail.com</a>
                    <a href="mailto:loki.deva37@gmail.com" className="text-white/60 hover:text-primary transition-colors block" data-testid="link-email-secondary">loki.deva37@gmail.com</a>
                    <a href="mailto:sugujayadeepu@gmail.com" className="text-white/60 hover:text-primary transition-colors block" data-testid="link-email-tertiary">sugujayadeepu@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-4">Services</h4>
              <ul className="space-y-1.5 text-sm text-white/50 columns-2">
                {services.map((s) => (
                  <li key={s.name} className="text-xs">{s.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-xs text-white/30">
            © {new Date().getFullYear()} SSA Solutions. All rights reserved. Bangalore, India.
          </div>
        </div>
      </footer>
    </div>
  );
}
