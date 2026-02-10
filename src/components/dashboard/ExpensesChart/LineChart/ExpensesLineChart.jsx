import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, CartesianGrid } from "recharts"

import ExpensesTooltip from "../ExpensesTooltip/ExpensesTooltip"

import styles from "./ExpensesLineChart.module.css"

function ExpensesLineChart({data}) {
  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        Поки що немає даних для побудови графіка
      </div>
    )
  }
  if (data.length === 1) {
    return (
      <div className={styles.empty}>
        Додайте ще один запис, щоб побачити динаміку витрат
      </div>
    )
  }
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 16, right: 12, left: 0, bottom: 8 }}>
        <CartesianGrid 
          stroke="#e5e7eb"
        />
        <XAxis 
          dataKey="date"
          tickLine={false}
          tick={{ fontSize: 12, fill: "#6b7280"}}
        />
        <YAxis 
        //   tickFormatter={(value) => `${value} грн`}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#6b7280"}}
        />
        <Line 
          dataKey="amount"
          type="monotone"
          strokeWidth={2} 
          stroke="#4f46e5"
          activeDot={{ r: 4 }}
          animationEasing="ease-out"
        />
        <Tooltip 
          content={ExpensesTooltip}
        />
      </LineChart>
    </ResponsiveContainer>
  ) 
}

export default ExpensesLineChart