import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { FinancialData } from "@/types/financial";

interface Report {
  id: string;
  report_date: string;
  income_data: any;
  expenses_data: any;
  assets_data: any;
  liabilities_data: any;
}

export const useFinancialReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_archived", false)
        .order("report_date", { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLatestReport = (): FinancialData | null => {
    if (reports.length === 0) return null;
    
    const latest = reports[0];
    return {
      income: latest.income_data || {},
      expenses: latest.expenses_data || {},
      assets: latest.assets_data || {},
      liabilities: latest.liabilities_data || {},
    };
  };

  const getPreviousReport = (): FinancialData | null => {
    if (reports.length < 2) return null;
    
    const previous = reports[1];
    return {
      income: previous.income_data || {},
      expenses: previous.expenses_data || {},
      assets: previous.assets_data || {},
      liabilities: previous.liabilities_data || {},
    };
  };

  const getReportDates = (): Date[] => {
    return reports.map(r => new Date(r.report_date));
  };

  const getAnnualIncome = (): number => {
    const latest = getLatestReport();
    if (!latest) return 0;
    
    const monthlyIncome = Object.values(latest.income).reduce((sum, val) => sum + val, 0);
    return monthlyIncome * 12;
  };

  return {
    reports,
    loading,
    latestReport: getLatestReport(),
    previousReport: getPreviousReport(),
    reportDates: getReportDates(),
    annualIncome: getAnnualIncome(),
    refreshReports: fetchReports,
  };
};
