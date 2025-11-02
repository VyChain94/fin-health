import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Profile } from "@/types/moneyLevels";

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
            <Label htmlFor="withdrawal">Withdrawal Rate (%)</Label>
            <Input
              id="withdrawal"
              type="number"
              step="0.1"
              value={profile.withdrawalRatePct}
              onChange={(e) => onUpdate({ withdrawalRatePct: parseFloat(e.target.value) || 4 })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="return">Expected Return (%)</Label>
            <Input
              id="return"
              type="number"
              step="0.1"
              value={profile.expectedReturnPct || ''}
              onChange={(e) => onUpdate({ expectedReturnPct: parseFloat(e.target.value) || undefined })}
              placeholder="7"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tax">Tax Bracket (%)</Label>
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
            <Label htmlFor="inflation">Inflation Assumption (%)</Label>
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
          <Label htmlFor="mode">Calculation Mode</Label>
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
