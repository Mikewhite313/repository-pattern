const BaseRepository = require("../Repositories/BaseRepository"); // Import the BaseRepository
const HttpStatusCodes = require("../constants/http-status"); // Import your HttpStatusCodes and HttpStatusNames
const HttpStatusNames = require("../constants/http-status");
const Role = require("../Models/role-model");
const Permission = require("../Models/Permission");

const roleRepository = new BaseRepository(Role);
const permissionRepository = new BaseRepository(Permission);

module.exports = {
  createRole: async (body) => {
    try {
      const { name, permissions } = body;

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
      const checkIfTheRoleExists = await roleRepository.findOne({ name: name });

      if (!checkIfTheRoleExists) {
        const getTheSpecificPermission = await permissionRepository.findOne({
          name: permissions,
        });
        if (!getTheSpecificPermission) {
          return {
            data: {},
            status: HttpStatusCodes.notFound,
            code: HttpStatusCodes.notFound,
            message: "Invalid Permission Name",
          };
        }

        // Create a new user with the specified role
        const formData = {
          name,
          permissions: getTheSpecificPermission,
        };

        // Use Promises for create
        const createNewRole = await roleRepository.create(formData);

        if (!createNewRole) {
          return {
            data: {},
            status: HttpStatusCodes.badRequest,
            code: HttpStatusCodes.badRequest,
            message: "Error Occurred In Creating User",
          };
        }

        // User creation successful
        return {
          data: createNewRole,
          status: HttpStatusCodes.ok,
          code: HttpStatusCodes.ok,
          message: HttpStatusNames.ok,
        };
      } else {
        // User already exists
        return {
          data: checkIfTheRoleExists,
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
