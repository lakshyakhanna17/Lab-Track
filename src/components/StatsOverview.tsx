import React from 'react';
import { Layers, CheckCircle2, Users, Wrench } from 'lucide-react';
import { EquipmentStatus } from '../types/inventory';

interface StatsOverviewProps {
  total: number;
  available: number;
  inUse: number;
  maintenance: number;
  selectedStatus: 'all' | EquipmentStatus;
  onSelectStatus: (status: 'all' | EquipmentStatus) => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  total,
  available,
  inUse,
  maintenance,
  selectedStatus,
  onSelectStatus,
}) => {
  const stats = [
    {
      id: 'all' as const,
      label: 'Total Equipment',
      value: total,
      subtext: 'Cataloged apparatus across 4 labs',
      icon: Layers,
      color: 'text-snow-700',
      bgColor: 'bg-white',
      borderColor: selectedStatus === 'all' ? 'border-butter-500 ring-2 ring-butter-300/60' : 'border-snow-200',
      badgeBg: 'bg-snow-100 text-snow-700',
    },
    {
      id: 'available' as const,
      label: 'Available Now',
      value: available,
      subtext: 'Ready for immediate practical pickup',
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bgColor: 'bg-white',
      borderColor: selectedStatus === 'available' ? 'border-emerald-500 ring-2 ring-emerald-300/60' : 'border-snow-200',
      badgeBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    },
    {
      id: 'in_use' as const,
      label: 'In Practical Session',
      value: inUse,
      subtext: 'Currently checked out at student benches',
      icon: Users,
      color: 'text-butter-800',
      bgColor: 'bg-butter-50/70',
      borderColor: selectedStatus === 'in_use' ? 'border-butter-500 ring-2 ring-butter-300' : 'border-butter-200/90',
      badgeBg: 'bg-butter-200 text-butter-900 border border-butter-300',
    },
    {
      id: 'maintenance' as const,
      label: 'Under Maintenance',
      value: maintenance,
      subtext: 'Reported faulty or undergoing calibration',
      icon: Wrench,
      color: 'text-rose-700',
      bgColor: 'bg-white',
      borderColor: selectedStatus === 'maintenance' ? 'border-rose-500 ring-2 ring-rose-300/60' : 'border-snow-200',
      badgeBg: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isSelected = selectedStatus === stat.id;

        return (
          <button
            key={stat.id}
            onClick={() => onSelectStatus(stat.id)}
            className={`text-left p-4 sm:p-5 rounded-2xl ${stat.bgColor} ${stat.borderColor} border transition-all duration-200 shadow-snow-sm hover:shadow-snow-md hover:-translate-y-0.5 group relative overflow-hidden`}
          >
            {/* Soft decorative butter flare if in_use or selected */}
            {isSelected && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-butter-300/20 rounded-full blur-xl pointer-events-none -mr-8 -mt-8" />
            )}

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-medium text-snow-500">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl ${stat.badgeBg}`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-xs text-snow-400 font-medium hidden sm:inline">
                units
              </span>
            </div>

            <p className="mt-1 text-[11px] sm:text-xs text-snow-500 line-clamp-1">
              {stat.subtext}
            </p>
          </button>
        );
      })}
    </div>
  );
};
