import api from "./api";

export const loginUser = async ({ email, password }) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const sendOtp = async (email) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (payload) => {
  const res = await api.post("/auth/reset-password", payload);
  return res.data;
};

export const getMe = async () => {
  try {
    const res = await api.get("/auth/me");
    // console.log(res.data)
    return res.data;
  } catch {
    return null;
  }
};
