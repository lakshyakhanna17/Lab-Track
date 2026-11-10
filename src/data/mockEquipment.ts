import { EquipmentItem } from '../types/inventory';

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'EQ-PHY-01',
    assetTag: 'PHY-OSC-004',
    name: 'Dual-Channel Digital Storage Oscilloscope (100MHz)',
    category: 'Physics',
    status: 'available',
    condition: 'excellent',
    location: {
      room: 'Room 204 • Optics & Modern Physics Lab',
      cabinet: 'Cabinet A (Yellow Bay)',
      shelf: 'Shelf 2',
      benchSlot: 'Bench 04'
    },
    description: 'High-precision 2-channel oscilloscope with color TFT display, USB data logging, and auto-measurement.',
    specs: '100 MHz Bandwidth, 1 GSa/s, 2 Ch, 7" Color LCD',
    lastInspected: '2026-10-28',
    requiredForToday: 'PHYS-202: Electromagnetic Wave Mechanics',
    currentHolder: null,
    maintenanceHistory: [
      {
        id: 'M-101',
        date: '2026-09-12',
        reportedBy: 'Dr. Sarah Collins',
        issue: 'Channel 2 BNC connector recalibrated and tested ok',
        status: 'resolved',
        resolvedDate: '2026-09-14'
      }
    ]
  },
  {
    id: 'EQ-CHEM-02',
    assetTag: 'CHM-SPC-012',
    name: 'UV-Visible Double Beam Spectrophotometer',
    category: 'Chemistry',
    status: 'in_use',
    condition: 'good',
    location: {
      room: 'Room 108 • Analytical Chemistry Suite',
      cabinet: 'Fume Hood Station West',
      shelf: 'Bench Island 3',
      benchSlot: 'Workstation 3B'
    },
    description: 'Wavelength range 190nm to 1100nm, quartz cuvette set included. Essential for beer-lambert law analysis.',
    specs: 'Wavelength 190–1100 nm, 1.8 nm spectral bandwidth, Deuterium & Tungsten lamp',
    lastInspected: '2026-11-02',
    requiredForToday: 'CHEM-310: Organic Spectroscopy Practicum',
    currentHolder: {
      studentName: 'Aarav Patel',
      studentId: '2024-CH-042',
      benchNumber: 'Bench 3B',
      checkedOutAt: '10:15 AM',
      expectedReturn: '12:30 PM',
      purpose: 'Quantitative determination of iron in unknown solution'
    },
    maintenanceHistory: []
  },
  {
    id: 'EQ-ELE-03',
    assetTag: 'ELE-FG-009',
    name: 'Arbitrary Function / Waveform Generator 25MHz',
    category: 'Electronics',
    status: 'available',
    condition: 'good',
    location: {
      room: 'Room 312 • Embedded & Digital Systems Lab',
      cabinet: 'Rack Tower 2',
      shelf: 'Shelf C',
      benchSlot: 'Bench 08'
    },
    description: 'Generates Sine, Square, Ramp, Pulse, Noise, and Arbitrary waveforms. 14-bit vertical resolution.',
    specs: '25 MHz Sine, 125 MSa/s, 16k waveform memory',
    lastInspected: '2026-10-15',
    requiredForToday: 'ECE-215: Active Filter Design Lab',
    currentHolder: null,
    maintenanceHistory: []
  },
  {
    id: 'EQ-BIO-04',
    assetTag: 'BIO-MIC-018',
    name: 'Trinocular Phase Contrast Compound Microscope',
    category: 'Biology',
    status: 'maintenance',
    condition: 'needs_service',
    location: {
      room: 'Room 102 • Microbiology & Cytology Hub',
      cabinet: 'Cabinet D (Optics Storage)',
      shelf: 'Under Maintenance Desk',
      benchSlot: 'Tech Station'
    },
    description: 'Equipped with 4x, 10x, 40x, 100x oil immersion objectives and 5MP digital camera mount.',
    specs: 'Plan Achromat 4x/10x/40x/100x Oil, LED illumination, Coaxial fine focus',
    lastInspected: '2026-11-08',
    requiredForToday: 'BIO-112: Cell Morphology Examination',
    currentHolder: null,
    maintenanceHistory: [
      {
        id: 'M-102',
        date: '2026-11-08',
        reportedBy: 'Kavita Sundaram (Lab Instructor)',
        issue: '100x Oil objective focus gear sticking; requires cleaning and realignment',
        status: 'pending'
      }
    ]
  },
  {
    id: 'EQ-PHY-05',
    assetTag: 'PHY-LAS-003',
    name: 'He-Ne Laser System & Optical Bench Rail (632.8nm)',
    category: 'Physics',
    status: 'available',
    condition: 'excellent',
    location: {
      room: 'Room 204 • Optics & Modern Physics Lab',
      cabinet: 'Darkroom Table 1',
      shelf: 'Main Optical Rail',
      benchSlot: 'Bench 01'
    },
    description: 'Stabilized red laser source with 1.5m extruded aluminum optical rail, diffraction slits, and photodetector.',
    specs: '632.8 nm Red, 2.0 mW output, TEM00 mode, Class 3R',
    lastInspected: '2026-11-05',
    requiredForToday: 'PHYS-202: Single & Double Slit Interference',
    currentHolder: null,
    maintenanceHistory: []
  },
  {
    id: 'EQ-ELE-06',
    assetTag: 'ELE-DMM-033',
    name: 'True-RMS 6.5 Digit Precision Bench Multimeter',
    category: 'Electronics',
    status: 'in_use',
    condition: 'excellent',
    location: {
      room: 'Room 312 • Embedded & Digital Systems Lab',
      cabinet: 'Cabinet E',
      shelf: 'Shelf 1',
      benchSlot: 'Bench 02'
    },
    description: 'Ultra-sensitive DC/AC voltage, resistance, capacitance, diode test with four-wire Kelvin probes.',
    specs: '6.5 Digits resolution, 0.0035% DC voltage accuracy, Dual display',
    lastInspected: '2026-10-30',
    requiredForToday: 'ECE-301: Microelectronic Sensor Interfacing',
    currentHolder: {
      studentName: 'Maya Chen',
      studentId: '2024-EC-089',
      benchNumber: 'Bench 02',
      checkedOutAt: '11:00 AM',
      expectedReturn: '01:00 PM',
      purpose: 'Low-noise operational amplifier characterization'
    },
    maintenanceHistory: []
  },
  {
    id: 'EQ-CHEM-07',
    assetTag: 'CHM-BAL-006',
    name: 'Analytical Precision Balance (0.1mg Readability)',
    category: 'Chemistry',
    status: 'available',
    condition: 'excellent',
    location: {
      room: 'Room 108 • Analytical Chemistry Suite',
      cabinet: 'Vibration-Isolation Table A',
      shelf: 'Center Surface',
      benchSlot: 'Weighing Area'
    },
    description: 'Glass draft shield, internal motorized calibration weight, anti-static ionizer included.',
    specs: 'Capacity 220g, Readability 0.0001g (0.1 mg), Internal Cal',
    lastInspected: '2026-11-09',
    requiredForToday: 'CHEM-205: Gravimetric Chemical Analysis',
    currentHolder: null,
    maintenanceHistory: []
  },
  {
    id: 'EQ-GEN-08',
    assetTag: 'GEN-AUT-002',
    name: 'Top-Loading Steam Sterilizer Autoclave 50L',
    category: 'General',
    status: 'available',
    condition: 'good',
    location: {
      room: 'Room 100 • Central Prep & Sterilization Room',
      cabinet: 'Utility Bay 1',
      shelf: 'Floor Mounted Unit',
      benchSlot: 'Station 1'
    },
    description: 'Programmable microprocessor control for liquid, agar, and glassware sterilization cycles (121°C - 134°C).',
    specs: 'Chamber Volume 50 Liters, Max Temp 134°C, Stainless Steel 304',
    lastInspected: '2026-10-20',
    requiredForToday: 'Shared Bio/Chem Media Preparation',
    currentHolder: null,
    maintenanceHistory: []
  },
  {
    id: 'EQ-BIO-09',
    assetTag: 'BIO-CEN-011',
    name: 'Refrigerated High-Speed Microcentrifuge (15,000 RPM)',
    category: 'Biology',
    status: 'maintenance',
    condition: 'needs_service',
    location: {
      room: 'Room 102 • Microbiology & Cytology Hub',
      cabinet: 'Cold Bench Zone',
      shelf: 'Bench 5',
      benchSlot: 'Bench 5A'
    },
    description: 'Rapid cooling down to -4°C, 24 x 1.5/2.0 mL aerosol-tight angle rotor with click lid.',
    specs: 'Max RCF 21,300 x g, Temp range -9°C to 40°C, Timer 10s to 9h 59m',
    lastInspected: '2026-11-07',
    requiredForToday: 'BIO-240: Plasmid DNA Extraction',
    currentHolder: null,
    maintenanceHistory: [
      {
        id: 'M-103',
        date: '2026-11-07',
        reportedBy: 'Devansh Roy',
        issue: 'Lid latch solenoid error code E-04 during pre-cool cycle; sensor adjustment requested',
        status: 'pending'
      }
    ]
  },
  {
    id: 'EQ-ELE-10',
    assetTag: 'ELE-PWR-015',
    name: 'Triple Output Programmable DC Power Supply (30V/3A)',
    category: 'Electronics',
    status: 'available',
    condition: 'excellent',
    location: {
      room: 'Room 312 • Embedded & Digital Systems Lab',
      cabinet: 'Cabinet B (Power Gear)',
      shelf: 'Shelf 3',
      benchSlot: 'Bench 07'
    },
    description: 'Two independent isolated 30V/3A channels plus fixed 5V/3A output with low ripple & noise (<350uVrms).',
    specs: 'Ch 1 & 2: 0-30V / 3A, Ch 3: 5V / 3A, 195W total, OVP/OCP protection',
    lastInspected: '2026-11-01',
    requiredForToday: 'ECE-110: Basic Electronics Circuit Verification',
    currentHolder: null,
    maintenanceHistory: []
  }
];
