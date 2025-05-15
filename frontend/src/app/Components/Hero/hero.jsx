// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import UserLocation from "../UserLocation/UserLocation";
// import "./hero.css";

// const Hero = () => {
//   const router = useRouter();
//   const [location, setLocation] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [pinCodes, setPinCodes] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState("");

//   const placeholderTexts = [
//     "Search for plumbers...",
//     "Find the best tutors...",
//     "Looking for car services?",
//     "Explore wedding planners...",
//     "Find electricians near you...",
//   ];
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);
//   const [animatedText, setAnimatedText] = useState("");

//   useEffect(() => {
//     const fetchPinCodes = async () => {
//         const response = await axios.get("http://localhost:5000/api/pincode/get-all-pin-codes");
//         console.log('response', response.data.pinCodes);
//         if (response.data?.status) {
//           setPinCodes(response?.data?.pinCodes);
//         }
//     };
//     fetchPinCodes()
//   }, [])

//   const extractPincode = (locationText) => {
//     const pincode = locationText.match(/\d{6}$/); 
//     return pincode ? pincode[0] : "";
//   };

//   const handleSelect = (loc) => {
//     setSelectedLocation(loc);
//     setLocation({ pincode: extractPincode(loc) });
//   };

//   const handleClear = () => {
//     setSelectedLocation("");
//     setLocation(null);
//   };

//   const handleSearch = () => {
//     if (!location?.pincode || !searchText.trim()) {
//       alert("Please wait for location and enter a search term.");
//       return;
//     }
//     router.push(
//       `/Pages/bussiness-listing?query=${searchText.trim()}&pincode=${selectedLocation ? selectedLocation.split(",")[2].trim() : location.pincode}`
//     );
//   };
//   console.log("XXXXXXXXXXX:-",pinCodes)
//   const filteredLocations = pinCodes.filter((loc) => {
//     const lowerSearch = searchTerm.toLowerCase();
//     return (
//       loc?.state?.toLowerCase().includes(lowerSearch) ||
//       loc?.area?.toLowerCase().includes(lowerSearch) ||
//       loc?.pincode?.toString().includes(lowerSearch)
//     );
//   });

//   // Animated placeholder effect
//   useEffect(() => {
//     let charIndex = 0;
//     const text = placeholderTexts[placeholderIndex];
//     const interval = setInterval(() => {
//       setAnimatedText(text.slice(0, charIndex));
//       charIndex++;
//       if (charIndex > text.length) {
//         clearInterval(interval);
//         setTimeout(() => {
//           setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
//         }, 1500);
//       }
//     }, 100);

//     return () => clearInterval(interval);
//   }, [placeholderIndex]);

//   // console.log("XXXXXXXXXXX:-",filteredLocations)
//   return (
//     <section className="some-page-hero-bg">
//       <div className="container">
//         <div className="hero-main">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="hero-content">
//                 <h1 className="hero-title">
//                   We Are Connecting! <span>Stay Hold</span> Your Success is Near.
//                 </h1>

//                 <div className="hero-search-bar">
//                   <div className="hero-search-container">
//                     {/* Location Picker */}
//                     <div className="dropdown" style={{ borderRight: "1px solid #ccc" }}>
//                       <button
//                         className="location-dropdown"
//                         type="button"
//                         id="locationDropdown"
//                         data-bs-toggle="dropdown"
//                         aria-expanded="false"
//                       >
//                         <i className="bi bi-geo-alt me-2"></i>
//                         {selectedLocation?.length > 0 ? selectedLocation : <UserLocation location={location} setLocation={setLocation} />}
//                       </button>

//                       <ul
//                         className="dropdown-menu home-select-location p-3 location-dropdown"
//                         aria-labelledby="locationDropdown"
//                       >
//                         <li>
//                           <input
//                             type="text"
//                             className="form-control mb-2"
//                             placeholder="Search location..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                           />
//                         </li>
//                         <li className="dropdown-section-title d-flex justify-content-between">
//                           RECENT LOCATIONS
//                           <span
//                             className="text-danger fw-normal"
//                             style={{ cursor: "pointer" }}
//                             onClick={handleClear}
//                           >
//                             Clear All
//                           </span>
//                         </li>
//                         {filteredLocations.length > 0 ? (
//                           filteredLocations.map((loc, i) => (
//                             <li key={i}>
//                               <button
//                                 className="dropdown-item"
//                                 type="button"
//                                 onClick={() => handleSelect(loc)}
//                               >
//                                 {loc.area}, {loc.state}, {loc.pincode}
//                               </button>
//                             </li>
//                           ))
//                         ) : (
//                           <li className="text-muted px-2">No matching locations</li>
//                         )}
//                       </ul>
//                     </div>

