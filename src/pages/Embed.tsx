
import Navbar from "@/components/layout/Navbar";
import FileUploader from "@/components/embed/FileUploader";
import WatermarkOptions from "@/components/embed/WatermarkOptions";
import { useState } from "react";

const Embed = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <div className="min-h-screen bg-shadow">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-white">Embed Watermark</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FileUploader onFileSelected={handleFileSelected} />
          <WatermarkOptions />
        </div>
      </div>
    </div>
  );
};

export default Embed;
