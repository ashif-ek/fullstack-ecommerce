

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Api from "../auth/api";

// --- Define the initial/fallback data ---
const initialSlides = [
  {
    id: 1,
    bgImage: "./perfume1.png",
    title: "The Essence of",
    subtitle: "Timeless Elegance",
    description:
      "Immerse yourself in the artistry of scent. Each fragrance is meticulously crafted to tell a story of luxury, sophistication, and unforgettable moments.",
  },
  {
    id: 2,
    bgImage: "./perfume2.png",
    title: "Crafted from",
    subtitle: "Rare Ingredients",
    description:
      "Sourced from the world's most exclusive regions, our ingredients create an olfactory experience unlike any other.",
  },
  {
    id: 3,
    bgImage: "./perfume3.png",
    title: "An Olfactory",
    subtitle: "Masterpiece",
    description:
      "Experience the perfect harmony of top, middle and base notes that evolve throughout your day.",
  },
  {
    id: 4,
    bgImage: "./perfume4.png",
    title: "Essence of Elegance",
    subtitle: "Redefining Luxury",
    description:
      "Immerse yourself in an exquisite blend of rare ingredients, crafted for timeless sophistication.",
  },
  {
  id: 5,
  bgImage: "./perfume5.png",
  title: "Whispers of",
  subtitle: "Midnight Bloom",
  description:
    "A mysterious fusion of dark amber and velvet rose, capturing the allure of twilight. Designed for those who leave an unforgettable trail of elegance and power.",
},
];


// --- ✨ NEW: Shimmering Loader Component ---
const ShimmerLoader = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Blurred Background from the first initial slide */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-lg scale-105"
        style={{ backgroundImage: `url(${initialSlides[0].bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Placeholder content mimicking the final layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 xl:gap-24 relative z-20 w-full">
        {/* Text Placeholders */}
        <div className="flex-1 w-full space-y-5">
          <div className="h-4 bg-white/10 rounded w-1/3 relative overflow-hidden">
            <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="h-10 bg-white/10 rounded w-4/5 relative overflow-hidden">
             <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="h-10 bg-white/10 rounded w-2/3 relative overflow-hidden">
             <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="h-6 bg-white/10 rounded w-full relative overflow-hidden">
             <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="h-6 bg-white/10 rounded w-3/4 relative overflow-hidden">
             <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="flex gap-4 pt-4">
             <div className="h-12 w-36 bg-white/20 rounded-sm relative overflow-hidden">
                <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
             </div>
             <div className="h-12 w-36 bg-white/10 rounded-sm relative overflow-hidden">
                <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
             </div>
          </div>
        </div>
        {/* Image Placeholder */}
        <div className="flex-1 flex justify-center w-full max-w-xs sm:max-w-sm md:max-w-md">
           <div className="w-full h-80 bg-white/10 rounded-lg relative overflow-hidden">
             <div className="absolute inset-0 transform -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
           </div>
        </div>
      </div>
    </section>
  );
};


// --- Memoized Child Components (No changes needed here) ---

const SlideBackgrounds = React.memo(({ slides, currentSlide }) => (
  <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
    {slides.map((slide, index) => (
      <div
        key={slide.id}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          index === currentSlide ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${slide.bgImage})` }}
      />
    ))}
  </div>
));

