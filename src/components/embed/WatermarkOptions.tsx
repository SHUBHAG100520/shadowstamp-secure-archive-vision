
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlignLeft, Image as ImageIcon, Link } from "lucide-react";

export default function WatermarkOptions() {
  const [watermarkType, setWatermarkType] = useState<string>("text");
  const [watermarkText, setWatermarkText] = useState<string>("");
  const [useBlockchain, setUseBlockchain] = useState<boolean>(true);
  const [useAR, setUseAR] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<string>("dct");
  const [arUrl, setArUrl] = useState<string>("");
  
  const handleSubmit = () => {
    console.log({
      watermarkType,
      watermarkText,
      useBlockchain,
      useAR,
      algorithm,
      arUrl
    });
    // This would connect to your watermarking service
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
              />
            </TabsContent>
            
            <TabsContent value="image" className="pt-4">
              <div className="border-2 border-dashed border-white/10 rounded-md p-4 text-center">
                <p className="text-white/70 mb-2">Upload an image to use as watermark</p>
                <Button variant="outline" className="border-shadow-accent/50 text-shadow-accent hover:bg-shadow-accent/10">
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
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-2">
          <Label>Watermarking Algorithm</Label>
          <RadioGroup defaultValue="dct" value={algorithm} onValueChange={setAlgorithm} className="flex space-x-4">
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
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-white/10 bg-white/5 flex justify-end">
        <Button 
          className="bg-shadow-accent hover:bg-shadow-accent/90 text-white"
          onClick={handleSubmit}
          disabled={watermarkType === "text" && !watermarkText}
        >
          Embed Watermark
        </Button>
      </CardFooter>
    </Card>
  );
}
