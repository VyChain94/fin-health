import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhyToolsMatterSection } from "@/components/dashboard/WhyToolsMatterSection";
const AboutUs = () => {
  return <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <WhyToolsMatterSection />
        <div className="max-w-4xl mx-auto space-y-8 mt-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Empowering Your Financial Journey
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground leading-relaxed">These Financial Health Resources were created out of necessity—to provide a clear, systematic roadmap for achieving Financial Freedom. While many people already use budgeting tools to manage day-to-day expenses, very few tools focus on the bigger picture: tracking progress toward long-term financial independence.

This app fills that gap.

It complements your existing budgeting tools by providing insightful, goal-oriented tracking—not just where your money goes today, but how each decision impacts your journey to Financial Freedom. Whether you're just starting out or fine-tuning an existing plan, these tools are designed to give you a complete view of your financial health.</p>

              <div className="grid md:grid-cols-2 gap-6 pt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Personal</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Business</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Twitter className="h-4 w-4" />
                        Twitter/X
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>;
};
export default AboutUs;