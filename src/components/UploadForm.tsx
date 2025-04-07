
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileUp } from "lucide-react";

interface UploadFormProps {
  onSuccess: (abrufcode: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [umsatzFile, setUmsatzFile] = useState<File | null>(null);
  const [stammFile, setStammFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!umsatzFile || !stammFile) {
      toast({
        title: "Fehlende Dateien",
        description: "Bitte laden Sie beide erforderlichen Dateien hoch.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would be an actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate a successful response with an abrufcode
      const mockAbrufcode = `TB-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      toast({
        title: "Upload erfolgreich",
        description: `Ihr Upload war erfolgreich. Nutzen Sie den angezeigten Abrufcode für den Download des Ergebnisses.`,
      });
      
      onSuccess(mockAbrufcode);
    } catch (error) {
      toast({
        title: "Fehler beim Upload",
        description: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setter(e.target.files[0]);
      }
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-teambank-blue">Datenanlieferung</CardTitle>
        <CardDescription>
          Laden Sie Ihre Umsatz- und Kundenstammdaten im CSV oder ZIP Format hoch.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="umsatz" className="text-sm font-medium">
                Umsatzdatendatei (CSV/ZIP) *
              </Label>
              <div className="mt-1 flex items-center">
                <Label
                  htmlFor="umsatz"
                  className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed 
                    ${umsatzFile ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-teambank-blue'} 
                    transition-colors duration-200 ease-in-out`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {umsatzFile ? (
                      <>
                        <FileUp className="h-8 w-8 text-green-500" />
                        <p className="mt-2 text-sm text-green-500">{umsatzFile.name}</p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-teambank-blue" />
                        <p className="mt-2 text-sm text-gray-500">Klicken Sie, oder ziehen Sie eine Datei in diesen Bereich</p>
                      </>
                    )}
                  </div>
                  <Input
                    id="umsatz"
                    type="file"
                    className="hidden"
                    accept=".csv,.zip"
                    onChange={handleFileChange(setUmsatzFile)}
                  />
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="stamm" className="text-sm font-medium">
                Kundenstammdaten (CSV/ZIP) *
              </Label>
              <div className="mt-1 flex items-center">
                <Label
                  htmlFor="stamm"
                  className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed 
                  ${stammFile ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-teambank-blue'} 
                  transition-colors duration-200 ease-in-out`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {stammFile ? (
                      <>
                        <FileUp className="h-8 w-8 text-green-500" />
                        <p className="mt-2 text-sm text-green-500">{stammFile.name}</p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-teambank-blue" />
                        <p className="mt-2 text-sm text-gray-500">Klicken Sie, oder ziehen Sie eine Datei in diesen Bereich</p>
                      </>
                    )}
                  </div>
                  <Input
                    id="stamm"
                    type="file"
                    className="hidden"
                    accept=".csv,.zip"
                    onChange={handleFileChange(setStammFile)}
                  />
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                E-Mail-Adresse (optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="beispiel@bank.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
              <p className="mt-2 text-xs text-gray-500">
                Die E-Mail-Adresse wird bei der TeamBank AG gespeichert und einmalig für eine 
                Statusinformation verwendet. Diese enthält eine Uploadbenachrichtigung und ggf. 
                einen Hinweis auf das Vorliegen eines Datenqualitätshinweises.
              </p>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-teambank-blue hover:bg-teambank-blue/90" 
            disabled={isLoading}
          >
            {isLoading ? "Wird gesendet..." : "Dateien senden"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadForm;
