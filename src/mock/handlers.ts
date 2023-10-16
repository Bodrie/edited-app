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

  rest.get("/user", (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
];
