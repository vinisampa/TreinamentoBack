import { Router } from "express";
import { parseISO, isValid } from "date-fns";
import UsersRepository from "../repositories/UsersRepository";
import CreateUserService from "../services/CreateUserService";
import UpdateUserService from "../services/UpdateUserService";
import DeleteUserService from "../services/DeleteUserService";

const usersRouter = Router();
export const usersRepository = new UsersRepository();

usersRouter.get('/', (request, response) => {
  const { id } = request.query;
  
  const users = id ? usersRepository.findById((id as string)) : usersRepository.all();

  return response.json(users);
});

usersRouter.post('/', (request, response) => {
  try{
    const { name, birthDate, cpf, phone, createDate, updateDate } = request.body;

    const parsedBirthDate = parseISO(birthDate);
    const parsedCreateDate = parseISO(createDate);
    const parsedUpdateDate = parseISO(updateDate);
  
    const createUser = new CreateUserService(usersRepository);
  
    const user = createUser.run({ 
      name,
      birthDate: parsedBirthDate,
      cpf,
      phone,
      created_at: parsedCreateDate, 
      updated_at: parsedUpdateDate,
    });
  
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message });
  }
});

usersRouter.put('/:id', (request, response) => {
  try {
    const { id } = request.params;
    const { name, birthDate, cpf, phone, createDate, updateDate } = request.body;
  
    const parsedBirthDate = parseISO(birthDate);
    const parsedCreateDate = parseISO(createDate);
    const parsedUpdateDate = parseISO(updateDate);
  
    const updateUser = new UpdateUserService(usersRepository);
  
    const user = updateUser.run({
      id,
      name,
      birthDate: parsedBirthDate,
      cpf,
      phone,
      created_at: parsedCreateDate, 
      updated_at: parsedUpdateDate,
    });
  
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message });
  }
});

usersRouter.delete('/:id', (request, response) => {
  try {
    const { id } = request.params;

    const deleteUser = new DeleteUserService(usersRepository);
    deleteUser.run({ id });
  
    return response.status(200).send();
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message });
  }
});

export default usersRouter;