import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { WhyToolsMatterSection } from "@/components/dashboard/WhyToolsMatterSection";

const Tools = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const toolsCategories = {
    games: {
      title: "Games",
      terms: [
        {
          term: "CASHFLOW® 101",
          definition: "The original CASHFLOW game focused on escaping the 'Rat Race' by building passive income through assets."
        },
        {
          term: "CASHFLOW® Classic",
          definition: "Board game created by Robert Kiyosaki that teaches financial literacy through simulated investing, real estate, and business decisions."
        },
        {
          term: "CASHFLOW® for Kids",
          definition: "Simplified version of the CASHFLOW game designed to teach children ages 6+ basic financial concepts."
        }
      ]
    },
    books: {
      title: "Books",
      terms: [
        {
          term: "FAKE: Fake Money, Fake Teachers, Fake Assets",
          definition: "Exposes the hidden forces behind the global economy and teaches how to distinguish real financial education from fake."
        },
        {
          term: "Money: Master the Game",
          definition: "Tony Robbins' guide presenting 7 simple steps to financial freedom, featuring insights from the world's greatest financial minds."
        },
        {
          term: "Rich Dad Poor Dad",
          definition: "Robert Kiyosaki's bestselling book contrasting the financial philosophies of his 'rich dad' and 'poor dad,' emphasizing financial education and asset building."
        },
        {
          term: "Rich Dad's Guide to Investing",
          definition: "Covers the investing strategies of the rich, including how to reduce risk and increase returns."
        },
        {
          term: "The CASHFLOW Quadrant",
          definition: "Explains the four ways people earn income: Employee, Self-Employed, Business Owner, and Investor, and how to move toward financial freedom."
        },
        {
          term: "Why the Rich Are Getting Richer",
          definition: "Explores why financial education is more valuable than money and how the rich think differently about wealth."
        },
        {
          term: "You Deserve to Be Rich",
          definition: "A guide to mastering the inner game of wealth and claiming your future through mindset and practical strategies."
        }
      ]
    },
    media: {
      title: "Media",
      terms: [
        {
          term: "Earn Your Leisure",
          definition: "Popular podcast and media platform hosted by Rashad Bilal and Troy Millings, focused on business, finance, and economic empowerment."
        },
        {
          term: "Rich Dad Blog",
          definition: "Online articles and resources covering current financial topics, investment opportunities, and educational content."
        },
        {
          term: "Rich Dad Radio Show",
          definition: "Weekly podcast hosted by Robert Kiyosaki featuring interviews with experts on money, investing, and personal finance."
        },
        {
          term: "The Rich Dad Channel",
          definition: "YouTube channel with educational videos on financial literacy, investing strategies, and wealth building."
        }
      ]
    },
    events: {
      title: "Events & Networks",
      terms: [
        {
          term: "CASHFLOW Clubs",
          definition: "Local meetup groups where people play the CASHFLOW game together and discuss financial strategies."
        },
        {
          term: "Eventbrite.com",
          definition: "Event discovery platform to find local and virtual financial education workshops, investment seminars, and networking events."
        },
        {
          term: "Meetup.com",
          definition: "Platform to discover and join local groups focused on investing, real estate, entrepreneurship, and financial independence."
        },
        {
          term: "Protectwealth.com",
          definition: "Resource for wealth protection strategies, asset protection education, and financial planning events."
        },
        {
          term: "Real Estate Investment Association (REIA)",
          definition: "Local associations providing networking, education, and resources for real estate investors at all experience levels."
        },
        {
          term: "Rich Dad Community",
          definition: "Online community of like-minded individuals focused on financial education and wealth building."
        },
        {
          term: "Rich Dad Workshops",
          definition: "Educational seminars and workshops teaching practical financial skills, investing strategies, and business development."
        }
      ]
    },
    leaders: {
      title: "Leaders",
      terms: [
        {
          term: "19 Keys",
          definition: "Entrepreneur and educator known for teaching financial literacy, wealth building, and economic empowerment in underserved communities."
        },
        {
          term: "Don Peebles",
          definition: "Real estate entrepreneur, author, and advocate for diversity in business, known for building one of the largest Black-owned real estate development companies."
        },
        {
          term: "Ian Dunlap",
          definition: "Investment strategist and educator known for teaching stock market investing and wealth building strategies."
        },
        {
          term: "Kenney Conwell",
          definition: "Financial educator and wealth coach focused on helping individuals build generational wealth through strategic investing."
        },
        {
          term: "Kim Kiyosaki",
          definition: "Author of Rich Woman and advocate for women's financial independence. Co-founder of the Rich Dad Company."
        },
        {
          term: "Rashad Bilal",
          definition: "Co-host of Earn Your Leisure, entrepreneur, and financial educator focused on making financial literacy accessible."
        },
        {
          term: "Ray Dalio",
          definition: "Founder of Bridgewater Associates, author of Principles, and thought leader on economic cycles and investment strategies."
        },
        {
          term: "Robert Kiyosaki",
          definition: "Author of Rich Dad Poor Dad and founder of the Rich Dad Company. Known for teaching financial literacy and the importance of financial education."
        },
        {
          term: "Shaquanna Brooks",
          definition: "CPA, financial educator, and advocate for wealth building and economic empowerment."
        },
        {
          term: "Sharon Lechter",
          definition: "Co-author of Rich Dad Poor Dad and financial literacy advocate. CPA and founder of Pay Your Family First."
        },
        {
          term: "Troy Millings",
          definition: "Co-host of Earn Your Leisure and entrepreneur dedicated to financial education and community wealth building."
        }
      ]
    }
  };

  const filterTerms = (terms: typeof toolsCategories.games.terms) => {
    if (!searchTerm) return terms;
    return terms.filter(
      (item) =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <WhyToolsMatterSection />
        <div className="mb-8 mt-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">Financial Education Tools</h1>
          <p className="text-muted-foreground text-lg">
            Discover resources to expand your financial knowledge through games, books, media, events, and thought leaders.
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tools or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-6">
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="events">Events & Networks</TabsTrigger>
            <TabsTrigger value="leaders">Leaders</TabsTrigger>
          </TabsList>

          {Object.entries(toolsCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">{category.title}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {filterTerms(category.terms).map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-semibold">
                        {item.term}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.definition}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                  {filterTerms(category.terms).length === 0 && (
                    <p className="text-muted-foreground text-center py-8">
                      No tools found matching your search.
                    </p>
                  )}
                </Accordion>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Tools;
