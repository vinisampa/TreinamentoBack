import Piu from '../models/Piu';

interface CreatePiuDTO {
  userId: string;
  text: string;
  created_at: Date;
  updated_at: Date;
}

interface UpdatePiuDTO {
  id: string;
  userId: string;
  text: string;
  created_at: Date;
  updated_at: Date;
}

interface DeletePiuDTO {
  id: string;
}

class PiusRepository {
  private pius: Piu[];

  constructor(){
    this.pius = [];
  }

  public all(): Piu[] {
    return this.pius;
  }

  public findById(id: string): Piu | null {
    const findIdEqual = this.pius.find(pius => pius.id === id);

    return findIdEqual || null;
  }

  public create({ userId, text, created_at, updated_at }: CreatePiuDTO): Piu {
    const piu = new Piu({ userId, text, created_at, updated_at });

    this.pius.push(piu);
    return piu;      
  }

  public update({ id, userId, text, created_at, updated_at}: UpdatePiuDTO) : Piu {
    const userIndex = this.pius.findIndex(pius => pius.id === id);
      
    this.pius[userIndex].userId = userId;
    this.pius[userIndex].text = text;
    this.pius[userIndex].created_at = created_at;
    this.pius[userIndex].updated_at = updated_at;
    
    return this.pius[userIndex];
  }

  public delete({ id }: DeletePiuDTO) : void {
    const userIndex = this.pius.findIndex(pius => pius.id === id);

    this.pius.splice(userIndex, 1);
  }
}

export default PiusRepository;