//                     <input
//                       type="text"
//                       className="hero-search-input"
//                       value={searchText}
//                       onChange={(e) => setSearchText(e.target.value)}
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                           e.preventDefault();
//                           handleSearch();
//                         }
//                       }}
//                       placeholder={animatedText}
//                     />
//                     <button className="hero-search-btn" onClick={handleSearch}>
//                       <i className="bi bi-search"></i>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="hero-buttons">
//                   <Link href="/Pages/list-your-webiste" className="herobutton1">
//                     List Your Website
//                   </Link>
//                   <Link href="/Pages/freelistingform" className="herobutton2">
//                     List Your Business
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* Optional Hero Image section — uncomment and customize if needed */}
//             {/* <div className="col-lg-5 col-md-12 d-flex justify-content-center position-relative">
//               <div className="hero-image-container">
//                 <Image src={heroimage2} alt="Hero Illustration" layout="intrinsic" className="hero-background-shape" />
//                 <Image src={blueImage} alt="Background Shape" layout="intrinsic" className="hero-animated-image" />
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import UserLocation from "../UserLocation/UserLocation";
import "./hero.css";

const Hero = () => {
  const router = useRouter();

  const [location, setLocation] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pinCodes, setPinCodes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const placeholderTexts = [
    "Search for plumbers...",
    "Find the best tutors...",
    "Looking for car services?",
    "Explore wedding planners...",
    "Find electricians near you...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animatedText, setAnimatedText] = useState("");

  // Fetch pin codes
  useEffect(() => {
    const fetchPinCodes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pincode/get-all-pin-codes");
        if (response.data?.status) {
          setPinCodes(response.data.pinCodes);
        }
      } catch (error) {
        console.error("Error fetching pin codes:", error);
      }
    };
    fetchPinCodes();
  }, []);

  const extractPincode = (locationText) => {
    const pincode = locationText.match(/\d{6}$/);
    return pincode ? pincode[0] : "";
  };

  const handleSelect = (loc) => {
    setSelectedLocation(loc);
    setLocation({ pincode: loc.pinCode });
  };

  const handleClear = () => {
    setSelectedLocation(null);
    setLocation(null);
  };

  const handleSearch = () => {
    const pincode = selectedLocation?.pincode || location?.pincode;

    if (!pincode || !searchText.trim()) {
      alert("Please wait for location and enter a search term.");
      return;
    }

    router.push(
      `/Pages/bussiness-listing?query=${searchText.trim()}&pincode=${pincode}`
    );
  };
  console.log("CCCCCCCC:-", pinCodes)
  const filteredLocations = pinCodes.filter((loc) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      loc?.stateName?.toLowerCase().includes(lowerSearch) ||
      loc?.area?.toLowerCase().includes(lowerSearch) ||
      loc?.pincode?.toString().includes(lowerSearch)
    );
  });

  // Animated placeholder
  useEffect(() => {
    let charIndex = 0;
    const text = placeholderTexts[placeholderIndex];
    const interval = setInterval(() => {
      setAnimatedText(text.slice(0, charIndex));
      charIndex++;
      if (charIndex > text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
        }, 1500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [placeholderIndex]);

  return (
    <section className="some-page-hero-bg">
      <div className="container">
        <div className="hero-main">
          <div className="row">
            <div className="col-md-12">
              <div className="hero-content">
                <h1 className="hero-title">
                  We Are Connecting! <span>Stay Hold</span> Your Success is Near.
                </h1>

                {/* SEARCH BAR */}
                <div className="hero-search-bar">
                  <div className="hero-search-container">
                    {/* LOCATION SELECT DROPDOWN */}
                    <div className="dropdown" style={{ borderRight: "1px solid #ccc" }}>
                      <button
                        className="location-dropdown"
                        type="button"
                        id="locationDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-geo-alt me-2"></i>
                        {selectedLocation ? (
                          `${selectedLocation.area}, ${selectedLocation.stateName}`
                        ) : (
                          <UserLocation location={location} setLocation={setLocation} />
                        )}
                      </button>

                      <ul className="dropdown-menu home-select-location p-3 location-dropdown" aria-labelledby="locationDropdown">
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
                        {filteredLocations?.length > 0 ? (
                          filteredLocations?.map((loc, i) => (
                            <li key={i}>
                              <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => handleSelect(loc)}
                              >
                                {loc?.area}, {loc?.stateName}
                              </button>
                            </li>
                          ))
                        ) : (
                          <li className="text-muted px-2">No matching locations</li>
                        )}
                      </ul>
                    </div>

                    {/* SEARCH INPUT */}
                    <input
                      type="text"
                      className="hero-search-input"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSearch();
                        }
                      }}
                      placeholder={animatedText}
                    />

                    {/* SEARCH BUTTON */}
                    <button className="hero-search-btn" onClick={handleSearch}>
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </div>

                {/* CTA BUTTONS */}
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

            {/* Optional Image Section */}
            {/* <div className="col-lg-5 col-md-12 d-flex justify-content-center position-relative">
              <div className="hero-image-container">
                <Image src={heroimage2} alt="Hero Illustration" layout="intrinsic" className="hero-background-shape" />
                <Image src={blueImage} alt="Background Shape" layout="intrinsic" className="hero-animated-image" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
