import { Link } from 'react-router-dom';
import "../Footer/footer.css"
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";



export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        <div className="footer-section">
          <h1 className="footer-title">MyTinerary</h1>
          <h3 className="footer-subtitle">We accept</h3>

          <div className="payment-icons">
            <img loading="lazy" width="30" src="https://tienda.havanna.com.ar/wp-content/uploads/2020/10/visa@2x.png" alt="Visa" />
            <img loading="lazy" width="30" src="https://tienda.havanna.com.ar/wp-content/uploads/2020/10/mastercard@2x.png" alt="Mastercard" />
            <img loading="lazy" width="30" src="https://tienda.havanna.com.ar/wp-content/uploads/2020/10/amex@2x.png" alt="American Express" />
            <img loading="lazy" width="30" src="https://tienda.havanna.com.ar/wp-content/uploads/2020/10/diners@2x.png" alt="Diners Club" />
          </div>
        </div>

        
        <nav className="footer-section">
          <h2 className="footer-heading">Quick Check-In Guide</h2>
          <ul className="footer-links">
            <li><Link to="/checkin">How to check in for my trip</Link></li>
            <li><Link to="/web-checkin">Web check-in steps</Link></li>
            <li><Link to="/mobile-checkin">Mobile check-in steps</Link></li>
            <li><a href="#">What’s my reservation code?</a></li>
            <li><a href="#">Cancel booking</a></li>
          </ul>
        </nav>

       
        <nav className="footer-section">
          <h2 className="footer-heading">Travel Info</h2>
          <ul className="footer-links">
            <li><a href="#">Travel documents by country</a></li>
            <li><a href="#">Traveling with pets</a></li>
            <li><a href="#">Special dietary requirements</a></li>
            <li><a href="#">Travel with babies</a></li>
            <li><a href="#">Additional services fees</a></li>
            <li><a href="#">Itinerary status line</a></li>
          </ul>
        </nav>

  
        <div className="footer-section">
          <h2 className="footer-heading">Stay Connected</h2>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>

          <p className="contact-info">
            ✉ support@mytinerary.com<br />
            📞 +1 (555) 123-456
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyTinerary — All rights reserved</p>
      </div>

       <div className="social-icons">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={22} />
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={22} />
        </a>
         <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={22} />
        </a>

        <a
          href="https://wa.me/49123456789"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={22} />
        </a>
      </div>
    </footer>
  );
}
