"use client"
import Head from 'next/head'
import { useRef, useState } from 'react'
import styles from './module.css'
const page = () => {
   const [step, setStep] = useState(1);
  const [validated, setValidated] = useState(false);

  const formRef1 = useRef(null);
  const formRef2 = useRef(null);

  const handleNext = (e) => {
    e.preventDefault();
    if (formRef1.current.checkValidity()) {
      setValidated(false);
      setStep(2);
    } else {
      setValidated(true);
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (formRef2.current.checkValidity()) {
      setValidated(false);
      alert('Listing Submitted Successfully!');
      // You can submit form data here
    } else {
      setValidated(true);
    }
  };
  return (
    <>
      <Head>
        <title>List Your Business | Business Directory</title>
      </Head>

      <div className={`container py-3 ${styles.businessPage}`}>
        <div className="row g-5">
          {/* Form Section */}
          <div className="col-lg-6">
            <div className={`container py-5 ${styles.businessPage}`}>
              <ul className="nav nav-pills mb-4" role="tablist">
                <li className="nav-item">
                  <span className={`nav-link ${step === 1 ? 'active' : ''}`}>
                    <i className="bi bi-pencil-square me-2"></i> Business Info
                  </span>
                </li>
                <li className="nav-item">
                  <span className={`nav-link ${step === 2 ? 'active' : ''}`}>
                    <i className="bi bi-check2-circle me-2"></i> Additional Info
                  </span>
                </li>
              </ul>

              <div className="tab-content bg-white p-4 shadow rounded">
                <>
      {/* Step 1 */}
      {step === 1 && (
        <form ref={formRef1} noValidate className={validated ? 'was-validated' : ''} onSubmit={handleNext}>
          <h4 className="text-primary mb-4">Step 1: Business Information</h4>

          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your company / business name..."
              required
              minLength={2}
            />
            <div className="invalid-feedback">Company name is required (min 2 characters).</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Website URL</label>
            <input
              type="url"
              className="form-control"
              placeholder="Enter your website URL"
              pattern="https?://.+"
            />
            <div className="invalid-feedback">Enter a valid URL (starting with http:// or https://).</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Short Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. We are a leading furniture manufacturer..."
              required
              minLength={10}
            />
            <div className="invalid-feedback">Short description must be at least 10 characters.</div>
          </div>

          <div className="mb-3">
            <label className="form-label">About Your Business</label>
            <textarea
              className="form-control"
              rows="4"
              required
              placeholder="Describe your business, services offered, years of experience, and what makes you unique."
              minLength={30}
            ></textarea>
            <div className="invalid-feedback">Please write at least 30 characters.</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Services</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Furniture Sales, Modular Kitchen Setup, Custom Sofa Design"
              required
            />
            <div className="invalid-feedback">Please enter your services.</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Area / Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Andheri East, Mumbai or 400059"
              required
              minLength={3}
            />
            <div className="invalid-feedback">Area or pincode is required.</div>
          </div>

          <div className="mb-4">
            <label className="form-label">Business Logo</label>
            <input
              type="file"
              className="form-control"
              accept=".png,.jpg,.jpeg"
              required
            />
            <div className="invalid-feedback">Please upload a logo (.png, .jpg, .jpeg).</div>
            <small className="form-text text-muted">Accepted formats: .png, .jpg, .jpeg</small>
          </div>

          <button type="submit" className="btn btn-primary">
            Continue to Next Step
          </button>
        </form>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <form ref={formRef2} noValidate className={validated ? 'was-validated' : ''} onSubmit={handleFinalSubmit}>
          <h4 className="text-success mb-4">Step 2: Additional Information</h4>

          <div className="mb-3">
            <label className="form-label">Select Business Category</label>
            <select className="form-select" required>
              <option value="">Select a category</option>
              <option value="furniture">Furniture</option>
              <option value="electronics">Electronics</option>
              <option value="grocery">Grocery</option>
              <option value="services">Professional Services</option>
            </select>
            <div className="invalid-feedback">Please select a business category.</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Select Sub Category</label>
            <select className="form-select" required>
              <option value="">Select a subcategory</option>
              <option value="sofa">Sofa Sets</option>
              <option value="beds">Beds</option>
              <option value="chairs">Office Chairs</option>
              <option value="kitchen">Modular Kitchen</option>
            </select>
            <div className="invalid-feedback">Please select a subcategory.</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Service Area / Pincode</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 400001, 400002"
              required
            />
            <div className="invalid-feedback">Service area or pincode is required.</div>
          </div>

          <div className="mb-4">
            <label className="form-label">Upload Business Photos</label>
            <input
              type="file"
              className="form-control"
              multiple
              accept=".jpg,.jpeg,.png"
            />
            <small className="form-text text-muted">You can upload multiple photos of your business.</small>
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
              ← Back
            </button>
            <button type="submit" className="btn btn-success">
              Submit Listing
            </button>
          </div>
        </form>
      )}
    </>
              </div>
            </div>
          </div>

          {/* Info Content Section */}
          <div className="col-lg-6">
            <div className={`${styles.infoSection}`}>
              <h2 className="mb-4 text-success">Why List on Our Platform?</h2>

              <div className={`mb-4 p-3 shadow-sm rounded bg-white ${styles.infoCard}`}>
                <h5><i className="bi bi-megaphone-fill me-2 text-primary"></i> Boost Your Visibility</h5>
                <p>Expose your business to a wide audience actively searching for services like yours through our categorized directory.</p>
              </div>

              <div className={`mb-4 p-3 shadow-sm rounded bg-white ${styles.infoCard}`}>
                <h5><i className="bi bi-bar-chart-line-fill me-2 text-success"></i> SEO Optimized Listings</h5>
                <p>Each listing is built for search engines, improving your business ranking on Google and other platforms.</p>
              </div>

              <div className={`mb-4 p-3 shadow-sm rounded bg-white ${styles.infoCard}`}>
                <h5><i className="bi bi-gear-fill me-2 text-warning"></i> Easy Management</h5>
                <p>Quickly update your business information, services, and media through a simple dashboard.</p>
              </div>

              <div className={`mb-4 p-3 shadow-sm rounded bg-white ${styles.infoCard}`}>
                <h5><i className="bi bi-shield-check me-2 text-info"></i> Build Trust</h5>
                <p>Verified listings with a logo, contact info, and service description help gain customer trust instantly.</p>
              </div>

              <div className={`mb-4 p-3 shadow-sm rounded bg-white ${styles.infoCard}`}>
                <h5><i className="bi bi-geo-alt-fill me-2 text-danger"></i> Reach Local Customers</h5>
                <p>Your listing is shown based on area, making it easy for local users to discover and contact you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page