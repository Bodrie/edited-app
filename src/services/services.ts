import axios from "axios";

export const login = async (
  e: React.FormEvent<HTMLFormElement>,
  saved: boolean
) => {
  e.preventDefault();
  const res = {
    email: e.currentTarget.email.value,
    isAuth: false,
    error: false,
  };

  const isValid = passwordValidation(e.currentTarget.password.value);
  if (!isValid) {
    res.error = true;
    return res;
  }

  if (saved) {
    localStorage.setItem("user_email", res.email);
  } else {
    localStorage.removeItem("user_email");
  }

  await axios
    .post("/login", {
      email: res.email,
      password: e.currentTarget.password.value,
    })
    .then(() => {
      res.isAuth = true;
      return res;
    })
    .catch(() => console.log("Error"));

  return res;
};

export const logout = (savedEmail: string | null) => {
  sessionStorage.setItem("is-authenticated", "false");

  return {
    email: savedEmail ? savedEmail : "",
    isAuth: false,
    error: false,
  };
};

export const passwordValidation = (password: string) => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,}$/;
  const result = pattern.test(password);
  return result;
};
