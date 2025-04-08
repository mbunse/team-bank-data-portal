
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-teambank-dark-blue text-white py-8 mt-12">
      <div className="teambank-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-sofia font-semibold mb-4 text-white">Kontakt</h3>
            <p className="text-sm">
              TeamBank AG<br />
              Beuthener Str. 25<br />
              90471 Nürnberg
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-sofia font-semibold mb-4 text-white">Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Hilfe & FAQ</a></li>
              <li><a href="#" className="hover:underline">Dokumentation</a></li>
              <li><a href="#" className="hover:underline">Kontaktformular</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-sofia font-semibold mb-4 text-white">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Datenschutz</a></li>
              <li><a href="#" className="hover:underline">Impressum</a></li>
              <li><a href="#" className="hover:underline">AGB</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-700 text-center text-sm">
          <p>&copy; {currentYear} TeamBank AG. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
