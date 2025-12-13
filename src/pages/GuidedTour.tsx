import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, FileText, TrendingUp, CheckCircle2 } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { WhyToolsMatterSection } from "@/components/dashboard/WhyToolsMatterSection";

const GuidedTour = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <WhyToolsMatterSection />
        <Link to="/" className="mt-8 inline-block">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Guided Tour
          </h1>
          <p className="text-lg text-muted-foreground">
            Step-by-step guides to help you master our Financial Health Tools
          </p>
        </div>

        <Tabs defaultValue="financial-statement" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="financial-statement" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Monthly Financial Statement
            </TabsTrigger>
            <TabsTrigger value="financial-freedom" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Financial Freedom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="financial-statement">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Monthly Financial Statement Tool Guide
                </CardTitle>
                <CardDescription>
                  Learn how to track and analyze your complete financial picture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step-1">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          1
                        </div>
                        <span>Getting Started</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>Welcome to the Financial Statement tool! This powerful tool helps you create a comprehensive snapshot of your financial health.</p>
                      <div className="space-y-2">
                        <p className="font-medium">What you'll need:</p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Recent bank statements</li>
                          <li>Pay stubs or income records</li>
                          <li>Investment account statements</li>
                          <li>Credit card and loan statements</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-2">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          2
                        </div>
                        <span>Recording Your Income</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>Start by documenting all sources of income:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Employment Income:</strong> Your salary, wages, or business income</li>
                        <li><strong>Investment Income:</strong> Dividends, interest, and capital gains</li>
                        <li><strong>Passive Income:</strong> Rental income, royalties, or other recurring income</li>
                        <li><strong>Other Income:</strong> Side gigs, freelance work, or gifts</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: Use monthly averages for irregular income sources
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-3">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          3
                        </div>
                        <span>Tracking Your Expenses</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>Document all your monthly expenses, organized by category:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Fixed Expenses:</strong> Rent/mortgage, insurance, loan payments</li>
                        <li><strong>Variable Expenses:</strong> Groceries, utilities, transportation</li>
                        <li><strong>Discretionary Spending:</strong> Entertainment, dining out, hobbies</li>
                        <li><strong>Savings & Investments:</strong> Retirement contributions, emergency fund</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: Review 2-3 months of bank statements for accuracy
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-4">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          4
                        </div>
                        <span>Cataloging Your Assets</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>List all assets you own and their current values:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Liquid Assets:</strong> Cash, checking/savings accounts, money market funds</li>
                        <li><strong>Investment Assets:</strong> Stocks, bonds, mutual funds, retirement accounts</li>
                        <li><strong>Real Estate:</strong> Primary residence, rental properties, land</li>
                        <li><strong>Personal Property:</strong> Vehicles, jewelry, collectibles</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: Use current market values, not purchase prices
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-5">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          5
                        </div>
                        <span>Recording Your Liabilities</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>Document all outstanding debts and obligations:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Secured Debt:</strong> Mortgages, auto loans, home equity loans</li>
                        <li><strong>Unsecured Debt:</strong> Credit cards, personal loans, medical bills</li>
                        <li><strong>Student Loans:</strong> Federal and private education loans</li>
                        <li><strong>Other Obligations:</strong> Tax liens, alimony, child support</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: Include current balance, interest rate, and minimum payment
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-6">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          6
                        </div>
                        <span>Understanding Your Results</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>Learn how to interpret your financial statement:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Net Worth:</strong> Total Assets minus Total Liabilities</li>
                        <li><strong>Monthly Cash Flow:</strong> Income minus Expenses</li>
                        <li><strong>Savings Rate:</strong> Percentage of income going to savings</li>
                        <li><strong>Debt-to-Income Ratio:</strong> Monthly debt payments vs. income</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: Track these metrics monthly to monitor progress
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-7">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          7
                        </div>
                        <span>Saving and Archiving Reports</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>Make the most of your financial data:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Save reports monthly to track progress over time</li>
                        <li>Use the Archive feature to access historical reports</li>
                        <li>Edit archived reports to correct errors or update values</li>
                        <li>Compare reports month-to-month to identify trends</li>
                        <li>Export or print reports for tax preparation or loan applications</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: Set a reminder to update your statement monthly
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Ready to Get Started?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first financial statement and take control of your financial future.
                  </p>
                  <Link to="/financial-statement">
                    <Button>Go to Monthly Financial Statement Tool</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial-freedom">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Financial Freedom Tool Guide
                </CardTitle>
                <CardDescription>
                  Discover your path to financial independence and freedom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step-1">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          1
                        </div>
                        <span>What is Financial Freedom?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>Financial freedom means having enough passive income to cover your living expenses without actively working.</p>
                      <div className="space-y-2">
                        <p className="font-medium">This tool helps you calculate:</p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Your Financial Freedom Number (total assets needed)</li>
                          <li>Monthly passive income required</li>
                          <li>Timeline to achieve financial independence</li>
                          <li>Strategies to accelerate your journey</li>
                        </ul>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: Financial freedom doesn't mean you stop working—it means you work by choice
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-2">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          2
                        </div>
                        <span>Calculate Your Annual Expenses</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>Start by determining how much you need to live comfortably each year:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Review your current monthly expenses from your Financial Statement</li>
                        <li>Multiply by 12 to get your annual spending</li>
                        <li>Consider which expenses might change in retirement or financial freedom</li>
                        <li>Add a buffer for unexpected costs (typically 10-20%)</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: Some expenses may decrease (commuting), while others increase (healthcare, travel)
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-3">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          3
                        </div>
                        <span>Understanding the 4% Rule</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>The 4% rule is a guideline for sustainable withdrawals from your investment portfolio:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>You can withdraw 4% of your portfolio annually without depleting it</li>
                        <li>Based on historical market returns and inflation data</li>
                        <li>Your Freedom Number = Annual Expenses ÷ 0.04</li>
                        <li>Example: $50,000/year expenses = $1,250,000 needed</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: Conservative planners use 3-3.5%, aggressive ones use 4-5%
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-4">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          4
                        </div>
                        <span>Assessing Your Current Position</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>Input your current financial data to see where you stand:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Current Net Worth:</strong> From your Financial Statement</li>
                        <li><strong>Monthly Savings Rate:</strong> How much you invest each month</li>
                        <li><strong>Expected Return Rate:</strong> Conservative estimate (6-8% typical)</li>
                        <li><strong>Current Age:</strong> To calculate timeline to freedom</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: Be realistic with return rates—lower estimates are safer
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-5">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          5
                        </div>
                        <span>Creating Your Freedom Plan</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>The tool will generate a personalized plan showing:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Years until you reach financial freedom</li>
                        <li>Monthly investment needed to hit your goal sooner</li>
                        <li>Impact of increasing savings rate by 5%, 10%, or 20%</li>
                        <li>Milestone targets to track your progress</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: Small increases in savings rate dramatically reduce time to freedom
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-6">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          6
                        </div>
                        <span>Strategies to Accelerate Your Journey</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>Ways to reach financial freedom faster:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Increase Income:</strong> Side hustles, career advancement, skill development</li>
                        <li><strong>Reduce Expenses:</strong> Live below your means, eliminate waste</li>
                        <li><strong>Optimize Investments:</strong> Tax-advantaged accounts, low-fee index funds</li>
                        <li><strong>Build Passive Income:</strong> Rental properties, dividends, royalties</li>
                        <li><strong>Avoid Lifestyle Inflation:</strong> Save raises and bonuses</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: Focus on high-impact changes first—the 80/20 rule applies
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-7">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          7
                        </div>
                        <span>Tracking Progress and Adjusting</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-11 space-y-3">
                      <p>Financial freedom is a journey that requires regular monitoring:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Update your plan quarterly to reflect life changes</li>
                        <li>Celebrate milestones (25%, 50%, 75% to goal)</li>
                        <li>Adjust strategy if market conditions or goals change</li>
                        <li>Consider partial financial freedom (covering some expenses)</li>
                        <li>Plan what you'll do once you achieve freedom</li>
                      </ul>
                      <p className="text-sm text-muted-foreground mt-3">
                        <CheckCircle2 className="inline h-4 w-4 mr-1" />
                        Tip: The journey teaches valuable money skills—enjoy the process
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Ready to Chart Your Path?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Calculate your Financial Freedom Number and discover your timeline to independence.
                  </p>
                  <Link to="/financial-freedom">
                    <Button>Go to Financial Freedom Tool</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuidedTour;
