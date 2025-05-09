// "use client";
// import React, { useState } from "react";
// import "./contactus.css";
// import Head from "next/head";
// import contactImage from "../../Images/contact-man.png";
// import Image from "next/image";
// import ReCAPTCHA from "react-google-recaptcha";

// const Page = () => {
//   const [captchaVerified, setCaptchaVerified] = useState(false);

//   const handleCaptchaChange = (value) => {
//     console.log("Captcha Value:", value);
//     if (value) {
//       setCaptchaVerified(true);
//     } else {
//       setCaptchaVerified(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!captchaVerified) {
//       alert("Please verify that you are not a robot.");
//       return;
//     }
//     alert("Form submitted successfully!");
//   };

//   return (
//     <>
//       <Head>
//         <title>
//           Contact Us | Biziffy - Get in Touch for Business Listing & Support
//         </title>
//         <meta
//           name="description"
//           content="Need help with business listing, lead generation, or digital growth? Contact Biziffy for support, partnerships, or any inquiries. We're here to assist you."
//         />
//         <meta
//           name="keywords"
//           content="contact Biziffy, Biziffy support, get in touch Biziffy, business listing help, lead generation support, partnership inquiries, talk to Biziffy team, business support, digital marketing assistance, contact form, list business queries, submit enquiry, customer care Biziffy, contact details, phone number Biziffy, Biziffy office, support team Biziffy, digital growth help, online business directory support, help listing business, free consultation, SEO assistance, local listing help, Biziffy services, business inquiry, contact for advertisement, business promotion support, feedback Biziffy"
//         />

//         {/* Open Graph Tags */}
//         <meta
//           property="og:title"
//           content="Contact Biziffy | We're Here to Help You Grow"
//         />
//         <meta
//           property="og:description"
//           content="Get in touch with the Biziffy team for business listings, support, and growth inquiries. We're ready to assist you."
//         />
//         <meta property="og:url" content="https://biziffy.com/contact-us" />
//         <meta property="og:type" content="website" />
//         <meta property="og:site_name" content="Biziffy" />

//         {/* Twitter Meta Tags */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta
//           name="twitter:title"
//           content="Contact Us | Biziffy Support & Enquiries"
//         />
//         <meta
//           name="twitter:description"
//           content="Reach out to Biziffy for business listing support, lead generation, and partnership inquiries."
//         />
//         <meta name="twitter:creator" content="@biziffy" />
//       </Head>

//       <div className="contact-us-container">
//         <div className="contact-us-wrapper">
//           <h1 className="contact-us-title">
//             Contact <span style={{ color: "var(--blue)" }}> Us</span>
//           </h1>
//           <div className="contact-us-row">
//             <div className="contact-us-info">
//               <h4>Get in Touch</h4>
//               <p>
//                 Have questions? We&apos;re here to help. Reach out to us using
//                 the form or the details below.
//               </p>
//               <ul className="contact-details">
//                 <li>
//                   <strong>Email:</strong> support@biziffy.com
//                 </li>
//                 <li>
//                   <strong>Phone:</strong> +91 97296 06097
//                 </li>
//                 <li>
//                   <strong>Address:</strong> Biziffy Internet Marketing Pvt. Ltd.
//                   Address: SCO-93,3rd Floor, Sector-7, Karnal, Haryana, Zip Code
//                   132002.
//                 </li>
//               </ul>
//               <div className="contact-image">
//                 <Image src={contactImage} alt="Contact Us" />
//               </div>
//             </div>
//             <div className="contact-us-form-container">
//               <h4>Send Us a Message</h4>
//               <form className="contact-form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     className="form-input"
//                     placeholder="Your Full Name"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Email Address</label>
//                   <input
//                     type="email"
//                     className="form-input"
//                     placeholder="Your Email"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Phone Number</label>
//                   <input
//                     type="tel"
//                     className="form-input"
//                     placeholder="Your Phone Number"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">City</label>
//                   <select className="form-select" required>
//                     <option value="">Select City</option>
//                     <option value="">Delhi</option>
//                   </select>
//                 </div>
//                 {/* <div className="form-group">
//                                     <label className="form-label">Business Name</label>
//                                     <input type="text" className="form-input" placeholder="Your Business Name" />
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Subject</label>
//                                     <input type="text" className="form-input" placeholder="Subject" />
//                                 </div> */}
//                 <div className="form-group">
//                   <label className="form-label">Type of Inquiry</label>
//                   <select className="form-select" required>
//                     <option value="">Select Inquiry Type</option>
//                     <option value="general">General Inquiry</option>
//                     <option value="partnership">Partnership</option>
//                     <option value="advertising">Advertising</option>
//                     <option value="support">Support</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     <input type="checkbox" required /> I agree to the Terms
//                     &amp; Conditions and Privacy Policy
//                   </label>
//                 </div>

