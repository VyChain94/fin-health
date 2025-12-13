import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Users, Calendar, MapPin, Lightbulb } from "lucide-react";
import { WhyToolsMatterSection } from "@/components/dashboard/WhyToolsMatterSection";

const FinancialLiteracy = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <WhyToolsMatterSection />
        <div className="max-w-4xl mx-auto space-y-8 mt-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Financial Literacy
            </h1>
            <p className="text-lg text-muted-foreground">
              Understanding the Foundation of Financial Success
            </p>
          </div>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Why Financial Literacy Matters
              </CardTitle>
              <CardDescription>
                Financial literacy is the ability to understand and effectively use various financial skills, including personal financial management, budgeting, and investing. It's the cornerstone of building wealth and achieving financial freedom.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Without financial literacy, you're navigating your financial future blindfolded. With it, you gain the power to make informed decisions, avoid costly mistakes, and build lasting wealth for yourself and future generations.
              </p>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="who" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <Users className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-semibold">WHO Needs Financial Literacy?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-foreground leading-relaxed">
                  <strong>Everyone.</strong> Financial literacy is essential for people at every stage of life and every income level:
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Young Adults:</strong> Starting your career and learning to budget, save, and avoid debt traps</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Mid-Career Professionals:</strong> Maximizing earnings, investing wisely, and planning for major life events</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Late-Career Individuals:</strong> Preparing for retirement and preserving wealth</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Financial Novices:</strong> Building confidence and foundational knowledge</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span><strong>Financial Professionals:</strong> Staying current with best practices and deepening expertise</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="what" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-semibold">WHAT Is Financial Literacy?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-foreground leading-relaxed">
                  Financial literacy encompasses understanding key concepts and skills:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-2">Core Skills</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Budgeting and cash flow management</li>
                      <li>• Understanding credit and debt</li>
                      <li>• Saving and emergency funds</li>
                      <li>• Basic investment principles</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-2">Advanced Concepts</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Tax optimization strategies</li>
                      <li>• Retirement planning</li>
                      <li>• Asset allocation</li>
                      <li>• Risk management and insurance</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="when" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-semibold">WHEN Should You Learn?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-foreground leading-relaxed">
                  <strong>Now.</strong> The best time to improve your financial literacy was yesterday. The second-best time is today.
                </p>
                <div className="space-y-3">
                  <p className="text-foreground">Key moments to prioritize financial education:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex gap-2">
                      <span className="text-primary">📚</span>
                      <span>Before making major financial decisions</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">💼</span>
                      <span>When starting a new job or career</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">💰</span>
                      <span>When receiving inheritance or windfall</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">🏠</span>
                      <span>Before major life changes (marriage, children, home purchase)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">📈</span>
                      <span>Continuously - financial markets and strategies evolve</span>
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="where" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-semibold">WHERE Can You Learn?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-foreground leading-relaxed">
                  Financial literacy resources are more accessible than ever:
                </p>
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg border border-border/50">
                    <h4 className="font-semibold text-foreground mb-2">Right Here</h4>
                    <p className="text-sm text-muted-foreground">
                      Our tools provide hands-on learning by tracking your real financial data and showing you actionable insights
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-border/50">
                    <h4 className="font-semibold text-foreground mb-2">Books & Online Courses</h4>
                    <p className="text-sm text-muted-foreground">
                      Countless resources from beginner to advanced levels, many available for free
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-border/50">
                    <h4 className="font-semibold text-foreground mb-2">Financial Professionals</h4>
                    <p className="text-sm text-muted-foreground">
                      CPAs, financial advisors, and certified planners can provide personalized education
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-border/50">
                    <h4 className="font-semibold text-foreground mb-2">Community Workshops & Seminars</h4>
                    <p className="text-sm text-muted-foreground">
                      Local organizations often offer free financial literacy programs
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="why" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <Lightbulb className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-semibold">WHY Is It Critical?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <p className="text-foreground leading-relaxed">
                  Financial literacy isn't just about money—it's about freedom, security, and opportunity:
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Avoid Costly Mistakes</h4>
                    <p className="text-sm text-foreground">
                      Understanding finance helps you avoid predatory loans, bad investments, and financial traps that can set you back decades
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Build Wealth</h4>
                    <p className="text-sm text-foreground">
                      Knowledge of investing, compounding, and asset allocation allows you to grow your wealth systematically
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Achieve Financial Freedom</h4>
                    <p className="text-sm text-foreground">
                      Understanding your income, expenses, and net worth puts you in control of your financial destiny
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Reduce Stress</h4>
                    <p className="text-sm text-foreground">
                      Financial uncertainty is a leading cause of stress. Knowledge brings confidence and peace of mind
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Create Generational Impact</h4>
                    <p className="text-sm text-foreground">
                      Financial literacy allows you to teach future generations, breaking cycles of poverty and building lasting legacy
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-center text-foreground text-lg font-medium">
                "An investment in knowledge pays the best interest." - Benjamin Franklin
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FinancialLiteracy;
