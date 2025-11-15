import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const glossaryCategories = {
    income: {
      title: "Income & Revenue",
      terms: [
        {
          term: "Active Income",
          definition: "Money earned from direct participation in work or business activities, such as salaries, wages, or self-employment income."
        },
        {
          term: "Passive Income",
          definition: "Money earned with minimal active effort, such as rental income, dividends, royalties, or income from investments."
        },
        {
          term: "Portfolio Income",
          definition: "Income generated from investments such as stocks, bonds, mutual funds, including capital gains and dividends."
        },
        {
          term: "Gross Income",
          definition: "Total income before taxes and deductions."
        },
        {
          term: "Net Income",
          definition: "Income remaining after all taxes, deductions, and expenses have been subtracted."
        }
      ]
    },
    assets: {
      title: "Assets & Investments",
      terms: [
        {
          term: "Asset",
          definition: "Anything of value that you own, such as cash, investments, real estate, or personal property."
        },
        {
          term: "Liquid Asset",
          definition: "Assets that can be quickly converted to cash, such as savings accounts, stocks, or money market funds."
        },
        {
          term: "Appreciation",
          definition: "An increase in the value of an asset over time."
        },
        {
          term: "Equity",
          definition: "The value of an asset after subtracting any debts or liabilities associated with it."
        },
        {
          term: "ROI (Return on Investment)",
          definition: "A measure of the profitability of an investment, calculated as (Gain - Cost) / Cost × 100%."
        },
        {
          term: "Diversification",
          definition: "The practice of spreading investments across different asset types to reduce risk."
        }
      ]
    },
    liabilities: {
      title: "Liabilities & Debt",
      terms: [
        {
          term: "Liability",
          definition: "A financial obligation or debt that you owe to others."
        },
        {
          term: "Good Debt",
          definition: "Debt used to acquire assets that may appreciate in value or generate income, such as mortgages or student loans."
        },
        {
          term: "Bad Debt",
          definition: "Debt used to purchase depreciating assets or consumables, such as credit card debt for non-essential purchases."
        },
        {
          term: "APR (Annual Percentage Rate)",
          definition: "The yearly interest rate charged on borrowed money, including fees."
        },
        {
          term: "Debt-to-Income Ratio",
          definition: "The percentage of your monthly gross income that goes toward paying debts."
        }
      ]
    },
    expenses: {
      title: "Expenses & Budgeting",
      terms: [
        {
          term: "Fixed Expenses",
          definition: "Regular expenses that remain relatively constant each month, such as rent, mortgage, or insurance."
        },
        {
          term: "Variable Expenses",
          definition: "Expenses that fluctuate month to month, such as groceries, utilities, or entertainment."
        },
        {
          term: "Discretionary Spending",
          definition: "Non-essential spending on wants rather than needs, such as dining out or hobbies."
        },
        {
          term: "Budget",
          definition: "A plan for how to allocate income across expenses, savings, and investments."
        }
      ]
    },
    freedom: {
      title: "Financial Freedom Levels",
      terms: [
        {
          term: "Financial Security",
          definition: "When passive income covers basic living expenses (housing, utilities, food, transportation)."
        },
        {
          term: "Financial Vitality",
          definition: "When passive income covers basic expenses plus half of discretionary spending (entertainment, dining out)."
        },
        {
          term: "Financial Independence",
          definition: "When passive income covers all current lifestyle expenses without needing to work."
        },
        {
          term: "Financial Freedom",
          definition: "When passive income exceeds current lifestyle by 50%, providing buffer and upgrade capability."
        },
        {
          term: "Absolute Financial Freedom",
          definition: "When passive income enables any desired lifestyle without financial constraints."
        }
      ]
    },
    general: {
      title: "General Financial Terms",
      terms: [
        {
          term: "Net Worth",
          definition: "The total value of your assets minus your liabilities."
        },
        {
          term: "Cash Flow",
          definition: "The net amount of money moving in and out of your accounts over a period of time."
        },
        {
          term: "Emergency Fund",
          definition: "Savings set aside to cover unexpected expenses or financial emergencies, typically 3-6 months of expenses."
        },
        {
          term: "Inflation",
          definition: "The rate at which the general level of prices for goods and services rises, reducing purchasing power."
        },
        {
          term: "Compound Interest",
          definition: "Interest calculated on the initial principal and accumulated interest from previous periods."
        },
        {
          term: "Financial Statement",
          definition: "A formal record of financial activities, including income, expenses, assets, and liabilities."
        }
      ]
    }
  };

  const filterTerms = (terms: typeof glossaryCategories.income.terms) => {
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">Financial Glossary</h1>
          <p className="text-muted-foreground text-lg">
            Understand key financial terms to make informed decisions and boost your financial vocabulary.
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        <Tabs defaultValue="income" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="liabilities">Liabilities</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="freedom">Freedom</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          {Object.entries(glossaryCategories).map(([key, category]) => (
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
                      No terms found matching your search.
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

export default Glossary;
