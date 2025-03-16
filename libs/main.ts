import { exit } from "node:process";
import { encrypt, decrypt } from "./crypto/index.ts";

if (import.meta.main) {
  const args: string[] = Deno.args;
  if (args.length !== 2) {
    console.log("Usage: deno task run <text-to-encrypt> <password>");
    exit();
  }
  const text = args[0];
  const password = args[1];
  const encrypted_text = await encrypt(text, password);
  const decrypted_text = await decrypt(encrypted_text, password);

  console.log({
    encrypted_text,
    decrypted_text,
  });
}
