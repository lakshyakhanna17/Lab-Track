import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, RotateCcw, MapPin } from 'lucide-react';
import { EquipmentItem, EquipmentCondition } from '../types/inventory';

interface ReturnModalProps {
  item: EquipmentItem;
  isOpen: boolean;
  onClose: () => void;
  onConfirmReturn: (itemId: string, returnCondition: EquipmentCondition, issueNote?: string) => void;
}

export const ReturnModal: React.FC<ReturnModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirmReturn,
}) => {
  const [returnCondition, setReturnCondition] = useState<EquipmentCondition>('excellent');
  const [hasIssue, setHasIssue] = useState(false);
  const [issueNote, setIssueNote] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirmReturn(
      item.id,
      hasIssue ? 'needs_service' : returnCondition,
      hasIssue ? issueNote.trim() : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-snow-900/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full border border-snow-200 shadow-snow-lg overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-snow-50 p-5 border-b border-snow-200 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Session Return & Check-In
            </span>
            <h2 className="text-lg font-bold text-snow-900 mt-1">
              Return Apparatus
            </h2>
            <p className="text-xs text-snow-600 font-mono mt-0.5">
              {item.assetTag} • {item.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-snow-500 hover:text-snow-900 hover:bg-snow-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          
          {/* Current Checkout summary */}
          {item.currentHolder && (
            <div className="p-3.5 rounded-2xl bg-butter-50/80 border border-butter-200 text-xs">
              <p className="font-semibold text-butter-900 mb-1">
                Checked out by {item.currentHolder.studentName} ({item.currentHolder.studentId})
              </p>
              <p className="text-butter-800">
                Location: {item.currentHolder.benchNumber} • Checked out at {item.currentHolder.checkedOutAt}
              </p>
            </div>
          )}

          {/* Storage Destination */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-snow-50 border border-snow-200 text-xs text-snow-700">
            <MapPin className="w-4 h-4 text-butter-600 flex-shrink-0" />
            <div>
              <span className="font-semibold text-snow-800">Please return to:</span> {item.location.room} — {item.location.cabinet}, {item.location.shelf}
            </div>
          </div>

          {/* Condition verification */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-snow-700">
              Condition of returned apparatus:
            </label>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setHasIssue(false); setReturnCondition('excellent'); }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  !hasIssue
                    ? 'border-emerald-400 bg-emerald-50/60 text-emerald-900 ring-2 ring-emerald-200'
                    : 'border-snow-200 bg-snow-50 text-snow-600 hover:bg-snow-100'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Intact & Working
                </div>
                <p className="text-[11px] text-snow-500">
                  Clean, functional, and ready for the next student
                </p>
              </button>

              <button
                type="button"
                onClick={() => setHasIssue(true)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  hasIssue
                    ? 'border-rose-400 bg-rose-50/60 text-rose-900 ring-2 ring-rose-200'
                    : 'border-snow-200 bg-snow-50 text-snow-600 hover:bg-snow-100'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-rose-800 mb-1">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Issue Observed
                </div>
                <p className="text-[11px] text-snow-500">
                  Needs maintenance, broken cable, or calibration
                </p>
              </button>
            </div>
          </div>

          {/* Issue note if flagged */}
          {hasIssue && (
            <div className="space-y-1 animate-fade-in">
              <label className="block text-xs font-semibold text-rose-800">
                Describe the problem or damage:
              </label>
              <textarea
                rows={2}
                value={issueNote}
                onChange={(e) => setIssueNote(e.target.value)}
                placeholder="e.g. Probe wire snapped, fuse blown, display flickering..."
                className="w-full p-2.5 rounded-xl bg-rose-50/50 border border-rose-200 text-xs text-snow-800 focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder-rose-300"
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-3 border-t border-snow-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-snow-600 hover:text-snow-900 text-sm font-semibold hover:bg-snow-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-5 py-2.5 rounded-xl bg-butter-300 hover:bg-butter-400 text-snow-900 text-sm font-bold flex items-center gap-2 shadow-snow-sm hover:shadow-snow-md border border-butter-400 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Confirm Return</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
