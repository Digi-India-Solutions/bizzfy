// "use client";
// import React, { useState } from "react";
// import "../../Pages/freelistingform/freelistingform.css";

// const BusinessDetails = ({ setKey, formData, setFormData }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, businessDetails: { ...formData.businessDetails, [e.target.name]: e.target.value, }, });
//   };

//   const validateForm = () => {
//     const requiredFields = ["businessName", "building", "street", "area", "landmark", "city", "state", "pinCode",];

//     for (let field of requiredFields) {
//       if (!formData.businessDetails?.[field]) {
//         setError(`Please fill out the ${field}.`);
//         return false;
//       }
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       // Uncomment and modify API call if needed
//       // const response = await fetch("/api/submit", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify(formData),
//       // });

//       // if (!response.ok) {
//       //   const errorData = await response.json();
//       //   throw new Error(errorData.message || "Something went wrong!");
//       // }

//       setKey("category");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const details = formData.businessDetails || {};

//   return (
//     <form onSubmit={handleSubmit}>
//       <h5 className="section-title">
//         Fill Business Details<sup>*</sup>
//       </h5>

//       {error && <div className="alert alert-danger">{error}</div>}

//       {[
//         { label: "Business Name", name: "businessName" }, { label: "Building/Block No", name: "building" },
//         { label: "Street/Colony Name", name: "street" }, { label: "Area", name: "area" },
//         { label: "Landmark", name: "landmark" }, { label: "State", name: "state" }, { label: "City", name: "city" },
//         { label: "Pin Code", name: "pinCode" },
//       ].map((field) => (
//         <div className="mb-3" key={field.name}>
//           <label className="form-label">
//             {field.label}
//             <sup>*</sup>
//           </label>
//           <input type="text" className="form-control" name={field.name} value={details[field.name] || ""} onChange={handleChange} required />
//         </div>
//       ))}

//       <button type="submit" className="btn btn-primary w-100 py-3" disabled={loading}>
//         {loading ? "Submitting..." : "Next"}
//       </button>
//     </form>
//   );
// };

// export default BusinessDetails;


"use client";
import React, { useEffect, useState } from "react";
import "../../Pages/freelistingform/freelistingform.css";
import axios from "axios";

// const statesList = [
//   "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "Uttar Pradesh"
// ];

const BusinessDetails = ({ setKey, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [statesList, setStatesList] = useState([])
  const [error, setError] = useState("");

  const details = formData.businessDetails || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      businessDetails: {
        ...formData.businessDetails,
        [name]: value,
      },
    });
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({
      ...formData,
      businessDetails: {
        ...formData.businessDetails,
        state: selectedState,
      },
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "businessName", "building", "street", "area", "landmark",
      "state", "city", "pinCode"
    ];
    for (let field of requiredFields) {
      if (!details?.[field]) {
        setError(`Please fill out the ${field}.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      setKey("category");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const fetchState = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/state/get-all-states");
      console.log("XXXXXXXXXXXXXXX", response.data.data)

      if (response.data.status) {
        setStatesList(response?.data.data);
      }

    } catch (err) {
      console.log('err', err)
    }
  }

  useEffect(() => {
    fetchState()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="section-title">Fill Business Details<sup>*</sup></h5>

      {error && <div className="alert alert-danger">{error}</div>}

      {[
        { label: "Business Name", name: "businessName" },
        { label: "Building/Block No", name: "building" },
        { label: "Street/Colony Name", name: "street" },
        { label: "Area", name: "area" },
        { label: "Landmark", name: "landmark" },

      ].map((field) => (
        <div className="mb-3" key={field.name}>
          <label className="form-label">
            {field.label} <sup>*</sup>
          </label>
          <input
            type="text"
            className="form-control"
            name={field.name}
            value={details[field.name] || ""}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      {/* State Dropdown */}
      <div className="mb-3">
        <label className="form-label">State <sup>*</sup></label>
        <select
          className="form-control"
          name="state"
          value={details.state || ""}
          onChange={handleStateChange}
          required
        >
          <option value="">Select State</option>
          {statesList?.map((state) => (
            <option key={state?._id} value={state?.name}>{state?.name}</option>
          ))}
        </select>
      </div>

      {/* City Text Input */}
      <div className="mb-3">
        <label className="form-label">City <sup>*</sup></label>
        <input
          type="text"
          className="form-control"
          name="city"
          value={details?.city || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Pin Code <sup>*</sup></label>
        <input
          type="text"
          className="form-control"
          name="pinCode"
          value={details.pinCode || ""}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100 py-3" disabled={loading}>
        {loading ? "Submitting..." : "Next"}
      </button>
    </form>
  );
};

export default BusinessDetails;
