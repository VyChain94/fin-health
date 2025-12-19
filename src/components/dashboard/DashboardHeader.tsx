import { useState } from "react";
import { FolderArchive, TrendingUp, ChevronDown, HelpCircle, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArchivedReportsSheet } from "./ArchivedReportsSheet";
import logo from "@/assets/logo.png";

interface DashboardHeaderProps {
  onLoadReport?: (report: any) => void;
  currentMonthLabel?: string;
  editableUntilLabel?: string;
}

const DashboardHeader = ({
  onLoadReport,
  currentMonthLabel,
  editableUntilLabel
}: DashboardHeaderProps) => {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const { signOut } = useAuth();

  return (
    <header className="bg-card border-b border-border shadow-sm mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-4">
              <img src={logo} alt="The Sol Group LLC" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Financial Health Tools
                </h1>
                <p className="text-sm text-muted-foreground">Know Your Financial Health, Position Yourself to Prosper</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Health Tools
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card">
                <DropdownMenuItem asChild>
                  <Link to="/financial-statement" className="cursor-pointer">
                    Monthly Financial Statement
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/financial-freedom" className="cursor-pointer">
                    Financial Freedom
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card">
                <DropdownMenuItem asChild>
                  <Link to="/glossary" className="cursor-pointer">
                    Glossary / Key Terms
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/guided-tour" className="cursor-pointer">
                    Guided Tour
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/how-why-tools" className="cursor-pointer">
                    How and Why our Tools Help
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  About
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card">
                <DropdownMenuItem asChild>
                  <Link to="/about-us" className="cursor-pointer">
                    About Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/financial-literacy" className="cursor-pointer">
                    Financial Literacy
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/now-what" className="cursor-pointer">
                    Now What?
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Resources
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card">
                <DropdownMenuItem asChild>
                  <Link to="/professionals" className="cursor-pointer">
                    Professionals
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/passive-income" className="cursor-pointer">
                    Passive Income
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/tools" className="cursor-pointer">
                    Tools
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setArchiveOpen(true)} 
              title="View/Modify Past Statements"
            >
              <FolderArchive className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              title="Sign Out"
              className="ml-2"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {currentMonthLabel && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-foreground">{currentMonthLabel}</h2>
            {editableUntilLabel && (
              <p className="text-sm text-muted-foreground">{editableUntilLabel}</p>
            )}
          </div>
        )}
      </div>

      <ArchivedReportsSheet
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
        onLoadReport={onLoadReport}
      />
    </header>
  );
};

export default DashboardHeader;