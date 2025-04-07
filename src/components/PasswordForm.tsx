
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Key } from "lucide-react";

const PasswordForm = () => {
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast({
        title: "Fehlende Eingaben",
        description: "Bitte füllen Sie alle Passwortfelder aus.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwörter stimmen nicht überein",
        description: "Die eingegebenen Passwörter stimmen nicht überein.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Passwort geändert",
        description: "Ihr Passwort wurde erfolgreich geändert. Bitte bewahren Sie es gut auf.",
      });
      
      // Clear the form
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-teambank-blue">Passwort ändern</CardTitle>
        <CardDescription>
          Setzen Sie Ihr persönliches Passwort für den Zugriff auf die Datenservices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-password" className="text-sm font-medium">
                Neues Passwort
              </Label>
              <div className="relative mt-1">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirm-password" className="text-sm font-medium">
                Passwort bestätigen
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-teambank-blue hover:bg-teambank-blue/90 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            <Key className="h-4 w-4" />
            {isLoading ? "Wird gespeichert..." : "Passwort speichern"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordForm;
