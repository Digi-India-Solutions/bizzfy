import Image from "next/image";
import Link from "next/link";
import React from "react";
import profileImage from "../../Images/blog1.jpg";
import "./paid-listing.css";

const page = ({ visibleBusinesses }) => {
  const Arr = [
    {
      name: "Digi India Solution",
      location: "near Babosa Mandir in Rohini Sector 24",
      description:
        "is a delightful spot for delicious baked goods. The bakery offers a wide range of mouthwatering treats that fgjhdfjgb gfgnjkdfbgv vndfjvkndfbn ...",
      rating: 4.0,
      image: profileImage,
      link: "https://www.justdial.com",
      keyworad: ["Digital Services", "Web Design", "SEO"],
    },
    {
      name: "Media Men Advertising",
      location: "near Babosa Mandir in Rohini Sector 24",
      description:
        "is a delightful spot for delicious baked goods. The bakery offers a wide range of mouthwatering treats that range of mouthwatering treats that fgjhdfjgb gfgnjkdfbgv vndfjvkndfbn ......",
      rating: 4.0,
      reviews: 49974,
      image: profileImage,
      link: "https://www.justdial.com",
      keyworad: ["Print Media", "Hoardings", "Advertising"],
    },
    {
      name: "Digital Marketing Solutions",
      location: "near Babosa Mandir in Rohini Sector 24",
      description:
        "is a delightful spot for delicious baked goods. The bakery offers a wide range of mouthwatering treats that range of mouthwatering treats that fgjhdfjgb gfgnjkdfbgv vndfjvkndfbn ...",
      rating: 4.0,
      reviews: 49974,
      image: profileImage,
      link: "https://www.justdial.com",
      keyworad: ["Social Media", "Google Ads", "Email Marketing"],
    },
    {
      name: "Ashrey Property Realtors",
      location: "near Babosa Mandir in Rohini Sector 24",
      description:
        "is a delightful spot for delicious baked goods. The bakery offers a wide range of mouthwatering treats that range of mouthwatering treats that fgjhdfjgb gfgnjkdfbgv vndfjvkndfbn ...",
      rating: 4.0,
      keyworad: ["Real Estate", "Commercial Property", "Rentals"],
      reviews: 49974,
      image: profileImage,
      link: "https://www.justdial.com",
    },
  ];

  return (
    <section className="custom-section">
      <div className="container">
        <div className="col-md-12">
          <div className="custom-row">
            {visibleBusinesses.map((shop, index) => (
              <div key={index} className="custom-col">
                <div>
                  <div className="listing-content">
                    <div className="d-grid">
                      <div className="d-flex align-items-center gap-2">
                        <Link className="listing-brand-name" href="#">
                          <h5>{shop?.businessDetails?.businessName}</h5>
                        </Link>
                      </div>
                      <Link
                        href={shop?.upgradeListing?.website}
                        target="_blank"
                      >
                        <p>{shop?.upgradeListing?.website?.replace(/^https?:\/\//, '')}</p>
                      </Link>
                    </div>
                  </div>

                  <div className="align-items-center listing-title">
                    {/* <Link
                      href={shop?.link}
                      className="text-decoration-none"
                      target="_blank"
                    >
                      <h5>{shop?.name}</h5>
                    </Link> */}
                    <p className="listing-description">
                      {shop?.businessCategory?.about.slice(0, 100)}...
                    </p>
                    <div className="d-flex flex-wrap align-items-center gap-1 mt-2">
                      {shop?.businessCategory?.keywords?.slice(0, 3).map((keyword, idx) => (
                        <p key={idx} className="m-0 text-dark" style={{ fontSize: "14px" }}>
                          <i className="bi bi-check pe-1"></i>
                          {keyword}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="listing-image">
                  <img
                    src={shop?.businessCategory?.businessImages[1]}
                    className="paid-listing-image"
                    alt={shop?.businessDetails?.businessName}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
