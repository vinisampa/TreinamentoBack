import { uuid } from "uuidv4"

class User {
  id: string;
  name: string;
  birthDate: Date;
  cpf: string;
  phone: string;
  created_at: Date;
  updated_at: Date;

  constructor({name, birthDate, cpf, phone, created_at,
    updated_at}: Omit<User, 'id'>) {

    this.id = uuid();
    this.name = name;
    this.birthDate = birthDate;
    this.cpf = cpf;
    this.phone = phone;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default User;
