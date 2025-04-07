
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Download } from "lucide-react";

const DownloadForm = () => {
  const { toast } = useToast();
  const [abrufcode, setAbrufcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!abrufcode.trim()) {
      toast({
        title: "Fehlender Abrufcode",
        description: "Bitte geben Sie den Abrufcode ein.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would be an actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Random chance to simulate "in progress" vs. successful download
      const isInProgress = Math.random() > 0.7;
      
      if (isInProgress) {
        toast({
          title: "In Verarbeitung",
          description: "Ihre Anfrage wird derzeit bearbeitet. Bitte versuchen Sie es später erneut.",
        });
      } else {
        toast({
          title: "Download bereit",
          description: "Ihr Download wird gestartet...",
        });
        
        // Simulate a download - in a real app this would trigger a file download
        setTimeout(() => {
          toast({
            title: "Download erfolgreich",
            description: "Die Datei wurde erfolgreich heruntergeladen.",
          });
        }, 1000);
      }
    } catch (error) {
      toast({
        title: "Fehler beim Download",
        description: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-teambank-blue">Rückübermittlung der Vertriebspotentiale</CardTitle>
        <CardDescription>
          Laden Sie Ihre Vertriebspotentiale mit Ihrem Abrufcode herunter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="abrufcode" className="text-sm font-medium">
              Abrufcode
            </Label>
            <Input
              id="abrufcode"
              value={abrufcode}
              onChange={(e) => setAbrufcode(e.target.value)}
              placeholder="z.B. TB-A1B2C3D4"
              className="mt-1"
            />
            <p className="mt-2 text-xs text-gray-500">
              Geben Sie den Abrufcode ein, den Sie bei der Datenlieferung erhalten haben.
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-teambank-blue hover:bg-teambank-blue/90 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            <Download className="h-4 w-4" />
            {isLoading ? "Wird abgerufen..." : "Daten abrufen"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DownloadForm;
