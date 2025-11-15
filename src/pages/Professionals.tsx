import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Users, Calculator, FileText, Building } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const Professionals = () => {
  const professionalCategories = [
    {
      title: "Certified Public Accountants (CPAs)",
      icon: Calculator,
      description: "Licensed professionals who can help with tax planning, audits, and financial reporting.",
      resources: [
        { name: "American Institute of CPAs (AICPA)", url: "https://www.aicpa.org/", description: "Find CPAs and access professional resources" },
        { name: "State CPA Societies", url: "https://www.aicpa.org/membership/join/cpa-societies", description: "Locate CPAs in your state" }
      ]
    },
    {
      title: "Tax Professionals",
      icon: FileText,
      description: "Experts in tax preparation, planning, and representation before tax authorities.",
      resources: [
        { name: "IRS Directory of Federal Tax Return Preparers", url: "https://irs.treasury.gov/rpo/rpo.jsf", description: "Search for credentialed tax preparers" },
        { name: "National Association of Tax Professionals", url: "https://www.natptax.com/", description: "Connect with tax professionals nationwide" }
      ]
    },
    {
      title: "Accountants & Bookkeepers",
      icon: Users,
      description: "Professionals who manage financial records and provide accounting services.",
      resources: [
        { name: "National Association of Certified Public Bookkeepers", url: "https://www.nacpb.org/", description: "Find certified bookkeepers" },
        { name: "American Accounting Association", url: "https://aaahq.org/", description: "Access accounting resources and professionals" }
      ]
    },
    {
      title: "Financial Advisors",
      icon: Building,
      description: "Professionals who provide comprehensive financial planning and investment advice.",
      resources: [
        { name: "National Association of Personal Financial Advisors", url: "https://www.napfa.org/", description: "Find fee-only financial advisors" },
        { name: "Financial Planning Association", url: "https://www.financialplanningassociation.org/", description: "Connect with certified financial planners" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Professional Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Connect with qualified professionals who can help you manage your finances, 
            optimize your tax situation, and achieve your financial goals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {professionalCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.resources.map((resource, resIdx) => (
                      <a
                        key={resIdx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/5 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                              {resource.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {resource.description}
                            </p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Before You Hire</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Verify credentials and licenses through official state boards and professional organizations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Ask about fees, services provided, and their experience with situations similar to yours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Request references and check online reviews from previous clients</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Ensure they have professional liability insurance and are in good standing</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Professionals;
