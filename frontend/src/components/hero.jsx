import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Api from "../services/api";

import HeroSkeleton from "./HeroSkeleton";

// --- Define the luxury data ---
const initialSlides = [
  {
    id: 1,
    bgImage: "./perfume1.png",
    title: "Timeless",
    subtitle: "The Essence of Elegance",
    description: "Immerse yourself in the artistry of scent. Meticulously crafted to tell a story of luxury, sophistication, and unforgettable moments.",
  },
  {
    id: 2,
    bgImage: "./perfume2.png",
    title: "Midnight\nRose",
    subtitle: "Velvet & Mystery",
    description: "A mysterious fusion of dark amber and velvet rose, capturing the allure of twilight. Designed for those who leave an unforgettable trail.",
  },
  {
    id: 3,
    bgImage: "./perfume3.png",
    title: "Oud\nRoyale",
    subtitle: "Golden Prestige",
    description: "Sourced from the rarest agarwood trees. A rich, woody symphony that commands attention and embodies true power.",
  },
  {
    id: 4,
    bgImage: "./perfume4.png",
    title: "Sapphire\nBreeze",
    subtitle: "Oceanic Depths",
    description: "Capture the freshness of the open sea with crisp marine notes and citrus undertones. A breath of pure, invigorating luxury.",
  },
  {
    id: 5,
    bgImage: "./perfume5.png",
    title: "Spice\nNoir",
    subtitle: "Crimson Boldness",
    description: "An exotic blend of saffron, cardamom, and warm leather. Ideally suited for the bold spirit who dares to stand out.",
  },
  {
    id: 6,
    bgImage: "./perfume6.png",
    title: "White\nJasmine",
    subtitle: "Ephemeral Beauty",
    description: "Delicate, intoxicating, and purely divine. A floral masterpiece that evokes the serenity of a secret garden at dawn.",
  },
  {
    id: 7,
    bgImage: "./perfume7.png",
    title: "Musk\nIntense",
    subtitle: "Obsidian Allure",
    description: "Deep, sensual, and lingering. A base of black musk wrapped in smoky vanilla for a scent that is as enigmatic as it is captivating.",
  },
];



// --- Background Component (Ken Burns Effect) ---
const SlideBackgrounds = React.memo(({ slides, currentSlide }) => (
  <div className="absolute inset-0 w-full h-full">
    {slides.map((slide, index) => (
      <div
        key={slide.id}
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`w-full h-full bg-cover bg-center transition-transform duration-[20000ms] ease-linear will-change-transform ${
              index === currentSlide ? "scale-110" : "scale-100"
            }`}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
        </div>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-80" />
      </div>
    ))}
  </div>
));

// --- Content Component (Editorial Typography) ---
const SlideContent = React.memo(({ slides, currentSlide }) => (
  <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 w-full h-full pt-20">
    {slides.map((slide, index) => {
      const isActive = index === currentSlide;
      return (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 pointer-events-none transition-opacity duration-500 ${
            isActive ? "opacity-100 z-20" : "opacity-0 z-0"
          }`}
        >
            <div className="max-w-5xl">
                {/* Decorative Line */}
                <div 
                    className={`h-[2px] bg-white mb-6 transition-all duration-1000 ease-out delay-300 ${
                        isActive ? "w-24 opacity-100" : "w-0 opacity-0"
                    }`} 
                />

                {/* Subtitle */}
                <h3 
                    className={`text-sm md:text-base text-white/80 uppercase tracking-[0.4em] font-medium mb-4 transform transition-all duration-700 ease-out delay-300 ${
                        isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                >
                    {slide.subtitle}
                </h3>

                {/* Title (Giant Editorial) */}
                <div className="flex flex-col mb-8 pointer-events-auto">
                    {slide.title.split('\n').map((line, i) => (
                        <span 
                            key={i}
                            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-white leading-[0.9] transform transition-all duration-1000 ease-out ${
                                isActive 
                                    ? "translate-y-0 opacity-100 blur-0" 
                                    : "translate-y-16 opacity-0 blur-sm"
                            }`}
                            style={{ transitionDelay: `${400 + (i * 100)}ms` }}
                        >
                            {line}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p 
                    className={`text-base md:text-lg text-white/70 max-w-lg leading-relaxed mb-10 font-light transform transition-all duration-700 ease-out delay-700 ${
                        isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                >
                    {slide.description}
                </p>

                {/* Buttons */}
                <div 
                    className={`flex flex-wrap gap-6 pointer-events-auto transform transition-all duration-700 ease-out delay-[800ms] ${
                        isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                >
                    <Link 
                        to="/Products" 
                        className="group relative px-8 py-4 bg-white text-black overflow-hidden hover:bg-neutral-200 transition-colors duration-300"
                    >
                        <span className="relative z-10 text-sm uppercase tracking-[0.2em] font-medium">Shop Collection</span>
                    </Link>
                    
                    <Link 
                        to="/ourstory" 
                        className="group px-8 py-4 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <span className="text-sm uppercase tracking-[0.2em] font-medium">Our Story</span>
                    </Link>
                </div>
            </div>
        </div>
      );
    })}
  </div>
));

const HeroControls = React.memo(({ slides, currentSlide, goToSlide }) => (
    <div className="absolute bottom-0 left-0 w-full z-30 px-6 sm:px-12 md:px-20 lg:px-32 py-10 md:py-12 pointer-events-none">
        <div className="flex items-end justify-end gap-x-6 border-t border-white/20 pt-6">
            
            {/* Progress indicators - Clickable (Now moved right, next to counter) */}
            <div className="flex gap-1 md:gap-2 pointer-events-auto">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="group relative h-12 w-8 md:w-12 flex items-center justify-center focus:outline-none"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div 
                            className={`h-[2px] w-full transition-all duration-500 ease-out ${
                                index === currentSlide ? "bg-white opacity-100 scale-x-100" : "bg-white/30 hover:bg-white/60 scale-x-75 group-hover:scale-x-100"
                            }`} 
                        />
                    </button>
                ))}
            </div>

            {/* Slide Counter (Right Bottom) */}
            <div className="text-white/50 font-serif text-xl md:text-2xl pointer-events-auto">
                <span className="text-white">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="mx-2 text-white/20">—</span>
                <span>{String(slides.length).padStart(2, '0')}</span>
            </div>
        </div>
    </div>
));

// --- Main Hero Component ---
export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch or Fallback
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await Api.get("/");
        const normalizedSlides = Array.isArray(res.data) 
          ? res.data 
          : Array.isArray(res.data?.results) ? res.data.results : null;
          
         if (!normalizedSlides || normalizedSlides.length === 0) {
             setSlides(initialSlides);
         } else {
             // Use API data but ensure it has fallback images if missing
             const mapped = normalizedSlides.map((s, i) => ({
                 ...s,
                 bgImage: s.bgImage || initialSlides[i % initialSlides.length].bgImage
             }));
             setSlides(mapped);
         }
      } catch {
        setSlides(initialSlides);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    };
    fetchSlides();
  }, []);

  // Preload Images
  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.bgImage;
    });
  }, [slides]);

  // Auto-play (slower for cinematic feel)
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  if (isLoading) return <HeroSkeleton />;
  if (!slides.length) return null;

  return (
    <section className="relative h-screen h-[100dvh] w-full bg-black overflow-hidden flex flex-col">
      <SlideBackgrounds slides={slides} currentSlide={currentSlide} />
      <SlideContent slides={slides} currentSlide={currentSlide} />
      <HeroControls slides={slides} currentSlide={currentSlide} goToSlide={goToSlide} />
    </section>
  );
}
