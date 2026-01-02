import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MonthYearPickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  minYear?: number;
  maxYear?: number;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function MonthYearPicker({ 
  selectedDate, 
  onDateChange, 
  minYear = 2020, 
  maxYear = new Date().getFullYear() 
}: MonthYearPickerProps) {
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const years = React.useMemo(() => {
    const yearList: number[] = [];
    for (let y = maxYear; y >= minYear; y--) {
      yearList.push(y);
    }
    return yearList;
  }, [minYear, maxYear]);

  const handleMonthChange = (monthIndex: string) => {
    const newDate = new Date(currentYear, parseInt(monthIndex), 1);
    onDateChange(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(parseInt(year), currentMonth, 1);
    onDateChange(newDate);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={currentMonth.toString()} onValueChange={handleMonthChange}>
        <SelectTrigger className="w-[140px] bg-background">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          {MONTHS.map((month, index) => (
            <SelectItem key={month} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={currentYear.toString()} onValueChange={handleYearChange}>
        <SelectTrigger className="w-[100px] bg-background">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
