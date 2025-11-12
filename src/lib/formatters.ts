export const formatCurrency = (value: number, isVisible: boolean = true): string => {
  if (!isVisible) {
    return "$•••••";
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
