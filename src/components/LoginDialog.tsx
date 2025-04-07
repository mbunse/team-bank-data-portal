
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Lock, Building } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const loginSchema = z.object({
  bankId: z.string().min(1, { message: "Bank ID wird benötigt" }),
  password: z.string().min(1, { message: "Passwort wird benötigt" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginDialogProps {
  open: boolean;
}

const LoginDialog = ({ open }: LoginDialogProps) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      bankId: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoggingIn(true);
    
    // Simulate login delay
    setTimeout(() => {
      login(data.bankId, data.password);
      setIsLoggingIn(false);
      toast({
        title: "Erfolgreich angemeldet",
        description: "Willkommen im TeamBank Data Portal",
      });
    }, 1000);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teambank-blue">
            TeamBank Data Portal
          </DialogTitle>
          <DialogDescription>
            Bitte melden Sie sich an, um fortzufahren
          </DialogDescription>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
