import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import profileImage from "../../Images/blog1.jpg";
import "./paid-listing.css";

const page = ({ websiteList ,user }) => {

  const handleClick = async (id) => {
    if (!id) return;

    const key = `business_click_${id}`;
    const lastClickDay = localStorage.getItem(key);
    console.log(`lastClickDay`, lastClickDay);
    const now = Date.now();
    const currentDay = Math.floor(now / 86400000);
    console.log(`currentDay`, currentDay);

    if (!lastClickDay || parseInt(lastClickDay) < currentDay) {

      axios.post(`http://localhost:5000/api/admin/increase-click-count-website-listing/${id}`, { type, user })
        .then(() => { console.log(`${type} click counted`); localStorage.setItem(key, currentDay.toString()); })
        .catch((err) => { console.error("Error increasing count", err) });
    } else {
      console.log(`${type} already clicked today — not counted`);
    }
  }


  return (
    <section className="custom-section">
      <div className="container">
        <div className="col-md-12">
          <div className="custom-row">
            {websiteList?.map((shop, index) => (
              <div key={index} className="custom-col">
                <div>
                  <Link
                    href={shop?.website}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                    onClick={() => handleClick(shop?._id)}
                  >
                    <div className="listing-content">
                      <div className="d-grid">
                        <div className="d-flex align-items-center gap-2">
                          <Link className="listing-brand-name" href="#">
                            <h5>{shop?.companyName}</h5>
                          </Link>
                        </div>
                        <Link
                          href={shop?.website}
                          target="_blank"
                        >
                          <p>{shop?.website?.replace(/^https?:\/\//, '')}</p>
                        </Link>
                      </div>
                    </div>

                    <div className="align-items-center listing-title">

                      <p className="listing-description">
                        {shop?.shortDescription.slice(0, 50)} <span style={{ color: "blue" }}>read more... </span>
                      </p>
                      <div className="d-flex flex-wrap align-items-center gap-1 mt-2">
                        {shop?.service?.slice(0, 3).map((keyword, idx) => (
                          <p key={idx} className="m-0 text-dark" style={{ fontSize: "14px" }}>
                            <i className="bi bi-check pe-1"></i>
                            {keyword}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="listing-image">
                  <img
                    src={shop?.logo}
                    className="paid-listing-image"
                    alt={shop?.companyName}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section >
  );
};

export default page;
