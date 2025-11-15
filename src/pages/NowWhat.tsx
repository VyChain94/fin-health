import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, TrendingUp, Users, BookOpen, Heart, Rocket, ArrowRight, ExternalLink } from "lucide-react";

const NowWhat = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Now What?
            </h1>
            <p className="text-lg text-muted-foreground">
              Actionable Steps to Position Yourself for Prosperity
            </p>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Rocket className="h-6 w-6 text-primary" />
                You've Got the Tools—Here's How to Use Them
              </CardTitle>
              <CardDescription className="text-base">
                Knowledge without action is just information. Let's turn your insights into impact with these strategic, non-financial steps that will compound over time.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  1. Define Your "Why"
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground">
                  Financial freedom means different things to different people. Before taking action, get crystal clear on YOUR definition of prosperity:
                </p>
                <ul className="space-y-2 ml-6 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>What does financial freedom look like for you specifically?</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>What experiences, relationships, or causes matter most?</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Write it down. Make it vivid. Make it personal.</span>
                  </li>
                </ul>
                <div className="p-4 bg-muted/50 rounded-lg border border-border/50 mt-4">
                  <p className="text-sm font-medium text-foreground">
                    <strong>Action:</strong> Spend 15 minutes this week journaling your ideal life 5 years from now. Be specific about how you spend your time, who you're with, and how you feel.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  2. Commit to Continuous Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground">
                  Your earning potential is directly tied to what you know and how you apply it. Make learning a daily habit:
                </p>
                <ul className="space-y-2 ml-6 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Read 10 pages of a finance or personal development book daily</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Listen to podcasts during commutes or workouts</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Take one online course per quarter in your field or a complementary skill</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Follow thought leaders and engage with their content critically</span>
                  </li>
                </ul>
                <div className="p-4 bg-muted/50 rounded-lg border border-border/50 mt-4">
                  <p className="text-sm font-medium text-foreground">
                    <strong>Action:</strong> Choose one skill that would increase your value in your career or business. Schedule 30 minutes daily to develop it.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  3. Build Your Network Strategically
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground">
                  Your network is your net worth. Surround yourself with people who challenge, inspire, and elevate you:
                </p>
                <ul className="space-y-2 ml-6 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Audit your circle: Are they where you want to be?</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Join professional groups, mastermind circles, or industry associations</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Reach out to mentors—people rarely say no to coffee or a 15-minute call</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Give value first: help others connect, share resources, provide introductions</span>
                  </li>
                </ul>
                <div className="p-4 bg-muted/50 rounded-lg border border-border/50 mt-4">
                  <p className="text-sm font-medium text-foreground">
                    <strong>Action:</strong> Reach out to three people this month who are one step ahead of where you want to be. Ask thoughtful questions and build genuine relationships.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  4. Protect Your Most Valuable Asset: You
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground">
                  You can't build wealth if you're burned out, unhealthy, or mentally exhausted. Prosperity requires sustainable energy:
                </p>
                <ul className="space-y-2 ml-6 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Prioritize sleep: Aim for 7-9 hours consistently</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Move your body: Exercise isn't optional for peak performance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Manage stress: Practice meditation, journaling, or therapy</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Set boundaries: Protect your time and energy from drains</span>
                  </li>
                </ul>
                <div className="p-4 bg-muted/50 rounded-lg border border-border/50 mt-4">
                  <p className="text-sm font-medium text-foreground">
                    <strong>Action:</strong> Schedule a health checkup this month. Identify one health habit to improve and track it daily for 30 days.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  5. Leverage Professional Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground">
                  You don't have to figure everything out alone. Strategic partnerships with professionals can accelerate your progress exponentially:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Financial Professionals
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      CPAs, tax professionals, and specialized accountants can save you more than they cost through strategic planning and optimization.
                    </p>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to="/professionals" className="flex items-center gap-2">
                        Browse Directory
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border border-accent/20 bg-accent/5">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Passive Income Opportunities
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Explore investment opportunities that work for you 24/7, building wealth while you focus on your highest-value activities.
                    </p>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to="/passive-income" className="flex items-center gap-2">
                        Explore Opportunities
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border/50 mt-4">
                  <p className="text-sm font-medium text-foreground">
                    <strong>Action:</strong> Review the Professionals directory and identify which type of expert could most impact your current financial situation. Schedule a consultation within the next two weeks.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  6. Create Systems, Not Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground">
                  Goals are destinations. Systems are the vehicles that get you there consistently:
                </p>
                <ul className="space-y-2 ml-6 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Instead of "save more," create an automatic transfer system</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Instead of "get healthy," build a morning routine that includes movement</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Instead of "learn more," schedule learning time like meetings</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Focus on inputs (actions you control) not outcomes (results you can't guarantee)</span>
                  </li>
                </ul>
                <div className="p-4 bg-muted/50 rounded-lg border border-border/50 mt-4">
                  <p className="text-sm font-medium text-foreground">
                    <strong>Action:</strong> Identify your most important goal. Design one system that, if followed consistently, would make that goal inevitable. Implement it this week.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-2xl font-bold text-center text-foreground">
                The Path Forward
              </h3>
              <p className="text-center text-foreground">
                Success isn't about giant leaps—it's about consistent, strategic steps in the right direction. You've gained clarity on your financial position. Now it's time to act with intention, surround yourself with the right people and resources, and build the life you deserve.
              </p>
              <p className="text-center text-lg font-semibold text-primary mt-6">
                The best time to start was yesterday. The second-best time is now.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NowWhat;
