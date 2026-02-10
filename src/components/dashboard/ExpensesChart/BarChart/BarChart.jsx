import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

import ExpensesTooltip from "../ExpensesTooltip/ExpensesTooltip"

import styles from "./BarChart.module.css"

function ExpensesBarChart({ data }) {
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
      <BarChart 
        data={data}
        margin={{ top: 16, right: 12, left: 0, bottom: 8 }}
        style={{ aspectRatio: 1.618 }}
      >
        <Bar 
          dataKey="amount" 
          fill="#8884d8"
          animationEasing="ease-out"  
        />
        <XAxis 
          dataKey="date" 
          tickLine={false}
          tick={{ fontSize: 12, fill: "#6b7280"}}  
        />
        <YAxis 
          tickLine={false}
          tick={{ fontSize: 12, fill: "#6b7280"}}
        />

        <Tooltip 
          content={ExpensesTooltip}
        />

      </BarChart>

    </ResponsiveContainer>
  )
}

export default ExpensesBarChart