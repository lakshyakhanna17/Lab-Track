export type EquipmentCategory = 'All' | 'Physics' | 'Chemistry' | 'Biology' | 'Electronics' | 'General';

export type EquipmentStatus = 'available' | 'in_use' | 'maintenance';

export type EquipmentCondition = 'excellent' | 'good' | 'fair' | 'needs_service';

export interface LocationInfo {
  room: string;
  cabinet: string;
  shelf: string;
  benchSlot?: string;
}

export interface CurrentHolder {
  studentName: string;
  studentId: string;
  benchNumber: string;
  checkedOutAt: string;
  expectedReturn?: string;
  purpose?: string;
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  reportedBy: string;
  issue: string;
  status: 'pending' | 'resolved';
  resolvedDate?: string;
}

export interface EquipmentItem {
  id: string;
  assetTag: string;
  name: string;
  category: Exclude<EquipmentCategory, 'All'>;
  status: EquipmentStatus;
  condition: EquipmentCondition;
  location: LocationInfo;
  description: string;
  specs?: string;
  imageUrl?: string;
  currentHolder?: CurrentHolder | null;
  maintenanceHistory: MaintenanceRecord[];
  lastInspected: string;
  requiredForToday?: string; // Course/Lab experiment e.g. "ECE-201 Digital Circuits"
}
