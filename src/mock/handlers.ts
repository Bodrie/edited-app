import { rest } from "msw";

export const handlers = [
  rest.post("/login", async (req, res, ctx) => {
    const body: { email: string; password: string } = await req.json();
    if (body.email === "hello@edited.com" && body.password === "hello123") {
      sessionStorage.setItem("is-authenticated", "true");
      return res(ctx.status(200));
    } else {
      return res(ctx.status(403));
    }
  }),
];
