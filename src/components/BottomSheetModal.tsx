import { X } from "lucide-react";
import { ReactNode } from "react";

interface BottomSheetModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheetModal = ({ open, onClose, children }: BottomSheetModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="relative w-full max-w-[390px] mx-auto">
        <div className="flex justify-center -mb-5 relative z-10">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center"
          >
            <X size={18} className="text-primary-foreground" />
          </button>
        </div>
        <div className="bg-card rounded-t-2xl p-6 pt-8 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomSheetModal;
