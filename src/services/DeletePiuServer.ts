import PiusRepository from '../repositories/PiusRepository';

interface RequesteDTO {
  id: string;
}

class DeletePiuService {
  private piusRepository: PiusRepository;

  constructor(piusRepository: PiusRepository) {
    this.piusRepository = piusRepository;
  }

  public run({ id }: RequesteDTO): void {
    const findUser = this.piusRepository.findById(id);
    if (!findUser) {
      throw Error ('Piu com id informado não encontrado.');
    };
  
    this.piusRepository.delete({ id });
  }
}

export default DeletePiuService;