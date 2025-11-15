import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, TrendingUp, Target, Eye, Brain, Compass } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const HowWhyTools = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            How and Why Our Tools Help
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Understanding your financial position is the first step toward financial success. 
            Our tools transform complex financial concepts into clear, actionable insights 
            that anyone can understand and use—regardless of age or experience level.
          </p>
        </div>

        <Tabs defaultValue="statement" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="statement">Financial Statement</TabsTrigger>
            <TabsTrigger value="freedom">Financial Freedom</TabsTrigger>
          </TabsList>

          <TabsContent value="statement" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Financial Statement Tool</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Your complete financial snapshot—clear, organized, and actionable
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Simple Input Process</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter your financial information once—income sources, expenses, assets, and liabilities. 
                      The tool organizes everything automatically into a professional financial statement.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Automatic Calculations</h4>
                    <p className="text-sm text-muted-foreground">
                      No math required. The tool instantly calculates your net worth, cash flow, 
                      debt-to-income ratio, and other critical metrics that financial professionals use.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Visual Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      See your financial situation through charts and graphs that make complex data 
                      easy to understand at a glance. Track trends over time with monthly snapshots.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Secure Storage</h4>
                    <p className="text-sm text-muted-foreground">
                      Your financial data is encrypted and stored securely. Access your statements 
                      anytime, from anywhere, and track your progress month after month.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Why It Helps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Clarity Leads to Control</h4>
                    <p className="text-sm text-muted-foreground">
                      Most people have a vague sense of their finances—some money here, some debt there. 
                      This tool gives you complete clarity. When you can see everything in one place, 
                      you can make informed decisions instead of guessing.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Identifies Opportunities</h4>
                    <p className="text-sm text-muted-foreground">
                      The tool highlights where your money is going and where it is coming from. 
                      You will quickly spot expenses that can be reduced, income streams that can be grown, 
                      and assets that are not working hard enough for you.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Professional Credibility</h4>
                    <p className="text-sm text-muted-foreground">
                      Need a loan? Applying for a mortgage? Meeting with a financial advisor? 
                      Having a professional financial statement instantly increases your credibility 
                      and helps you get better terms and advice.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Tracks Real Progress</h4>
                    <p className="text-sm text-muted-foreground">
                      It is hard to improve what you do not measure. Monthly financial statements show 
                      you exactly how your net worth grows, how your cash flow improves, and how your 
                      financial health strengthens over time.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Who Benefits Most?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Young Professionals</p>
                      <p className="text-sm text-muted-foreground">Build good financial habits early and track your wealth as it grows</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Mid-Career Professionals</p>
                      <p className="text-sm text-muted-foreground">Optimize income and expenses during peak earning years</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Pre-Retirees</p>
                      <p className="text-sm text-muted-foreground">Ensure your assets and income streams are retirement-ready</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Small Business Owners</p>
                      <p className="text-sm text-muted-foreground">Separate and track personal finances alongside business growth</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Financial Beginners</p>
                      <p className="text-sm text-muted-foreground">Learn financial concepts by seeing your own real data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Financial Professionals</p>
                      <p className="text-sm text-muted-foreground">Quick, professional statements for clients and personal tracking</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="freedom" className="space-y-6">
            <Card className="border-accent/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Financial Freedom Tool</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Your personalized roadmap to financial independence
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Compass className="h-5 w-5 text-primary" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Define Your Freedom Number</h4>
                    <p className="text-sm text-muted-foreground">
                      Financial freedom means different things to different people. This tool helps you 
                      calculate the exact amount of passive income or net worth you need to live life 
                      on your terms—whether that is early retirement, career flexibility, or financial security.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Create Your Custom Path</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your current financial situation and your freedom goal, the tool generates 
                      a step-by-step plan. It shows you exactly what needs to happen with your income, 
                      expenses, savings rate, and investments to reach financial independence.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Track Key Milestones</h4>
                    <p className="text-sm text-muted-foreground">
                      Financial freedom is not a single moment—it is a journey with important checkpoints. 
                      The tool breaks down your big goal into achievable milestones so you can celebrate 
                      progress and stay motivated along the way.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Scenario Planning</h4>
                    <p className="text-sm text-muted-foreground">
                      What if you get a raise? What if you start a side business? What if you cut expenses? 
                      Run different scenarios to see how various decisions impact your timeline to financial freedom.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Why It Helps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Transforms Vague Dreams into Concrete Plans</h4>
                    <p className="text-sm text-muted-foreground">
                      "I want to be financially free" is a wish. "I need to save $X per month for Y years 
                      to generate $Z in passive income" is a plan. This tool turns abstract desires into 
                      specific, achievable actions you can start taking today.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Reveals the Real Timeline</h4>
                    <p className="text-sm text-muted-foreground">
                      Many people underestimate or overestimate how long financial freedom takes. 
                      This tool gives you the honest truth based on real numbers—your numbers. 
                      No guessing, no false hopes, just reality-based planning.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Motivates Through Progress</h4>
                    <p className="text-sm text-muted-foreground">
                      When you can see your financial freedom percentage increasing month by month—
                      from 15% to 20% to 30% and beyond—it creates powerful momentum. Small wins 
                      compound into life-changing results.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Empowers Better Decisions</h4>
                    <p className="text-sm text-muted-foreground">
                      Should you take that new job? Buy that house? Start that business? Every major 
                      financial decision becomes clearer when you can see exactly how it affects your 
                      path to financial freedom.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle>Who Benefits Most?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Career Starters</p>
                      <p className="text-sm text-muted-foreground">Start your financial independence journey with clear goals from day one</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">High Earners</p>
                      <p className="text-sm text-muted-foreground">Maximize your income advantages with strategic freedom planning</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Aspiring Retirees</p>
                      <p className="text-sm text-muted-foreground">Calculate exactly when you can retire and what you need to get there</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Debt Eliminators</p>
                      <p className="text-sm text-muted-foreground">See how becoming debt-free accelerates your path to freedom</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Lifestyle Designers</p>
                      <p className="text-sm text-muted-foreground">Build the financial foundation for your ideal life</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Entrepreneurs</p>
                      <p className="text-sm text-muted-foreground">Plan for business success and personal financial independence together</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl">The Bottom Line</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              Financial success is not about luck or secrets—it is about awareness, planning, and consistent action. 
              These tools give you the awareness through clear financial statements, the planning through freedom 
              calculations, and the motivation for action through visible progress tracking.
            </p>
            <p className="text-foreground">
              Whether you are just starting your financial journey or you are a seasoned professional optimizing 
              your portfolio, these tools meet you where you are and help you get where you want to go.
            </p>
            <p className="text-foreground font-semibold">
              Knowledge is power, but applied knowledge is transformation. Start using these tools today to 
              transform your financial future.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default HowWhyTools;
