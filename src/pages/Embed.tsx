
import Navbar from "@/components/layout/Navbar";
import FileUploader from "@/components/embed/FileUploader";
import WatermarkOptions from "@/components/embed/WatermarkOptions";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Embed = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [watermarkApplied, setWatermarkApplied] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setWatermarkApplied(false);
  };

  const handleWatermarkApplied = (options: any) => {
    // In a real implementation, this would call an API to process the file
    console.log("Processing file with options:", options);
    console.log("Selected file:", selectedFile);
    
    // Simulate processing delay
    setTimeout(() => {
      setWatermarkApplied(true);
      toast({
        title: "Watermark Applied Successfully",
        description: "Your file has been processed and watermarked.",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-shadow">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-white">Embed Watermark</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FileUploader 
            onFileSelected={handleFileSelected} 
            watermarkApplied={watermarkApplied}
          />
          <WatermarkOptions 
            onApply={handleWatermarkApplied} 
            disabled={!selectedFile} 
            selectedFile={selectedFile}
          />
        </div>
      </div>
    </div>
  );
};

export default Embed;
