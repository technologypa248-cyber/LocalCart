import { Logo } from "@/components/icons";
import { Github, Twitter } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Logo className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by LocalCart. &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5 hover:text-primary transition-colors"/>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="h-5 w-5 hover:text-primary transition-colors"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
