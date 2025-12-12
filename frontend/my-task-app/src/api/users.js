// src/api/users.js
import api from "./api";

/* ===================== USERS ===================== */

export const listUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const createUser = async (data) => {
  const res = await api.post("/users", data);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

export const updateUserStatus = async (userId, active) => {
  const res = await api.patch(`/users/${userId}/status?active=${active}`);
  return res.data;
};

/* ===================== PROFILE ===================== ✅ FIXED */
export const getMyProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data;
};
