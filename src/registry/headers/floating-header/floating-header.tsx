import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FloatingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = ["Home", "Services", "About", "Contact"];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md",
                isScrolled ? "bg-white/90 shadow-md" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <h1 className="text-xl font-semibold text-gray-900">Cyphrr</h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    {navItems.map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="hover:text-blue-600 transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Action Button */}
                <div className="hidden md:block">
                    <Button variant="default" className="rounded-full px-5">
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-md hover:bg-gray-100"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white/95 shadow-lg border-t">
                    <nav className="flex flex-col items-center py-4 space-y-3 text-gray-800 font-medium">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-blue-600 transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                        <Button variant="default" className="rounded-full mt-2 px-5">
                            Get Started
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
