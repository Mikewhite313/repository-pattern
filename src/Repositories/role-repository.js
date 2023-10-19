const Role = require("../Models/role-model");

class UserRepository {
  /**
   * Creates a new role.
   * @param {Object} roleData - The role data.
   * @returns {Promise} A promise that resolves to the newly created role.
   */
  async createRole(roleData) {
    try {
      const newRole = await Role.create(roleData);
      return newRole;
    } catch (error) {
      console.error("Failed to create role:", error);
      throw error;
    }
  }

  /**
   * Finds a role based on the provided query and optionally populates a field.
   * @param {Object} query - The query to find the role.
   * @param {string} fieldToPopulate - The field to populate (optional).
   * @returns {Promise} A promise that resolves to the found role.
   */
  async findRole(query, fieldToPopulate) {
    try {
      let role;
      if (!fieldToPopulate) {
        role = await Role.findOne(query);
      } else {
        role = await Role.findOne(query).populate(fieldToPopulate);
      }
      return role;
    } catch (error) {
      console.error("Failed to find role:", error);
      throw error;
    }
  }

  /**
   * Finds roles based on the provided query.
   * @param {Object} query - The query to find the roles.
   * @returns {Promise} A promise that resolves to the found roles.
   */
  async findRoles(query) {
    try {
      const roles = await Role.find(query);
      return roles;
    } catch (error) {
      console.error("Failed to find roles:", error);
      throw error;
    }
  }

  /**
   * Updates a role based on the provided query and updated data.
   * @param {Object} query - The query to find the role to update.
   * @param {Object} updatedData - The updated data for the role.
   * @returns {Promise} A promise that resolves to the updated role.
   */
  async updateRole(query, updatedData) {
    try {
      const updatedRole = await Role.findOneAndUpdate(query, updatedData, {
        new: true,
      });
      return updatedRole;
    } catch (error) {
      console.error("Failed to update role:", error);
      throw error;
    }
  }

  /**
   * Deletes a role based on the provided query.
   * @param {Object} query - The query to find the role to delete.
   * @returns {Promise} A promise that resolves to the deleted role.
   */
  async deleteRole(query) {
    try {
      const deletedRole = await Role.findOneAndDelete(query);
      return deletedRole;
    } catch (error) {
      console.error("Failed to delete role:", error);
      throw error;
    }
  }
}

const userRepository = new UserRepository();
module.exports = userRepository;
