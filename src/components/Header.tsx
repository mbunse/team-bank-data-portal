
import React from 'react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="teambank-container flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-teambank-blue">TeamBank Data Portal</h1>
        </div>
        <div>
          <Button variant="outline" className="text-teambank-blue">
            Hilfe
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
