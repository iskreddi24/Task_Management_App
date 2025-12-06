// Example check for api/reports.js
import api from "./api"; // Use your configured axios instance

export const getMyStats = async (start, end) => {
  // Good: Uses network IP
  const res = await api.get(`/reports/my?start=${start}&end=${end}`);
  return res.data;
};

// ADMIN/HEAD — employee stats
export const getEmployeeStats = async (userId, start, end) => {
  const res = await api.get(`/reports/employee/${userId}`, {
    params: { startDate: start, endDate: end },
  });
  return res.data;
};

// ADMIN/HEAD — department aggregated stats
export const getDepartmentStats = async (deptId, start, end) => {
  const res = await api.get(`/reports/department/${deptId}`, {
    params: { startDate: start, endDate: end },
  });
  return res.data;
};

// BACKEND PDF DOWNLOAD (optional)
export const downloadReportPdf = async (userId, start, end) => {
  const res = await api.get("/reports/pdf", {
    params: { userId, startDate: start, endDate: end },
    responseType: "blob",
  });
  return res.data;
};
