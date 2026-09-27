import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";
const API_URL = `${BASE_URL}/api/budgets`;

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getBudget = async (month, year) => {
  const response = await axios.get(
    `${API_URL}?month=${month}&year=${year}`,getAuthConfig()
  );

  return (response.data && response.data.data) ? response.data.data : null;
};

export const setBudget = async (budgetData) => {
  const response = await axios.post(
    API_URL,
    budgetData,
    getAuthConfig(),
  );

  return (response.data && response.data.data) ? response.data.data : null;
};