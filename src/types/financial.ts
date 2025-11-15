export interface FinancialData {
  income: {
    earned1: number;
    earned2: number;
    realEstate: number;
    business: number;
    interest: number;
    dividends: number;
    other: number;
  };
  expenses: {
    homeLoan: number;
    homeMaintenance: number;
    homeUtilities: number;
    carTravel: number;
    cellPhones: number;
    investments: number;
    otherExpenses: number;
    carLoans: number;
    creditCards: number;
    schoolLoans: number;
    personalCare: number;
    subscriptions: number;
    shopping: number;
    travelVacation: number;
    medicalExpenses: number;
    medicalInsurance: number;
    taxes: number;
  };
  assets: {
    bankAccounts: number;
    preciousMetals: number;
    retirement: number;
    stocks: number;
    otherAssets: number;
    business: number;
    realEstate: number;
    doodadsHome: number;
    doodadsCar: number;
    doodadsOther: number;
  };
  liabilities: {
    creditCards: number;
    carLoans: number;
    homeMortgage: number;
    personalLoans: number;
    schoolLoans: number;
    otherDebt: number;
  };
}
