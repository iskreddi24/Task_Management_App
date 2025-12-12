// // // src/api/tasks.js
// // import api from "./api";

// // /* -----------------------------------------------------
// //    GET ALL TASKS (returns TaskResponseDTO[])
// //    Matches: GET /api/v1/tasks
// // ----------------------------------------------------- */
// // export const listTasks = async () => {
// //   const res = await api.get("/tasks");
// //   return res.data;
// // };

// // /* -----------------------------------------------------
// //    CREATE TASK
// //    Matches: POST /api/v1/tasks (Multipart)
// // ----------------------------------------------------- */
// // export const createTask = async (data) => {
// //   const fd = new FormData();
// //   fd.append("title", data.title);
// //   fd.append("description", data.description || "");
// //   fd.append("assigneeId", data.assigneeId);

// //   if (data.file) {
// //     fd.append("file", data.file);
// //   }

// //   const res = await api.post("/tasks", fd, {
// //     headers: { "Content-Type": "multipart/form-data" },
// //   });

// //   return res.data;
// // };

// // /* -----------------------------------------------------
// //    START TASK
// //    Matches: PATCH /api/v1/tasks/{id}/start
// // ----------------------------------------------------- */
// // export const startTask = async (taskId) => {
// //   const res = await api.patch(`/tasks/${taskId}/start`);
// //   return res.data;
// // };

// // /* -----------------------------------------------------
// //    SUBMIT TASK (Proof)
// //    Matches: PATCH /api/v1/tasks/{id}/submit
// // ----------------------------------------------------- */
// // export const submitTask = (id, file, comment) => {
// //   const form = new FormData();
// //   form.append("file", file);
// //   form.append("comment", comment);

// //   return api.patch(`/tasks/${id}/submit`, form, {
// //     headers: { "Content-Type": "multipart/form-data" }
// //   });
// // };


// // /* -----------------------------------------------------
// //    REVIEW TASK
// //    Matches: PATCH /api/v1/tasks/{id}/review
// // ----------------------------------------------------- */
// // export const reviewTask = async (taskId, data) => {
// //   const res = await api.patch(`/tasks/${taskId}/review`, data);
// //   return res.data;
// // };

// // /* -----------------------------------------------------
// //    HISTORY
// //    Matches: GET /api/v1/tasks/{id}/history
// // ----------------------------------------------------- */
// // export const getTaskHistory = async (taskId) => {
// //   const res = await api.get(`/tasks/${taskId}/history`);
// //   return res.data;
// // };

// // /* -----------------------------------------------------
// //    UPDATE TASK
// //    Matches: PUT /api/v1/tasks/{id}
// // ----------------------------------------------------- */
// // export const updateTask = async (taskId, data) => {
// //   const fd = new FormData();
// //   fd.append("title", data.title);
// //   fd.append("description", data.description);
// //   fd.append("assigneeId", data.assigneeId);

// //   if (data.file) {
// //     fd.append("file", data.file);
// //   }

// //   const res = await api.put(`/tasks/${taskId}`, fd, {
// //     headers: { "Content-Type": "multipart/form-data" },
// //   });

// //   return res.data;
// // };

// // /* -----------------------------------------------------
// //    GET TASKS BY DEPARTMENT
// //    Matches: GET /api/v1/departments/{id}/tasks
// // ----------------------------------------------------- */
// // /* -----------------------------------------------------
// //    GET TASKS BY DEPARTMENT (with optional date filtering)
// //    Only for SUPER_ADMIN usage
// // ----------------------------------------------------- */
// // export const getTasksByDepartment = async (deptId, startDate, endDate) => {
// //   // Use the correct endpoint structure matching the controller
// //   let url = `/tasks/departments/${deptId}`;

// //   const params = [];
// //   if (startDate) params.push(`startDate=${startDate}`);
// //   if (endDate) params.push(`endDate=${endDate}`);

// //   if (params.length > 0) url += "?" + params.join("&");

