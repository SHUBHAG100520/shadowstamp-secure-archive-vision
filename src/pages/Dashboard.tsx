
import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, FileImage, FilePdf, Calendar, Download, Eye, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<number | null>(null);

  // Mock data for demo
  const files = [
    { 
      id: 1, 
      name: "Company_Logo_Protected.png", 
      type: "image/png", 
      date: "2025-04-01", 
      size: "1.2 MB", 
      watermarkType: "text",
      watermarkData: "© 2025 Company Name - All Rights Reserved",
      blockchain: true,
      ar: false
    },
    { 
      id: 2, 
      name: "Contract_Final_Signed.pdf", 
      type: "application/pdf", 
      date: "2025-04-03", 
      size: "2.8 MB", 
      watermarkType: "text",
      watermarkData: "Legal Document ID: 20250403-A7B25",
      blockchain: true,
      ar: false
    },
    { 
      id: 3, 
      name: "Product_Brochure.pdf", 
      type: "application/pdf", 
      date: "2025-04-05", 
      size: "4.5 MB", 
      watermarkType: "image",
      watermarkData: "Company Logo Watermark",
      blockchain: true,
      ar: true
    },
    { 
      id: 4, 
      name: "Team_Photo.jpg", 
      type: "image/jpeg", 
      date: "2025-04-07", 
      size: "3.1 MB", 
      watermarkType: "link",
      watermarkData: "https://example.com/ar-content",
      blockchain: true,
      ar: true
    },
  ];

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <FileImage className="h-5 w-5" />;
    } else if (type === 'application/pdf') {
      return <FilePdf className="h-5 w-5" />;
    } else {
      return <File className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-shadow">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-white">My Secured Files</h1>
        
        <Card className="bg-white/5 border-white/10">
          <Tabs defaultValue="all">
            <div className="border-b border-white/10">
              <div className="px-4">
                <TabsList className="bg-transparent border-b-0">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-transparent data-[state=active]:text-shadow-accent data-[state=active]:border-b-2 data-[state=active]:border-shadow-accent rounded-none"
                  >
                    All Files
                  </TabsTrigger>
                  <TabsTrigger 
                    value="images" 
                    className="data-[state=active]:bg-transparent data-[state=active]:text-shadow-accent data-[state=active]:border-b-2 data-[state=active]:border-shadow-accent rounded-none"
                  >
                    Images
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pdfs" 
                    className="data-[state=active]:bg-transparent data-[state=active]:text-shadow-accent data-[state=active]:border-b-2 data-[state=active]:border-shadow-accent rounded-none"
                  >
                    PDFs
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ar" 
                    className="data-[state=active]:bg-transparent data-[state=active]:text-shadow-accent data-[state=active]:border-b-2 data-[state=active]:border-shadow-accent rounded-none"
                  >
                    AR Enhanced
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* File List */}
                <div className="lg:col-span-1 border-r border-white/10">
                  <TabsContent value="all" className="m-0">
                    <div className="divide-y divide-white/10">
                      {files.map(file => (
                        <div 
                          key={file.id}
                          onClick={() => setSelectedFile(file.id)}
                          className={cn(
                            "flex items-center p-4 cursor-pointer hover:bg-white/5 transition-colors",
                            selectedFile === file.id ? "bg-white/5 border-l-2 border-shadow-accent" : ""
                          )}
                        >
                          <div className="mr-3 text-shadow-accent">
                            {getFileIcon(file.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{file.name}</p>
                            <div className="flex items-center text-xs text-white/60">
                              <span className="mr-2">{file.size}</span>
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{file.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="images" className="m-0">
                    <div className="divide-y divide-white/10">
                      {files.filter(f => f.type.startsWith('image/')).map(file => (
                        <div 
                          key={file.id}
                          onClick={() => setSelectedFile(file.id)}
                          className={cn(
                            "flex items-center p-4 cursor-pointer hover:bg-white/5 transition-colors",
                            selectedFile === file.id ? "bg-white/5 border-l-2 border-shadow-accent" : ""
                          )}
                        >
                          <div className="mr-3 text-shadow-accent">
                            <FileImage className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{file.name}</p>
                            <div className="flex items-center text-xs text-white/60">
                              <span className="mr-2">{file.size}</span>
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{file.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pdfs" className="m-0">
                    <div className="divide-y divide-white/10">
                      {files.filter(f => f.type === 'application/pdf').map(file => (
                        <div 
                          key={file.id}
                          onClick={() => setSelectedFile(file.id)}
                          className={cn(
                            "flex items-center p-4 cursor-pointer hover:bg-white/5 transition-colors",
                            selectedFile === file.id ? "bg-white/5 border-l-2 border-shadow-accent" : ""
                          )}
                        >
                          <div className="mr-3 text-shadow-accent">
                            <FilePdf className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{file.name}</p>
                            <div className="flex items-center text-xs text-white/60">
                              <span className="mr-2">{file.size}</span>
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{file.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ar" className="m-0">
                    <div className="divide-y divide-white/10">
                      {files.filter(f => f.ar).map(file => (
                        <div 
                          key={file.id}
                          onClick={() => setSelectedFile(file.id)}
                          className={cn(
                            "flex items-center p-4 cursor-pointer hover:bg-white/5 transition-colors",
                            selectedFile === file.id ? "bg-white/5 border-l-2 border-shadow-accent" : ""
                          )}
                        >
                          <div className="mr-3 text-shadow-accent">
                            {getFileIcon(file.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{file.name}</p>
                            <div className="flex items-center text-xs text-white/60">
                              <span className="mr-2">{file.size}</span>
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{file.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </div>
                
                {/* File Preview & Details */}
                <div className="lg:col-span-2 p-6">
                  {selectedFile ? (
                    <>
                      {files.find(f => f.id === selectedFile)?.type.startsWith('image/') ? (
                        <div className="flex justify-center mb-6">
                          <div className="relative">
                            <img 
                              src="https://via.placeholder.com/600x400" 
                              alt={files.find(f => f.id === selectedFile)?.name} 
                              className="max-h-[300px] object-contain rounded-md border border-white/10" 
                            />
                            <div className="absolute top-2 right-2 bg-shadow-accent/80 text-xs px-2 py-1 rounded text-white">
                              Protected
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center mb-6">
                          <div className="relative">
                            <div className="h-[300px] w-[220px] bg-white/5 border border-white/10 rounded-md flex items-center justify-center">
                              <FilePdf className="h-16 w-16 text-white/20" />
                            </div>
                            <div className="absolute top-2 right-2 bg-shadow-accent/80 text-xs px-2 py-1 rounded text-white">
                              Protected
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h3 className="text-xl font-medium text-white mb-4">
                          {files.find(f => f.id === selectedFile)?.name}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/5 p-4 rounded-md border border-white/10">
                            <h4 className="text-sm font-medium text-white/70 mb-2">Watermark Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-white/60">Type:</span>
                                <span className="text-white">
                                  {files.find(f => f.id === selectedFile)?.watermarkType}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">Content:</span>
                                <span className="text-white truncate max-w-[180px]">
                                  {files.find(f => f.id === selectedFile)?.watermarkData}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">Blockchain:</span>
                                <span className="text-white">
                                  {files.find(f => f.id === selectedFile)?.blockchain ? "Enabled" : "Disabled"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">AR Enhanced:</span>
                                <span className="text-white">
                                  {files.find(f => f.id === selectedFile)?.ar ? "Yes" : "No"}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white/5 p-4 rounded-md border border-white/10">
                            <h4 className="text-sm font-medium text-white/70 mb-2">File Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-white/60">Size:</span>
                                <span className="text-white">
                                  {files.find(f => f.id === selectedFile)?.size}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">Date Added:</span>
                                <span className="text-white">
                                  {files.find(f => f.id === selectedFile)?.date}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/60">Type:</span>
                                <span className="text-white">
                                  {files.find(f => f.id === selectedFile)?.type}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button className="bg-shadow-accent hover:bg-shadow-accent/90 flex-1">
                            <Download className="h-4 w-4 mr-2" /> Download
                          </Button>
                          <Button variant="outline" className="border-white/10 flex-1">
                            <Eye className="h-4 w-4 mr-2" /> View Blockchain Record
                          </Button>
                          {files.find(f => f.id === selectedFile)?.ar && (
                            <Button variant="outline" className="border-white/10 flex-1">
                              <Info className="h-4 w-4 mr-2" /> View AR Content
                            </Button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <File className="h-16 w-16 text-white/20 mb-4" />
                      <h3 className="text-xl font-medium text-white/80">No File Selected</h3>
                      <p className="text-white/60 mt-2 max-w-md">
                        Select a file from the list to view details and manage your watermarked content
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
