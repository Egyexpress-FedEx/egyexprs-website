export interface PackageWeight {
  length: number | null;
  width: number | null;
  height: number | null;
  actualWeight: number | null;
}
export const roundWeight = (value: number): number => Math.round((value + Number.EPSILON) * 1000) / 1000;
export const nonNegative = (value: number | null | undefined): number => Number.isFinite(value) ? Math.max(0, value ?? 0) : 0;
export const volumetricWeight = (row: Partial<PackageWeight>): number =>
  roundWeight(nonNegative(row.length) * nonNegative(row.width) * nonNegative(row.height) / 5000);
export const chargeableWeight = (rows: Partial<PackageWeight>[]): number =>
  Math.max(0.5, roundWeight(rows.reduce((sum, row) => sum + Math.max(nonNegative(row.actualWeight), volumetricWeight(row)), 0)));
