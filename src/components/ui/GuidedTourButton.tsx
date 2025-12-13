import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GuidedTourButtonProps {
  className?: string;
}

export function GuidedTourButton({ className }: GuidedTourButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="outline"
          size="icon"
          className={`fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg border-primary/20 bg-background/95 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105 ${className}`}
        >
          <Link to="/guided-tour">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Guided Tour</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-popover text-popover-foreground border">
        <p>Need help? Take the Guided Tour</p>
      </TooltipContent>
    </Tooltip>
  );
}
