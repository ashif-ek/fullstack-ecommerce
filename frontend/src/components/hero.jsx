import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Api from "../services/api";

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

// --- Shimmer Loader (unchanged) ---
const ShimmerLoader = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center blur-lg scale-105"
        style={{ backgroundImage: `url(${initialSlides[0].bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
    </section>
  );
};

// --- Memoized Child Components (unchanged) ---
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
    <div className="flex-1 text-center lg:text-left w-full">
      <div
        className={`transition-all duration-700 ease-out ${
          isTransitioning
            ? "translate-y-6 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
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

    <div className="flex-1 flex justify-center relative mt-8 lg:mt-0 w-full max-w-xs sm:max-w-sm md:max-w-md">
      <img
        src={slide.bgImage}
        alt="Luxury Perfume Bottle"
        className={`relative rounded-lg w-full object-contain z-10 transition-all duration-700 ${
          isTransitioning
            ? "opacity-0 scale-95"
            : "opacity-100 scale-100"
        }`}
      />
    </div>
  </div>
));

const SlideControls = React.memo(
  ({ prevSlide, nextSlide, goToSlide, slides, currentSlide }) => (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
            index === currentSlide
              ? "bg-white"
              : "bg-white/50 hover:bg-white/70"
          }`}
        />
      ))}
    </div>
  )
);

// --- Main Hero Component ---
export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch slides with normalization
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await Api.get("/");

        const normalizedSlides = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.results)
            ? res.data.results
            : initialSlides;

        setSlides(normalizedSlides);
      } catch {
        setSlides(initialSlides);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    fetchSlides();
  }, []);

  // Preload images safely
  useEffect(() => {
    if (!Array.isArray(slides)) return;

    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.bgImage;
    });
  }, [slides]);

  const changeSlide = useCallback(
    (index) => {
      if (isTransitioning || slides.length === 0) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((index + slides.length) % slides.length);
        setIsTransitioning(false);
      }, 800);
    },
    [isTransitioning, slides.length]
  );

  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = () => changeSlide(currentSlide + 1);
  });

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => savedCallback.current(), 3000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  const nextSlide = useCallback(
    () => changeSlide(currentSlide + 1),
    [changeSlide, currentSlide]
  );
  const prevSlide = useCallback(
    () => changeSlide(currentSlide - 1),
    [changeSlide, currentSlide]
  );
  const goToSlide = useCallback(
    (index) => index !== currentSlide && changeSlide(index),
    [changeSlide, currentSlide]
  );

  if (isLoading) return <ShimmerLoader />;
  if (!slides.length) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <SlideBackgrounds slides={slides} currentSlide={currentSlide} />
      <SlideContent
        slide={slides[currentSlide]}
        isTransitioning={isTransitioning}
      />
      <SlideControls
        slides={slides}
        currentSlide={currentSlide}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        goToSlide={goToSlide}
      />
    </section>
  );
}
