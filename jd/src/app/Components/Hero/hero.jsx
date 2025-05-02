"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import "./hero.css";
import UserLocation from "../UserLocation/UserLocation";
import { useRouter } from "next/navigation";
import { title } from "process";

const Hero = () => {
  const [location, setLocation] = useState(null);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const placeholderTexts = [
    "Search for plumbers...",
    "Find the best tutors...",
    "Looking for car services?",
    "Explore wedding planners...",
    "Find electricians near you...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animatedText, setAnimatedText] = useState("");

  useEffect(() => {
    let charIndex = 0;
    const interval = setInterval(() => {
      setAnimatedText(placeholderTexts[placeholderIndex].slice(0, charIndex));
      charIndex++;
      if (charIndex > placeholderTexts[placeholderIndex].length) {
        clearInterval(interval);
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
        }, 1500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [placeholderIndex]);





  const handleSearch = async () => {
    if (!location?.pincode || !searchText.trim()) {
      alert("Please wait for location and enter a search term.");
      return;
    }

    // try {
    //   const res = await axios.get("http://localhost:5000/api/search", {
    //     params: {
    //       query: searchText.trim(),
    //       pincode: location.pincode,
    //     },
    //   });

    // console.log("Search Results:", res.data);
    router.push(`/Pages/bussiness-listing?query=${searchText.trim()}&pincode=${location.pincode}`);
    // } catch (err) {
    //   console.error("Search failed", err);
    //   alert("Search failed. Try again later.");
    // }
  };

  return (
    <section className="some-page-hero-bg">
      <div className="container">
        <div className="hero-main">
          <div className="row">
            {/* Left Content */}
            <div className="col-md-12">
              <div className="hero-content">
                <h1 className="hero-title">
                  We Are Connecting! <span>Stay Hold</span> Your
                  Success is Near.
                </h1>

                <div className="hero-search-bar">
                  <div className="hero-search-container">
                    {/* Location Picker */}
                    <div className="hero-location-picker">
                      <UserLocation location={location} setLocation={setLocation} />
                    </div>

                    {/* Search Input */}
                    <input
                      type="text"
                      className="hero-search-input"
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); 
                          if (searchText.trim() && location?.pincode) {
                            router.push(`/Pages/bussiness-listing?query=${searchText?.trim()}&pincode=${location.pincode}`);
                          } else {
                            alert("Please enter search text and allow location.");
                          }
                        }
                      }}
                      placeholder={animatedText}
                    />
                    <button className="hero-search-btn" onClick={handleSearch}>
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </div>

                <div className="hero-buttons">
                  <Link href="#" className="herobutton1">
                    Submit Website
                  </Link>
                  <Link href="/Pages/free-listing" className="herobutton2">
                    List Your Business
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Image */}
            {/* <div className="col-lg-5 col-md-12 d-flex justify-content-center position-relative">
            <div className="hero-image-container">
              <Image
                src={heroimage2}
                alt="Hero Illustration"
                layout="intrinsic"
                className="hero-background-shape"
              />
              <Image
                src={blueImage}
                alt="Background Shape"
                layout="intrinsic"
                className="hero-animated-image"
              />
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
