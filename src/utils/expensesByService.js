export function prepareExpensesByServiceData({ serviceRecords, services }) {
  let data = [];
  let total = 0;
  for (let service of services) {
    let records = serviceRecords[service.id] || [];
    let serviceTotal = 0;
    for (let record of records) {
      serviceTotal += record.amount;
    }
    if (serviceTotal > 0) {
      data.push({
        name: service.name,
        value: serviceTotal
      })
      total += serviceTotal;
    }
  }
  return { data, total };
}