// //   const res = await api.get(url);
// //   return res.data;
// // };
// // /* -----------------------------------------------------
// //    DELETE TASK
// //    Matches: DELETE /api/v1/tasks/{id}
// // ----------------------------------------------------- */
// // export const deleteTask = async (taskId) => {
// //   const res = await api.delete(`/tasks/${taskId}`);
// //   return res.data;
// // };
// // export const filterTasks = (params) =>
// //   api.get("/tasks/filter", { params });

// // export const searchTasks = (keyword) =>
// //   api.get("/tasks/search", {
// //     params: { keyword },
// //   });
// import api from "./api";

// /* -----------------------------------------------------
//    GET ALL TASKS (returns TaskResponseDTO[])
//    Matches: GET /api/v1/tasks
//    Updated: Accepts startDate/endDate for filtering
// ----------------------------------------------------- */
// export const listTasks = async (startDate, endDate) => {
//   const params = {};
//   if (startDate) params.startDate = startDate;
//   if (endDate) params.endDate = endDate;

//   const res = await api.get("/tasks", { params });
//   return res.data;
// };

// /* -----------------------------------------------------
//    CREATE TASK
//    Matches: POST /api/v1/tasks (Multipart)
// ----------------------------------------------------- */
// export const createTask = async (data) => {
//   const fd = new FormData();
//   fd.append("title", data.title);
//   fd.append("description", data.description || "");
//   fd.append("assigneeId", data.assigneeId);

//   if (data.file) {
//     fd.append("file", data.file);
//   }

//   const res = await api.post("/tasks", fd, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

//   return res.data;
// };

// /* -----------------------------------------------------
//    START TASK
//    Matches: PATCH /api/v1/tasks/{id}/start
// ----------------------------------------------------- */
// export const startTask = async (taskId) => {
//   const res = await api.patch(`/tasks/${taskId}/start`);
//   return res.data;
// };

// /* -----------------------------------------------------
//    SUBMIT TASK (Proof)
//    Matches: POST /api/v1/tasks/{id}/submit
//    FIXED: Changed from PATCH to POST
//    FIXED: Changed 'comment' to 'message'
// ----------------------------------------------------- */
// export const submitTask = (id, file, message) => {
//   const form = new FormData();
//   form.append("file", file);
//   // Backend expects "message", not "comment"
//   form.append("message", message); 

//   // Use POST to match @PostMapping in controller
//   return api.post(`/tasks/${id}/submit`, form, {
//     headers: { "Content-Type": "multipart/form-data" }
//   });
// };

// /* -----------------------------------------------------
//    REVIEW TASK
//    Matches: PATCH /api/v1/tasks/{id}/review
// ----------------------------------------------------- */
// export const reviewTask = async (taskId, data) => {
//   const res = await api.patch(`/tasks/${taskId}/review`, data);
//   return res.data;
// };

// /* -----------------------------------------------------
//    HISTORY
//    Matches: GET /api/v1/tasks/{id}/history
// ----------------------------------------------------- */
// export const getTaskHistory = async (taskId) => {
//   const res = await api.get(`/tasks/${taskId}/history`);
//   return res.data;
// };

// /* -----------------------------------------------------
//    UPDATE TASK
//    Matches: PUT /api/v1/tasks/{id}
// ----------------------------------------------------- */
// export const updateTask = async (taskId, data) => {
//   const fd = new FormData();
//   fd.append("title", data.title);
//   fd.append("description", data.description);
//   fd.append("assigneeId", data.assigneeId);

//   if (data.file) {
//     fd.append("file", data.file);
//   }

//   const res = await api.put(`/tasks/${taskId}`, fd, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

//   return res.data;
// };

// /* -----------------------------------------------------
//    GET TASKS BY DEPARTMENT
//    Matches: GET /api/v1/tasks (Using backend filtering if no specific endpoint exists)
//    Note: If your controller does not have a specific /departments endpoint
//    but handles it via the main GET /tasks logic for Admins, this might need 
//    adjustment. Assuming Super Admin filtering logic here.
// ----------------------------------------------------- */
// export const getTasksByDepartment = async (deptId, startDate, endDate) => {
//   // If your backend doesn't have /tasks/departments/{id}, 
//   // we usually filter via the main list or a specific search endpoint.
//   // Based on your previous code, let's keep the structure but ensure params are right.
  
