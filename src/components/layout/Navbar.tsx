
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Shield,
  File,
  Lock,
  Menu,
  X,
  Layers,
  FileCheck
} from "lucide-react";
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-6 bg-shadow border-b border-white/5 shadow-sm">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-shadow-accent/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-shadow-accent" />
          </div>
          <span className="font-bold text-lg text-white">ShadowStamp</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/embed" className="text-sm text-white/80 hover:text-shadow-accent transition-colors flex items-center gap-1">
            <Layers className="h-4 w-4" />
            <span>Embed Watermark</span>
          </Link>
          <Link to="/verify" className="text-sm text-white/80 hover:text-shadow-accent transition-colors flex items-center gap-1">
            <FileCheck className="h-4 w-4" />
            <span>Verify File</span>
          </Link>
          <Link to="/dashboard" className="text-sm text-white/80 hover:text-shadow-accent transition-colors flex items-center gap-1">
            <File className="h-4 w-4" />
            <span>My Files</span>
          </Link>
          <Button variant="outline" className="ml-4 border-shadow-accent/30 text-shadow-accent hover:border-shadow-accent bg-transparent">
            <Lock className="h-4 w-4 mr-2" /> Secure Login
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white/80 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-shadow shadow-lg z-50 border-b border-white/5">
          <div className="container flex flex-col py-4 space-y-3">
            <Link 
              to="/embed" 
              className="flex items-center gap-2 p-3 hover:bg-white/5 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <Layers className="h-5 w-5 text-shadow-accent" />
              <span>Embed Watermark</span>
            </Link>
            <Link 
              to="/verify" 
              className="flex items-center gap-2 p-3 hover:bg-white/5 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileCheck className="h-5 w-5 text-shadow-accent" />
              <span>Verify File</span>
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 p-3 hover:bg-white/5 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <File className="h-5 w-5 text-shadow-accent" />
              <span>My Files</span>
            </Link>
            <Button 
              variant="outline" 
              className="border-shadow-accent/30 text-shadow-accent hover:border-shadow-accent bg-transparent mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Lock className="h-4 w-4 mr-2" /> Secure Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
