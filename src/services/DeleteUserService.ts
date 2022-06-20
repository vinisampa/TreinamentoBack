import UsersRepository from '../repositories/UsersRepository';

interface RequesteDTO {
  id: string;
}

class DeleteUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public run({ id }: RequesteDTO): void {
    const findUser = this.usersRepository.findById(id);
    if (!findUser) {
      throw Error ('Usário com id informado não encontrado.');
    };
  
    this.usersRepository.delete({ id });
  }
}

export default DeleteUserService;