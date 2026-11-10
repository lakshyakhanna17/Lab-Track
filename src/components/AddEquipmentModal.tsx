import React, { useState } from 'react';
import { X, Plus, MapPin } from 'lucide-react';
import { EquipmentCategory, EquipmentItem } from '../types/inventory';

interface AddEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<EquipmentItem, 'id' | 'maintenanceHistory' | 'lastInspected'>) => void;
}

export const AddEquipmentModal: React.FC<AddEquipmentModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Exclude<EquipmentCategory, 'All'>>('Physics');
  const [assetTag, setAssetTag] = useState('');
  const [room, setRoom] = useState('Room 204 • Optics & Modern Physics Lab');
  const [cabinet, setCabinet] = useState('Cabinet A');
  const [shelf, setShelf] = useState('Shelf 1');
  const [benchSlot, setBenchSlot] = useState('Bench 01');
  const [specs, setSpecs] = useState('');
  const [description, setDescription] = useState('');
  const [requiredForToday, setRequiredForToday] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide an apparatus name.');
      return;
    }

    const tag = assetTag.trim() || `${category.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    onAdd({
      assetTag: tag,
      name: name.trim(),
      category,
      status: 'available',
      condition: 'excellent',
      location: {
        room: room.trim() || 'General Lab Suite',
        cabinet: cabinet.trim() || 'Storage Bay',
        shelf: shelf.trim() || 'Top Shelf',
        benchSlot: benchSlot.trim() || 'Bench 01'
      },
      description: description.trim() || 'Newly added lab equipment ready for student practical sessions.',
      specs: specs.trim() || 'Standard laboratory grade',
      requiredForToday: requiredForToday.trim() || undefined,
      currentHolder: null
    });

    onClose();
  };

  const labRoomOptions = [
    'Room 204 • Optics & Modern Physics Lab',
    'Room 108 • Analytical Chemistry Suite',
    'Room 312 • Embedded & Digital Systems Lab',
    'Room 102 • Microbiology & Cytology Hub',
    'Room 100 • Central Prep & Sterilization Room'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-snow-900/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full border border-snow-200 shadow-snow-lg overflow-hidden animate-scale-up max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="butter-glass p-5 border-b border-butter-300/60 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-butter-800 bg-butter-200/80 px-2.5 py-0.5 rounded-full border border-butter-300">
              Inventory Registration
            </span>
            <h2 className="text-lg font-bold text-snow-900 mt-1">
              Add New Apparatus
            </h2>
            <p className="text-xs text-snow-600 mt-0.5">
              Register new equipment to save students search time
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-snow-500 hover:text-snow-900 hover:bg-white/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-snow-700 mb-1">
              Apparatus Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Digital Gaussmeter / Hall Probe"
              className="w-full px-3 py-2 rounded-xl bg-snow-50 border border-snow-200 text-sm focus:outline-none focus:ring-2 focus:ring-butter-300 focus:border-butter-500"
            />
          </div>

          {/* Category & Asset Tag */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-snow-700 mb-1">
                Laboratory Domain *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-snow-50 border border-snow-200 text-xs focus:outline-none focus:ring-2 focus:ring-butter-300 focus:border-butter-500 text-snow-800"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Electronics">Electronics</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-snow-700 mb-1">
                Asset Tag (Optional)
              </label>
              <input
                type="text"
                value={assetTag}
                onChange={(e) => setAssetTag(e.target.value)}
                placeholder="e.g. PHY-GM-001"
                className="w-full px-3 py-2 rounded-xl bg-snow-50 border border-snow-200 text-xs focus:outline-none focus:ring-2 focus:ring-butter-300 focus:border-butter-500 font-mono"
              />
            </div>
          </div>

          {/* Location Assignment */}
          <div className="p-3.5 rounded-2xl bg-snow-50 border border-snow-200 space-y-3">
            <span className="text-xs font-bold text-snow-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-butter-600" />
              Storage Location Coordinates
            </span>

            <div>
              <label className="block text-[11px] font-medium text-snow-600 mb-1">
                Lab Room
              </label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-snow-200 text-xs focus:outline-none focus:ring-1 focus:ring-butter-400 text-snow-800"
              >
                {labRoomOptions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-snow-500 mb-0.5">Cabinet</label>
                <input
                  type="text"
                  value={cabinet}
                  onChange={(e) => setCabinet(e.target.value)}
                  placeholder="Cabinet A"
                  className="w-full px-2 py-1 rounded-lg bg-white border border-snow-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-snow-500 mb-0.5">Shelf</label>
                <input
                  type="text"
                  value={shelf}
                  onChange={(e) => setShelf(e.target.value)}
                  placeholder="Shelf 1"
                  className="w-full px-2 py-1 rounded-lg bg-white border border-snow-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-snow-500 mb-0.5">Bench Slot</label>
                <input
                  type="text"
                  value={benchSlot}
                  onChange={(e) => setBenchSlot(e.target.value)}
                  placeholder="Bench 01"
                  className="w-full px-2 py-1 rounded-lg bg-white border border-snow-200 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Specs & Course */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-snow-700 mb-1">
                Key Technical Specs
              </label>
              <input
                type="text"
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
                placeholder="e.g. 0-2 Tesla, 0.1mT resolution"
                className="w-full px-3 py-2 rounded-xl bg-snow-50 border border-snow-200 text-xs focus:outline-none focus:ring-2 focus:ring-butter-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-snow-700 mb-1">
                Target Lab Course
              </label>
              <input
                type="text"
                value={requiredForToday}
                onChange={(e) => setRequiredForToday(e.target.value)}
                placeholder="e.g. PHYS-202 Practicum"
                className="w-full px-3 py-2 rounded-xl bg-snow-50 border border-snow-200 text-xs focus:outline-none focus:ring-2 focus:ring-butter-300"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-snow-700 mb-1">
              Short Description / Notes
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Keep probe capped in velvet case when not in use."
              className="w-full p-2.5 rounded-xl bg-snow-50 border border-snow-200 text-xs focus:outline-none focus:ring-2 focus:ring-butter-300"
            />
          </div>

          {/* Submit */}
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
              <Plus className="w-4 h-4" />
              <span>Save & Catalog</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
