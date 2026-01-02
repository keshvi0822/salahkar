import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Import all page components
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BrowseActs from './pages/BrowseActs';
import ActDetails from './pages/ActDetails';
import LawLibrary from './pages/LawLibrary';
import LawMapping from './pages/LawMapping';
import MappingDetails from './pages/MappingDetails';
import LegalJudgments from './pages/LegalJudgments';
import LegalChatbot from './pages/LegalChatbot';
import LegalTemplate from './pages/LegalTemplate';
import Bookmarks from './pages/Bookmarks';
import Referral from './pages/Referral';
import OurTeam from './pages/OurTeam';
import PricingPage from './pages/PricingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import YoutubeVideoSummary from './pages/YoutubeVideoSummary';
import LanguageSelectorDemo from './pages/LanguageSelectorDemo';

// Layout component to wrap providers
function RootLayout() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Outlet />
      </NotificationProvider>
    </AuthProvider>
  );
}

// Create router with future flags to eliminate deprecation warnings
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <div>404 - Page Not Found</div>,
      children: [
        { index: true, element: <LandingPage /> },
        { path: 'login', element: <Login /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'profile', element: <Profile /> },
        { path: 'about', element: <About /> },
        { path: 'blog', element: <Blog /> },
        { path: 'blog/:postId', element: <BlogPost /> },
        { path: 'browse-acts', element: <BrowseActs /> },
        { path: 'act/:actId', element: <ActDetails /> },
        { path: 'law-library', element: <LawLibrary /> },
        { path: 'law-mapping', element: <LawMapping /> },
        { path: 'mapping/:id', element: <MappingDetails /> },
        { path: 'legal-judgments', element: <LegalJudgments /> },
        { path: 'legal-chatbot', element: <LegalChatbot /> },
        { path: 'legal-template', element: <LegalTemplate /> },
        { path: 'bookmarks', element: <Bookmarks /> },
        { path: 'referral', element: <Referral /> },
        { path: 'our-team', element: <OurTeam /> },
        { path: 'pricing', element: <PricingPage /> },
        { path: 'privacy', element: <PrivacyPolicy /> },
        { path: 'terms', element: <TermsOfService /> },
        { path: 'youtube-summary', element: <YoutubeVideoSummary /> },
        { path: 'language-demo', element: <LanguageSelectorDemo /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default function App() {
  // Debug: prove React is mounting
  React.useEffect(() => {
    console.log('✅ App mounted successfully');
  }, []);

  return (
    <>
      {/* Visible proof React is rendering */}
      <div style={{ position: 'fixed', top: 0, right: 0, background: 'lime', padding: '4px 8px', zIndex: 99999, fontSize: '11px' }}>
        React OK
      </div>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
}
