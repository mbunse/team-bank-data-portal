
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { LogOut, HelpCircle } from "lucide-react";

const Header = () => {
  const { logout } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="teambank-container flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-teambank-blue">TeamBank Data Portal</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-teambank-blue flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span>Hilfe</span>
          </Button>
          <Button 
            variant="outline" 
            className="text-teambank-blue flex items-center gap-2"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            <span>Abmelden</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
