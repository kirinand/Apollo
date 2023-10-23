import { getDaysInMonth } from "date-fns"

export const checkPath = (year: string, month?: string, day?: string) => {
  const currentYear = new Date().getFullYear()

  if (!/^(\d{4})$/.test(year) || parseInt(year) > currentYear || parseInt(year) < 2023) {
    return false
  } else if (month && (!/^(\d{2})$/.test(month) || parseInt(month) > 12 || parseInt(month) < 1)) {
    return false
  } else if (month && day && (!/^(\d{2})$/.test(day) || parseInt(month) > getDaysInMonth(new Date(parseInt(year), parseInt(month))) || parseInt(day) < 1)) {
    return false
  }
  return true
}