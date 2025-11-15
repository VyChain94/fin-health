import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
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
              <p className="text-foreground leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>

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
    </div>
  );
};

export default AboutUs;
