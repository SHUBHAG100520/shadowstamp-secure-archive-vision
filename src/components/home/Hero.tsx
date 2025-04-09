
import { Button } from "@/components/ui/button";
import { Shield, FileImage, Database, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative overflow-hidden py-20 sm:py-32 bg-gradient-to-b from-shadow to-shadow/95">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-shadow-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 bg-shadow-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center justify-center p-2 bg-shadow-accent/10 rounded-full">
            <Shield className="h-6 w-6 text-shadow-accent" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Invisible Security, <span className="text-shadow-accent">Visible Protection</span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/70">
            Secure your digital assets with advanced watermarking technology. Embed hidden data in your files that only you can verify, protected by blockchain and augmented reality.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-shadow-accent hover:bg-shadow-accent/90 text-white">
              <Link to="/embed">
                Embed Watermark <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/10 hover:bg-white/5">
              <Link to="/verify">
                Verify Document
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 p-6 rounded-lg border border-white/5 hover:shadow-glow transition-shadow duration-300">
            <div className="h-12 w-12 rounded-lg bg-shadow-accent/10 flex items-center justify-center mb-4">
              <FileImage className="h-6 w-6 text-shadow-accent" />
            </div>
            <h3 className="text-xl font-medium text-white">DCT & DWT Watermarking</h3>
            <p className="mt-2 text-white/70">
              Embed invisible watermarks using advanced digital signal processing techniques that resist tampering.
            </p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg border border-white/5 hover:shadow-glow transition-shadow duration-300">
            <div className="h-12 w-12 rounded-lg bg-shadow-accent/10 flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-shadow-accent" />
            </div>
            <h3 className="text-xl font-medium text-white">Blockchain Verification</h3>
            <p className="mt-2 text-white/70">
              Each watermarked file receives an immutable blockchain record, creating a permanent verification chain.
            </p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg border border-white/5 hover:shadow-glow transition-shadow duration-300">
            <div className="h-12 w-12 rounded-lg bg-shadow-accent/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-shadow-accent" />
            </div>
            <h3 className="text-xl font-medium text-white">AR-Enhanced Security</h3>
            <p className="mt-2 text-white/70">
              Verify and view hidden AR content within your secured files for next-level protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
