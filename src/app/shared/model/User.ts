export class User {
  user_id: number;
  username: string;
  email: string;
  enabled: boolean;
  lastname: string;
  firstname: string;
  matricule: string;
  role: number;
  sexe: string;
  age: number;
  adresse: string;
  contact: string;
  token: string;
  password: string;
  type: boolean;
  limit: number;
  page: number;
  constructor() {
    this.limit = 10;
    this.page = 1;
    this.enabled = true;
  }
}
