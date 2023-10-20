const adminRepository = require("../repositories/adminRepository");

const createAdmin = async (requestBody) => {
  try {
    return await adminRepository.create(requestBody);
  } catch (error) {
    throw error;
  }
};

const updateAdmin = async (id, requestBody) => {
  try {
    return await adminRepository.update(id, requestBody);
  } catch (error) {
    throw error;
  }
};

const deleteAdmin = async (id) => {
  try {
    return await adminRepository.deleteData(id);
  } catch (error) {
    throw error;
  }
};

const findAdminById = async (id) => {
  try {
    return await adminRepository.findById(id);
  } catch (error) {
    throw error;
  }
};

const findAllAdmins = async () => {
  try {
    return await adminRepository.findAll();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  findAdminById,
  findAllAdmins,
};
