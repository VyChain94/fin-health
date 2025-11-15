import { useState } from "react";
import { Calendar as CalendarIcon, Archive, TrendingUp, ChevronDown, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArchivedReportsSheet } from "./ArchivedReportsSheet";
import logo from "@/assets/logo.png";

interface DashboardHeaderProps {
  onMonthYearChange?: (month: string, year: string) => void;
  onDateSelect?: (date: Date) => void;
  datesWithReports?: Date[];
  onLoadReport?: (report: any) => void;
}
const DashboardHeader = ({
  onMonthYearChange,
  onDateSelect,
  datesWithReports = [],
  onLoadReport
}: DashboardHeaderProps) => {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString();
  const currentYear = currentDate.getFullYear().toString();
  const months = [{
    value: "1",
    label: "January"
  }, {
    value: "2",
    label: "February"
  }, {
    value: "3",
    label: "March"
  }, {
    value: "4",
    label: "April"
  }, {
    value: "5",
    label: "May"
  }, {
    value: "6",
    label: "June"
  }, {
    value: "7",
    label: "July"
  }, {
    value: "8",
    label: "August"
  }, {
    value: "9",
    label: "September"
  }, {
    value: "10",
    label: "October"
  }, {
    value: "11",
    label: "November"
  }, {
    value: "12",
    label: "December"
  }];
  const years = Array.from({
    length: 10
  }, (_, i) => {
    const year = currentDate.getFullYear() - i;
    return {
      value: year.toString(),
      label: year.toString()
    };
  });
  return <header className="bg-card border-b border-border shadow-sm mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-4">
              <img src={logo} alt="The Sol Group LLC" className="h-12 w-auto" />
              <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Financial Health Tools                 
              </h1>
              <p className="text-sm text-muted-foreground">Be aware of your financial health  </p>
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
                    Financial Statement
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

            <Button variant="outline" size="icon" onClick={() => setArchiveOpen(true)} title="View Archives">
              <Archive className="h-5 w-5" />
            </Button>
            <Select defaultValue={currentMonth} onValueChange={value => onMonthYearChange?.(value, currentYear)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>

            <Select defaultValue={currentYear} onValueChange={value => onMonthYearChange?.(currentMonth, value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>)}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" title="Select a date">
                  <CalendarIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" onSelect={date => date && onDateSelect?.(date)} modifiers={{
                hasReport: datesWithReports
              }} modifiersClassNames={{
                hasReport: "bg-primary/20 font-bold"
              }} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      <ArchivedReportsSheet 
        open={archiveOpen} 
        onOpenChange={setArchiveOpen}
        onLoadReport={onLoadReport}
      />
    </header>;
};
export default DashboardHeader;