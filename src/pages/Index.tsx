import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useFinancialReports } from "@/hooks/useFinancialReports";
import { useNavigate } from "react-router-dom";
import { MilestonesSection } from "@/components/dashboard/MilestonesSection";
import { WinsRisksSection } from "@/components/dashboard/WinsRisksSection";
import { StreaksSection } from "@/components/dashboard/StreaksSection";
import { WhyToolsMatterSection } from "@/components/dashboard/WhyToolsMatterSection";

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { latestReport, previousReport, reportDates, annualIncome, loading: reportsLoading } = useFinancialReports();
  const navigate = useNavigate();

  if (authLoading || reportsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <WhyToolsMatterSection />
        <MilestonesSection latestReport={latestReport} annualIncome={annualIncome} />
        <WinsRisksSection latestReport={latestReport} previousReport={previousReport} />
        <StreaksSection 
          reportDates={reportDates} 
          onNavigateToStatement={() => navigate("/financial-statement")}
        />
      </div>
    </div>
  );
};

export default Index;
