export function prepareExpensesChartData(records) {
  return records
    .slice()
    .sort((a,b) => a.date.localeCompare(b.date))
    .map(record => ({
        date: record.date,
        amount: record.amount
    }))
}