import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import hash from "./hashPassword";

export default async ({ email, password ,role}): Promise<User> => {
  try {
    const user = new User();

    user.email = email;
    user.password = hash(password);
    user.role = role;

    const userRepository = AppDataSource.getRepository(User);

    return await userRepository.save(user);
  } catch (error) {
    throw error;
  }
};
