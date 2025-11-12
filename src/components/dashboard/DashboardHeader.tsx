import { useState } from "react";
import { Calendar as CalendarIcon, Archive, Eye, EyeOff, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import logo from "@/assets/logo.png";

export interface VisibilitySettings {
  freedomNumber: boolean;
  income: boolean;
  expenses: boolean;
  assets: boolean;
  liabilities: boolean;
}

interface DashboardHeaderProps {
  onMonthYearChange?: (month: string, year: string) => void;
  onArchiveClick?: () => void;
  onDateSelect?: (date: Date) => void;
  datesWithReports?: Date[];
  visibilitySettings: VisibilitySettings;
  onVisibilityChange: (settings: VisibilitySettings) => void;
}

const DashboardHeader = ({ 
  onMonthYearChange, 
  onArchiveClick, 
  onDateSelect, 
  datesWithReports = [],
  visibilitySettings,
  onVisibilityChange 
}: DashboardHeaderProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();
  
  const allHidden = Object.values(visibilitySettings).every(v => v === false);
  const allVisible = Object.values(visibilitySettings).every(v => v === true);
  
  const toggleAll = () => {
    const newValue = !allVisible;
    onVisibilityChange({
      freedomNumber: newValue,
      income: newValue,
      expenses: newValue,
      assets: newValue,
      liabilities: newValue,
    });
  };
  
  const toggleSetting = (key: keyof VisibilitySettings) => {
    onVisibilityChange({
      ...visibilitySettings,
      [key]: !visibilitySettings[key],
    });
  };

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = currentDate.getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  });

  return (
    <header className="bg-card border-b border-border shadow-sm mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="The Sol Group LLC" className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Financial Freedom Tracker
              </h1>
              <p className="text-sm text-muted-foreground">
                Monitor your path to financial independence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.location.href = '/money-levels'}
              title="Money Levels Calculator"
            >
              <Home className="h-5 w-5" />
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" title="Visibility Settings">
                  {allHidden ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="end">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Show/Hide Amounts</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="toggle-all" 
                          checked={allVisible}
                          onCheckedChange={toggleAll}
                        />
                        <Label htmlFor="toggle-all" className="font-medium cursor-pointer">
                          {allVisible ? "Hide All" : "Show All"}
                        </Label>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="freedom-number" 
                          checked={visibilitySettings.freedomNumber}
                          onCheckedChange={() => toggleSetting('freedomNumber')}
                        />
                        <Label htmlFor="freedom-number" className="cursor-pointer">
                          Freedom Number
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="income" 
                          checked={visibilitySettings.income}
                          onCheckedChange={() => toggleSetting('income')}
                        />
                        <Label htmlFor="income" className="cursor-pointer">
                          Income
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="expenses" 
                          checked={visibilitySettings.expenses}
                          onCheckedChange={() => toggleSetting('expenses')}
                        />
                        <Label htmlFor="expenses" className="cursor-pointer">
                          Expenses
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="assets" 
                          checked={visibilitySettings.assets}
                          onCheckedChange={() => toggleSetting('assets')}
                        />
                        <Label htmlFor="assets" className="cursor-pointer">
                          Assets
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="liabilities" 
                          checked={visibilitySettings.liabilities}
                          onCheckedChange={() => toggleSetting('liabilities')}
                        />
                        <Label htmlFor="liabilities" className="cursor-pointer">
                          Liabilities
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" title="Select a date">
                  <CalendarIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    newDate && onDateSelect?.(newDate);
                  }}
                  modifiers={{
                    hasReport: datesWithReports,
                  }}
                  modifiersClassNames={{
                    hasReport: "bg-primary text-primary-foreground font-bold rounded-full",
                  }}
                />
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={onArchiveClick}
              title="View Archives"
            >
              <Archive className="h-5 w-5" />
            </Button>
            <Select
              defaultValue={currentMonth}
              onValueChange={(value) =>
                onMonthYearChange?.(value, currentYear)
              }
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              defaultValue={currentYear}
              onValueChange={(value) =>
                onMonthYearChange?.(currentMonth, value)
              }
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
