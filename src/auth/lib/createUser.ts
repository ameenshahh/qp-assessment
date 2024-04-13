import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import hash from "./hashPassword";

export default async ({ email, password }): Promise<User> => {
  try {
    const user = new User();

    user.email = email;
    user.password = hash(password);
    user.role = "user";

    const userRepository = AppDataSource.getRepository(User);

    return await userRepository.save(user);
  } catch (error) {
    throw error;
  }
};
