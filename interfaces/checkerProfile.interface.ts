export enum ECurrentProfileStatus {
  LULUS_KULIAH = 'LULUS_KULIAH',
  MAHASISWA = 'MAHASISWA',
  PEJUANG_KULIAH = 'PEJUANG_KULIAH',
}

export interface ICheckerProfile {
  account_id: string;
  current_status: string;
  univdept_id: string;
  want_univdept_id: string;
}
