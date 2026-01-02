# Salahkar - Legal Platform

A comprehensive React-based legal technology platform with document management, legal judgments, and expert support.

## Project Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Create Environment Variables**

   ```bash
   copy .env.example .env
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production build.

## Project Structure

```
f:\Salahkar/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── landing/        # Landing page components
│   │   ├── dashboard/      # Dashboard components
│   │   └── ...            # Other components
│   ├── pages/              # Page components (routes)
│   ├── contexts/           # React Context (Auth)
│   ├── services/           # API services
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── public/
│   └── index.html         # HTML entry point
├── package.json           # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS config
└── .gitignore           # Git ignore file
```

## Available Routes

- `/` - Landing page
- `/login` - Login page
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/about` - About page
- `/blog` - Blog listing
- `/browse-acts` - Browse legal acts
- `/law-library` - Law library
- `/legal-chatbot` - AI legal chatbot
- `/pricing` - Pricing page
- And more...

## Technologies

- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icon library

## Notes

- The application uses Tailwind CSS for styling
- Authentication context is available globally
- API service with interceptors is configured
- All pages are routed in App.jsx

## Next Steps

1. Connect to a backend API by updating `.env` file
2. Implement actual page content in `src/pages/`
3. Customize components in `src/components/`
4. Add more features and functionality

---

**Start the development server with:** `npm run dev`
