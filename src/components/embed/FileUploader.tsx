
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileType, X, Image, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
}

export default function FileUploader({ onFileSelected }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
    onFileSelected(file);

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
    // If there's a file input element, reset its value
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
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

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Upload File</CardTitle>
        <CardDescription className="text-white/70">
          Select an image or PDF file to embed a watermark
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] transition-colors duration-200",
            dragActive ? "border-shadow-accent bg-shadow-accent/5" : "border-white/10",
            selectedFile ? "bg-white/5" : ""
          )}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center text-center">
              <button 
                onClick={removeFile} 
                className="absolute top-2 right-2 rounded-full bg-white/10 p-1 hover:bg-white/20 transition-colors"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
              
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
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <Upload className="h-10 w-10 text-shadow-accent mb-2" />
              <p className="text-white font-medium mb-2">Drag and drop your file here</p>
              <p className="text-white/60 text-sm mb-4">or click to browse your files</p>
              <label htmlFor="file-upload">
                <Button variant="outline" className="border-shadow-accent/50 text-shadow-accent hover:bg-shadow-accent/10 hover:text-white cursor-pointer">
                  Select File
                </Button>
                <input 
                  id="file-upload" 
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
      {selectedFile && (
        <CardFooter className="border-t border-white/10 bg-white/5 flex justify-end">
          <Button onClick={() => console.log("Processing file:", selectedFile)}>
            Continue
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
