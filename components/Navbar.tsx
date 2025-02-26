import { Github, Linkedin, Twitter } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="max-w-7xl mx-auto py-1 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href={""} className="flex items-center">
            <span className="text-2xl font-bold">AI Resume Builder</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm font-[400] text-foreground">Developed by</span>
            <div className="flex items-center space-x-3 ml-4">
              <Link
                href="https://x.com/Amitesh48256"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaXTwitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/DevDesignAmitesh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/amitesh-singh-504b2b281/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-3">
            <Link
              href="https://x.com/Amitesh48256"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaXTwitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/DevDesignAmitesh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/amitesh-singh-504b2b281/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;