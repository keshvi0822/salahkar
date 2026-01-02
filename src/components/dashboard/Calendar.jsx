import { Calendar as CalendarIcon } from 'lucide-react';

export default function Calendar() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-legal-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-legal-primary bg-opacity-10 rounded-lg flex items-center justify-center">
          <CalendarIcon className="text-legal-primary" size={24} />
        </div>
        <h3 className="text-xl font-bold text-legal-heading">Calendar</h3>
      </div>
      <p className="text-legal-text">Your calendar events and important dates</p>
    </div>
  );
}
