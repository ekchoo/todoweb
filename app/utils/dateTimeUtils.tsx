import { format } from "date-fns";

export function getCurrentDateTime() {
  return format(new Date(), "yyyy-MM-dd HH:mm:ss");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "yyyy-MM-dd");
}

export function addDays(days) {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return formatDate(result.toISOString());
}
