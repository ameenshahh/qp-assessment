
import checkExistingUser from "./checkExistingUser";
import createUser from "./createUser";

export default async () => {

  let email = process.env.ADMIN_EMAIL;
  let password = process.env.ADMIN_password;
  let role = "admin";

  try {
    // Checking for existing user
    const existingUser = await checkExistingUser({ email });

    if (!existingUser) {
      let createdAdmin = await createUser({ email, password, role });

      if (!createdAdmin) {
        throw new Error("Failed to create admin")
      }

      console.info("Admin Created")
      
    }
  } catch (error) {
    console.error(error)
  }
};
