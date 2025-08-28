import { Hospital, PhoneCall, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import {  DentalToothIcon } from "hugeicons-react";


const navList = [
  { href: "home", label: "Home" },
  { href: "services", label: "Services" },
  { href: "about", label: "About" },
  { href: "tips", label: "Tips" },
  { href: "book", label: "Book Appointment" },
  { href: "testimonials", label: "Testimonial" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Observer untuk deteksi section aktif
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // setengah section terlihat baru aktif
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <header className="scroll-mt-20 bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <div className="flex items-center space-x-2">
          <DentalToothIcon className="w-8 h-8 text-sky-600" />
          <span className="text-xl font-bold text-sky-600">
            My Dentist Clinic
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {navList.map((link) => (
            <a
              href={`#${link.href}`}
              key={link.href}
              className={`relative transition ${
                activeSection === link.href
                  ? "text-sky-600 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-sky-600 after:rounded"
                  : "hover:text-sky-600"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <PhoneCall className="text-sky-600" />
          <a
            href="#book"
            className="bg-sky-600 text-white px-4 py-2 rounded-xl hover:bg-sky-700 transition text-sm"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="text-gray-700" />
            ) : (
              <Menu className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-4 py-4 space-y-3 text-gray-700 font-medium">
          {navList.map((link) => (
            <a
              href={`#${link.href}`}
              key={link.href}
              className={`block transition ${
                activeSection === link.href
                  ? "text-sky-600 font-semibold"
                  : "hover:text-sky-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
