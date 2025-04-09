
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlignLeft, Image as ImageIcon, Link, Loader2, Smartphone } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Progress } from "@/components/ui/progress";

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
  const [processStage, setProcessStage] = useState<string>("");
  const [processProgress, setProcessProgress] = useState<number>(0);
  const [visualizationData, setVisualizationData] = useState<any[]>([]);
  
  // Reset form when file changes
  useEffect(() => {
    if (!selectedFile) {
      setBlockchainTxHash("");
      setProcessProgress(0);
      setProcessStage("");
    }
  }, [selectedFile]);

  // Generate visualization data based on selected algorithm
  useEffect(() => {
    if (selectedFile && algorithm) {
      // Simulate algorithm visualization data based on selected algorithm
      if (algorithm === "dct") {
        setVisualizationData([
          { name: 'Low Freq', original: 85, watermarked: 80 },
          { name: 'Mid Freq', original: 55, watermarked: 65 },
          { name: 'High Freq', original: 40, watermarked: 45 },
        ]);
      } else if (algorithm === "dwt") {
        setVisualizationData([
          { name: 'LL', original: 90, watermarked: 88 },
          { name: 'LH', original: 45, watermarked: 52 },
          { name: 'HL', original: 42, watermarked: 48 },
          { name: 'HH', original: 30, watermarked: 35 },
        ]);
      }
    }
  }, [algorithm, selectedFile]);

  const handleSubmit = () => {
    if (disabled || !selectedFile) return;
    
    setProcessing(true);
    setProcessProgress(0);
    setProcessStage("Analyzing file structure");
    
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
    
    // Simulate watermarking process with stages
    const simulateProcess = () => {
      const stages = [
        { name: "Analyzing file structure", progress: 10 },
        { name: "Preparing for watermark embedding", progress: 25 },
        { name: `Applying ${algorithm.toUpperCase()} transformation`, progress: 40 },
        { name: "Embedding watermark signature", progress: 60 },
        { name: "Verifying data integrity", progress: 75 },
        { name: "Finalizing watermarked document", progress: 90 }
      ];

      let currentIndex = 0;
      
      const processInterval = setInterval(() => {
        if (currentIndex < stages.length) {
          const stage = stages[currentIndex];
          setProcessStage(stage.name);
          setProcessProgress(stage.progress);
          currentIndex++;
        } else {
          clearInterval(processInterval);
          
          // If blockchain is enabled, simulate blockchain registration
          if (useBlockchain) {
            setProcessStage("Recording to blockchain");
            setProcessProgress(95);
            
            setTimeout(() => {
              const fakeHash = "0x" + Math.random().toString(16).substring(2, 10) + 
                              Math.random().toString(16).substring(2, 10) +
                              Math.random().toString(16).substring(2, 10);
              setBlockchainTxHash(fakeHash);
              setProcessStage("Watermark embedding complete");
              setProcessProgress(100);
              
              // Complete the process
              setTimeout(() => {
                onApply(options);
                setProcessing(false);
              }, 500);
            }, 1500);
          } else {
            setProcessStage("Watermark embedding complete");
            setProcessProgress(100);
            
            // Complete the process
            setTimeout(() => {
              onApply(options);
              setProcessing(false);
            }, 500);
          }
        }
      }, 800);
    };
    
    // Start the simulation after a short delay
    setTimeout(simulateProcess, 500);
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
                <label htmlFor="watermark-image-upload">
                  <Button variant="outline" className="border-shadow-accent/50 text-shadow-accent hover:bg-shadow-accent/10" disabled={disabled || processing}>
                    <ImageIcon className="h-4 w-4 mr-2" /> Select Image
                  </Button>
                  <input 
                    id="watermark-image-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    disabled={disabled || processing}
                  />
                </label>
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
        
        {selectedFile && visualizationData.length > 0 && (
          <div className="space-y-2 pt-2">
            <Label className="text-white/90">Algorithm Visualization</Label>
            <div className="bg-white/5 rounded-md p-2 h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={visualizationData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#aaa" fontSize={12} />
                  <YAxis stroke="#aaa" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ background: '#222', border: '1px solid #444', borderRadius: '4px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="original" fill="#8884d8" name="Original" />
                  <Bar dataKey="watermarked" fill="#82ca9d" name="Watermarked" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-white/60">
              {algorithm === 'dct' 
                ? 'DCT transforms the image into frequency components where watermarks can be hidden in mid-frequency coefficients.'
                : 'DWT decomposes the image into different frequency subbands where watermarks can be embedded with minimal visual impact.'}
            </p>
          </div>
        )}
        
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

        {useAR && (
          <div className="mt-2 p-3 bg-shadow-accent/10 border border-shadow-accent/20 rounded-md">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-shadow-accent" />
              <Label className="text-white/90">AR Preview</Label>
            </div>
            <p className="text-sm text-white/70 mt-1">
              AR content will be attached to your watermark, visible when scanned with the ShadowStamp AR app.
            </p>
            {watermarkType === 'link' && arUrl && (
              <div className="mt-2 p-2 bg-black/30 rounded border border-white/10 text-xs">
                <span className="text-green-400">✓</span> AR link ready: {arUrl}
              </div>
            )}
          </div>
        )}

        {processing && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/80">{processStage}</span>
              <span className="text-sm text-white/80">{processProgress}%</span>
            </div>
            <Progress value={processProgress} className="h-2 bg-white/10" indicatorClassName="bg-shadow-accent" />
          </div>
        )}

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
              {processStage}
            </>
          ) : (
            "Embed Watermark"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
