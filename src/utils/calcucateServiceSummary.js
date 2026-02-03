export function calculateServiceSummary(records, hasMeter) {
  let totalAmount = 0;
  let totalUsage = hasMeter ? 0 : null;
  let fromDate = null;
  let toDate = null;
  let skippedUsageRecords = 0;

  for (const record of records) {
    totalAmount += record.amount;
    if (fromDate === null || record.date < fromDate) {
      fromDate = record.date;
    }

    if (toDate === null || record.date > toDate) {
      toDate = record.date;
    }

    if (hasMeter) {
      const { startValue, endValue } = record;
      if (
        startValue === null ||
        endValue === null ||
        endValue < startValue
      ) {
        skippedUsageRecords += 1;
        continue;
      }

      totalUsage += endValue - startValue;
    }
  }

  return {
    totalAmount,
    totalUsage,
    fromDate,
    toDate,
    skippedUsageRecords,
  };
}