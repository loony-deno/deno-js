import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { client } from "./pg.ts";

const router = new Router();
router.get("/", async (ctx) => {
  await client.connect();
  const result = await client.queryArray(
    "SELECT uid, fname, lname, email FROM users"
  );
  await client.end();
  ctx.response.body = result.rows.map((user: any) => ({
    user_id: user[0],
    fname: user[1],
    lname: user[2],
    email: user[3],
  }));
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
