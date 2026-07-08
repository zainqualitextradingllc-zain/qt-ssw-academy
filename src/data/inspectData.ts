// =============================================
// QT SSW ACADEMY — QT InspectTag™ Demo Data
// NFC Inspection Simulation
// QT Drive Innovations® Proprietary System
// =============================================

import type { InspectReport } from '../types';

export const DEMO_VEHICLES = [
  { id: 'VH-001', name: 'Toyota Corolla (2022)', vin: 'ZZE142-0012345' },
  { id: 'VH-002', name: 'Honda Fit (2021)', vin: 'GK5-1098765' },
  { id: 'VH-003', name: 'Nissan Note (2023)', vin: 'E13-0056789' },
];

export const generateInspectReport = (vehicleId: string, inspector: string): InspectReport => {
  const vehicle = DEMO_VEHICLES.find(v => v.id === vehicleId) || DEMO_VEHICLES[0];
  const now = new Date();
  const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;

  return {
    vehicleId: vehicle.id,
    vehicleName: vehicle.name,
    vin: vehicle.vin,
    inspectionDate: dateStr,
    inspector,
    overallStatus: 'warning',
    items: [
      {
        nameJa: 'エンジンオイル量',
        nameEn: 'Engine Oil Level',
        status: 'pass',
        noteJa: '規定値内（MIN〜MAX）',
        noteEn: 'Within specified range (MIN to MAX)',
      },
      {
        nameJa: 'ブレーキパッド厚',
        nameEn: 'Brake Pad Thickness',
        status: 'warning',
        noteJa: '残り2.5mm — 早期交換を推奨',
        noteEn: '2.5mm remaining — early replacement recommended',
      },
      {
        nameJa: 'タイヤ溝深さ（前）',
        nameEn: 'Front Tire Tread Depth',
        status: 'pass',
        noteJa: '4.2mm（使用限度1.6mm以上）',
        noteEn: '4.2mm (above 1.6mm minimum)',
      },
      {
        nameJa: 'タイヤ溝深さ（後）',
        nameEn: 'Rear Tire Tread Depth',
        status: 'pass',
        noteJa: '3.8mm（使用限度1.6mm以上）',
        noteEn: '3.8mm (above 1.6mm minimum)',
      },
      {
        nameJa: '冷却水量',
        nameEn: 'Coolant Level',
        status: 'pass',
        noteJa: 'リザーバータンク内MIN〜MAX',
        noteEn: 'Reservoir tank between MIN and MAX',
      },
      {
        nameJa: 'バッテリー電圧',
        nameEn: 'Battery Voltage',
        status: 'pass',
        noteJa: '12.6V（正常範囲12.4〜12.8V）',
        noteEn: '12.6V (normal range 12.4-12.8V)',
      },
      {
        nameJa: 'ウォッシャー液',
        nameEn: 'Washer Fluid',
        status: 'warning',
        noteJa: '残量少 — 補充が必要',
        noteEn: 'Low level — refill required',
      },
      {
        nameJa: 'ヘッドライト（左右）',
        nameEn: 'Headlights (L/R)',
        status: 'pass',
        noteJa: '点灯確認済み',
        noteEn: 'Confirmed operational',
      },
      {
        nameJa: 'ブレーキランプ',
        nameEn: 'Brake Lights',
        status: 'pass',
        noteJa: '点灯確認済み',
        noteEn: 'Confirmed operational',
      },
      {
        nameJa: 'エアフィルター',
        nameEn: 'Air Filter',
        status: 'fail',
        noteJa: '著しく汚れあり — 即時交換が必要',
        noteEn: 'Heavily soiled — immediate replacement required',
      },
    ],
  };
};
