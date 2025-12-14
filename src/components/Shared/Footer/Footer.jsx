import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Container from "../Container";
import logo from "../../../assets/images/logo.png"; 

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-20">
      <Container>
        {/* TOP FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-14 text-gray-700">

          {/* BRAND + CONTACT */}
          <div className="space-y-4">
            {/* LOGO */}
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="StyleDecor logo"
                className="h-10 w-auto opacity-90 hover:opacity-100 transition"
              />
            </Link>

            <p className="text-sm text-gray-600 max-w-xs">
              Smart Home & Ceremony Decoration Booking Platform delivering
              elegant and professional decoration services.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                <span>+880 1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <span>support@styledecor.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* WORKING HOURS */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-secondary">
              Working Hours
            </h4>

            <ul className="text-sm space-y-2">
              <li className="flex justify-between max-w-xs">
                <span>Saturday – Thursday</span>
                <span>9:00 AM – 9:00 PM</span>
              </li>
              <li className="flex justify-between max-w-xs">
                <span>Friday</span>
                <span>3:00 PM – 10:00 PM</span>
              </li>
            </ul>

            <p className="text-xs text-gray-500">
              * Service hours may vary during events and holidays.
            </p>
          </div>

          {/* SOCIAL LINKS */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-secondary">
              Follow Us
            </h4>

            <p className="text-sm text-gray-600">
              Stay connected with us on social media
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 rounded-full bg-base-100 border border-base-300 
                hover:bg-primary hover:text-white transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-base-100 border border-base-300 
                hover:bg-primary hover:text-white transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-base-100 border border-base-300 
                hover:bg-primary hover:text-white transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM FOOTER */}
        <div className="border-t border-base-300 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} StyleDecor. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