const SlideContent = React.memo(({ slide, isTransitioning }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 xl:gap-24 relative z-20 w-full">
    {/* Text Content */}
    <div className="flex-1 text-center lg:text-left w-full">
      <div className={`transition-all duration-700 ease-out ${isTransitioning ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}>
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/80 mb-3 sm:mb-4">
          Exclusive Collection
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-4 sm:mb-6 leading-tight text-white">
          {slide.title}
          <span className="italic block mt-1 sm:mt-2 font-extralight">
            {slide.subtitle}
          </span>
        </h1>
        <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
          {slide.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
          <Link to="/Products" className="bg-white text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-sm hover:bg-gray-50 transition-all duration-300 text-xs sm:text-sm tracking-widest uppercase font-light">
            Discover Now
          </Link>
          <Link to="/ourstory" className="border border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-sm hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm tracking-widest uppercase font-light">
            Our Story
          </Link>
        </div>
      </div>
    </div>
    {/* Foreground Image */}
    <div className="flex-1 flex justify-center relative mt-8 lg:mt-0 w-full max-w-xs sm:max-w-sm md:max-w-md">
      <div className="relative w-full">
        <div className="absolute -inset-6 bg-gradient-to-br from-white/5 to-transparent rounded-2xl transform rotate-3"></div>
        <img
          src={slide.bgImage}
          alt="Luxury Perfume Bottle"
          className={`relative rounded-lg w-full object-contain z-10 transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        />
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-amber-400/30 to-amber-600/40 rounded-full blur-xl"></div>
      </div>
    </div>
  </div>
));

const SlideControls = React.memo(({ prevSlide, nextSlide, goToSlide, slides, currentSlide }) => (
  <>
    {/* Slide arrows */}
    <button onClick={prevSlide} className="hidden md:block absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-30 text-white/70 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-white/10 backdrop-blur-sm" aria-label="Previous slide">
      <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
    </button>
    <button onClick={nextSlide} className="hidden md:block absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-30 text-white/70 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-white/10 backdrop-blur-sm" aria-label="Next slide">
      <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
    </button>
    {/* Slide Indicators */}
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
      {slides.map((_, index) => (
        <button key={index} onClick={() => goToSlide(index)} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/70"}`} aria-label={`Go to slide ${index + 1}`}></button>
      ))}
    </div>
  </>
));


// --- Main Hero Component ---

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // axios, with fallback logic
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await Api.get("/heroSlides");
        setSlides(response.data);
      } catch (error) {
        console.error("Failed to fetch hero slides, loading initial data:", error);
        setSlides(initialSlides);
      } finally {
        // Use a small timeout to prevent jarring flash of content
        setTimeout(() => setIsLoading(false), 500); 
      }
    };
    fetchSlides();
  }, []);

  // Preload images for a smoother transition experience
  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.bgImage;
    });
  }, [slides]);

  // Memoize the core slide changing logic
  const changeSlide = useCallback((index) => {
    if (isTransitioning || slides.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((index + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 800); // Transition duration
  }, [isTransitioning, slides.length]);
  
  // Optimized interval using a ref for a stable callback
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = () => changeSlide(currentSlide + 1);
  });
  
  useEffect(() => {
    if (slides.length > 1) {
      const tick = () => savedCallback.current();
      const interval = setInterval(tick, 3000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  // Memoize all event handlers passed down as props
  const nextSlide = useCallback(() => changeSlide(currentSlide + 1), [changeSlide, currentSlide]);
  const prevSlide = useCallback(() => changeSlide(currentSlide - 1), [changeSlide, currentSlide]);
  const goToSlide = useCallback((index) => {
    if (index !== currentSlide) changeSlide(index);
  }, [changeSlide, currentSlide]);

  // --- RENDER THE NEW LOADER ---
  if (isLoading) {
    return <ShimmerLoader />;
  }
  
  if (!slides.length) {
    return <section className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white">Content is currently unavailable.</section>;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <SlideBackgrounds slides={slides} currentSlide={currentSlide} />
      <div className="absolute inset-0 bg-black/20"></div>
      <SlideContent slide={slides[currentSlide]} isTransitioning={isTransitioning} />
      <SlideControls 
        slides={slides} 
        currentSlide={currentSlide}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        goToSlide={goToSlide}
      />

      {/* Static decorative elements */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30">
        <svg className="h-8 sm:h-10 md:h-12 w-auto text-white" viewBox="0 0 100 40" fill="currentColor">
          <path d="M20,10 C30,5 40,15 50,10 C60,5 70,15 80,10 C85,7 90,12 95,10 L95,25 C90,27 85,22 80,25 C70,30 60,20 50,25 C40,30 30,20 20,25 C15,27 10,22 5,25 L5,10 C10,7 15,12 20,10 Z" />
        </svg>
      </div>
    </section>
  );
}