import React, { useState } from 'react';
import { X, Check, Clock, User, Hash, MapPin, BookOpen } from 'lucide-react';
import { EquipmentItem, CurrentHolder } from '../types/inventory';

interface CheckoutModalProps {
  item: EquipmentItem;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (itemId: string, holder: CurrentHolder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [benchNumber, setBenchNumber] = useState(item.location.benchSlot || 'Bench 01');
  const [duration, setDuration] = useState('2 Hours (Standard Session)');
  const [purpose, setPurpose] = useState(item.requiredForToday || '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentId.trim() || !benchNumber.trim()) {
      setError('Please provide student name, roll ID, and bench number.');
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    onConfirm(item.id, {
      studentName: studentName.trim(),
      studentId: studentId.trim(),
      benchNumber: benchNumber.trim(),
      checkedOutAt: timeString,
      expectedReturn: duration,
      purpose: purpose.trim() || 'Laboratory Practical Session'
    });

    onClose();
  };

  const quickBenches = ['Bench 01', 'Bench 02', 'Bench 04', 'Bench 07', 'Station B'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-snow-900/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full border border-snow-200 shadow-snow-lg overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with light butter backdrop */}
        <div className="butter-glass p-5 border-b border-butter-300/60 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-butter-800 bg-butter-200/80 px-2.5 py-0.5 rounded-full border border-butter-300">
              Practical Session Checkout
            </span>
            <h2 className="text-lg font-bold text-snow-900 mt-1">
              Check Out Apparatus
            </h2>
            <p className="text-xs text-snow-600 font-mono mt-0.5">
              {item.assetTag} • {item.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-snow-500 hover:text-snow-900 hover:bg-white/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Location reminder banner */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-snow-50 border border-snow-200 text-xs text-snow-700">
            <MapPin className="w-4 h-4 text-butter-600 flex-shrink-0" />
            <div>
              <span className="font-semibold text-snow-800">Pick up location:</span> {item.location.room} ({item.location.cabinet}, {item.location.shelf})
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          {/* Student Name */}
          <div>
            <label className="block text-xs font-semibold text-snow-700 mb-1">
              Student Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-snow-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Lakshya / Aarav Patel"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-snow-50 border border-snow-200 text-sm focus:outline-none focus:ring-2 focus:ring-butter-300 focus:border-butter-500"
              />
            </div>
          </div>

          {/* Student ID & Bench Number row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-snow-700 mb-1">
                Student / Roll ID *
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-snow-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. 2024-EC-102"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-snow-50 border border-snow-200 text-sm focus:outline-none focus:ring-2 focus:ring-butter-300 focus:border-butter-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-snow-700 mb-1">
                Bench / Workstation *
              </label>
              <input
                type="text"
                required
                value={benchNumber}
                onChange={(e) => setBenchNumber(e.target.value)}
                placeholder="e.g. Bench 04"
                className="w-full px-3 py-2 rounded-xl bg-snow-50 border border-snow-200 text-sm focus:outline-none focus:ring-2 focus:ring-butter-300 focus:border-butter-500"
              />
            </div>
          </div>

          {/* Quick Bench Selector Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-snow-400 font-medium">Quick select:</span>
            {quickBenches.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBenchNumber(b)}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors ${
                  benchNumber === b
                    ? 'bg-butter-200 border-butter-400 text-butter-900 font-semibold'
                    : 'bg-snow-100 hover:bg-snow-200 border-snow-200 text-snow-600'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Session Duration & Purpose */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-snow-700 mb-1">
                Expected Duration
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-snow-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-snow-50 border border-snow-200 text-xs focus:outline-none focus:ring-2 focus:ring-butter-300 focus:border-butter-500 appearance-none text-snow-800"
                >
                  <option value="1 Hour (Short Practical)">1 Hour (Short Practical)</option>
                  <option value="2 Hours (Standard Session)">2 Hours (Standard Session)</option>
                  <option value="3 Hours (Extended Practicum)">3 Hours (Extended Practicum)</option>
                  <option value="Full Day (Senior Project)">Full Day (Senior Project)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-snow-700 mb-1">
                Experiment / Purpose
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-snow-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Lab Experiment 3"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-snow-50 border border-snow-200 text-xs focus:outline-none focus:ring-2 focus:ring-butter-300 focus:border-butter-500"
                />
              </div>
            </div>
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
              className="px-5 py-2.5 rounded-xl bg-butter-300 hover:bg-butter-400 text-snow-900 text-sm font-bold flex items-center gap-2 shadow-snow-sm hover:shadow-snow-md border border-butter-400 transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Checkout</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
