import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppHeaderProps {
  title: string;
  onClose?: () => void;
  showBack?: boolean;
}

const AppHeader = ({ title, onClose, showBack = false }: AppHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Brand bar */}
      <div className="bg-primary px-4 py-3 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary-foreground/20 rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">A</span>
        </div>
        <span className="text-primary-foreground font-bold text-sm tracking-wide">
          <span className="opacity-80">open</span> | PERSONAL LOAN
        </span>
      </div>
      {/* Page header */}
      <div className="px-4 py-4 flex items-center gap-3 border-b border-border">
        <button
          onClick={onClose || (() => navigate(-1))}
          className="p-1 -ml-1 text-foreground"
        >
          {showBack ? <ArrowLeft size={20} /> : <X size={20} />}
        </button>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>
    </>
  );
};

export default AppHeader;
