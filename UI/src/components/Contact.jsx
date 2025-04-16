import React, { useRef, useState } from "react";
import "./Contact.css";
import emailIcon from "../assets/email.png";
import whatsappIcon from "../assets/whatsapp.png";
import locationIcon from "../assets/location.png";
import emailjs from "emailjs-com";

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_0e0p3so";
    const templateID = "template_8okh7s8";
    const publicKey = "1Nir0oNQnK6WEgKCJ";

    emailjs
      .sendForm(serviceID, templateID, formRef.current, publicKey)
      .then(() => {
        setStatus("✅ Message sent successfully!");
        formRef.current.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setStatus("❌ Failed to send message. Please try again later.");
      });
  };

  return (
    <section className="full-width-section fade-in">
      <div className="contact-wrapper container">
        {/* Left Side - Info */}
        <div className="contact-info fade-in">
          <div className="info-item">
            <img src={emailIcon} alt="Email" className="icon" />
            <p>irregularstore@gmail.com</p>
          </div>
          <div className="info-item">
            <img src={whatsappIcon} alt="WhatsApp" className="icon" />
            <p>+62 838-6777-5464</p>
          </div>
          <div className="info-item">
            <img src={locationIcon} alt="Location" className="icon" />
            <p>
              W29V+V7X, Sumber, Kebumen, Kec. Sukorejo, Kabupaten Kendal,
              <br />
              Jawa Tengah 51363
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="contact-form fade-in">
          <h2 style={{ marginBottom: "10px" }}>Contact Us</h2>
          <form ref={formRef} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />

            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" rows="4" required></textarea>

            <button type="submit">Send Message</button>

            {status && (
              <p style={{ marginTop: "10px", color: "#000" }}>{status}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
