
const getFinancialAdvice = async (totalBudget, totalIncome, totalSpent) => {
    try {
        const response = await fetch('/api/getFinanceAdvice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ totalBudget, totalIncome, totalSpent }),
        })
        const data = await response.json()
        return data.advice;
      } catch (error) {
        console.error('Error:', error)
        return 'Failed to generate advice. Please try again.'
      }
};

export default getFinancialAdvice;
