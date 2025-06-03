import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Database, Menu, X, LayoutDashboard, FileSearch, LineChart, Settings, HelpCircle, LogIn, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext"; // Import useTheme

const navLinks = [
  { to: "/", label: "Início", icon: LayoutDashboard },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/consultas", label: "Consultas", icon: FileSearch },
  { to: "/visualizacoes", label: "Visualizações", icon: LineChart },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
  { to: "/ajuda", label: "Ajuda", icon: HelpCircle },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { theme } = useTheme(); // Get current theme

  const NavLinkItem = ({ to, label, icon: Icon, mobile = false, variant = "default" }) => {
    const isActive = location.pathname === to;
    let className = `flex items-center gap-2 text-sm font-medium transition-colors ${
      isActive ? "text-purple-400" : "hover:text-purple-400"
    } ${mobile ? "px-2 py-2" : ""}`;

    if (mobile) {
      // For mobile, we want simpler buttons without the purple gradient unless primary
      if (variant === "outline") {
        return (
          <Link to={to} onClick={() => setIsMenuOpen(false)} className="block">
            <Button variant="outline" className="w-full border-border hover:bg-accent">
              <Icon className="mr-2 h-4 w-4" /> {label}
            </Button>
          </Link>
        );
      } else if (variant === "primary") { // Keeping a primary variant for "Cadastrar" if needed
         return (
          <Link to={to} onClick={() => setIsMenuOpen(false)} className="block">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
             <Icon className="mr-2 h-4 w-4" /> {label}
            </Button>
          </Link>
        );
      } else { // Default mobile link style (simple text based)
        return (
           <Link
            to={to}
            className={`flex items-center gap-2 text-sm font-medium transition-colors w-full px-2 py-3 rounded-md hover:bg-accent ${isActive ? "text-purple-400 bg-accent" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        )
      }
    }

    // Desktop NavLink
    return (
      <Link
        to={to}
        className={className}
      >
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    );
  };

  return (
    <header className={`w-full py-4 px-6 border-b backdrop-blur-sm sticky top-0 z-40 ${theme === 'dark' ? 'bg-background/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <Link to="/" className="flex items-center gap-2">
            <Database className="h-6 w-6 text-purple-500" />
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-gradient' : 'text-purple-600'}`}>DataVista</span>
          </Link>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="hidden md:flex items-center gap-6"
        >
          {navLinks.filter(link => link.to !== "/").map(link => (
            <NavLinkItem key={link.to} {...link} />
          ))}
        </motion.nav>
        
        {/* Auth buttons shifted to the left part of the right section */}
        <div className="flex items-center gap-3">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex items-center gap-3"
          >
            <Link to="/login">
              <Button variant="outline" className={`${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}>Entrar</Button>
            </Link>
            <Link to="/registrar">
               <Button className={`${theme === 'dark' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>Cadastrar</Button>
            </Link>
          </motion.div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden mt-4 py-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}
        >
          <nav className="flex flex-col gap-1 px-2">
            {navLinks.map(link => (
              <NavLinkItem key={link.to} {...link} mobile />
            ))}
          </nav>
          <div className="flex flex-col gap-2 mt-4 px-2">
            <NavLinkItem to="/login" label="Entrar" icon={LogIn} mobile variant="outline"/>
            <NavLinkItem to="/registrar" label="Cadastrar" icon={UserPlus} mobile variant="primary"/>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;