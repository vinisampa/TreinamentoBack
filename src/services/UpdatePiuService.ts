import Piu from '../models/Piu';
import PiusRepository from '../repositories/PiusRepository';
import UsersRepository from '../repositories/UsersRepository';

interface RequestDTO {
  id: string;
  userId: string;
  text: string;
  created_at: Date;
  updated_at: Date;
}

class UpdatePiuService {
  private piusRepository: PiusRepository;
  private usersRepository: UsersRepository;

  constructor(piusRepository: PiusRepository, usersRepository: UsersRepository) {
    this.piusRepository = piusRepository;
    this.usersRepository = usersRepository;
  }

  public run({ id, userId, text, created_at, updated_at}: RequestDTO): Piu {
    const findPiu = this.piusRepository.findById(id);
    if (!findPiu) {
      throw Error ('Piu com id informado não existe.');
    };
    if (!text) {
      throw Error('Texto vazio.');
    } else if (text.length >= 140) {
      throw Error('Texto ultrapassa limite de caracteres.');
    };
    
    if (!this.usersRepository.findById(userId)) {
      throw Error('Id do usuário informado não encontrado.');
    };
    
    const piu = this.piusRepository.update({
      id,
      userId,
      text,
      created_at, 
      updated_at,
    });

    return piu;
  }
}

export default UpdatePiuService;