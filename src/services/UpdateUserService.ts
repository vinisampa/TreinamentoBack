import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface RequesteDTO {
  id: string;
  name: string;
  birthDate: Date;
  cpf: string; 
  phone: string;
  created_at: Date;
  updated_at: Date;
}

class UpdateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public run({ id, name, birthDate, cpf, phone, created_at, updated_at}: RequesteDTO): User {
    const findUser = this.usersRepository.findById(id);
    if (!findUser) {
      throw Error ('Usário com id informado não encontrado.');
    };
   
    const findCpfEqual = this.usersRepository.findByCPF(cpf);
    if (findCpfEqual) {
      throw Error('CPF já cadastrado.');
    };

    if (!name) {    //Nome vazio
      throw Error('Não é possível criar usuário com nome vazio.');
    } else if (!birthDate.valueOf()) {    //Nacismento vazio
      throw Error('Não é possível criar usuário sem data de nascimento.');
    } else if (!cpf) {    //CPF vazio
      throw Error('Não é possível criar usuário sem cpf.');
    } else if (!phone) {    //Telefone vazio
      throw Error('Não é possível criar usuário sem telefone');
    };
  
    const user = this.usersRepository.update({
      id,
      name, 
      birthDate,
      cpf, 
      phone,
      created_at,
      updated_at,
    });

    return user;
  }
}

export default UpdateUserService;