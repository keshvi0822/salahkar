import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Calendar as CalendarIcon,
  Bookmark,
  FileText as Note,
  X,
  ChevronRight,
  FileText,
  Trash2,
  Menu
} from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Calendar from '../components/dashboard/Calendar';
import Bookmarks from '../components/dashboard/Bookmarks';
import Notes from '../components/dashboard/Notes';
import RecentlyDeleted from '../components/dashboard/RecentlyDeleted';
import apiService from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksLoading, setBookmarksLoading] = useState(false);
  const [notesCount, setNotesCount] = useState(0);
  const [notesLoading, setNotesLoading] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  // Clear bookmarks when user changes or logs out
  useEffect(() => {
    if (!isAuthenticated || !user) {
      setBookmarks([]);
      setBookmarksLoading(false);
      return;
    }
  }, [isAuthenticated, user]);

  // Load bookmarks for dashboard
  useEffect(() => {
    const loadBookmarks = async () => {
      if (!isAuthenticated || !user) {
        setBookmarks([]);
        return;
      }

      setBookmarksLoading(true);
      try {
        const response = await apiService.getUserBookmarks({ limit: 10 });
        if (response.bookmarks) {
          setBookmarks(response.bookmarks);
        } else {
          setBookmarks([]);
        }
      } catch (err) {
        console.error('Error loading bookmarks for dashboard:', err);
        setBookmarks([]);
      } finally {
        setBookmarksLoading(false);
      }
    };

    if (activeTab === 'home' && isAuthenticated && user) {
      loadBookmarks();
    } else {
      setBookmarks([]);
    }
  }, [isAuthenticated, activeTab, user?.id]); // Add user.id dependency to reload when user changes

  // Load upcoming events for dashboard
  useEffect(() => {
    const loadUpcomingEvents = async () => {
      if (!isAuthenticated || !user) {
        setUpcomingEvents([]);
        return;
      }

      setEventsLoading(true);
      try {
        // Get today's date
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;

        // Get events from today onwards (next 30 days)
        const futureDate = new Date(today);
        futureDate.setDate(futureDate.getDate() + 30);
        const futureYear = futureDate.getFullYear();
        const futureMonth = String(futureDate.getMonth() + 1).padStart(2, '0');
        const futureDay = String(futureDate.getDate()).padStart(2, '0');
        const futureStr = `${futureYear}-${futureMonth}-${futureDay}`;

        const response = await apiService.getCalendarEvents({
          start_date: todayStr,
          end_date: futureStr,
          limit: 10
        });

        // Map API events to component format and sort by date
        const mappedEvents = (response.events || [])
          .map((apiEvent) => {
            const eventDate = new Date(apiEvent.date);
            let formattedTime = apiEvent.time || '';
            if (formattedTime && formattedTime.includes(':')) {
              const timeParts = formattedTime.split(':');
              formattedTime = `${timeParts[0]}:${timeParts[1]}`;
            }
            return {
              id: apiEvent.id,
              title: apiEvent.event_title,
              description: apiEvent.description || '',
              date: eventDate,
              time: formattedTime,
              created_at: apiEvent.created_at
            };
          })
          .sort((a, b) => {
            // Sort by date, then by time
            const dateCompare = a.date.getTime() - b.date.getTime();
            if (dateCompare !== 0) return dateCompare;
            return (a.time || '').localeCompare(b.time || '');
          })
          .slice(0, 5); // Get top 5 upcoming events

        setUpcomingEvents(mappedEvents);
      } catch (err) {
        console.error('Error loading upcoming events for dashboard:', err);
        setUpcomingEvents([]);
      } finally {
        setEventsLoading(false);
      }
    };

    if (activeTab === 'home' && isAuthenticated && user) {
      loadUpcomingEvents();
    } else {
      setUpcomingEvents([]);
    }
  }, [isAuthenticated, activeTab, user?.id]);

  // Load notes count for dashboard
  useEffect(() => {
    const loadNotesCount = async () => {
      if (!isAuthenticated || !user) {
        setNotesCount(0);
        return;
      }

      setNotesLoading(true);
      try {
        const response = await apiService.getNotes({ limit: 1 });
        if (response.success && response.data?.pagination) {
          setNotesCount(response.data.pagination.total || 0);
        } else if (Array.isArray(response)) {
          setNotesCount(response.length);
        } else {
          setNotesCount(0);
        }
      } catch (err) {
        console.error('Error loading notes count for dashboard:', err);
        setNotesCount(0);
      } finally {
        setNotesLoading(false);
      }
    };

    if (activeTab === 'home' && isAuthenticated && user) {
      loadNotesCount();
    } else {
      setNotesCount(0);
    }
  }, [isAuthenticated, activeTab, user?.id]);

  // Helper to get bookmark title
  const getBookmarkTitle = (bookmark) => {
    const item = bookmark.item || bookmark;
    if (bookmark.type === 'judgement') {
      return item.title || item.case_title || 'Untitled Judgment';
    } else if (bookmark.type === 'central_act' || bookmark.type === 'state_act') {
      return item.short_title || item.long_title || 'Untitled Act';
    } else if (bookmark.type === 'bns_ipc_mapping' || bookmark.type === 'bsa_iea_mapping') {
      return item.subject || item.title || 'Untitled Mapping';
    }
    return 'Untitled';
  };

  // Helper to get bookmark description
  const getBookmarkDescription = (bookmark) => {
    const item = bookmark.item || bookmark;
    if (bookmark.type === 'judgement') {
      return item.court_name || item.judge || 'Judgment';
    } else if (bookmark.type === 'central_act' || bookmark.type === 'state_act') {
      return item.ministry || item.year || 'Act';
    } else if (bookmark.type === 'bns_ipc_mapping') {
      return `IPC ${item.ipc_section || ''} → BNS ${item.bns_section || ''}`.trim() || 'Mapping';
    } else if (bookmark.type === 'bsa_iea_mapping') {
      return `IEA ${item.iea_section || ''} → BSA ${item.bsa_section || ''}`.trim() || 'Mapping';
    }
    return '';
  };

  // Format relative time
  const formatRelativeTime = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Perfect Header */}
            <div className="mb-4 sm:mb-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-extrabold mb-1.5" style={{ color: '#1E65AD', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      Dashboard
                    </h1>
                    <p className="text-gray-600 text-xs sm:text-xs md:text-xs" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Welcome back! Here's your legal research overview
                    </p>
                  </div>
                </div>

                {/* Mobile Quick Access Buttons */}
                <div className="lg:hidden grid grid-cols-3 gap-2 mt-1.5">
                  <button
                    onClick={() => {
                      setActiveTab('notes');
                      setSidebarOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 motion-reduce:hover:translate-y-0 group"
                  >
                    <div className="p-2 rounded-lg mb-1.5 shadow-sm group-hover:scale-110 transition-transform duration-200 motion-reduce:group-hover:scale-100" style={{ backgroundColor: '#1E65AD' }}>
                      <Note className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-600" style={{ fontFamily: 'Roboto, sans-serif' }}>Notes</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('calendar');
                      setSidebarOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 hover:-translate-y-1 transition-all duration-200 motion-reduce:hover:translate-y-0 group"
                  >
                    <div className="p-2 rounded-lg mb-1.5 shadow-sm group-hover:scale-110 transition-transform duration-200 motion-reduce:group-hover:scale-100" style={{ backgroundColor: '#8C969F' }}>
                      <CalendarIcon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>Calendar</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('bookmarks');
                      setSidebarOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-white to-amber-50 border border-gray-200 rounded-xl hover:shadow-lg hover:border-amber-300 hover:-translate-y-1 transition-all duration-200 motion-reduce:hover:translate-y-0 group"
                  >
                    <div className="p-2 rounded-lg mb-1.5 shadow-sm group-hover:scale-110 transition-transform duration-200 motion-reduce:group-hover:scale-100" style={{ backgroundColor: '#CF9B63' }}>
                      <Bookmark className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 group-hover:text-amber-600" style={{ fontFamily: 'Roboto, sans-serif' }}>Bookmarks</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Perfect Stats Grid - Cards with proper overflow handling */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              {/* Bookmarks Card */}
              <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl border border-gray-200 p-3 sm:p-4 md:p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 motion-reduce:hover:translate-y-0 motion-reduce:transition-none overflow-hidden min-h-[110px] sm:min-h-[120px] md:min-h-[125px]">
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs sm:text-sm md:text-sm font-semibold text-gray-800 leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>Bookmarks</p>
                    <div className="p-1.5 sm:p-2 md:p-2 rounded-lg shadow-md flex-shrink-0 ml-2 transition-transform duration-300 hover:scale-110 hover:shadow-lg motion-reduce:hover:scale-100" style={{ backgroundColor: '#CF9B63' }}>
                      <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4 md:w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-extrabold mb-1 leading-none" style={{ color: '#CF9B63', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {bookmarksLoading ? '...' : bookmarks.length}
                    </p>
                    <p className="text-xs text-green-600 font-semibold leading-tight flex items-center gap-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {bookmarks.length > 0 ? '✓ Active' : 'No bookmarks'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Events Card */}
              <button
                onClick={() => {
                  setActiveTab('calendar');
                  setSidebarOpen(false);
                }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-3 sm:p-4 md:p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-gray-400 motion-reduce:hover:translate-y-0 motion-reduce:transition-none w-full text-left cursor-pointer overflow-hidden min-h-[110px] sm:min-h-[120px] md:min-h-[125px]"
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs sm:text-sm md:text-sm font-semibold text-gray-800 leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>Events</p>
                    <div className="p-1.5 sm:p-2 md:p-2 rounded-lg shadow-md flex-shrink-0 ml-2 transition-transform duration-300 hover:scale-110 hover:shadow-lg motion-reduce:hover:scale-100" style={{ backgroundColor: '#8C969F' }}>
                      <CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4 md:w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-extrabold mb-1 leading-none" style={{ color: '#8C969F', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {eventsLoading ? '...' : upcomingEvents.length}
                    </p>
                    <p className="text-xs text-gray-600 font-semibold leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {eventsLoading ? 'Loading...' : upcomingEvents.length > 0 ? 'View all →' : 'No events'}
                    </p>
                  </div>
                </div>
              </button>

              {/* Notes Card */}
              <button
                onClick={() => setActiveTab('notes')}
                className="bg-gradient-to-br from-white to-blue-50 rounded-xl border border-gray-200 p-3 sm:p-4 md:p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 motion-reduce:hover:translate-y-0 motion-reduce:transition-none w-full text-left cursor-pointer overflow-hidden min-h-[110px] sm:min-h-[120px] md:min-h-[125px]"
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs sm:text-sm md:text-sm font-semibold text-gray-800 leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>Notes</p>
                    <div className="p-1.5 sm:p-2 md:p-2 rounded-lg shadow-md flex-shrink-0 ml-2 transition-transform duration-300 hover:scale-110 hover:shadow-lg motion-reduce:hover:scale-100" style={{ backgroundColor: '#1E65AD' }}>
                      <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4 md:w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-extrabold mb-1 leading-none" style={{ color: '#1E65AD', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {notesLoading ? '...' : notesCount}
                    </p>
                    <p className="text-xs text-gray-600 font-semibold leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {notesCount > 0 ? 'View all →' : 'No notes yet'}
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Professional Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-3 sm:gap-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-4 sm:p-5 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm sm:text-lg font-bold" style={{ color: '#1E65AD', fontFamily: "'Bricolage Grotesque', sans-serif" }}>Recent Activity</h2>
                    <button
                      onClick={() => setActiveTab('bookmarks')}
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      View All →
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-5 space-y-1.5.5">
                  {bookmarksLoading ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <p className="text-sm text-gray-500 mt-3" style={{ fontFamily: 'Roboto, sans-serif' }}>Loading bookmarks...</p>
                    </div>
                  ) : bookmarks.length === 0 ? (
                    <div className="text-center py-8">
                      <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500" style={{ fontFamily: 'Roboto, sans-serif' }}>No recent bookmarks</p>
                      <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Start bookmarking resources to see them here</p>
                    </div>
                  ) : (
                    bookmarks.slice(0, 3).map((bookmark, index) => (
                      <div
                        key={bookmark.id}
                        className="flex items-start space-x-4 p-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="p-2 rounded-lg flex-shrink-0 shadow-sm" style={{ backgroundColor: '#CF9B63' }}>
                          <Bookmark className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            {getBookmarkTitle(bookmark)}
                          </p>
                          <p className="text-xs text-gray-600 mb-1 line-clamp-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            {getBookmarkDescription(bookmark)}
                          </p>
                          <p className="text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            {formatRelativeTime(bookmark.created_at)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Popular Resources */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-4 sm:p-5 border-b border-gray-200">
                  <h2 className="text-sm sm:text-lg font-bold" style={{ color: '#1E65AD', fontFamily: "'Bricolage Grotesque', sans-serif" }}>Quick Access</h2>
                </div>
                <div className="p-4 sm:p-5 space-y-1.5.5">
                  <button
                    onClick={() => navigate('/judgment-access')}
                    className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 transition-all duration-200 group motion-reduce:hover:from-blue-50 motion-reduce:hover:to-blue-50"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <div className="p-2 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-200 motion-reduce:group-hover:scale-100" style={{ backgroundColor: '#1E65AD' }}>
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 mb-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Legal Judgments</p>
                        <p className="text-xs text-gray-600 line-clamp-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Search court judgments</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2 motion-reduce:group-hover:translate-x-0" />
                  </button>

                  <button
                    onClick={() => navigate('/law-library')}
                    className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 hover:border-amber-300 transition-all duration-200 group motion-reduce:hover:from-amber-50 motion-reduce:hover:to-amber-50"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <div className="p-2 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-200 motion-reduce:group-hover:scale-100" style={{ backgroundColor: '#CF9B63' }}>
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 mb-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Law Library</p>
                        <p className="text-xs text-gray-600 line-clamp-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Browse acts & laws</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2 motion-reduce:group-hover:translate-x-0" />
                  </button>

                  <button
                    onClick={() => navigate('/law-mapping')}
                    className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-gray-300 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <div className="p-2 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-200 motion-reduce:group-hover:scale-100" style={{ backgroundColor: '#8C969F' }}>
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 mb-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Law Mapping</p>
                        <p className="text-xs text-gray-600 line-clamp-1" style={{ fontFamily: 'Roboto, sans-serif' }}>IPC-BNS, IEA-BSA</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2 motion-reduce:group-hover:translate-x-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'calendar':
        return <Calendar onBack={() => setActiveTab('home')} />;
      case 'bookmarks':
        return <Bookmarks onBack={() => setActiveTab('home')} />;
      case 'notes':
        return <Notes onBack={() => setActiveTab('home')} />;
      case 'recently-deleted':
        return <RecentlyDeleted onBack={() => setActiveTab('home')} />;
      default:
        return null;
    }
  };

  const sidebarItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'notes', label: 'Notes', icon: Note },
    { id: 'recently-deleted', label: 'Recently Deleted', icon: Trash2 },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFC' }}>
      <Navbar />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed lg:hidden z-50 p-2 sm:p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200"
        style={{ top: '88px', left: '16px' }}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#1E65AD' }} />
      </button>

      <div className="flex h-screen" style={{ paddingTop: '80px' }}>
        {/* Fixed Sidebar - Does not scroll with page */}
        <aside
          className={`fixed left-0 z-50 w-56 sm:w-64 bg-white shadow-xl transform transition-all duration-300 ease-in-out motion-reduce:transition-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          style={{ top: '80px', height: 'calc(100vh - 80px)' }}
        >
          <div className="h-full flex flex-col border-r border-gray-200 overflow-hidden">
            {/* Dashboard Header */}
            <div className="p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-white">
              <div className="flex items-center justify-end mb-3 lg:hidden">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-white transition-all duration-200 shadow-sm"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Dashboard Button */}
              <button
                onClick={() => {
                  setActiveTab('home');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 motion-reduce:transition-none ${activeTab === 'home'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                <Home className={`h-4 w-4 mr-2 ${activeTab === 'home' ? 'text-white' : 'text-gray-600'}`} />
                <span className="font-bold text-sm">Dashboard</span>
                {activeTab === 'home' && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
                )}
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="p-3 sm:p-4 flex flex-col justify-between flex-1 overflow-y-auto">
              <div className="space-y-1.5">
                {sidebarItems.filter(item => item.id !== 'home' && item.id !== 'recently-deleted').map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-xs font-medium rounded-xl transition-all duration-200 motion-reduce:transition-none ${activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                      }`}
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <item.icon className={`h-4 w-4 mr-2 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                    <span>{item.label}</span>
                    {activeTab === item.id && (
                      <ChevronRight className="ml-auto h-3.5 w-3.5 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>

              {/* Recently Deleted - at the bottom */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                {sidebarItems.filter(item => item.id === 'recently-deleted').map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-xs font-medium rounded-xl transition-all duration-200 motion-reduce:transition-none ${activeTab === item.id
                      ? 'bg-red-50 text-red-700 border border-red-200 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                      }`}
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    <item.icon className={`h-4 w-4 mr-2 ${activeTab === item.id ? 'text-red-600' : 'text-gray-400'
                      }`} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content - Scrollable */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
          {/* Content Area */}
          <main className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F9FAFC' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </div>
  );
};

export default Dashboard;
