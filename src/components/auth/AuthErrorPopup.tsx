
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import Button from "@/components/common/Button";

interface AuthErrorPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTryAgain: () => void;
  errorMessage?: string;
}

const AuthErrorPopup: React.FC<AuthErrorPopupProps> = ({
  open,
  onOpenChange,
  onTryAgain,
  errorMessage = "Sign-in failed. Please try again.",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] rounded-xl border-none bg-red-500 p-6 shadow-lg">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-white/80 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <div className="mt-4 flex flex-col items-center gap-6">
          <h2 className="text-center text-lg font-bold text-white">
            {errorMessage}
          </h2>
          
          <Button
            onClick={() => {
              onOpenChange(false);
              onTryAgain();
            }}
            className="bg-white text-[#1A73E8] hover:bg-white/90"
          >
            Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthErrorPopup;
