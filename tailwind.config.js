/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'premium-black': '#0A0E27',
        'premium-dark-blue': '#1F4788',
        'premium-blue-light': '#2E5FA3',
        'premium-gold': '#D4AF37',
        'premium-bg-soft': '#F8F9FA',
        'premium-bg-pure': '#FFFFFF',
        'premium-text-dark': '#0F172A',
        'premium-text-muted': '#6B7280',
        'premium-text-light': '#9CA3AF',
        'premium-border': '#E5E7EB',
        'white': '#FFFFFF',
        'black': '#000000',
        'transparent': 'transparent',
        'gray': {
          '50': '#F9FAFB',
          '100': '#F3F4F6',
          '200': '#E5E7EB',
          '300': '#D1D5DB',
          '400': '#9CA3AF',
          '500': '#6B7280',
          '600': '#4B5563',
          '700': '#374151',
          '800': '#1F2937',
          '900': '#111827',
        },
        'blue': {
          '50': '#EFF6FF',
          '100': '#E0F2FE',
          '200': '#BAE6FD',
        },
        'red': {
          '600': '#DC2626',
        }
      }
    },
  },
  plugins: [],
}
