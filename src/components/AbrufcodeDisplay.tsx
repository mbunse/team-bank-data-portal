
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, Check, Copy } from "lucide-react";

interface AbrufcodeDisplayProps {
  abrufcode: string;
  onReset: () => void;
}

const AbrufcodeDisplay: React.FC<AbrufcodeDisplayProps> = ({ abrufcode, onReset }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(abrufcode);
    toast({
      title: "Abrufcode kopiert",
      description: "Der Abrufcode wurde in Ihre Zwischenablage kopiert.",
    });
  };

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Check className="h-5 w-5 text-green-500" />
          <CardTitle className="text-green-700">Upload erfolgreich</CardTitle>
        </div>
        <CardDescription className="text-green-600">
          Ihr Upload war erfolgreich. Nutzen Sie den angezeigten Abrufcode für den Download des Ergebnisses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-green-800">Ihr Abrufcode:</span>
            <div className="flex items-center space-x-2">
              <div className="rounded-md bg-white p-3 border border-green-200 font-mono text-lg font-bold text-teambank-blue flex-grow">
                {abrufcode}
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={copyToClipboard}
                className="h-10 w-10 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Wichtiger Hinweis</h3>
                <div className="mt-2 text-sm text-amber-700">
                  <p>Bitte speichern Sie diesen Abrufcode sicher. Sie benötigen ihn, um später Ihre Vertriebspotentiale abzurufen.</p>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onReset}
            variant="outline"
            className="text-teambank-blue border-teambank-blue hover:bg-teambank-lightblue"
          >
            Neuen Upload starten
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AbrufcodeDisplay;
