import User from '../models/User';

interface CreateUserDTO {
  name: string;
  birthDate: Date;
  cpf: string; 
  phone: string;
  created_at: Date;
  updated_at: Date;
}

interface UpdateUserDTO {
  id: string;
  name: string;
  birthDate: Date;
  cpf: string; 
  phone: string;
  created_at: Date;
  updated_at: Date;
}

interface DeleteUserDTO {
  id: string;
}

class UsersRepository {
  private users: User[];

  constructor(){
    this.users = [];
  }

  public all(): User[] {
    return this.users;
  }

  public findById(id: string): User | null {
    const findIdEqual = this.users.find(users => users.id === id);

    return findIdEqual || null;
  }

  public findByCPF(cpf: string): User | null {
    const findCpfEqual = this.users.find(users => users.cpf === cpf);
    
    return findCpfEqual || null;
  }

  public create({ name, birthDate, cpf, phone, created_at, updated_at}: CreateUserDTO): User {

    const user = new User({ name, birthDate, cpf, phone, created_at, updated_at });

    this.users.push(user);
    return user;      
  }

  public update({ id, name, birthDate, cpf, phone, created_at,
    updated_at}: UpdateUserDTO) : User {
    const userIndex = this.users.findIndex(users => users.id === id);
      
    this.users[userIndex].name = name;
    this.users[userIndex].birthDate = birthDate;
    this.users[userIndex].cpf = cpf;
    this.users[userIndex].phone = phone;
    this.users[userIndex].created_at = created_at;
    this.users[userIndex].updated_at = updated_at;
    
    return this.users[userIndex];
  }

  public delete({ id }: DeleteUserDTO) : void {
    const userIndex = this.users.findIndex(users => users.id === id);

    this.users.splice(userIndex, 1);
  }
}

export default UsersRepository;
