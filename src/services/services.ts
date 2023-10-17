import axios from "axios";

export const login = async (
  e: React.FormEvent<HTMLFormElement>,
  saved: boolean
) => {
  e.preventDefault();
  const res = {
    email: e.currentTarget.email.value,
    isAuth: false,
    error: "",
  };

  const isValidEmail = emailValidation(e.currentTarget.email.value);
  if (!isValidEmail) {
    res.error = "email";
    return res;
  }

  const isValidPassword = passwordValidation(e.currentTarget.password.value);
  if (!isValidPassword) {
    res.error = "password";
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
    .catch((e) => {
      console.log(e);
      return (res.error = "user");
    });

  return res;
};

export const logout = (savedEmail: string | null) => {
  sessionStorage.setItem("is-authenticated", "false");

  return {
    email: savedEmail ? savedEmail : "",
    isAuth: false,
    error: "",
  };
};

export const emailValidation = (email: string) => {
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const result = pattern.test(email);
  return result;
};

export const passwordValidation = (password: string) => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{6,}$/;
  const result = pattern.test(password);
  return result;
};
