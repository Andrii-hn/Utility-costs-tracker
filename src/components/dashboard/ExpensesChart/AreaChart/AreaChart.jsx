import { CartesianGrid, ResponsiveContainer, XAxis, AreaChart, Area, YAxis, Tooltip} from "recharts"

import ExpensesTooltip from "../ExpensesTooltip/ExpensesTooltip"

import styles from "./AreaChart.module.css"
function ExpensesAreaChart({ data }) {
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
      <AreaChart data={data} margin={{ top: 16, right: 12, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="date" 
          tickLine={false}  
          tick={{ fontSize: 12, fill: "#6b7280"}}
        />
        <YAxis 
          tickLine={false}
          tick={{ fontSize: 12, fill: "#6b7280"}}
        />
        <Area 
          dataKey="amount"
          strokeWidth={2} 
          stroke="#4f46e5"
          activeDot={{ r: 4 }}
          animationEasing="ease-out"
        />
        <Tooltip 
          content={ExpensesTooltip}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ExpensesAreaChart