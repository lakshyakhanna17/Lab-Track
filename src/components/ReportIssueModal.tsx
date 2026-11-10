import React, { useState } from 'react';
import { X, AlertTriangle, Send } from 'lucide-react';
import { EquipmentItem } from '../types/inventory';

interface ReportIssueModalProps {
  item: EquipmentItem;
  isOpen: boolean;
  onClose: () => void;
  onSubmitIssue: (itemId: string, issue: string, reportedBy: string) => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  item,
  isOpen,
  onClose,
  onSubmitIssue,
}) => {
  const [issue, setIssue] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [category, setCategory] = useState('Calibration Required');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const quickCommonIssues = [
    'Calibration Required',
    'Loose / Broken Probe Cable',
    'Display Not Turning On',
    'Optical Objective Dirty / Stiff',
    'Zero Error in Readout',
    'Missing Power Adapter',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) {
      setError('Please provide a brief description of the problem.');
      return;
    }
    const reporter = reportedBy.trim() || 'Student (Anonymous)';
    const fullIssueText = `[${category}] ${issue.trim()}`;
    onSubmitIssue(item.id, fullIssueText, reporter);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-snow-900/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full border border-snow-200 shadow-snow-lg overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-rose-50/70 p-5 border-b border-rose-200/80 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
              Maintenance Ticket
            </span>
            <h2 className="text-lg font-bold text-snow-900 mt-1">
              Report Equipment Fault / Maintenance
            </h2>
            <p className="text-xs text-snow-600 font-mono mt-0.5">
              {item.assetTag} • {item.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-snow-500 hover:text-snow-900 hover:bg-rose-100/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              Submitting this report will immediately flag this apparatus as <strong>Under Maintenance</strong> so other students don't attempt to checkout a faulty device.
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          {/* Quick Issue Type Buttons */}
          <div>
            <label className="block text-xs font-semibold text-snow-700 mb-1.5">
              Select Primary Issue Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {quickCommonIssues.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCategory(opt)}
                  className={`text-left p-2 rounded-xl text-xs border transition-colors ${
                    category === opt
                      ? 'bg-butter-100 border-butter-400 font-semibold text-butter-900'
                      : 'bg-snow-50 hover:bg-snow-100 border-snow-200 text-snow-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-semibold text-snow-700 mb-1">
              Problem Description & Symptoms *
            </label>
            <textarea
              required
              rows={3}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="e.g. Channel 1 produces high noise floor, ground terminal feels loose, display backlight cuts out after 5 minutes..."
              className="w-full p-3 rounded-xl bg-snow-50 border border-snow-200 text-xs text-snow-800 focus:outline-none focus:ring-2 focus:ring-butter-300 focus:border-butter-500 placeholder-snow-400"
            />
          </div>

          {/* Reporter Name */}
          <div>
            <label className="block text-xs font-semibold text-snow-700 mb-1">
              Reported By (Student or Lab Assistant Name)
            </label>
            <input
              type="text"
              value={reportedBy}
              onChange={(e) => setReportedBy(e.target.value)}
              placeholder="e.g. Lakshya Khanna / Bench 04"
              className="w-full px-3 py-2 rounded-xl bg-snow-50 border border-snow-200 text-xs focus:outline-none focus:ring-2 focus:ring-butter-300 focus:border-butter-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-snow-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-snow-600 hover:text-snow-900 text-sm font-semibold hover:bg-snow-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold flex items-center gap-2 shadow-snow-sm hover:shadow-snow-md transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Submit Ticket</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
