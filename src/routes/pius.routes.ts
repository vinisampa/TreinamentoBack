import { Router } from "express";
import { parseISO } from "date-fns";
import PiusRepository from "../repositories/PiusRepository";
import { usersRepository } from "./users.routes";
import CreatePiuService from "../services/CreatePiuService";
import UpdatePiuService from "../services/UpdatePiuService";
import DeletePiuService from "../services/DeletePiuServer";

const piusRouter = Router();
const piusRepository = new PiusRepository(); 

piusRouter.get('/', (request, response) => {
  const { id } = request.query;
  
  const pius = id ? piusRepository.findById((id as string)) : piusRepository.all();

  return response.json(pius);
});

piusRouter.post('/', (request, response) => {
  try{
    const { userId, text, createDate, updateDate } = request.body;

    const parsedCreateDate = parseISO(createDate);
    const parsedUpdateDate = parseISO(updateDate);
    
    const createPiu = new CreatePiuService(piusRepository, usersRepository);
    
    const piu = createPiu.run({
      userId,
      text,
      created_at: parsedCreateDate,
      updated_at: parsedUpdateDate,
    })
  
    return response.json(piu);
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message })
  }
});

piusRouter.put('/:id', (request, response) => {
  try {
    const { id } = request.params;
    const { userId, text, createDate, updateDate } = request.body;
  
    const parsedCreateDate = parseISO(createDate);
    const parsedUpdateDate = parseISO(updateDate);
  
    const updatePiu = new UpdatePiuService(piusRepository, usersRepository);
  
    const user = updatePiu.run({
      id,
      userId,
      text,
      created_at: parsedCreateDate, 
      updated_at: parsedUpdateDate,
    });
  
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message });
  }
});

piusRouter.delete('/:id', (request, response) => {
  try {
    const { id } = request.params;

    const deletePiu = new DeletePiuService(piusRepository);
    deletePiu.run({ id });
  
    return response.status(200).send();
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message });
  }
});

export default piusRouter;