import React from 'react';
import { 
  MapPin, 
  Clock, 
  Wrench, 
  CheckCircle, 
  UserCheck, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw,
  Info
} from 'lucide-react';
import { EquipmentItem } from '../types/inventory';

interface EquipmentCardProps {
  item: EquipmentItem;
  onCheckout: (item: EquipmentItem) => void;
  onReturn: (item: EquipmentItem) => void;
  onReportIssue: (item: EquipmentItem) => void;
  onViewDetails: (item: EquipmentItem) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  item,
  onCheckout,
  onReturn,
  onReportIssue,
  onViewDetails,
}) => {
  const isAvailable = item.status === 'available';
  const isInUse = item.status === 'in_use';
  const isMaintenance = item.status === 'maintenance';

  // Condition styling
  const getConditionBadge = () => {
    switch (item.condition) {
      case 'excellent':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Condition: Excellent
          </span>
        );
      case 'good':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Condition: Good
          </span>
        );
      case 'fair':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Condition: Fair
          </span>
        );
      case 'needs_service':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Needs Service
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-snow-200 p-5 shadow-snow-sm hover:shadow-snow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden">
      
      {/* Top subtle highlight banner according to status */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1.5 ${
          isAvailable 
            ? 'bg-butter-400' 
            : isInUse 
              ? 'bg-amber-400' 
              : 'bg-rose-400'
        }`} 
      />

      {/* Header tags: Asset Tag, Category, Status */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5 pt-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-snow-500 bg-snow-100 px-2 py-0.5 rounded-md border border-snow-200">
              {item.assetTag}
            </span>
            <span className="text-xs font-medium text-butter-800 bg-butter-100/90 px-2 py-0.5 rounded-md border border-butter-200/80">
              {item.category}
            </span>
          </div>

          {/* Status Badge */}
          {isAvailable && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Available
            </span>
          )}
          {isInUse && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-300">
              <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              In Session
            </span>
          )}
          {isMaintenance && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              <Wrench className="w-3.5 h-3.5 text-rose-600" />
              Maintenance
            </span>
          )}
        </div>

        {/* Equipment Name */}
        <h3 className="font-bold text-base sm:text-lg text-snow-900 leading-snug group-hover:text-butter-700 transition-colors">
          {item.name}
        </h3>

        {/* Specs snippet */}
        {item.specs && (
          <p className="text-xs text-snow-500 mt-1 line-clamp-1">
            {item.specs}
          </p>
        )}

        {/* Practical Course Tag */}
        {item.requiredForToday && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-snow-600 bg-snow-50 px-2 py-1 rounded-lg border border-snow-200/80">
            <span className="text-butter-600 font-bold">Practical:</span>
            <span className="truncate max-w-[220px]">{item.requiredForToday}</span>
          </div>
        )}

        {/* Exact Location Card — Solves the core problem: Where is it? */}
        <div className="mt-4 p-3 rounded-xl bg-snow-50/90 border border-snow-200/80 group-hover:border-butter-200 transition-colors">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-butter-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <p className="font-semibold text-snow-800">
                {item.location.room}
              </p>
              <p className="text-snow-600">
                <span className="font-medium text-snow-700">{item.location.cabinet}</span> • {item.location.shelf}
              </p>
              {item.location.benchSlot && (
                <p className="text-[11px] text-snow-500">
                  Target Station: <span className="font-mono font-medium text-snow-700">{item.location.benchSlot}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Checked Out Student Notice if in use */}
        {isInUse && item.currentHolder && (
          <div className="mt-3 p-2.5 rounded-xl bg-butter-50 border border-butter-200 text-xs">
            <div className="flex items-center justify-between font-semibold text-butter-900 mb-0.5">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-butter-700" />
                {item.currentHolder.studentName}
              </span>
              <span className="font-mono text-[11px] text-butter-800 bg-butter-200/60 px-1.5 py-0.5 rounded">
                {item.currentHolder.benchNumber}
              </span>
            </div>
            <p className="text-[11px] text-butter-800 flex items-center justify-between">
              <span>ID: {item.currentHolder.studentId}</span>
              <span>Checked out at: {item.currentHolder.checkedOutAt}</span>
            </p>
          </div>
        )}

        {/* Maintenance notice if faulty */}
        {isMaintenance && item.maintenanceHistory.length > 0 && (
          <div className="mt-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
            <div className="flex items-center gap-1 font-semibold mb-0.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
              Issue Notice:
            </div>
            <p className="text-[11px] text-rose-700 line-clamp-2">
              {item.maintenanceHistory[item.maintenanceHistory.length - 1].issue}
            </p>
          </div>
        )}
      </div>

      {/* Card Footer: Condition badge & Action buttons */}
      <div className="mt-5 pt-3.5 border-t border-snow-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          {getConditionBadge()}
          <button
            onClick={() => onViewDetails(item)}
            className="text-xs font-semibold text-snow-500 hover:text-snow-800 flex items-center gap-1 hover:underline"
          >
            <Info className="w-3.5 h-3.5" />
            Specs & History
          </button>
        </div>

        {/* Primary Action Button */}
        <div className="grid grid-cols-2 gap-2">
          {isAvailable && (
            <button
              onClick={() => onCheckout(item)}
              className="col-span-2 py-2 px-3 rounded-xl bg-butter-300 hover:bg-butter-400 text-snow-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-snow-sm hover:shadow-snow-md border border-butter-400 active:scale-98"
            >
              <span>Check Out for Practical</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {isInUse && (
            <button
              onClick={() => onReturn(item)}
              className="col-span-2 py-2 px-3 rounded-xl bg-snow-100 hover:bg-snow-200 text-snow-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all border border-snow-300 active:scale-98"
            >
              <RotateCcw className="w-3.5 h-3.5 text-snow-700" />
              <span>Return / Check In</span>
            </button>
          )}

          {isMaintenance && (
            <button
              onClick={() => onViewDetails(item)}
              className="col-span-2 py-2 px-3 rounded-xl bg-rose-100/70 hover:bg-rose-100 text-rose-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all border border-rose-300 active:scale-98"
            >
              <Wrench className="w-3.5 h-3.5 text-rose-700" />
              <span>Review Maintenance Ticket</span>
            </button>
          )}

          {/* Secondary Report button (available on all cards) */}
          <button
            onClick={() => onReportIssue(item)}
            className="col-span-2 py-1.5 text-[11px] font-medium text-snow-500 hover:text-rose-600 transition-colors flex items-center justify-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            Report Fault / Request Calibration
          </button>
        </div>

      </div>

    </div>
  );
};
