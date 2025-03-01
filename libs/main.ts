import { encrypt, decrypt } from "./crypto.ts";

if (import.meta.main) {
  const enc_res = encrypt("sankar", "sankar");
  console.log(enc_res);
  const dec_res = decrypt(enc_res, "sankar");
  console.log(dec_res);
}
