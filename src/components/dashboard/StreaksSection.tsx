import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Flame, Calendar } from "lucide-react";
import { useState } from "react";

interface StreaksSectionProps {
  reportDates: Date[];
  onNavigateToStatement: () => void;
}

export const StreaksSection = ({ reportDates, onNavigateToStatement }: StreaksSectionProps) => {
  const [checklist, setChecklist] = useState({
    income: false,
    expenses: false,
    assets: false,
    debts: false,
    submit: false,
  });

  const calculateStreaks = () => {
    if (reportDates.length === 0) {
      return { currentStreak: 0, longestStreak: 0, lastReportMonthsAgo: null };
    }

    const sortedDates = [...reportDates].sort((a, b) => b.getTime() - a.getTime());
    const now = new Date();
    
    // Calculate months ago for last report
    const lastReport = sortedDates[0];
    const monthsAgo = Math.floor((now.getTime() - lastReport.getTime()) / (1000 * 60 * 60 * 24 * 30));

    // Calculate current streak
    let currentStreak = 0;
    let checkDate = new Date(now.getFullYear(), now.getMonth(), 1);
    
    for (let i = 0; i < sortedDates.length; i++) {
      const reportDate = new Date(sortedDates[i].getFullYear(), sortedDates[i].getMonth(), 1);
      if (reportDate.getTime() === checkDate.getTime()) {
        currentStreak++;
        checkDate.setMonth(checkDate.getMonth() - 1);
      } else if (reportDate.getTime() < checkDate.getTime()) {
        break;
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 1;
    
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const current = new Date(sortedDates[i].getFullYear(), sortedDates[i].getMonth(), 1);
      const next = new Date(sortedDates[i + 1].getFullYear(), sortedDates[i + 1].getMonth(), 1);
      
      current.setMonth(current.getMonth() - 1);
      
      if (current.getTime() === next.getTime()) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    return { currentStreak, longestStreak, lastReportMonthsAgo: monthsAgo };
  };

  const { currentStreak, longestStreak, lastReportMonthsAgo } = calculateStreaks();

  const checklistItems = [
    { id: "income", label: "Update income" },
    { id: "expenses", label: "Reconcile expenses" },
    { id: "assets", label: "Refresh asset values" },
    { id: "debts", label: "Update debts" },
    { id: "submit", label: "Submit report" },
  ];

  const allComplete = Object.values(checklist).every(v => v);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          Streaks & Rituals
        </CardTitle>
        <CardDescription>Discipline is one of your best assets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border">
              <div>
                <p className="text-sm text-muted-foreground">Reporting Streak</p>
                <p className="text-2xl font-bold text-foreground">{currentStreak} months</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border">
              <div>
                <p className="text-sm text-muted-foreground">Longest Streak</p>
                <p className="text-2xl font-bold text-foreground">{longestStreak} months</p>
              </div>
              <Flame className="h-8 w-8 text-primary" />
            </div>

            {lastReportMonthsAgo !== null && lastReportMonthsAgo > 1 && (
              <div className="p-4 rounded-lg bg-accent/10 border border-accent">
                <p className="text-sm text-muted-foreground">
                  Last report: {lastReportMonthsAgo} months ago. Let's get you back on track.
                </p>
              </div>
            )}

            {currentStreak >= 2 && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-foreground">
                  You've closed your books <span className="font-semibold">{currentStreak} months in a row.</span>
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">"Close the Month" Checklist</h3>
            <div className="space-y-3">
              {checklistItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <Checkbox
                    id={item.id}
                    checked={checklist[item.id as keyof typeof checklist]}
                    onCheckedChange={(checked) =>
                      setChecklist((prev) => ({ ...prev, [item.id]: checked as boolean }))
                    }
                  />
                  <label
                    htmlFor={item.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>

            {allComplete ? (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary animate-fade-in">
                <p className="text-sm font-medium text-foreground">
                  ✓ Review Complete · Your process discipline is one of your best assets.
                </p>
              </div>
            ) : (
              <button
                onClick={onNavigateToStatement}
                className="w-full p-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Submit Report
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