//                 <div className="form-group">
//                   <ReCAPTCHA
//                     sitekey="https://www.mediaman.in/"
//                     onChange={handleCaptchaChange}
//                   />
//                 </div>
//                 <div className="form-submit">
//                   <button
//                     type="submit"
//                     className="submit-button"
//                     disabled={!captchaVerified}
//                   >
//                     Send Message
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page;


"use client";
import React, { useState, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import contactImage from "../../Images/contact-man.png";
import "./contactus.css";
import axios from "axios";

const cities = ["Delhi", "Mumbai", "Kolkata", "Chennai"];
const inquiryTypes = ["General Inquiry", "Partnership", "Advertising", "Support"];

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    inquiryType: "",
    termsAccepted: false,
  });

  const [captchaVerified, setCaptchaVerified] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  // const handleCaptchaChange = useCallback((value) => {
  //   setCaptchaVerified(!!value);
  // }, []);

  const handleSubmit = async (e) => {
    if (!captchaVerified) {
      alert("Please verify that you are not a robot.");
      return;
    }

    if (!formData.termsAccepted) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/contactus/create-contact", payload);
      console.log("Submission response:", response.data);
      alert("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        inquiryType: "",
        termsAccepted: false,
      });
      setCaptchaVerified(false);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Biziffy - Get in Touch</title>
        <meta
          name="description"
          content="Contact Biziffy for business listing help, support, and partnership inquiries."
        />
        <meta
          name="keywords"
          content="contact Biziffy, Biziffy support, business listing, inquiry"
        />
      </Head>

      <div className="contact-us-container">
        <div className="contact-us-wrapper">
          <h1 className="contact-us-title">
            Contact <span style={{ color: "var(--blue)" }}>Us</span>
          </h1>

          <div className="contact-us-row">
            <div className="contact-us-info">
              <h4>Get in Touch</h4>
              <p>Have questions? We're here to help. Reach out via the form or details below.</p>
              <ul className="contact-details">
                <li><strong>Email:</strong> support@biziffy.com</li>
                <li><strong>Phone:</strong> +91 97296 06097</li>
                <li><strong>Address:</strong> SCO-93, 3rd Floor, Sector-7, Karnal, Haryana 132002</li>
              </ul>
              <div className="contact-image">
                <Image src={contactImage} alt="Contact Us" />
              </div>
            </div>

            <div className="contact-us-form-container">
              <h4>Send Us a Message</h4>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    pattern="[0-9]{10}"
                    className="form-input"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city" className="form-label">City</label>
                  <select
                    id="city"
                    name="city"
                    className="form-select"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryType" className="form-label">Type of Inquiry</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    className="form-select"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Inquiry Type</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      required
                    />
                    {" "}I agree to the Terms & Conditions and Privacy Policy
                  </label>
                </div>
                {/* 
                <div className="form-group">
                  <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" onChange={handleCaptchaChange} />
                </div> */}

                <div className="form-submit">
                  <button type="submit" className="submit-button" disabled={!captchaVerified || loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
