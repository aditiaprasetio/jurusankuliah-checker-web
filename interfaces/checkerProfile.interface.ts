export enum ECurrentProfileStatus {
  LULUS_KULIAH = 'LULUS_KULIAH',
  MAHASISWA = 'MAHASISWA',
  PEJUANG_KULIAH = 'PEJUANG_KULIAH',
}

export interface ICheckerProfileData {
  id: string;
  account_id: string;
  current_status: string;
  department_id: string;
  department?: any;
  want_department_id: string;
  want_department?: any;
}
