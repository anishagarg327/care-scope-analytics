# CareScope Analytics

**Frontend Wars 2026 - Phase 1 Submission**

CareScope Analytics is a modern, responsive, and fully client-side Healthcare Analytics SaaS platform. It is designed to empower hospitals and healthcare professionals by visualizing patient appointments, medical histories, and resource forecasts through an intuitive and premium interface.

## 🚀 Features

The application meets all 5 mandatory features outlined in the Phase 1 Problem Statement:
1. **Interactive Healthcare Dashboard**: High-level metrics, active appointments, and dynamic patient influx area charts.
2. **Treatment Timeline & Diagnostic Reports**: A vertical timeline UI to visualize patient treatment history alongside diagnostic report summaries.
3. **Predictive Charts (UI Only)**: AI-driven forecasts using `Recharts` to showcase resource utilization and expected patient influx.
4. **Scheduling Interface & Live Monitoring Widgets**: Real-time hospital metrics (ER wait times) and a fully interactive, functional scheduling calendar to book appointments.
5. **Customizable Reports**: A comprehensive, filterable, and searchable patient data table with export mock functionality.

## 🛠 Tech Stack

Built strictly according to the Frontend Wars 2026 Eligibility Guidelines:
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Routing**: React Router DOM

*Note: All data is purely mock JSON data stored client-side. There are absolutely zero backend dependencies, cloud databases, or external dynamic APIs in this project.*

## 💻 How to Run Locally

1. **Install Dependencies**
   Ensure you have Node.js installed. In the project root, run:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **View the Application**
   Open your browser and navigate to `http://localhost:5173/`. 
   *Tip: Use the Sun/Moon icon in the top right of the dashboard header to test the built-in Dark Mode!*

## 📝 Design Decisions

- **Aesthetics**: Focused heavily on premium SaaS UI/UX using subtle glassmorphism, fluid entry animations (`fade-in`, `slide-in-from-bottom`), and harmonious color palettes.
- **Interactivity**: The application is not just static UI; the Schedule and Reports pages use React local state to allow actual filtering and data manipulation to demonstrate advanced frontend capability.
- **Responsiveness**: Entirely mobile-friendly with collapsing grids and responsive Recharts components.
