import dayjs from "dayjs"
import "dayjs/locale/uk"

dayjs.locale("uk")

export function formatDate(dateString) {
  return dayjs(dateString).format('DD MMMM YYYY')
}
