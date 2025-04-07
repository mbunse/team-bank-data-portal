
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadForm from '@/components/UploadForm';
import DownloadForm from '@/components/DownloadForm';
import PasswordForm from '@/components/PasswordForm';
import AbrufcodeDisplay from '@/components/AbrufcodeDisplay';
import LoginDialog from '@/components/LoginDialog';
import { useAuth } from '@/context/AuthContext';
import { Upload, Download, Key } from "lucide-react";

const Index = () => {
  const [abrufcode, setAbrufcode] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const handleUploadSuccess = (code: string) => {
    setAbrufcode(code);
  };

  const resetUpload = () => {
    setAbrufcode(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LoginDialog open={!isAuthenticated} />
      
      <Header />
      
      <main className="flex-grow py-8">
        <div className="teambank-container">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2 text-teambank-blue">Sandbox Vertriebspotential</h2>
            <p className="text-lg text-gray-600">
              Sandbox Service für die Berechnung der Vertriebspotentiale
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>Datenanlieferung</span>
                </TabsTrigger>
                <TabsTrigger value="download" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Rücklieferung</span>
                </TabsTrigger>
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <span>Passwort</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-6">
                <TabsContent value="upload">
                  {abrufcode ? (
                    <AbrufcodeDisplay abrufcode={abrufcode} onReset={resetUpload} />
                  ) : (
                    <UploadForm onSuccess={handleUploadSuccess} />
                  )}
                </TabsContent>
                
                <TabsContent value="download">
                  <DownloadForm />
                </TabsContent>
                
                <TabsContent value="password">
                  <PasswordForm />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
