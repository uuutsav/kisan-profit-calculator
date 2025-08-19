# Kisan Profit Calculator 👨‍🌾💰

A modern web application designed to help farmers track crop-specific expenses and income, calculate profitability, and gain insights by comparing their results with historical market data and AI-powered analysis.

This application provides a clean, mobile-first interface to simplify financial management for farmers, leveraging real-world datasets for market analysis and the Google Gemini API for intelligent future outlooks.


## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   **Node.js:** You need Node.js installed, preferably version 18.x or later. You can download it from [nodejs.org](https://nodejs.org/).
-   **npm** or **yarn:** This project uses npm, which comes bundled with Node.js.
-   **Running Backend Server:** This frontend application is designed to communicate with its companion backend server. You **must** set up and run the backend server before starting the frontend.

### Frontend Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/farmer-profit-frontend.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd farmer-profit-frontend
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

5.  **Open in your browser:**
    The application should now be running. Open your browser and navigate to `http://localhost:5173` (or the address shown in your terminal).

### Backend Setup (Crucial)

For features like historical analysis to work, the backend server must be running.

1.  **Clone the backend repository:**
    (You should create a separate repository for your server code)
    ```sh
    git clone https://github.com/your-username/farmer-profit-backend.git
    cd farmer-profit-backend
    ```

2.  **Follow the instructions** in the backend's `README.md` file. The key steps will be:
    -   Install dependencies: `npm install`
    -   Create a `.env` file and add your `GEMINI_API_KEY`.
    -   Ensure the `dataset.json` file is present.
    -   Start the server: `node index.js`

3.  By default, the frontend expects the backend to be running on `http://localhost:3001`.


## ✨ Key Features

-   **Crop-wise Profit Tracking:** Manage finances for multiple crops individually.
-   **Detailed Transaction Logging:** Easily record various types of expenses (seeds, fertilizer, labor) and income from sales.
-   **Financial Overview Dashboard:** See a high-level summary of total profit and the performance of each crop at a glance.
-   **Historical Profit Comparison:** Analyze what you would have earned in previous years using a bundled dataset of real wholesale market prices.
-   **AI-Powered Analysis:** Utilizes the Google Gemini API (via a backend service) to provide a weather analysis and future outlook based on historical data.
-   **Responsive UI:** Built with Tailwind CSS for a seamless experience on both mobile and desktop devices.
-   **Client-Side Routing:** A smooth, single-page application (SPA) experience powered by React Router.

## 📸 Screenshots

<img width="1080" height="1036" alt="Screenshot from 2025-08-19 23-55-04" src="https://github.com/user-attachments/assets/d724615a-187f-49b9-8064-21aa8c0255a3" />

<img width="1614" height="1036" alt="Screenshot from 2025-08-19 23-55-09" src="https://github.com/user-attachments/assets/a4861553-0a6e-4bcc-8d9e-02a252ab74bb" />

<img width="1614" height="1036" alt="Screenshot from 2025-08-19 23-55-16" src="https://github.com/user-attachments/assets/595b4f07-cae0-44a1-ad7e-1b937e7970f2" />



## 🛠️ Tech Stack

-   **Frontend:** [React](https://reactjs.org/) (with Vite), [Tailwind CSS](https://tailwindcss.com/), [React Router](https://reactrouter.com/)
-   **Backend:** [Node.js](https://nodejs.org/), [Express](https://expressjs.com/) *(This frontend requires the corresponding backend server to be running to function fully).*
-   **AI:** [Google Gemini API](https://ai.google.dev/)
-   **Data Source:** Local JSON dataset (derived from Kaggle / AGMARKNET)

## 📁 Project Structure

```
/
├── public/
├── src/
│   ├── components/       # All reusable React components
│   │   ├── CropExpensesPage.jsx
│   │   ├── FinancialOverview.jsx
│   │   ├── HistoricalComparison.jsx
│   │   └── ...
│   ├── data.js           # Initial static data for crop list
│   ├── App.jsx           # Main component with React Router setup
│   ├── index.css         # Global styles and Tailwind CSS directives
│   └── main.jsx          # Application entry point
├── .gitignore
├── package.json
└── README.md
```

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
