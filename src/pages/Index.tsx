import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
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
      <div className="container mx-auto px-4 py-8">
        {/* Empty dashboard - ready for analysis visuals */}
      </div>
    </div>
  );
};

export default Index;
