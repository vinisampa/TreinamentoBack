import Piu from '../models/Piu';
import PiusRepository from '../repositories/PiusRepository';
import UsersRepository from '../repositories/UsersRepository';

interface RequestDTO {
  userId: string;
  text: string;
  created_at: Date;
  updated_at: Date;
}

class CreatePiuService {
  private piusRepository: PiusRepository;
  private usersRepository: UsersRepository;

  constructor(piusRepository: PiusRepository, usersRepository: UsersRepository) {
    this.piusRepository = piusRepository;
    this.usersRepository = usersRepository;
  }

  public run({ userId, text, created_at, updated_at}: RequestDTO): Piu {
    if (!text) {
      throw Error('Texto vazio.');
    } else if (text.length >= 140) {
      throw Error('Texto ultrapassa limite de caracteres.');
    };
    
    if (!this.usersRepository.findById(userId)) {
      throw Error('Id do usuário informado não existe.');
    };
    
    const piu = this.piusRepository.create({
      userId,
      text,
      created_at, 
      updated_at,
    });

    return piu;
  }
}

export default CreatePiuService;