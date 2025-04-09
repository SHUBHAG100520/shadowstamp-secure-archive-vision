
import Navbar from "@/components/layout/Navbar";
import FileUploader from "@/components/embed/FileUploader";
import WatermarkOptions from "@/components/embed/WatermarkOptions";
import ARPreview from "@/components/embed/ARPreview";
import StatisticsGraph from "@/components/embed/StatisticsGraph";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Embed = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [watermarkApplied, setWatermarkApplied] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [watermarkData, setWatermarkData] = useState<any>(null);
  const { toast } = useToast();

  const handleFileSelected = (file: File) => {
    console.log("File selected:", file);
    setSelectedFile(file);
    setWatermarkApplied(false);
    setDownloadUrl(null);
  };

  const handleWatermarkApplied = (options: any) => {
    // In a real implementation, this would call an API to process the file
    console.log("Processing file with options:", options);
    console.log("Selected file:", selectedFile);
    
    setWatermarkData(options);
    
    // Generate a fake download URL for demonstration
    if (selectedFile) {
      // For image files, create a demo watermarked version
      if (selectedFile.type.startsWith('image/')) {
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            // Draw original image
            ctx.drawImage(img, 0, 0);
            
            // Add a subtle visual indicator for the demo
            ctx.fillStyle = 'rgba(120, 200, 255, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Create watermark text
            if (options.watermarkType === 'text' && options.watermarkText) {
              ctx.font = '20px Arial';
              ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'; // Very subtle watermark
              ctx.fillText(options.watermarkText, 20, 40);
            }
            
            // Generate data URL
            const dataUrl = canvas.toDataURL(selectedFile.type);
            setDownloadUrl(dataUrl);
          }
        };
        
        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(selectedFile);
      } else {
        // For non-image files, just create a fake download URL
        setDownloadUrl(URL.createObjectURL(selectedFile));
      }
    }
    
    // Show success notification
    toast({
      title: "Watermark Applied Successfully",
      description: "Your file has been processed and watermarked.",
      variant: "default",
    });
    
    setWatermarkApplied(true);
  };

  return (
    <div className="min-h-screen bg-shadow">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-white">Embed Watermark</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FileUploader 
              onFileSelected={handleFileSelected} 
              watermarkApplied={watermarkApplied}
              downloadUrl={downloadUrl || undefined}
            />
            {watermarkData?.useAR && (
              <ARPreview 
                isActive={watermarkApplied} 
                arUrl={watermarkData?.watermarkType === 'link' ? watermarkData.arUrl : undefined} 
              />
            )}
          </div>
          <WatermarkOptions 
            onApply={handleWatermarkApplied} 
            disabled={!selectedFile} 
            selectedFile={selectedFile}
          />
        </div>
        
        {watermarkApplied && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-white">File Security Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <StatisticsGraph algorithm={watermarkData?.algorithm || 'dct'} />
              
              {watermarkData && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg font-medium mb-4 text-white">Watermark Details</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-white/70">Algorithm:</div>
                      <div className="text-white font-medium">
                        {watermarkData.algorithm === 'dct' ? 'Discrete Cosine Transform' : 'Discrete Wavelet Transform'}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-white/70">Watermark Type:</div>
                      <div className="text-white font-medium capitalize">{watermarkData.watermarkType}</div>
                    </div>
                    {watermarkData.watermarkType === 'text' && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-white/70">Embedded Text:</div>
                        <div className="text-white font-medium">{watermarkData.watermarkText}</div>
                      </div>
                    )}
                    {watermarkData.watermarkType === 'link' && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-white/70">AR Link:</div>
                        <div className="text-white font-medium overflow-hidden text-ellipsis">{watermarkData.arUrl}</div>
                      </div>
                    )}
                    {watermarkData.useBlockchain && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-white/70">Blockchain Protected:</div>
                        <div className="text-white font-medium">Yes</div>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-white/70">File Type:</div>
                      <div className="text-white font-medium">{watermarkData.fileType}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-white/70">AR Enhanced:</div>
                      <div className="text-white font-medium">{watermarkData.useAR ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Embed;
