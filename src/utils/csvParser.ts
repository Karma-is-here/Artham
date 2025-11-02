// Simplified CSV parser for Artham
// In the simplified version, we just validate CSV upload and set the flag

export function parseCSV(csvText: string): boolean {
  // Simple validation: check if it's valid CSV with at least one row
  const lines = csvText.trim().split("\n");
  return lines.length >= 2; // Header + at least one data row
}

export function validateCSVUpload(): boolean {
  // For demo purposes, always return true
  return true;
}
