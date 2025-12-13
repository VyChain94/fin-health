import { Card } from "@/components/ui/card";
import { AlertTriangle, Eye, Scale, Wrench, Info } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function WhyToolsMatterSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-primary/10">
        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground">Important Information and Disclaimer</span>
          </div>
          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-6">
            {/* Why these tools matter */}
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground">Why these tools matter</h3>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <span className="font-semibold text-foreground shrink-0">1.</span>
                  <p>
                    <strong className="text-foreground">Social Security may not be enough (and may not last as you expect).</strong>
                    <br />
                    Even if benefits are there, they often don't cover the lifestyle most people want.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-foreground shrink-0">2.</span>
                  <p>
                    <strong className="text-foreground">Prices keep going up.</strong>
                    <br />
                    Inflation makes today's "comfortable" budget feel tight later.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-foreground shrink-0">3.</span>
                  <div>
                    <strong className="text-foreground">People's top 2 concerns (what we hear most):</strong>
                    <ul className="mt-2 ml-4 space-y-1 list-disc list-inside">
                      <li>"Am I going to outlive my money?"</li>
                      <li>"How do I keep up with rising costs?"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* What this tool does */}
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Eye className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground">What this tool does</h3>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <span className="font-semibold text-foreground shrink-0">4.</span>
                  <div>
                    <strong className="text-foreground">Provides you visibility—based on your monthly spending.</strong>
                    <br />
                    This tool helps you see how your money is actually being utilized each month, so you can use it better.
                    <ul className="mt-2 ml-4 space-y-1 list-disc list-inside">
                      <li>Tracks <strong className="text-foreground">Assets & Liabilities</strong></li>
                      <li>Shows and Highlights <strong className="text-foreground">Patterns + Progress</strong> (Utilization)</li>
                      <li>Helps you <strong className="text-foreground">redirect money intentionally</strong> toward your goal(s)</li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-foreground shrink-0">5.</span>
                  <p>
                    <strong className="text-foreground">Helps you move with intention.</strong>
                    <br />
                    When you can see the full picture, you can make clearer decisions and adjust faster.
                  </p>
                </div>
              </div>
            </div>

            {/* Important disclaimer */}
            <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Scale className="h-4 w-4 text-destructive" />
                </div>
                <h3 className="text-base font-semibold text-foreground">Important disclaimer</h3>
              </div>
              <div className="flex gap-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground shrink-0">6.</span>
                <p>
                  <strong className="text-foreground">Not financial advice.</strong>
                  <br />
                  I am <strong className="text-foreground">not a financial advisor</strong>. This tool is for <strong className="text-foreground">education and visibility only</strong>. You should <strong className="text-foreground">do your own research</strong> and consider speaking with a qualified professional before making financial decisions.
                </p>
              </div>
            </div>

            {/* Tools that complement this */}
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Wrench className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground">Tools that complement this</h3>
              </div>
              <div className="flex gap-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground shrink-0">7.</span>
                <p>
                  <strong className="text-foreground">Any budgeting tool (manual or software).</strong>
                  <br />
                  This tool shows your <strong className="text-foreground">financial location and direction</strong>. Budgeting tools help you manage the <strong className="text-foreground">day-to-day plan</strong>. Both work better together.
                </p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
