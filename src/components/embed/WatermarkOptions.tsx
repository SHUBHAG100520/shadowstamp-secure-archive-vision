
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlignLeft, Image as ImageIcon, Link, Loader2 } from "lucide-react";

interface WatermarkOptionsProps {
  onApply: (options: any) => void;
  disabled?: boolean;
  selectedFile: File | null;
}

export default function WatermarkOptions({ onApply, disabled = false, selectedFile }: WatermarkOptionsProps) {
  const [watermarkType, setWatermarkType] = useState<string>("text");
  const [watermarkText, setWatermarkText] = useState<string>("");
  const [useBlockchain, setUseBlockchain] = useState<boolean>(true);
  const [useAR, setUseAR] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<string>("dct");
  const [arUrl, setArUrl] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [blockchainTxHash, setBlockchainTxHash] = useState<string>("");
  
  // Reset form when file changes
  useEffect(() => {
    if (!selectedFile) {
      setBlockchainTxHash("");
    }
  }, [selectedFile]);

  const handleSubmit = () => {
    if (disabled || !selectedFile) return;
    
    setProcessing(true);
    
    const options = {
      watermarkType,
      watermarkText: watermarkType === "text" ? watermarkText : "",
      algorithm,
      useBlockchain,
      useAR,
      arUrl: watermarkType === "link" ? arUrl : "",
      fileName: selectedFile.name,
      fileType: selectedFile.type
    };
    
    // Simulate blockchain transaction
    if (useBlockchain) {
      console.log("Initiating blockchain transaction...");
      setTimeout(() => {
        const fakeHash = "0x" + Math.random().toString(16).substring(2, 10) + 
                        Math.random().toString(16).substring(2, 10) +
                        Math.random().toString(16).substring(2, 10);
        setBlockchainTxHash(fakeHash);
        
        // Now apply watermark
        setTimeout(() => {
          onApply(options);
          setProcessing(false);
        }, 1000);
      }, 1500);
    } else {
      // Just apply watermark without blockchain
      setTimeout(() => {
        onApply(options);
        setProcessing(false);
      }, 1200);
    }
  };

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Watermark Options</CardTitle>
        <CardDescription className="text-white/70">
          Configure how you want to secure your file
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Watermark Type</Label>
          <Tabs defaultValue="text" value={watermarkType} onValueChange={setWatermarkType}>
            <TabsList className="bg-white/10 border border-white/5">
              <TabsTrigger value="text" className="data-[state=active]:bg-shadow-accent">
                <AlignLeft className="h-4 w-4 mr-2" /> Text
              </TabsTrigger>
              <TabsTrigger value="image" className="data-[state=active]:bg-shadow-accent">
                <ImageIcon className="h-4 w-4 mr-2" /> Image
              </TabsTrigger>
              <TabsTrigger value="link" className="data-[state=active]:bg-shadow-accent">
                <Link className="h-4 w-4 mr-2" /> Link
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="pt-4">
              <Textarea 
                placeholder="Enter the text you want to embed as watermark" 
                className="bg-white/5 border-white/10 focus-visible:ring-shadow-accent"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                disabled={disabled || processing}
              />
            </TabsContent>
            
            <TabsContent value="image" className="pt-4">
              <div className="border-2 border-dashed border-white/10 rounded-md p-4 text-center">
                <p className="text-white/70 mb-2">Upload an image to use as watermark</p>
                <Button variant="outline" className="border-shadow-accent/50 text-shadow-accent hover:bg-shadow-accent/10" disabled={disabled || processing}>
                  <ImageIcon className="h-4 w-4 mr-2" /> Select Image
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="link" className="pt-4">
              <Input 
                placeholder="Enter URL (https://...)" 
                className="bg-white/5 border-white/10 focus-visible:ring-shadow-accent"
                value={arUrl}
                onChange={(e) => setArUrl(e.target.value)}
                disabled={disabled || processing}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-2">
          <Label>Watermarking Algorithm</Label>
          <RadioGroup defaultValue="dct" value={algorithm} onValueChange={setAlgorithm} className="flex space-x-4" disabled={disabled || processing}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dct" id="dct" />
              <Label htmlFor="dct">DCT (Discrete Cosine Transform)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dwt" id="dwt" />
              <Label htmlFor="dwt">DWT (Discrete Wavelet Transform)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="blockchain" className="block">Blockchain Verification</Label>
              <p className="text-sm text-white/60">Record watermark hash on blockchain</p>
            </div>
            <Switch 
              id="blockchain" 
              checked={useBlockchain} 
              onCheckedChange={setUseBlockchain}
              className="data-[state=checked]:bg-shadow-accent"
              disabled={disabled || processing}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="ar" className="block">AR Enhancement</Label>
              <p className="text-sm text-white/60">Add augmented reality experience</p>
            </div>
            <Switch 
              id="ar" 
              checked={useAR} 
              onCheckedChange={setUseAR}
              className="data-[state=checked]:bg-shadow-accent"
              disabled={disabled || processing}
            />
          </div>
        </div>

        {blockchainTxHash && (
          <div className="mt-4 p-3 bg-shadow-accent/10 border border-shadow-accent/20 rounded-md">
            <Label className="text-white/90">Blockchain Transaction</Label>
            <div className="flex items-center mt-1">
              <code className="text-xs text-white/70 bg-white/5 p-1 rounded-md flex-1 overflow-hidden text-ellipsis">
                {blockchainTxHash}
              </code>
              <Button variant="ghost" size="sm" className="ml-2 h-7 px-2">
                <Link className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-white/10 bg-white/5 flex justify-end">
        <Button 
          className="bg-shadow-accent hover:bg-shadow-accent/90 text-white"
          onClick={handleSubmit}
          disabled={disabled || processing || (watermarkType === "text" && !watermarkText) || (watermarkType === "link" && !arUrl)}
        >
          {processing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {useBlockchain ? "Recording on Blockchain..." : "Embedding Watermark..."}
            </>
          ) : (
            "Embed Watermark"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
