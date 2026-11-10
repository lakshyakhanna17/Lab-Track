import React from 'react';
import { Microscope, Plus, RotateCcw } from 'lucide-react';

interface NavbarProps {
  onAddClick: () => void;
  onResetData: () => void;
  itemCount: number;
  availableCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onAddClick,
  onResetData,
  itemCount,
  availableCount
}) => {
  return (
    <header className="sticky top-0 z-30 snow-glass border-b border-snow-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-butter-300 text-snow-900 flex items-center justify-center shadow-snow-sm border border-butter-400/50">
              <Microscope className="w-5 h-5 sm:w-6 sm:h-6 text-snow-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-snow-900">
                  Lab<span className="text-butter-600">Track</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-butter-100 text-butter-800 border border-butter-200">
                  Campus Live
                </span>
              </div>
              <p className="text-xs text-snow-500 hidden sm:block font-medium">
                Laboratory Inventory, Location & Apparatus Status System
              </p>
            </div>
          </div>

          {/* Quick status pill & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-snow-50 border border-snow-200 text-xs font-medium text-snow-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{availableCount} of {itemCount} apparatus ready for session</span>
            </div>

            {/* Reset Demo Data Button */}
            <button
              onClick={onResetData}
              title="Reset inventory to default demo state"
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-snow-600 hover:text-snow-900 bg-white hover:bg-butter-50 border border-snow-200 hover:border-butter-300 transition-colors text-xs font-medium flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>

            {/* Add Apparatus Button */}
            <button
              onClick={onAddClick}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-butter-400 hover:bg-butter-500 text-snow-900 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-snow-sm hover:shadow-snow-md active:scale-95 border border-butter-500/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add Equipment</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
