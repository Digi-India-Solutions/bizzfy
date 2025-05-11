// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import "../Navbar/navbar.css";
// import Link from "next/link";
// import logo from "../../Images/logo.jpg";
// import Image from "next/image";
// import "../../Pages/login/page";
// import "./businessNavbar.css";
// import UserLocation from "../UserLocation/UserLocation";
// import { useRouter } from "next/navigation";

// const BusinessNavbar = () => {
//   const navbarCollapseRef = useRef(null);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         navbarCollapseRef.current &&
//         !navbarCollapseRef.current.contains(event.target)
//       ) {
//         const bsCollapse = new window.bootstrap.Collapse(
//           navbarCollapseRef.current,
//           {
//             toggle: false,
//           }
//         );
//         bsCollapse.hide();
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

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
//     let charIndex = 0;
//     const interval = setInterval(() => {
//       setAnimatedText(placeholderTexts[placeholderIndex].slice(0, charIndex));
//       charIndex++;
//       if (charIndex > placeholderTexts[placeholderIndex].length) {
//         clearInterval(interval);
//         setTimeout(() => {
//           setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
//         }, 1500);
//       }
//     }, 100);
//     return () => clearInterval(interval);
//   }, [placeholderIndex]);


//   const handleSearch = async () => {
//     if (!location?.pincode || !searchText.trim()) {
//       alert("Please wait for location and enter a search term.");
//       return;
//     }

//     // try {
//     //   const res = await axios.get("http://localhost:5000/api/search", {
//     //     params: {
//     //       query: searchText.trim(),
//     //       pincode: location.pincode,
//     //     },
//     //   });

//     // console.log("Search Results:", res.data);
//     router.push(`/Pages/bussiness-listing?query=${searchText.trim()}&pincode=${location.pincode}`);
//     // } catch (err) {
//     //   console.error("Search failed", err);
//     //   alert("Search failed. Try again later.");
//     // }
//   };

//   return (
//     <>
//       <section className="business-navbar">
//         <nav className="navbar navbar-expand-lg">
//           <div className="container-fluid">
//             <Link className="navbar-brand" href="/">
//               <Image src={logo} alt="logo" />
//             </Link>

//             {/* Desktop search bar */}
//             <div className="d-none d-lg-flex business-navbar-search-container">
//               <div className="hero-location-select">
//                 <UserLocation location={location} setLocation={setLocation} />
//               </div>
//               <input
//                 type="text"
//                 className="hero-search-input"
//                 onChange={(e) => setSearchText(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault(); // prevent form submission if inside form
//                     if (searchText.trim() && location?.pincode) {
//                       router.push(`/Pages/bussiness-listing?query=${searchText?.trim()}&pincode=${location.pincode}`);
//                     } else {
//                       alert("Please enter search text and allow location.");
//                     }
//                   }
//                 }}
//                 placeholder={animatedText}
//               />
//               <button className="hero-search-btn" onClick={handleSearch}>
//                 <i className="bi bi-search"></i>
//               </button>
//             </div>

//             {/* Mobile search icon */}
//             <div className="d-flex gap-3 d-lg-none">
//               <button
//                 className="d-lg-none btn btn-link  p-0 ms-2"
//                 onClick={() => setShowMobileSearch(!showMobileSearch)}
//               >
//                 <i className="bi bi-search fs-4"></i>
//               </button>

//               <button
//                 className="navbar-toggler"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#navbarSupportedContent"
//                 aria-controls="navbarSupportedContent"
//                 aria-expanded="false"
//                 aria-label="Toggle navigation"
//               >
//                 <span>
//                   <i className="bi bi-list text-white"></i>
//                 </span>
//               </button>
//             </div>

//             <div
//               className="collapse navbar-collapse justify-content-end"
//               id="navbarSupportedContent"
//               ref={navbarCollapseRef}
//             >
//               <div className="d-flex align-items-center ">
//                 <Link
//                   href="/Pages/login"
//                   className="btn btn bg-primary text-white me-2"
//                 >
//                   SignIn
//                 </Link>
//                 <Link
//                   href="/Pages/signup"
//                   className="btn btn bg-dark text-white me-2"
//                 >
//                   Register
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </section>

