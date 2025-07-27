export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex = /^[a-zA-Z0-9@_*]{5,20}$/;
  return regex.test(password);
};

export const firstName = (name) => {
  if (!name) return "";
  const fname = name.trim().split(" ");
  return fname[0];
};
