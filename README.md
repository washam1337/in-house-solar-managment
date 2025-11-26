# ESS Core - Energy & Solar Solutions Manager

![ESS Core Banner](https://via.placeholder.com/1200x300?text=ESS+Core+Manager)

**ESS Core** is a comprehensive, production-ready web application designed for managing the day-to-day operations of a Solar Energy company. It provides a centralized command center for tracking clients, inventory, staff rosters, and financial health.

## 🚀 Features

### 📊 Dashboard (Command Center)
- **Priority Alerts**: Instant warnings for unpaid deposits, low stock, and roster conflicts.
- **Financial Snapshot**: Real-time tracking of Total Revenue, Collected, and Outstanding payments (Admin only).
- **Quick Stats**: At-a-glance view of active projects and staff availability.

### 👥 Client CRM
- **Lead & Client Management**: Track clients from 'Lead' to 'Completed'.
- **Financial Tracking**: Visual progress bars for payment status.
- **Sentiment Analysis**: Tag clients as 'Happy', 'Neutral', or 'Risk' to prioritize relationships.

### 📦 Inventory Hub
- **Real-Time Stock**: Track inventory levels with visual status indicators (Good, Low, Critical).
- **Stock Adjustments**: Easily increment/decrement stock or add new items.
- **Value Tracking**: Monitor unit prices and stock value.

### 👷 Team & Roster
- **Staff Management**: Manage your installation team and office staff.
- **Conflict Detection**: Automatically flags if a staff member is marked 'Absent' but assigned to a job.
- **Role-Based Access**: 'Admin' users have full control; 'Staff' users have restricted views.

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Backend**: Firebase (Authentication & Firestore)
- **State Management**: React Context API

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/ess-core.git
    cd ess-core
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Firebase configuration:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

## 🔐 Security Note

This project uses **Firebase Authentication** and **Firestore**. API keys are stored in environment variables and are **not** committed to the repository. Ensure you set up your own Firebase project and secure your `.env` file.

## 📄 License

This project is licensed under the MIT License.
