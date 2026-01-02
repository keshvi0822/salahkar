console.log('🚀 main.jsx is executing...');

import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

console.log('✅ All imports loaded successfully');
console.log('🔍 Checking for #root element:', document.getElementById('root'));

// Simple error boundary to surface runtime crashes instead of a blank screen
class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Root error boundary caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '24px', fontFamily: 'monospace', color: '#b91c1c' }}>
          <h2 style={{ marginBottom: '12px' }}>App crashed</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error?.stack || this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Global listeners to log silent errors/rejections to the console
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    console.error('Global error event:', e.error || e.message);
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
  });
}

console.log('🎯 About to call ReactDOM.createRoot...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = '<div style="padding:24px;color:red;font-family:monospace;">ERROR: #root element not found in DOM!</div>';
  throw new Error('#root element not found');
}

console.log('🎨 Creating React root...');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>,
);

console.log('✨ React render called successfully');
