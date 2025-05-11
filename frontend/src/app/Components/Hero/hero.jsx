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


  // for location select opion 
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSelect = (loc) => {
    setSelectedLocation(loc);
    setLocation({ pincode: extractPincode(loc) }); // Optional: You can extract a real pincode
  };

  const handleClear = () => {
    setSelectedLocation("");
    setLocation({});
  };

  const extractPincode = (locationText) => {
    // Dummy logic: You can replace this with actual mapping
    const mapping = {
      "Rohini, Delhi": "110085",
      "Uttam Nagar, Delhi": "110059",
      "Karol Bagh, Delhi": "110005",
      "Shahadara, Delhi": "110032",
      "Dwarka, Delhi": "110075",
      "Laxmi Nagar, Delhi": "110092",
    };
    return mapping[locationText] || "";
  };

  const [searchTerm, setSearchTerm] = useState("");

  const locations = [
    "Rohini, Delhi",
    "Uttam Nagar, Delhi",
    "Karol Bagh, Delhi",
    "Shahadara, Delhi",
    "Dwarka, Delhi",
    "Laxmi Nagar, Delhi",
  ];

  const filteredLocations = locations.filter((loc) =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    <div className="dropdown" style={{ borderRight: '1px solid #ccc' }}>
                      <button
                        className="location-dropdown"
                        type="button"
                        id="locationDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-geo-alt me-2"></i><UserLocation location={location} setLocation={setLocation} />
                      </button>

                      <ul className="dropdown-menu home-select-location p-3 location-dropdown" aria-labelledby="locationDropdown">
                        {/* Search Input */}
                        <li>
                          <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Search location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </li>
                        <li className="dropdown-section-title d-flex justify-content-between">
                          RECENT LOCATIONS
                          <span className="text-danger fw-normal" style={{ cursor: "pointer" }} onClick={handleClear}>
                            Clear All
                          </span>
                        </li>
                        <li>
                          <a className="dropdown-item" onClick={() => handleSelect("Rohini, Delhi")}>
                            Rohini, Delhi
                          </a>
                        </li>
                        {filteredLocations.length > 0 ? (
                          filteredLocations.map((loc, i) => (
                            <li key={i}>
                              <a className="dropdown-item" onClick={() => handleSelect(loc)}>
                                {loc}
                              </a>
                            </li>
                          ))
                        ) : (
                          <li className="text-muted px-2">No matching locations</li>
                        )}
                      </ul>
                    </div>

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
                  <Link href="/Pages/list-your-webiste" className="herobutton1">
                    List Your Website
                  </Link>
                  <Link href="/Pages/freelistingform" className="herobutton2">
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
