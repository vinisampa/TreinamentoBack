import { uuid } from "uuidv4"

class Piu {
  id: string;
  userId: string;
  text: string;
  created_at: Date;
  updated_at: Date;

  constructor({userId, text, created_at, updated_at}: Omit<Piu, 'id'>){
    this.id = uuid();
    this.userId = userId;
    this.text = text;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export default Piu;