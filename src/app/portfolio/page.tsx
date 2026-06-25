"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ImageProtected from "@/components/image-protected";
import { openQuoteModal } from "@/components/floating-widget";

const portfolioCategories = [
  { slug: "all", name: "All Projects" },
  { slug: "kitchens", name: "Kitchens" },
  { slug: "wardrobes", name: "Wardrobes" },
  { slug: "media-walls", name: "Media Walls" },
  { slug: "worktops", name: "Worktops" },
  { slug: "interiors", name: "Full Renovations" },
];

const projectsData = [
  {
    id: 0,
    title: "Luxury Gloss Beige Kitchen",
    category: ["kitchens", "worktops"],
    desc: "Leicester high-gloss kitchen with a massive waterfall quartz island, custom ceiling-recessed hood, and matching marble-look polished tiling.",
    image: "/images/projects/modern_kitchen_beige.jpg",
    details: "Quartz cladding, integrated Gas stove, crystal chandelier, ambient LED undershelf lighting.",
  },
  {
    id: 1,
    title: "Mirrored Black Sliding Wardrobe",
    category: ["wardrobes"],
    desc: "Premium floor-to-ceiling dark sliding panels featuring a central glass mirror and custom integrated perimeter LED channel lighting.",
    image: "/images/projects/sliding_wardrobe_dark.jpg",
    details: "Soft-close sliding rails, internal custom drawers, perimeter LED diffusers.",
  },
  {
    id: 2,
    title: "Modern Handless Grey Kitchen",
    category: ["kitchens", "worktops"],
    desc: "Contemporary high-gloss grey kitchen layout with breakfast bar, built-in microwave and oven stack, and double skylight setup.",
    image: "/images/projects/modern_kitchen_grey.jpg",
    details: "Integrated appliances, quartz breakfast bar, custom cabinetry fitted under architectural sloped ceilings.",
  },
  {
    id: 3,
    title: "Master Bedroom Dressing Suite",
    category: ["wardrobes", "interiors"],
    desc: "Luxury fitted bedroom shaker wardrobes wrapped around a dedicated center makeup vanity table with warm backlit shelving.",
    image: "/images/projects/fitted_wardrobe_desk.jpg",
    details: "Muted beige shaker doors, warm showcase LED strips, integrated drawers.",
  },
  {
    id: 4,
    title: "Frosted Glass Sliding Wardrobe",
    category: ["wardrobes"],
    desc: "Contemporary light green frosted glass panels paired with a central mirror panel, fitted flush with side display shelving.",
    image: "/images/projects/sliding_wardrobe_green.jpg",
    details: "Three-way track mechanism, custom shelving cabinet unit.",
  },
  {
    id: 5,
    title: "Luxury Beige Kitchen (Window View)",
    category: ["kitchens", "worktops"],
    desc: "Detailed window-side view of our bespoke beige kitchen, highlighting double sink fittings and layout integration.",
    image: "/images/projects/kitchen_beige_angle2.jpg",
    details: "Waterfall quartz panels, integrated chrome taps, large bay window fitting.",
  },
  {
    id: 6,
    title: "Luxury Beige Kitchen (Profile View)",
    category: ["kitchens", "worktops"],
    desc: "Profile view of custom gloss beige cabinetry highlighting seamless handleless profiles and polished marble floors.",
    image: "/images/projects/kitchen_beige_angle3.jpg",
    details: "Handleless gloss cabinet design, integrated double ovens, marble floor tiles.",
  },
  {
    id: 7,
    title: "Custom Bed-Bridge Fitted Wardrobes",
    category: ["wardrobes"],
    desc: "Space-saving bed-bridge wardrobe cabinets in clean white gloss and oak veneer, fitted flush over the master bed area.",
    image: "/images/projects/bedroom_white_bedbridge.jpg",
    details: "Oak grain styling accent, soft-close cabinets, integrated reading lights.",
  },
  {
    id: 8,
    title: "Mirrored Sliding Wardrobe (Grey Tint)",
    category: ["wardrobes"],
    desc: "Elegant three-door sliding wardrobe featuring premium dark grey glass and mirror strips in a Leicester renovation.",
    image: "/images/projects/sliding_wardrobe_greyglass.jpg",
    details: "Triple slide runner tracks, matte black outer trim, internal shelf dividers.",
  },
  {
    id: 9,
    title: "Custom Bed-Bridge Wardrobes (Side view)",
    category: ["wardrobes"],
    desc: "Side view of bed-bridge wardrobe cabinets displaying depth alignment and flush finishing in Leicester.",
    image: "/images/projects/bedroom_white_bedbridge_angle2.jpg",
    details: "Oak veneer side panels, white gloss doors, customized storage heights.",
  },
  {
    id: 10,
    title: "Luxury Grey Kitchen (Renovation)",
    category: ["kitchens", "worktops", "interiors"],
    desc: "Modern high-gloss grey kitchen setup featuring matching quartz backsplash, drop-in gas stove, and ceiling spotlights.",
    image: "/images/projects/kitchen_grey_angle2.jpg",
    details: "Quartz marble splashback, gas cooktop integration, recessed spot lighting.",
  },
  {
    id: 11,
    title: "Mirrored Sliding Wardrobe (Black Frame)",
    category: ["wardrobes"],
    desc: "Three-door sliding wardrobe featuring black frosted panels and a central reflective mirror, built in a bedroom renovation.",
    image: "/images/projects/sliding_wardrobe_blackmirror.jpg",
    details: "Anodized black tracks, custom mirror paneling, floor-to-ceiling fit.",
  },
  {
    id: 12,
    title: "Master Bedroom Suite Design",
    category: ["wardrobes", "interiors"],
    desc: "Luxury master bedroom fitout incorporating black sliding wardrobes and vertical wall paneling framing a velvet tufted bed.",
    image: "/images/projects/bedroom_master_suite.jpg",
    details: "Velvet tufted headboard, backlit marble panels, vertical slat features.",
  },
  {
    id: 13,
    title: "Bespoke Glass Display Media Wall",
    category: ["media-walls"],
    desc: "Sleek beige gloss TV media wall featuring integrated glass shelving cabinets illuminated with white LED spotlights.",
    image: "/images/projects/media_wall_beige.jpg",
    details: "Gloss beige lacquer panels, glass shelves, integrated warm spot LEDs.",
  },
  {
    id: 14,
    title: "Luxury Wood Slat Media Wall",
    category: ["media-walls", "interiors"],
    desc: "State-of-the-art living room media wall featuring vertical walnut slats, a linear fireplace heater, and grey marble-look backing.",
    image: "/images/projects/media_wall_woodslat.jpg",
    details: "Linear electric fireplace, marble wall panels, LED showcases, wood slats.",
  },
  {
    id: 15,
    title: "Luxury Beige Kitchen (Dual Seating)",
    category: ["kitchens", "worktops"],
    desc: "Beige gloss kitchen island looking towards double bar stools, displaying matching marble splashbacks and linear LED channels.",
    image: "/images/projects/kitchen_beige_stools.jpg",
    details: "Integrated bar stools, marble backsplash, floating island design.",
  },
  {
    id: 16,
    title: "Contemporary Dressing Vanity Desk",
    category: ["wardrobes", "interiors"],
    desc: "Custom dressing table in beige shaker styling framing a round backlit leather-strap mirror, fitted in Leicester.",
    image: "/images/projects/bedroom_beige_dressing.jpg",
    details: "Backlit leather-strap round mirror, soft close drawers, gold handles.",
  },
  {
    id: 17,
    title: "Beige Renovation (Appliance Suite)",
    category: ["kitchens", "worktops", "interiors"],
    desc: "Side view of modern beige kitchen highlighting oven stacks, integrated appliances, and a marble tile layout.",
    image: "/images/projects/kitchen_beige_ovens.jpg",
    details: "Bosch/Siemens appliance stack, white floor tiles, seamless cabinets.",
  },
  {
    id: 18,
    title: "Three-door Walnut Sliding Wardrobe",
    category: ["wardrobes"],
    desc: "Sleek three-door sliding wardrobe featuring walnut panels and central reflective mirrors framed in matte black rails.",
    image: "/images/projects/sliding_wardrobe_walnut.jpg",
    details: "Walnut wood panel inserts, black profile frame, floor to ceiling fit.",
  },
  {
    id: 19,
    title: "Textured Concrete Bedroom Wardrobes",
    category: ["wardrobes"],
    desc: "Premium fitted wardrobes with textured concrete grey fronts framing a tufted velvet bed, under warm spot downlights.",
    image: "/images/projects/bedroom_grey_concrete.jpg",
    details: "Concrete grey facades, velvet tufted bed space, integrated spot downlights.",
  },
  {
    id: 20,
    title: "Beige Kitchen Island (Detail View)",
    category: ["kitchens", "worktops"],
    desc: "Macro layout detail of kitchen quartz worktops, handless cabinets, and built-in drawer runs.",
    image: "/images/projects/kitchen_beige_close.jpg",
    details: "Quartz detailing, handleless cabinet runners, soft-close dividers.",
  },
  {
    id: 21,
    title: "Wood Slat Media Feature (Electric Fireplace)",
    category: ["media-walls"],
    desc: "Close-up elevation view of wood slat media feature wall with fire heater box and display cases.",
    image: "/images/projects/media_wall_woodslat_close.jpg",
    details: "Fireplace heater cutout, integrated downlight cabinets, walnut slats.",
  },
  {
    id: 22,
    title: "Luxury Slat Wall (Full Elevation)",
    category: ["media-walls", "interiors"],
    desc: "Full wall view of the linear electric fireplace and wood slat media wall, showcasing floor coordinates and side shelves.",
    image: "/images/projects/media_wall_woodslat_full.jpg",
    details: "Linear fire flame details, custom quartz console shelf, LED surrounds.",
  },
  {
    id: 23,
    title: "Walk-in Glass Corner Closet",
    category: ["wardrobes", "interiors"],
    desc: "Walk-in wardrobe corner unit with internally lit glass doors, displaying drawers and organizer rods.",
    image: "/images/projects/walkin_wardrobe_corner.jpg",
    details: "Tinted glass doors, internal sensor LEDs, walnut divider shelving.",
  },
  {
    id: 24,
    title: "Floating Bed Frame & Backlit Panels",
    category: ["wardrobes", "interiors"],
    desc: "Custom floating bed frame with warm underbed lighting, concrete grey cabinetry, and metallic copper backing.",
    image: "/images/projects/bedroom_floating_bed.jpg",
    details: "Underbed LED tubes, floating frame design, textured concrete laminate.",
  },
  {
    id: 25,
    title: "Classic Four-door Flat White Closet",
    category: ["wardrobes"],
    desc: "Modern four-door white fitted wardrobe closet with vertical black handles, built flush in a Leicester bedroom.",
    image: "/images/projects/sliding_wardrobe_white_flat.jpg",
    details: "Flat white facades, vertical black metal pull handles, gap-free trim.",
  },
  {
    id: 26,
    title: "Dressing Vanity & Lit Glass Shelving",
    category: ["wardrobes"],
    desc: "Wide-angle dressing table setup showing warm backlit glass shelving and grey makeup desk with drawers.",
    image: "/images/projects/bedroom_beige_dressing_angle2.jpg",
    details: "Glass shelves with backlights, gray shaker vanity desk, round mirror.",
  },
  {
    id: 27,
    title: "Custom Walk-in Closet (Hanger Displays)",
    category: ["wardrobes", "interiors"],
    desc: "Zoomed view of custom corner walk-in glass closet displaying clothing organization and internal downlights.",
    image: "/images/projects/walkin_wardrobe_corner_angle2.jpg",
    details: "Internal hanging fixtures, dark wood drawers, glass door paneling.",
  },
  {
    id: 28,
    title: "Custom Glass Dressing Room Corner",
    category: ["wardrobes", "interiors"],
    desc: "Wide perspective of custom glass dressing closet showing glass chest of drawers in the foreground and natural window light.",
    image: "/images/projects/walkin_wardrobe_corner_wide.jpg",
    details: "Glass drawer top case, walk-in closets, window light coordinate.",
  },
];

function PortfolioContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState(1);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && portfolioCategories.some((cat) => cat.slug === categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredProjects = activeCategory === "all"
    ? projectsData
    : projectsData.filter((p) => p.category.includes(activeCategory));

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setZoomScale(1);
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredProjects.length - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setZoomScale(1);
    setLightboxIndex((prev) => (prev !== null && prev < filteredProjects.length - 1 ? prev + 1 : 0));
  };

  const currentProject = lightboxIndex !== null ? filteredProjects[lightboxIndex] : null;

  return (
    <div className="relative font-sans text-text-charcoal bg-white min-h-screen">
      
      {/* Portfolio Header */}
      <section className="bg-primary text-white py-16 text-center border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">OUR PORTFOLIO</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Luxury Transformations Showcase</h1>
          <p className="text-gray-300 font-light max-w-xl mx-auto text-xs md:text-sm">
            Inspect our hand-fitted kitchen renovations, sliding mirrored wardrobes, and bespoke carpentry projects across Leicester.
          </p>
        </div>
      </section>

      {/* Portfolio Grid & Filters */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        
        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setActiveCategory(cat.slug);
                setZoomScale(1);
              }}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.slug
                  ? "bg-primary text-white border border-primary"
                  : "bg-secondary text-text-charcoal hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-secondary border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                {/* Visual */}
                <div className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer" onClick={() => setLightboxIndex(idx)}>
                  <ImageProtected
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-primary/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/95 text-primary p-3.5 rounded-full shadow-lg">
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="p-6 space-y-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-accent">
                    {project.category.join(" / ")}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-primary">{project.title}</h3>
                  <p className="text-xs text-text-charcoal font-light leading-relaxed">{project.desc}</p>
                  
                  <div className="border-t border-gray-200/50 pt-4 flex justify-between items-center text-xs">
                    <span className="text-[10px] font-bold text-gray-500">{project.details.split(",")[0]}</span>
                    <button
                      onClick={() => setLightboxIndex(idx)}
                      className="text-primary hover:text-accent font-bold uppercase tracking-wider text-[10px]"
                    >
                      Enlarge Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* Lightbox Modal with Zoom */}
      <AnimatePresence>
        {lightboxIndex !== null && currentProject && (
          <div className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6 select-none">
            
            {/* Header controls */}
            <div className="flex justify-between items-center text-white z-10">
              <div>
                <h4 className="font-serif text-lg md:text-xl font-bold">{currentProject.title}</h4>
                <p className="text-xs text-accent tracking-widest uppercase">{currentProject.category.join(" / ")}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setZoomScale((prev) => Math.min(prev + 0.25, 2.5))}
                  className="bg-white/10 hover:bg-white/15 p-2.5 rounded-full transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setZoomScale((prev) => Math.max(prev - 0.25, 1))}
                  className="bg-white/10 hover:bg-white/15 p-2.5 rounded-full transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setLightboxIndex(null);
                    setZoomScale(1);
                  }}
                  className="bg-accent text-primary p-2.5 rounded-full hover:scale-105 transition-all cursor-pointer"
                  title="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Viewport */}
            <div className="relative flex-grow flex items-center justify-center overflow-hidden my-4">
              
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-6 bg-white/10 hover:bg-white/15 text-white p-3 rounded-full z-20 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Protected Zoomable image container */}
              <div className="relative max-w-full max-h-[70vh] aspect-video w-[900px] overflow-hidden rounded-xl border border-white/5">
                <div 
                  className="w-full h-full relative transition-transform duration-250 ease-out"
                  style={{ transform: `scale(${zoomScale})` }}
                >
                  <ImageProtected
                    src={currentProject.image}
                    alt={currentProject.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-6 bg-white/10 hover:bg-white/15 text-white p-3 rounded-full z-20 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Footer / Description */}
            <div className="text-center text-white max-w-2xl mx-auto z-10 space-y-2 mb-2">
              <p className="text-sm font-light text-gray-300 leading-relaxed">
                {currentProject.desc}
              </p>
              <div className="text-xs text-accent font-bold">
                {currentProject.details}
              </div>
              <div className="pt-2 text-[10px] text-gray-500">
                Image {lightboxIndex + 1} of {filteredProjects.length} • Right-click download protected
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>

      {/* Portfolio CTA */}
      <section className="bg-secondary py-20 border-t border-gray-150 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-primary">Inspired by Our Featured Installations?</h2>
        <p className="text-sm text-text-charcoal max-w-lg mx-auto font-light leading-relaxed">
          Request a free site assessment in Leicester LE5. Arshad will evaluate your room layouts and provide options.
        </p>
        <button
          onClick={openQuoteModal}
          className="bg-primary hover:bg-primary/95 text-white font-bold tracking-widest uppercase px-8 py-4 rounded-lg shadow-md cursor-pointer text-xs"
        >
          Request Free Consultation
        </button>
      </section>

    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  );
}
