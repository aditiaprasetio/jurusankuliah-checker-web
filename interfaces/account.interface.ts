export interface IAccountData {
  id?: string;
  created_at?: string;
  updated_at?: string;

  username: string;
  password: string;
  email: string;
  photo_url: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  gender: string;
  roles: string[];

  created_by_id: string;
  meta_created_by?: any;

  forgot_password_token: string;
}
