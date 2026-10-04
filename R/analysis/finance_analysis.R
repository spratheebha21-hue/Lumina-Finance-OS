args <- commandArgs(trailingOnly = TRUE)
input_path <- if (length(args) > 0) args[1] else "data/sample_transactions.csv"

if (!file.exists(input_path)) {
  stop(
    paste(
      "Input file not found:", input_path,
      "\nUse a CSV export from the app or provide a path to a transaction dataset."
    )
  )
}

transactions <- read.csv(input_path, stringsAsFactors = FALSE)

required_columns <- c("date", "description", "category", "type", "amount", "account")
missing_columns <- setdiff(required_columns, names(transactions))

if (length(missing_columns) > 0) {
  stop(paste("Missing required columns:", paste(missing_columns, collapse = ", ")))
}

transactions$date <- as.Date(transactions$date)
transactions$amount <- as.numeric(transactions$amount)
transactions$type <- tolower(trimws(transactions$type))

income_total <- sum(transactions$amount[transactions$type == "income"], na.rm = TRUE)
expense_total <- sum(transactions$amount[transactions$type == "expense"], na.rm = TRUE)
net_savings <- income_total - expense_total
savings_rate <- if (income_total > 0) (net_savings / income_total) * 100 else 0

monthly_summary <- aggregate(
  amount ~ format(date, "%Y-%m"),
  data = transactions,
  FUN = sum
)

names(monthly_summary) <- c("month", "total")

category_summary <- aggregate(
  amount ~ category,
  data = subset(transactions, type == "expense"),
  FUN = sum
)
category_summary <- category_summary[order(category_summary$amount, decreasing = TRUE), ]

cat("\n=== Lumina Finance R Analysis ===\n")
cat(sprintf("Data source: %s\n", input_path))
cat(sprintf("Total income: $%.2f\n", income_total))
cat(sprintf("Total expenses: $%.2f\n", expense_total))
cat(sprintf("Net savings: $%.2f\n", net_savings))
cat(sprintf("Savings rate: %.1f%%\n\n", savings_rate))

cat("=== Monthly totals ===\n")
print(monthly_summary)

cat("\n=== Highest expense categories ===\n")
print(category_summary)

cat("\n=== Quick insight ===\n")
if (net_savings >= 0) {
  cat("The current cash flow is positive. Consider allocating a portion of surplus funds to goals or investments.\n")
} else {
  cat("The current cash flow is negative. Review discretionary spending categories and reduce one-off expenses.\n")
}
