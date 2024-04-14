import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export default async ( id ): Promise<User> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    let existingUser = await userRepository.findOneBy({
      id,
    });
    return existingUser;
  } catch (error) {
    throw error;
  }
};
