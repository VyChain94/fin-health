import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, TrendingUp, Shield, DollarSign, Clock } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";

const PassiveIncome = () => {
  const opportunities = [
    {
      name: "The Sol Group LLC",
      url: "https://www.thesolgroup.net/",
      tagline: "Buy & Sell Real-Estate Notes With Confidence",
      description: "Invest in real estate notes and earn passive income through secured debt instruments backed by property.",
      features: [
        "Secured by real estate assets",
        "Predictable monthly cash flow",
        "Professional note servicing",
        "Lower entry point than property ownership"
      ],
      icon: Building2
    },
    {
      name: "Ignite Funding",
      url: "https://ignitefunding.com/",
      tagline: "Short Term Investments for Long Term Investors",
      description: "Access short-term real estate investment opportunities with competitive returns and professional management.",
      features: [
        "Short-term investment periods",
        "Real estate backed investments",
        "Transparent investment process",
        "Regular investor updates"
      ],
      icon: Flame
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Generate Income",
      description: "Create additional revenue streams without active daily involvement"
    },
    {
      icon: Shield,
      title: "Asset-Backed Security",
      description: "Investments secured by tangible real estate assets"
    },
    {
      icon: Clock,
      title: "Time Freedom",
      description: "Earn returns while focusing on other priorities"
    },
    {
      icon: TrendingUp,
      title: "Portfolio Diversification",
      description: "Add alternative investments to your financial portfolio"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Passive Income Opportunities
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore investment opportunities that can help you build wealth and generate income 
            with less active involvement. These resources offer pathways to financial growth through 
            real estate-backed investments.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {opportunities.map((opportunity, idx) => {
            const Icon = opportunity.icon;
            return (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{opportunity.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{opportunity.tagline}</p>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {opportunity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {opportunity.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      asChild
                      className="w-full"
                      variant="default"
                    >
                      <a
                        href={opportunity.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Learn More
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Why Passive Income?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <Card key={idx}>
                  <CardHeader>
                    <div className="p-2 rounded-lg bg-accent/10 w-fit mb-2">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <CardTitle className="text-base">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Important Investment Considerations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>All investments carry risk. Past performance does not guarantee future results.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Research thoroughly and understand the investment terms before committing funds.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Consider consulting with a financial advisor to ensure investments align with your goals.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Diversify your portfolio and never invest more than you can afford to lose.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Verify that investment opportunities comply with securities regulations in your jurisdiction.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

// Icon components
const Building2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    <path d="M10 6h4"/>
    <path d="M10 10h4"/>
    <path d="M10 14h4"/>
    <path d="M10 18h4"/>
  </svg>
);

const Flame = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

export default PassiveIncome;
