
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import Footer from '@/components/Footer';
import { Lock, Building } from "lucide-react";

const loginSchema = z.object({
  bankId: z.string().min(1, { message: "Bank ID wird benötigt" }),
  password: z.string().min(1, { message: "Passwort wird benötigt" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Check if user is already logged in
  useEffect(() => {
    const credentials = localStorage.getItem('teambank_credentials');
    if (credentials) {
      navigate('/');
    }
  }, [navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      bankId: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoggingIn(true);
    
    // Store credentials in localStorage (in a real app, you'd want to use a more secure method)
    const credentials = btoa(`${data.bankId}:${data.password}`);
    localStorage.setItem('teambank_credentials', credentials);
    
    // Simulate login delay
    setTimeout(() => {
      setIsLoggingIn(false);
      toast({
        title: "Erfolgreich angemeldet",
        description: "Willkommen im TeamBank Data Portal",
      });
      navigate('/');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center bg-teambank-gray py-8">
        <div className="teambank-container max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-teambank-blue mb-2">TeamBank Data Portal</h1>
              <p className="text-gray-600">Bitte melden Sie sich an, um fortzufahren</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="bankId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank ID</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                          <Input
                            {...field}
                            placeholder="Geben Sie Ihre Bank ID ein"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passwort</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Geben Sie Ihr Passwort ein"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-teambank-blue hover:bg-blue-800"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Anmeldung..." : "Anmelden"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
