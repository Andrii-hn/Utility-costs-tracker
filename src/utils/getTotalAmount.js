export function getTotalAmount(serviceRecords) {
  let result = 0;
  const values = Object.values(serviceRecords);
  for (let records of values) {
    for (let record of records) {
      result += record.amount;
    }
  }
    return result
}