//   // NOTE: Verify your TaskController has @GetMapping("/departments/{id}") or similar.
//   // If not, revert to listTasks() and filter client side or add the endpoint.
//   let url = `/tasks/departments/${deptId}`; 

//   const params = {};
//   if (startDate) params.startDate = startDate;
//   if (endDate) params.endDate = endDate;

//   const res = await api.get(url, { params });
//   return res.data;
// };

// /* -----------------------------------------------------
//    DELETE TASK
//    Matches: DELETE /api/v1/tasks/{id}
// ----------------------------------------------------- */
// export const deleteTask = async (taskId) => {
//   const res = await api.delete(`/tasks/${taskId}`);
//   return res.data;
// };

// export const filterTasks = (params) =>
//   api.get("/tasks/filter", { params });

// export const searchTasks = (keyword) =>
//   api.get("/tasks/search", {
//     params: { keyword },
//   });
// src/api/tasks.js
import api from "./api";

/* -----------------------------------------------------
   GET ALL TASKS (returns TaskResponseDTO[])
   Accepts optional startDate/endDate
----------------------------------------------------- */
export const listTasks = async (startDate, endDate) => {
  const params = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const res = await api.get("/tasks", { params });
  return res.data;
};

/* -----------------------------------------------------
   PAGED TASKS (server-side pagination)
   GET /api/v1/tasks/paged?page=0&size=10&startDate=...&endDate=...
   Returns: PaginatedResponse<TaskResponseDTO>
----------------------------------------------------- */
export const listTasksPaged = async (page = 0, size = 10, startDate, endDate) => {
  const params = { page, size };
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  const res = await api.get("/tasks/paged", { params });
  return res.data;
};

/* -----------------------------------------------------
   CREATE TASK (multipart)
----------------------------------------------------- */
export const createTask = async (data) => {
  const fd = new FormData();
  fd.append("title", data.title);
  fd.append("description", data.description || "");
  fd.append("assigneeId", data.assigneeId);

  if (data.file) fd.append("file", data.file);

  const res = await api.post("/tasks", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

/* START TASK */
export const startTask = async (taskId) => {
  const res = await api.patch(`/tasks/${taskId}/start`);
  return res.data;
};

/* SUBMIT TASK (proof file + message) - controller uses POST */
export const submitTask = (id, file, message) => {
  const form = new FormData();
  if (file) form.append("file", file);
  if (message) form.append("message", message);
  return api.post(`/tasks/${id}/submit`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/* REVIEW TASK */
export const reviewTask = async (taskId, data) => {
  const res = await api.patch(`/tasks/${taskId}/review`, data);
  return res.data;
};

/* HISTORY */
export const getTaskHistory = async (taskId) => {
  const res = await api.get(`/tasks/${taskId}/history`);
  return res.data;
};

/* UPDATE TASK */
export const updateTask = async (taskId, data) => {
  const fd = new FormData();
  fd.append("title", data.title);
  fd.append("description", data.description);
  fd.append("assigneeId", data.assigneeId);
  if (data.file) fd.append("file", data.file);

  const res = await api.put(`/tasks/${taskId}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

/* GET TASKS BY DEPARTMENT (controller earlier versions had this; keep calling it) */
export const getTasksByDepartment = async (deptId, startDate, endDate) => {
  let url = `/tasks/departments/${deptId}`;
  const params = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  const res = await api.get(url, { params });
  return res.data;
};

/* DELETE TASK */
export const deleteTask = async (taskId) => {
  const res = await api.delete(`/tasks/${taskId}`);
  return res.data;
};

/* FILTER (legacy) - if backend exposes /tasks/filter you can use this */
export const filterTasks = (params) => api.get("/tasks/filter", { params });

/* SEARCH (Super Admin) */
export const searchTasks = async (title) => {
  const res = await api.get("/tasks/search", { params: { title } });
  return res.data;
};
