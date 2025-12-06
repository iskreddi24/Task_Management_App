import api from "./api";

// List all departments
export const listDepartments = async () => {
  const res = await api.get("/departments");
  return res.data;
};

// Create department
export const createDepartment = async (data) => {
  const res = await api.post("/departments", data);
  return res.data;
};

// Assign department head
export const assignDepartmentHead = async (deptId, userId) => {
  const res = await api.put(`/departments/${deptId}/assign-head/${userId}`);
  return res.data;
};

// Delete department
export const deleteDepartment = async (id) => {
  const res = await api.delete(`/departments/${id}`);
  return res.data;
};

// ⭐ NEW — Get users of a specific department
export const getDepartmentUsers = async (deptId) => {
  const res = await api.get(`/departments/${deptId}/users`);
  return res.data;
};

export const updateDepartment = async (deptId, data) => {
  const res = await api.put(`/departments/${deptId}`, data);
  return res.data;
};
