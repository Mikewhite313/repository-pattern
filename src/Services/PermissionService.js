const BaseRepository = require("../Repositories/BaseRepository"); // Import the BaseRepository
const HttpStatusCodes = require("../constants/http-status"); // Import your HttpStatusCodes and HttpStatusNames
const HttpStatusNames = require("../constants/http-status");
const Permission = require("../Models/Permission");

const permissionRepository = new BaseRepository(Permission);

module.exports = {
  createPermission: async (body) => {
    try {
      const { name } = body;

      // Check for missing or invalid input
      if (!body || Object.keys(body).length === 0 || !name) {
        return {
          data: null,
          status: HttpStatusCodes.badRequest,
          code: HttpStatusCodes.badRequest,
          message: "Body Cannot Be Empty",
        };
      }

      // Check if the user already exists
      const checkIfThePermissionExists = await permissionRepository.findOne({
        name,
      });

      if (!checkIfThePermissionExists) {
        // Create a new user with the specified role
        const formData = {
          name,
        };

        // Use Promises for create
        const createNewPermission = await permissionRepository.create(formData);

        if (!createNewPermission) {
          return {
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Error Occurred In Creating User",
          };
        }

        // User creation successful
        return {
          data: createNewPermission,
          status: HttpStatusCodes.ok,
          code: HttpStatusCodes.ok,
          message: HttpStatusNames.ok,
        };
      } else {
        // User already exists
        return {
          data: checkIfThePermissionExists,
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
};
