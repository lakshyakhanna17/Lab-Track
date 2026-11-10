import React from 'react';
import { 
  X, 
  MapPin, 
  Wrench, 
  FileText, 
  User, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { EquipmentItem } from '../types/inventory';

interface EquipmentDetailsModalProps {
  item: EquipmentItem;
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (item: EquipmentItem) => void;
  onResolveMaintenance: (itemId: string) => void;
}

export const EquipmentDetailsModal: React.FC<EquipmentDetailsModalProps> = ({
  item,
  isOpen,
  onClose,
  onCheckout,
  onResolveMaintenance,
}) => {
  if (!isOpen) return null;

  const isAvailable = item.status === 'available';
  const isInUse = item.status === 'in_use';
  const isMaintenance = item.status === 'maintenance';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-snow-900/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full border border-snow-200 shadow-snow-lg overflow-hidden animate-scale-up max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="butter-glass p-5 border-b border-butter-300/60 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-snow-600 bg-white/70 px-2.5 py-0.5 rounded-md border border-butter-300">
                {item.assetTag}
              </span>
              <span className="text-xs font-semibold text-butter-900 bg-butter-200/90 px-2 py-0.5 rounded-md">
                {item.category}
              </span>
            </div>
            <h2 className="text-xl font-bold text-snow-900">
              {item.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-snow-500 hover:text-snow-900 hover:bg-white/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Quick status banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-snow-50 border border-snow-200">
            <div>
              <p className="text-xs text-snow-500 font-medium">Availability Status</p>
              <div className="flex items-center gap-2 mt-0.5">
                {isAvailable && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Available for Checkout
                  </span>
                )}
                {isInUse && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Currently In Session
                  </span>
                )}
                {isMaintenance && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-rose-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    Under Maintenance / Inspection
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs text-snow-500 font-medium">Apparatus Condition</p>
              <span className="text-sm font-bold capitalize text-snow-800 mt-0.5 block">
                {item.condition.replace('_', ' ')}
              </span>
            </div>

            <div>
              <p className="text-xs text-snow-500 font-medium">Last Inspection</p>
              <span className="text-sm font-semibold font-mono text-snow-700 mt-0.5 block">
                {item.lastInspected}
              </span>
            </div>
          </div>

          {/* Description & Specs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-snow-400 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Technical Specifications & Description
            </h4>
            <div className="p-4 rounded-xl bg-white border border-snow-200 text-xs text-snow-700 space-y-2">
              <p className="leading-relaxed">{item.description}</p>
              {item.specs && (
                <div className="pt-2 border-t border-snow-100 flex items-start gap-2">
                  <span className="font-semibold text-snow-900">Specs:</span>
                  <span className="font-mono text-snow-600">{item.specs}</span>
                </div>
              )}
              {item.requiredForToday && (
                <div className="pt-2 border-t border-snow-100 flex items-start gap-2">
                  <span className="font-semibold text-butter-700">Recommended for Course:</span>
                  <span className="font-semibold text-snow-800">{item.requiredForToday}</span>
                </div>
              )}
            </div>
          </div>

          {/* Location Blueprint Navigator */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-snow-400 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Storage & Bench Blueprint Location
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-butter-50/60 border border-butter-200">
                <span className="text-[10px] uppercase font-bold text-butter-800">1. Room / Suite</span>
                <p className="font-bold text-xs text-snow-900 mt-0.5">{item.location.room}</p>
              </div>
              <div className="p-3 rounded-xl bg-snow-50 border border-snow-200">
                <span className="text-[10px] uppercase font-bold text-snow-500">2. Cabinet / Rack</span>
                <p className="font-bold text-xs text-snow-900 mt-0.5">{item.location.cabinet}</p>
              </div>
              <div className="p-3 rounded-xl bg-snow-50 border border-snow-200">
                <span className="text-[10px] uppercase font-bold text-snow-500">3. Shelf / Station</span>
                <p className="font-bold text-xs text-snow-900 mt-0.5">{item.location.shelf}</p>
              </div>
            </div>
          </div>

          {/* Active Checkout Holder Details */}
          {isInUse && item.currentHolder && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Current Student Holder Details
              </h4>
              <div className="p-4 rounded-xl bg-butter-50 border border-butter-300 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-butter-900 text-sm">{item.currentHolder.studentName}</span>
                  <span className="font-mono bg-butter-200 text-butter-900 px-2 py-0.5 rounded font-bold">
                    {item.currentHolder.benchNumber}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-butter-800 pt-1">
                  <p><strong>Roll / ID:</strong> {item.currentHolder.studentId}</p>
                  <p><strong>Checked out:</strong> {item.currentHolder.checkedOutAt}</p>
                  <p><strong>Session:</strong> {item.currentHolder.expectedReturn}</p>
                  <p><strong>Purpose:</strong> {item.currentHolder.purpose}</p>
                </div>
              </div>
            </div>
          )}

          {/* Maintenance Log & Ticket */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-snow-400 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                Maintenance & Calibration History ({item.maintenanceHistory.length})
              </h4>
              
              {isMaintenance && (
                <button
                  type="button"
                  onClick={() => {
                    onResolveMaintenance(item.id);
                    onClose();
                  }}
                  className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  Mark Repaired & Calibrated
                </button>
              )}
            </div>

            {item.maintenanceHistory.length === 0 ? (
              <div className="p-4 rounded-xl bg-snow-50 border border-snow-200 text-center text-xs text-snow-500">
                <ShieldCheck className="w-5 h-5 mx-auto text-emerald-500 mb-1" />
                No reported faults. Apparatus has full clean maintenance history.
              </div>
            ) : (
              <div className="space-y-2">
                {item.maintenanceHistory.map((record) => (
                  <div 
                    key={record.id}
                    className={`p-3.5 rounded-xl border text-xs ${
                      record.status === 'pending'
                        ? 'bg-rose-50/70 border-rose-200'
                        : 'bg-snow-50 border-snow-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-snow-900">
                        {record.reportedBy}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-snow-500">{record.date}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          record.status === 'pending'
                            ? 'bg-rose-200 text-rose-900'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-snow-700">{record.issue}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-snow-50 border-t border-snow-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-snow-600 hover:text-snow-900 text-xs font-semibold hover:bg-snow-200 transition-colors"
          >
            Close
          </button>

          {isAvailable && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onCheckout(item);
              }}
              className="px-5 py-2 rounded-xl bg-butter-300 hover:bg-butter-400 text-snow-900 text-xs font-bold shadow-snow-sm hover:shadow-snow-md border border-butter-400 transition-all"
            >
              Check Out Apparatus Now
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
