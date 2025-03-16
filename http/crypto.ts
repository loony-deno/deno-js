import { Router } from "jsr:@oak/oak/router";
import { encrypt, decrypt } from "../libs/crypto/index.ts";
const cryptoRoutes = new Router();

cryptoRoutes.post("/encrypt", async (ctx) => {
  const body = ctx.request.body;
  if (body.type() === "json") {
    const data = await body.json();
    console.log(data);
    const { text, password } = data;
    const res = await encrypt(text, password);
    ctx.response.body = {
      data: res,
    };
  } else {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid JSON format" };
  }
});

cryptoRoutes.post("/decrypt", async (ctx) => {
  const body = ctx.request.body;
  if (body.type() === "json") {
    const data = await body.json();
    const { text, password } = data;
    const res = await decrypt(text, password);
    ctx.response.body = {
      data: res,
    };
  } else {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid JSON format" };
  }
});

export default cryptoRoutes;
