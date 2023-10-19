const BaseRepository = require("../Repositories/BaseRepository"); // Import the BaseRepository
const HttpStatusCodes = require("../constants/http-status"); // Import your HttpStatusCodes and HttpStatusNames
const HttpStatusNames = require("../constants/http-status");
const User = require("../Models/User");
const Role = require("../Models/role-model");
const bcrypt = require("bcrypt");

const userRepository = new BaseRepository(User);
const roleRepository = new BaseRepository(Role);

module.exports = {
  createUser: async (body) => {
    try {
      const { name, email, password, role } = body;

      // Check for missing or invalid input
      if (
        !body ||
        Object.keys(body).length === 0 ||
        !name ||
        !email ||
        !password
      ) {
        return {
          data: null,
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Body Cannot Be Empty",
        };
      }

      // Check if the user already exists
      const checkIfTheUserExists = await userRepository.findOne({ name });

      if (!checkIfTheUserExists) {
        const hashedPassword = await bcrypt.hash(password, 10);
        // Find or create the specified role
        const getTheSpecificRole = await roleRepository.findOne({
          name: "User",
        });
        if (!getTheSpecificRole) {
          return {
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Role Name",
          };
        }

        // Create a new user with the specified role
        const formData = {
          name,
          email,
          password: hashedPassword,
          role: getTheSpecificRole._id,
        };

        // Use Promises for create
        const createNewUser = await userRepository.create(formData);

        if (!createNewUser) {
          return {
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Error Occurred In Creating User",
          };
        }

        // User creation successful
        return {
          data: createNewUser,
          status: HttpStatusCodes.ok,
          code: HttpStatusCodes.ok,
          message: HttpStatusNames.ok,
        };
      } else {
        // User already exists
        return {
          data: checkIfTheUserExists,
          status: HttpStatusCodes.conflict,
          code: HttpStatusCodes.conflict,
          message: "This User Already Exists",
        };
      }
    } catch (error) {
      // Log the error to the console for debugging
      console.error("Error in createUser:", error);

      return {
        data: {},
        status: HttpStatusCodes.internalServerError,
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  },
  listUser: async () => {
    try {
      const UserList = await userRepository.findAll();
      if (!UserList) {
        return {
          data: {},
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Empty Record",
        };
      } else {
        return {
          data: UserList,
          status: HttpStatusCodes.ok,
          code: HttpStatusCodes.ok,
          message: HttpStatusNames.ok,
        };
      }
    } catch (error) {
      return {
        data: {},
        status: HttpStatusCodes.internalServerError,
        code: HttpStatusCodes.internalServerError,
        message: HttpStatusNames.internalServerError,
      };
    }
  },
  updateUser: async (body) => {
    try {
      const { name, email } = body;
      if (!body || !name || !email) {
        // Check if the request body, name, or email is missing
        return {
          data: null,
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Body, name, or email cannot be empty",
        };
      }
      const checkIfEmailExists = await userRepository.findOne({
        email: body.email,
      });
      if (!checkIfEmailExists) {
        // Find or create the specified role
        const getTheSpecificRole = await roleRepository.findOne({
          name: "User",
        });
        if (!getTheSpecificRole) {
          return {
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Role Name",
          };
        }

        // Create a new user with the specified role
        const formData = {
          name: body.name,
          email: body.email,
          role: getTheSpecificRole, // Assuming your user schema includes a role field
        };

        // Use Promises for update, assuming you have an appropriate update method
        const updatedUser = await userRepository.update(formData);

        if (!updatedUser) {
          return {
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Error Occurred In Updating User",
          };
        } else {
          return {
            data: formData,
            status: HttpStatusCodes.ok,
            code: HttpStatusCodes.ok,
            message: HttpStatusNames.ok,
          };
        }

        // User update successful
      } else {
        // User with the same email already exists
        return {
          data: checkIfEmailExists,
          status: HttpStatusCodes.conflict,
          code: HttpStatusCodes.conflict,
          message: "User with this email already exists",
        };
      }
    } catch (error) {
      // Handle any unexpected errors here
      console.error("Error in updateUser:", error);
      return {
        data: {},
        status: HttpStatusCodes.internalServerError,
        code: HttpStatusCodes.internalServerError,
        message: "Internal Server Error",
      };
    }
  },
  deleteUser: async (body) => {
    const { email } = body;

    if (!body || Object.keys(body).length === 0 || !email) {
      return {
        data: null,
        status: HttpStatusCodes.badRequest,
        code: HttpStatusCodes.badRequest,
        message: "Body Cannot Be Empty",
      };
    }
    const existingUser = await userRepository.findOne({ email });
    if (!existingUser) {
      return {
        data: {},
        status: HttpStatusCodes.notFound,
        code: HttpStatusCodes.notFound,
        message: "Invalid User Name",
      };
    }
    const deleteUser = await userRepository.delete(existingUser);

    if (!deleteUser) {
      return {
        data: {},
        status: HttpStatusCodes.badRequest,
        code: HttpStatusCodes.badRequest,
        message: "Error Occurred In Creating User",
      };
    }

    // User creation successful
    return {
      data: deleteUser,
      status: HttpStatusCodes.ok,
      code: HttpStatusCodes.ok,
      message: HttpStatusNames.ok,
    };
  },
};
