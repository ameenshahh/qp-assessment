import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export default async ({ email }): Promise<User> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    let existingUser = await userRepository.findOneBy({
      email,
    });
    return existingUser;
  } catch (error) {
    throw error;
  }
};
