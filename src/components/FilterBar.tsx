import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { EquipmentCategory, EquipmentStatus } from '../types/inventory';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: EquipmentCategory;
  onSelectCategory: (category: EquipmentCategory) => void;
  selectedStatus: 'all' | EquipmentStatus;
  onSelectStatus: (status: 'all' | EquipmentStatus) => void;
  totalFiltered: number;
}

const CATEGORIES: EquipmentCategory[] = ['All', 'Physics', 'Chemistry', 'Biology', 'Electronics', 'General'];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedStatus,
  onSelectStatus,
  totalFiltered,
}) => {
  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedStatus !== 'all';

  const clearAllFilters = () => {
    onSearchChange('');
    onSelectCategory('All');
    onSelectStatus('all');
  };

  return (
    <div className="bg-white rounded-2xl border border-snow-200 p-4 sm:p-5 shadow-snow-sm mb-6 space-y-4">
      
      {/* Top row: Search and Status toggle */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-snow-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search apparatus, asset tag, room, or experiment course (e.g. 'oscilloscope', '204', 'PHYS-202')..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-snow-50 border border-snow-200 text-sm text-snow-800 placeholder-snow-400 focus:outline-none focus:ring-2 focus:ring-butter-300 focus:border-butter-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-snow-400 hover:text-snow-600 p-0.5 rounded-full hover:bg-snow-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status segment control */}
        <div className="flex items-center gap-1 p-1 bg-snow-100 rounded-xl border border-snow-200 self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => onSelectStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedStatus === 'all'
                ? 'bg-white text-snow-900 shadow-sm border border-snow-200/60'
                : 'text-snow-600 hover:text-snow-900'
            }`}
          >
            All Status
          </button>
          <button
            onClick={() => onSelectStatus('available')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              selectedStatus === 'available'
                ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200/80'
                : 'text-snow-600 hover:text-emerald-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Ready (Available)
          </button>
          <button
            onClick={() => onSelectStatus('in_use')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              selectedStatus === 'in_use'
                ? 'bg-butter-100 text-butter-900 shadow-sm border border-butter-300'
                : 'text-snow-600 hover:text-butter-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            In Session
          </button>
          <button
            onClick={() => onSelectStatus('maintenance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              selectedStatus === 'maintenance'
                ? 'bg-white text-rose-800 shadow-sm border border-rose-200/80'
                : 'text-snow-600 hover:text-rose-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            Maintenance
          </button>
        </div>

      </div>

      {/* Bottom row: Category Pills & results count */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-snow-100">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-snow-400 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            Lab:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-butter-300 text-snow-900 font-semibold shadow-snow-sm border border-butter-400'
                    : 'bg-snow-50 hover:bg-snow-100 text-snow-600 border border-snow-200/70'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results indicator & clear button */}
        <div className="flex items-center gap-2 text-xs text-snow-500 font-medium">
          <span>
            Showing <strong className="text-snow-800">{totalFiltered}</strong> apparatus
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-butter-700 hover:text-butter-900 underline underline-offset-2 flex items-center gap-1 font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
