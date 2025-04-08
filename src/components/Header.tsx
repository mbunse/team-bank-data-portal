
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { LogOut, HelpCircle, Search, Bell } from "lucide-react";

const Header = () => {
  const { logout } = useAuth();
  
  return (
    <header className="bg-white shadow-sm">
      {/* Top navigation */}
      <div className="teambank-container">
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img 
                src="https://welt.teambank.de/wp-content/themes/tb-welt-3-0/assets/logo.svg" 
                alt="TeamBank Logo" 
                className="h-8 mr-2"
              />
              <span className="font-sofia text-teambank-dark-blue text-xl font-bold">Welt</span>
            </a>
            <div className="hidden md:flex ml-12 space-x-1">
              <a href="#" className="teambank-nav-item">Maßnahmen</a>
              <a href="#" className="teambank-nav-item">Produkte</a>
              <a href="#" className="teambank-nav-item">Wissen</a>
              <a href="#" className="teambank-nav-item relative">
                News
                <span className="absolute top-1 right-0 h-2 w-2 bg-pink-500 rounded-full"></span>
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="TeamBank Welt durchsuchen..."
                className="teambank-search pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-teambank-blue"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center font-bold text-teambank-dark-blue">
              <span className="hidden md:inline">MM</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Welcome banner */}
      <div className="bg-gray-50 border-y border-gray-200">
        <div className="teambank-container py-10">
          <h1 className="font-sofia text-3xl md:text-4xl font-bold text-teambank-dark-blue text-center">
            Guten Nachmittag, Max Mustermann
          </h1>
        </div>
      </div>
      
      {/* DataPortal specific navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="teambank-container py-3 flex items-center justify-between">
          <h2 className="font-sofia text-xl font-bold text-teambank-blue">TeamBank Data Portal</h2>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="text-teambank-dark-blue flex items-center gap-2 rounded-full border-teambank-dark-blue"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Hilfe</span>
            </Button>
            <Button 
              variant="outline" 
              className="text-teambank-dark-blue flex items-center gap-2 rounded-full border-teambank-dark-blue"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              <span>Abmelden</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
