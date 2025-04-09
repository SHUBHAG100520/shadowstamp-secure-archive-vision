
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Qr, Smartphone, Camera, Play, ArrowRight } from "lucide-react";
import { Button } from '@/components/ui/button';

interface ARPreviewProps {
  arUrl?: string;
  isActive: boolean;
}

export default function ARPreview({ arUrl, isActive }: ARPreviewProps) {
  const [step, setStep] = useState<number>(1);
  
  if (!isActive) return null;
  
  return (
    <Card className="bg-white/5 border-white/10 mt-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          AR Preview Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {step === 1 && (
            <div className="text-center space-y-4">
              <div className="bg-black/20 rounded-xl p-8 flex justify-center">
                <div className="p-4 bg-white rounded-lg inline-block">
                  <Qr className="h-20 w-20 text-black" />
                </div>
              </div>
              <p className="text-white/70">Scan this QR code with the ShadowStamp mobile app</p>
              <Button onClick={() => setStep(2)} className="bg-shadow-accent hover:bg-shadow-accent/90">
                Simulate Scan <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
          
          {step === 2 && (
            <div className="text-center space-y-4">
              <div className="bg-black/20 rounded-xl p-8 flex justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20"></div>
                <Camera className="h-20 w-20 text-white/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-1 bg-shadow-accent/80 animate-pulse"></div>
                </div>
              </div>
              <p className="text-white/70">Point your camera at the watermarked document</p>
              <Button onClick={() => setStep(3)} className="bg-shadow-accent hover:bg-shadow-accent/90">
                Detect Watermark <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
          
          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="bg-black/20 rounded-xl p-8 flex justify-center items-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-shadow-accent/20 rounded-full animate-ping"></div>
                  <Play className="h-20 w-20 text-shadow-accent" />
                </div>
              </div>
              <p className="text-white/70">
                {arUrl ? (
                  <>AR content detected: <span className="text-shadow-accent">{arUrl}</span></>
                ) : (
                  'AR content ready to play'
                )}
              </p>
              <Button onClick={() => setStep(1)} className="bg-shadow-accent hover:bg-shadow-accent/90">
                Reset Preview
              </Button>
            </div>
          )}
          
          <div className="flex justify-center mt-4">
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`h-1.5 w-6 rounded-full ${step === i ? 'bg-shadow-accent' : 'bg-white/20'}`}
                  onClick={() => setStep(i)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
