import { Router } from "jsr:@oak/oak/router";
import { client } from "./connection.ts";

const pgRoutes = new Router();

pgRoutes.get("/get/users", async (ctx) => {
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

export default pgRoutes;
