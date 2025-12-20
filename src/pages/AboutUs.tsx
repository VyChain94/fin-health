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
              <p className="text-foreground leading-relaxed">​We created these Financial Health Tools out of necessity—because real financial freedom requires more than just day-to-day budgeting.

Too often, the average person lacks access to clear, strategic tools that go beyond tracking expenses and actually help map out a path to long-term financial independence.

We’re here to change that.

Our mission is to provide a systematic, easy-to-use framework for understanding, planning, and achieving your Financial Freedom goals. While traditional budgeting apps show you where your money goes today, our tools are designed to show you where your money can take you tomorrow.

Whether you're just starting your journey or looking to level up your current financial strategy, our resources complement your existing budgeting habits and provide a full-spectrum view of your financial health—from daily spending to long-term freedom.

We believe financial clarity is power—and everyone deserves access to it.</p>

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