
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileType, Upload, FileText, Image, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

export default function VerifyUploader() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationResult, setVerificationResult] = useState<'success' | 'tampered' | 'none'>('none');
  
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setVerificationResult('none');

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setVerificationResult('none');
    // If there's a file input element, reset its value
    const fileInput = document.getElementById('file-verify') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const getFileIcon = () => {
    if (!selectedFile) return <Upload className="h-10 w-10 text-shadow-accent mb-2" />;
    
    if (selectedFile.type.startsWith('image/')) {
      return <Image className="h-10 w-10 text-shadow-accent mb-2" />;
    } else if (selectedFile.type === 'application/pdf') {
      return <FileText className="h-10 w-10 text-shadow-accent mb-2" />;
    } else {
      return <FileType className="h-10 w-10 text-shadow-accent mb-2" />;
    }
  };

  const verifyFile = () => {
    if (!selectedFile) return;
    
    setVerifying(true);
    setVerificationProgress(0);
    
    // Simulate verification process
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        const newValue = prev + 10;
        if (newValue >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Random result for demo (in real app, you'd have actual verification logic)
            const result = Math.random() > 0.3 ? 'success' : 'tampered';
            setVerificationResult(result as 'success' | 'tampered');
            
            toast({
              title: result === 'success' 
                ? "Verification Successful" 
                : "Tampered Document Detected",
              description: result === 'success'
                ? "The document is authentic and hasn't been modified."
                : "This document appears to have been altered since watermarking.",
              variant: result === 'success' ? "default" : "destructive",
            });
            
            setVerifying(false);
          }, 500);
        }
        return newValue;
      });
    }, 200);
  };

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Verify Document</CardTitle>
        <CardDescription className="text-white/70">
          Upload a file to check its authenticity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] transition-colors duration-200 relative",
            dragActive ? "border-shadow-accent bg-shadow-accent/5" : "border-white/10",
            selectedFile ? "bg-white/5" : "",
            verifying ? "opacity-60" : ""
          )}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center text-center">
              {!verifying && (
                <button 
                  onClick={removeFile} 
                  className="absolute top-2 right-2 rounded-full bg-white/10 p-1 hover:bg-white/20 transition-colors"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="File preview" 
                  className="max-h-[180px] max-w-full object-contain mb-4 rounded-md"
                />
              ) : (
                getFileIcon()
              )}
              
              <span className="text-white font-medium">{selectedFile.name}</span>
              <span className="text-white/60 text-sm">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · {selectedFile.type}
              </span>
              
              {verifying && (
                <div className="mt-4 w-full">
                  <p className="text-shadow-accent mb-2">Verifying document...</p>
                  <Progress value={verificationProgress} className="h-2 bg-white/10" />
                </div>
              )}
              
              {verificationResult !== 'none' && (
                <div className={cn(
                  "mt-4 p-3 rounded-md w-full",
                  verificationResult === 'success' ? "bg-green-500/20 text-green-300" : "bg-shadow-danger/20 text-shadow-danger"
                )}>
                  <p className="font-medium">
                    {verificationResult === 'success' ? 'Document is authentic ✓' : 'Document has been tampered! ⚠'}
                  </p>
                  <p className="text-sm opacity-80">
                    {verificationResult === 'success' 
                      ? 'The watermark verification was successful.' 
                      : 'The watermark has been corrupted or removed.'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <Upload className="h-10 w-10 text-shadow-accent mb-2" />
              <p className="text-white font-medium mb-2">Drag and drop your file here</p>
              <p className="text-white/60 text-sm mb-4">or click to browse your files</p>
              <label htmlFor="file-verify">
                <Button variant="outline" className="border-shadow-accent/50 text-shadow-accent hover:bg-shadow-accent/10 hover:text-white cursor-pointer">
                  Select File
                </Button>
                <input 
                  id="file-verify" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept="image/*, application/pdf" 
                />
              </label>
            </div>
          )}
        </div>
      </CardContent>
      {selectedFile && !verifying && verificationResult === 'none' && (
        <CardFooter className="border-t border-white/10 bg-white/5 flex justify-end">
          <Button 
            onClick={verifyFile}
            className="bg-shadow-accent hover:bg-shadow-accent/90 text-white"
          >
            Verify Document
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
