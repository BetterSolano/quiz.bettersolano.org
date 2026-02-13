import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Solano, Nueva Vizcaya, Philippines</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>
              &copy; {new Date().getFullYear()}{" "}
              <a
                href="https://www.bettersolano.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-foreground transition-colors"
              >
                BetterSolano.org
              </a>{" "}
              MIT | CC BY 4.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
