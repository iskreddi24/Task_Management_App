// src/api/tasks.js
import api from "./api";

/* -----------------------------------------------------
   GET ALL TASKS (returns TaskResponseDTO[])
   Matches: GET /api/v1/tasks
----------------------------------------------------- */
export const listTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

/* -----------------------------------------------------
   CREATE TASK
   Matches: POST /api/v1/tasks (Multipart)
----------------------------------------------------- */
export const createTask = async (data) => {
  const fd = new FormData();
  fd.append("title", data.title);
  fd.append("description", data.description || "");
  fd.append("assigneeId", data.assigneeId);

  if (data.file) {
    fd.append("file", data.file);
  }

  const res = await api.post("/tasks", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

/* -----------------------------------------------------
   START TASK
   Matches: PATCH /api/v1/tasks/{id}/start
----------------------------------------------------- */
export const startTask = async (taskId) => {
  const res = await api.patch(`/tasks/${taskId}/start`);
  return res.data;
};

/* -----------------------------------------------------
   SUBMIT TASK (Proof)
   Matches: PATCH /api/v1/tasks/{id}/submit
----------------------------------------------------- */
export const submitTask = (id, file, comment) => {
  const form = new FormData();
  form.append("file", file);
  form.append("comment", comment);

  return api.patch(`/tasks/${id}/submit`, form, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};


/* -----------------------------------------------------
   REVIEW TASK
   Matches: PATCH /api/v1/tasks/{id}/review
----------------------------------------------------- */
export const reviewTask = async (taskId, data) => {
  const res = await api.patch(`/tasks/${taskId}/review`, data);
  return res.data;
};

/* -----------------------------------------------------
   HISTORY
   Matches: GET /api/v1/tasks/{id}/history
----------------------------------------------------- */
export const getTaskHistory = async (taskId) => {
  const res = await api.get(`/tasks/${taskId}/history`);
  return res.data;
};

/* -----------------------------------------------------
   UPDATE TASK
   Matches: PUT /api/v1/tasks/{id}
----------------------------------------------------- */
export const updateTask = async (taskId, data) => {
  const fd = new FormData();
  fd.append("title", data.title);
  fd.append("description", data.description);
  fd.append("assigneeId", data.assigneeId);

  if (data.file) {
    fd.append("file", data.file);
  }

  const res = await api.put(`/tasks/${taskId}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

/* -----------------------------------------------------
   GET TASKS BY DEPARTMENT
   Matches: GET /api/v1/departments/{id}/tasks
----------------------------------------------------- */
/* -----------------------------------------------------
   GET TASKS BY DEPARTMENT (with optional date filtering)
   Only for SUPER_ADMIN usage
----------------------------------------------------- */
export const getTasksByDepartment = async (deptId, startDate, endDate) => {
  // Use the correct endpoint structure matching the controller
  let url = `/tasks/departments/${deptId}`;

  const params = [];
  if (startDate) params.push(`startDate=${startDate}`);
  if (endDate) params.push(`endDate=${endDate}`);

  if (params.length > 0) url += "?" + params.join("&");

  const res = await api.get(url);
  return res.data;
};
/* -----------------------------------------------------
   DELETE TASK
   Matches: DELETE /api/v1/tasks/{id}
----------------------------------------------------- */
export const deleteTask = async (taskId) => {
  const res = await api.delete(`/tasks/${taskId}`);
  return res.data;
};
