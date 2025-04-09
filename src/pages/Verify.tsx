
import Navbar from "@/components/layout/Navbar";
import VerifyUploader from "@/components/verify/VerifyUploader";

const Verify = () => {
  return (
    <div className="min-h-screen bg-shadow">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-white">Verify Document</h1>
        
        <div className="max-w-2xl mx-auto">
          <VerifyUploader />
        </div>
      </div>
    </div>
  );
};

export default Verify;
