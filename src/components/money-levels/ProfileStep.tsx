import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Profile } from "@/types/moneyLevels";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

interface ProfileStepProps {
  profile: Profile;
  onUpdate: (updates: Partial<Profile>) => void;
}

export function ProfileStep({ profile, onUpdate }: ProfileStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile & Baseline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={profile.age || ''}
              onChange={(e) => onUpdate({ age: parseInt(e.target.value) || undefined })}
              placeholder="35"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="household">Household Size</Label>
            <Input
              id="household"
              type="number"
              value={profile.householdSize || ''}
              onChange={(e) => onUpdate({ householdSize: parseInt(e.target.value) || undefined })}
              placeholder="2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={profile.location || ''}
            onChange={(e) => onUpdate({ location: e.target.value })}
            placeholder="e.g., Austin, TX"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="withdrawal">Savings Withdrawal Rate (%) <span className="text-destructive">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="text-muted-foreground hover:text-foreground">
                    <Info className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <p className="text-sm">How much of your savings you plan to live on each year. (4% just means you'd take out 4% of your total savings yearly.) The average recommended rate is 4%.</p>
                </PopoverContent>
              </Popover>
            </div>
            <Input
              id="withdrawal"
              type="number"
              step="0.1"
              value={profile.withdrawalRatePct}
              onChange={(e) => onUpdate({ withdrawalRatePct: parseFloat(e.target.value) || 4 })}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="return">Expected Return (%) <span className="text-destructive">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="text-muted-foreground hover:text-foreground">
                    <Info className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <p className="text-sm">How much you expect your investments to grow each year. The historical average for a diversified portfolio is around 7-10%.</p>
                </PopoverContent>
              </Popover>
            </div>
            <Input
              id="return"
              type="number"
              step="0.1"
              value={profile.expectedReturnPct || ''}
              onChange={(e) => onUpdate({ expectedReturnPct: parseFloat(e.target.value) || undefined })}
              placeholder="7"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="tax">Tax Bracket (%) <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="text-muted-foreground hover:text-foreground">
                    <Info className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <p className="text-sm">How much of your income goes to taxes. Adjusts for after-tax income, but you can skip it for a rough estimate. Hint: Check your last tax return or divide total taxes paid by your total income.</p>
                </PopoverContent>
              </Popover>
            </div>
            <Input
              id="tax"
              type="number"
              step="1"
              value={profile.taxBracketPct || ''}
              onChange={(e) => onUpdate({ taxBracketPct: parseFloat(e.target.value) || undefined })}
              placeholder="24"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="inflation">Inflation (%) <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="text-muted-foreground hover:text-foreground">
                    <Info className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <p className="text-sm">How much prices go up over time. Adjusts for future cost increases, but not needed for a simple snapshot.</p>
                </PopoverContent>
              </Popover>
            </div>
            <Input
              id="inflation"
              type="number"
              step="0.1"
              value={profile.inflationPct || ''}
              onChange={(e) => onUpdate({ inflationPct: parseFloat(e.target.value) || undefined })}
              placeholder="3"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="mode">Calculation Mode <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" className="text-muted-foreground hover:text-foreground">
                  <Info className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <p className="text-sm">The method it uses to do the math. The "4% rule" is a simple way to estimate how much you can withdraw yearly.</p>
              </PopoverContent>
            </Popover>
          </div>
          <Select value={profile.mode} onValueChange={(value: 'simple' | 'advanced') => onUpdate({ mode: value })}>
            <SelectTrigger id="mode">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple (4% Rule)</SelectItem>
              <SelectItem value="advanced">Advanced (Asset Yields)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