//       {/* Mobile search dropdown */}
//       {showMobileSearch && (
//         <div className="mobile-search-slide animate__animated animate__slideInDown">
//           <div className="container-fluid d-flex flex-column bg-white p-3 shadow">
//             <div className="form-select mb-2">
//               <UserLocation />
//             </div>
//             <div className="d-flex">
//               <input
//                 type="text"
//                 className="form-control me-2"
//                 placeholder={animatedText}
//               />
//               <button className="btn btn-primary">
//                 <i className="bi bi-search"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default BusinessNavbar;


"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../Images/logo.jpg";
import UserLocation from "../UserLocation/UserLocation";
import { useRouter } from "next/navigation";
import "../Navbar/navbar.css";
import "./businessNavbar.css";
import '../Hero/hero.css';
const placeholderTexts = [
  "Search for plumbers...",
  "Find the best tutors...",
  "Looking for car services?",
  "Explore wedding planners...",
  "Find electricians near you...",
];

const BusinessNavbar = () => {
  const router = useRouter();
  const navbarCollapseRef = useRef(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [location, setLocation] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animatedText, setAnimatedText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    const token = localStorage.getItem("biziffyToken");
    console.log("Token:", token);
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("biziffyToken");
    localStorage.removeItem("biziffyUser");
    setIsLoggedIn(false);
    router.push("/Pages/login");
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarCollapseRef.current &&
        !navbarCollapseRef.current.contains(event.target)
      ) {
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapseRef.current, {
          toggle: false,
        });
        bsCollapse.hide();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Animate placeholder typing effect
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

  const handleSearch = () => {
    if (!location?.pincode) {
      alert("Please allow location.");
      return;
    }
    router.push(`/Pages/bussiness-listing?query=${searchText.trim()}&pincode=${location.pincode}`);
  };

  return (
    <>
      <section className="business-navbar">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" href="/">
              <Image src={logo} alt="Company Logo" width={120} height={40} />
            </Link>

            {/* Desktop search bar */}
            <div className="d-none d-lg-flex business-navbar-search-container">
              {/* <div className="hero-location-select">
                <UserLocation location={location} setLocation={setLocation} />
              </div> */}
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
              <button className="hero-search-btn" onClick={handleSearch} aria-label="Search">
                <i className="bi bi-search"></i>
              </button>
            </div>

            {/* Mobile buttons */}
            <div className="d-flex gap-3 d-lg-none">
              <button
                className="btn btn-link p-0"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                aria-label="Toggle search"
              >
                <i className="bi bi-search fs-4"></i>
              </button>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="bi bi-list text-white"></i>
              </button>
            </div>

            {/* Right links */}
            {/* <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent" ref={navbarCollapseRef}            >
              <div className="d-flex align-items-center">
                <Link href="/Pages/login" className="btn bg-primary text-white me-2">
                  Sign In
                </Link>
                <Link href="/Pages/signup" className="btn bg-dark text-white me-2">
                  Register
                </Link>
              </div>
            </div> */}

            {!isLoggedIn ? (

              <div className="d-flex align-items-center ">
                <Link
                  href="/Pages/login"
                  className="btn btn bg-primary text-white me-2"
                >
                  SignIn
                </Link>
                <Link
                  href="/Pages/signup"
                  className="btn btn bg-dark text-white me-2"
                >
                  Register
                </Link>
              </div>
            ) : (

              <div className="dropdown">
                <button
                  className="btn border-0 d-flex align-items-center"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <i className="bi bi-person-circle fs-3 text-dark"></i>
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end shadow-lg border-0"
                  aria-labelledby="profileDropdown"
                  style={{ minWidth: '150px' }}
                >
                  <li>
                    <Link href="/Pages/Profile" className="dropdown-item d-flex align-items-center gap-2">
                      <i className="bi bi-person"></i> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2 text-danger"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </section>

      {/* Mobile search dropdown */}
      {showMobileSearch && (
        <div className="mobile-search-slide animate__animated animate__slideInDown">
          <div className="container-fluid d-flex flex-column bg-white p-3 shadow">
            <div className="form-select mb-2">
              <UserLocation location={location} setLocation={setLocation} />
            </div>
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={animatedText}
              />
              <button className="btn btn-primary" onClick={handleSearch} aria-label="Search">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessNavbar;
