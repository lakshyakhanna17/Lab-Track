import { useState, useEffect, useMemo } from 'react';
import { 
  EquipmentItem, 
  EquipmentCategory, 
  EquipmentStatus, 
  EquipmentCondition, 
  CurrentHolder 
} from './types/inventory';
import { INITIAL_EQUIPMENT } from './data/mockEquipment';
import { Navbar } from './components/Navbar';
import { StatsOverview } from './components/StatsOverview';
import { FilterBar } from './components/FilterBar';
import { EquipmentCard } from './components/EquipmentCard';
import { CheckoutModal } from './components/CheckoutModal';
import { ReturnModal } from './components/ReturnModal';
import { ReportIssueModal } from './components/ReportIssueModal';
import { EquipmentDetailsModal } from './components/EquipmentDetailsModal';
import { AddEquipmentModal } from './components/AddEquipmentModal';
import { Compass, Info } from 'lucide-react';

const STORAGE_KEY = 'labtrack_equipment_v1';

export function App() {
  const [equipment, setEquipment] = useState<EquipmentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed reading from localStorage', e);
    }
    return INITIAL_EQUIPMENT;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(equipment));
    } catch (e) {
      console.warn('Failed saving to localStorage', e);
    }
  }, [equipment]);

  // Filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory>('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | EquipmentStatus>('all');

  // Modal states
  const [checkoutItem, setCheckoutItem] = useState<EquipmentItem | null>(null);
  const [returnItem, setReturnItem] = useState<EquipmentItem | null>(null);
  const [reportIssueItem, setReportIssueItem] = useState<EquipmentItem | null>(null);
  const [detailsItem, setDetailsItem] = useState<EquipmentItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Reset Demo Data
  const handleResetDemoData = () => {
    setEquipment(INITIAL_EQUIPMENT);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Inventory reset to initial demo dataset.');
  };

  // Action: Checkout
  const handleConfirmCheckout = (itemId: string, holder: CurrentHolder) => {
    setEquipment((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            status: 'in_use',
            currentHolder: holder,
          };
        }
        return item;
      })
    );
    showToast(`Checked out apparatus to ${holder.studentName} (${holder.benchNumber}).`);
  };

  // Action: Return Apparatus
  const handleConfirmReturn = (itemId: string, returnCondition: EquipmentCondition, issueNote?: string) => {
    setEquipment((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const isFaulty = returnCondition === 'needs_service';
          const newHistory = issueNote
            ? [
                ...item.maintenanceHistory,
                {
                  id: `M-${Date.now()}`,
                  date: new Date().toISOString().split('T')[0],
                  reportedBy: item.currentHolder ? `${item.currentHolder.studentName} (Check-In)` : 'Student Return',
                  issue: issueNote,
                  status: 'pending' as const,
                },
              ]
            : item.maintenanceHistory;

          return {
            ...item,
            status: isFaulty ? 'maintenance' : 'available',
            condition: returnCondition,
            currentHolder: null,
            maintenanceHistory: newHistory,
          };
        }
        return item;
      })
    );
    showToast('Apparatus successfully checked in and returned to inventory.');
  };

  // Action: Report Issue
  const handleReportIssue = (itemId: string, issue: string, reportedBy: string) => {
    setEquipment((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newRecord = {
            id: `M-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            reportedBy,
            issue,
            status: 'pending' as const,
          };

          return {
            ...item,
            status: 'maintenance',
            condition: 'needs_service',
            currentHolder: null, // released if under maintenance
            maintenanceHistory: [...item.maintenanceHistory, newRecord],
          };
        }
        return item;
      })
    );
    showToast('Maintenance ticket recorded. Apparatus marked Under Maintenance.');
  };

  // Action: Resolve Maintenance
  const handleResolveMaintenance = (itemId: string) => {
    setEquipment((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const today = new Date().toISOString().split('T')[0];
          const updatedHistory = item.maintenanceHistory.map((rec) =>
            rec.status === 'pending'
              ? { ...rec, status: 'resolved' as const, resolvedDate: today }
              : rec
          );

          return {
            ...item,
            status: 'available',
            condition: 'excellent',
            lastInspected: today,
            maintenanceHistory: updatedHistory,
          };
        }
        return item;
      })
    );
    showToast('Maintenance issue resolved. Apparatus is now available & verified.');
  };

  // Action: Add Equipment
  const handleAddEquipment = (
    newItem: Omit<EquipmentItem, 'id' | 'maintenanceHistory' | 'lastInspected'>
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const created: EquipmentItem = {
      ...newItem,
      id: `EQ-CUSTOM-${Date.now()}`,
      lastInspected: today,
      maintenanceHistory: [],
    };

    setEquipment((prev) => [created, ...prev]);
    showToast(`Added ${created.name} to laboratory catalog.`);
  };

  // Stats calculation
  const totalCount = equipment.length;
  const availableCount = equipment.filter((i) => i.status === 'available').length;
  const inUseCount = equipment.filter((i) => i.status === 'in_use').length;
  const maintenanceCount = equipment.filter((i) => i.status === 'maintenance').length;

  // Filtered equipment list
  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTag = item.assetTag.toLowerCase().includes(query);
        const matchesRoom = item.location.room.toLowerCase().includes(query);
        const matchesCabinet = item.location.cabinet.toLowerCase().includes(query);
        const matchesCourse = item.requiredForToday?.toLowerCase().includes(query) || false;
        const matchesHolder = item.currentHolder?.studentName.toLowerCase().includes(query) || false;

        if (!matchesName && !matchesTag && !matchesRoom && !matchesCabinet && !matchesCourse && !matchesHolder) {
          return false;
        }
      }

      return true;
    });
  }, [equipment, selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="min-h-screen bg-snow-100 flex flex-col selection:bg-butter-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
          <div className="bg-snow-900 text-snow-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-snow-700 max-w-md">
            <span className="w-2.5 h-2.5 rounded-full bg-butter-400"></span>
            <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onAddClick={() => setIsAddModalOpen(true)}
        onResetData={handleResetDemoData}
        itemCount={totalCount}
        availableCount={availableCount}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Welcome & Problem Statement Banner */}
        <div className="butter-glass rounded-3xl p-6 sm:p-7 border border-butter-300/80 mb-8 relative overflow-hidden shadow-snow-sm">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-butter-200/90 text-butter-900 text-xs font-bold uppercase tracking-wider mb-3 border border-butter-300">
              <Compass className="w-3.5 h-3.5 text-butter-700" />
              <span>Zero-Wasted Session Time</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-snow-900 tracking-tight leading-tight">
              Instant Laboratory Apparatus & Inventory Locator
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-snow-700 leading-relaxed font-medium">
              Eliminate pre-practical rush. Check real-time instrument availability, pinpoint exact shelf and cabinet coordinates across campus labs, inspect apparatus working condition, and log maintenance in seconds.
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-butter-300/30 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Stats Overview */}
        <StatsOverview
          total={totalCount}
          available={availableCount}
          inUse={inUseCount}
          maintenance={maintenanceCount}
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
        />

        {/* Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          onSelectStatus={setSelectedStatus}
          totalFiltered={filteredEquipment.length}
        />

        {/* Equipment Grid */}
        {filteredEquipment.length === 0 ? (
          <div className="bg-white rounded-3xl border border-snow-200 p-12 text-center shadow-snow-sm my-6">
            <div className="w-12 h-12 rounded-2xl bg-butter-100 text-butter-800 flex items-center justify-center mx-auto mb-3 border border-butter-300">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-snow-900">
              No laboratory apparatus matches your filter criteria
            </h3>
            <p className="text-xs text-snow-500 mt-1 max-w-sm mx-auto">
              Try altering your search keywords or resetting category and status filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-snow-100 hover:bg-butter-100 text-snow-800 text-xs font-bold border border-snow-200 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEquipment.map((item) => (
              <EquipmentCard
                key={item.id}
                item={item}
                onCheckout={(target) => setCheckoutItem(target)}
                onReturn={(target) => setReturnItem(target)}
                onReportIssue={(target) => setReportIssueItem(target)}
                onViewDetails={(target) => setDetailsItem(target)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="snow-glass border-t border-snow-200/80 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-snow-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-bold text-snow-800">LabTrack</span>
            <span>•</span>
            <span>Laboratory Inventory, Condition & Maintenance System</span>
          </div>
          <div>
            Minimal & modern light yellow and snowy theme • Deployment Ready
          </div>
        </div>
      </footer>

      {/* Modals */}
      {checkoutItem && (
        <CheckoutModal
          item={checkoutItem}
          isOpen={!!checkoutItem}
          onClose={() => setCheckoutItem(null)}
          onConfirm={handleConfirmCheckout}
        />
      )}

      {returnItem && (
        <ReturnModal
          item={returnItem}
          isOpen={!!returnItem}
          onClose={() => setReturnItem(null)}
          onConfirmReturn={handleConfirmReturn}
        />
      )}

      {reportIssueItem && (
        <ReportIssueModal
          item={reportIssueItem}
          isOpen={!!reportIssueItem}
          onClose={() => setReportIssueItem(null)}
          onSubmitIssue={handleReportIssue}
        />
      )}

      {detailsItem && (
        <EquipmentDetailsModal
          item={detailsItem}
          isOpen={!!detailsItem}
          onClose={() => setDetailsItem(null)}
          onCheckout={(target) => {
            setDetailsItem(null);
            setCheckoutItem(target);
          }}
          onResolveMaintenance={handleResolveMaintenance}
        />
      )}

      {isAddModalOpen && (
        <AddEquipmentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddEquipment}
        />
      )}

    </div>
  );
}

export default App;
