# Lumina Finance OS

## Overview
Lumina Finance OS is a React + Vite personal finance dashboard designed to help users track income, spending, savings goals, subscriptions, and long-term financial growth.

The project is designed to support both front-end financial tracking and optional R-based statistical analysis for forecasting, scenario planning, and deeper insights into spending patterns.

The app presents a modern dark-themed interface with summary cards, charts, filters, and goal tracking for a single-user finance dashboard.

## Features
- Net worth overview
- Income and expense tracking
- Transaction search, filtering, sorting, and CSV export
- Budget monitoring by spending category
- Savings goals with progress bars and quick deposits
- Subscription and recurring billing management
- Analytics panel with wealth projection simulator
- Local persistence using browser localStorage

## Project Structure
- src/App.jsx: main app state and feature wiring
- src/data/initialData.js: demo financial data
- src/components/: UI modules for each dashboard section
- src/index.css: global styling and theme
- package.json: project scripts and dependencies

## Tech Stack
- React
- Vite
- Recharts
- lucide-react
- R (optional analytics, forecasting, and statistical modeling)

## R Programming Integration
R can be used in this project as a complementary analytics layer for:
- spending trend analysis
- scenario forecasting for savings and investment growth
- recurring expense detection
- monthly budget analysis
- custom financial reporting and data exports

A typical structure could include a future folder such as:

```bash
R/
  analysis/
    finance_dashboard_analysis.R
    wealth_forecast.R
```

This allows advanced analysis to be performed outside the main dashboard while still using the same finance dataset.

The project currently includes a working sample script at `R/analysis/finance_analysis.R` and a sample CSV export at `data/sample_transactions.csv`.

### Run the R analysis
Install R and then run:

```bash
Rscript R/analysis/finance_analysis.R data/sample_transactions.csv
```

This reads the sample transaction dataset, summarizes income and expenses, and prints a basic financial insight report.

## Run the app
From the project root:

```bash
npm install
npm run dev
```

The app will run in development mode using Vite.

## Build
```bash
npm run build
```

## Notes
- The app currently uses local demo data seeded from the initial dataset.
- Data is stored in browser localStorage, so changes are retained on refresh in the same browser.
- This project is best suited as a front-end prototype or portfolio finance dashboard rather than a full production finance backend.
