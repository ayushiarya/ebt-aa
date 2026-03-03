interface LoadingScreenProps {
  title: string;
  subtitle: string;
}

const LoadingScreen = ({ title, subtitle }: LoadingScreenProps) => {
  return (
    <div className="app-container flex flex-col">
      {/* Brand bar */}
      <div className="bg-primary px-4 py-3 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary-foreground/20 rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">A</span>
        </div>
        <span className="text-primary-foreground font-bold text-sm tracking-wide">
          <span className="opacity-80">open</span> | PERSONAL LOAN
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-16">
        {/* Dot loader */}
        <div className="dot-loader flex gap-2 mb-2">
          <span className="w-4 h-4 rounded-full bg-primary inline-block" />
          <span className="w-4 h-4 rounded-full bg-primary inline-block" />
          <span className="w-4 h-4 rounded-full bg-primary inline-block" />
        </div>
        {/* Shadows */}
        <div className="dot-shadow flex gap-2 mb-8">
          <span className="w-4 h-2 rounded-full bg-muted-foreground/20 inline-block" />
          <span className="w-4 h-2 rounded-full bg-muted-foreground/20 inline-block" />
          <span className="w-4 h-2 rounded-full bg-muted-foreground/20 inline-block" />
        </div>

        <h2 className="text-xl font-bold text-foreground text-center mb-3">{title}</h2>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
