import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

import styles from "./ExpensesByServiceChart.module.css"

function ExpensesByServiceChart({ data, total }) {
  const COLORS = [
    "#4f46e5",
    "#22c55e",
    "#f97316",
    "#0ea5e9",
    "#a855f7"
  ];
  if (data.length < 2) {
    return (
      <div className={styles.empty}>
        Додайте витрати для кількох послуг, щоб побачити розподіл
      </div>
    )
  }
  return (
    <div className={styles.card}>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              innerRadius={60}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.center}>
          <p className={styles.centerLabel}>В ньому</p>
          <p className={styles.centerValue}>{total} грн</p>
        </div>
      </div>
      <ul className={styles.legend}>
        {data.map((entry, index) => (
          <li key={entry.name} className={styles.legendItem}>
            <span 
              className={styles.legendDot}
              style={{ backgroundColor: COLORS[index % COLORS.length] }}  
            />
            <span className={styles.legendName}>{entry.name}</span>
            <span className={styles.legendValue}>{entry.value} грн</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExpensesByServiceChart