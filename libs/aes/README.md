Here’s a documentation-style guide focused on best practices for securely encrypting and decrypting text in Deno.

---

# **Best Practices for Secure Encryption & Decryption in Deno**

## **1. Use Strong Encryption Algorithms**

- Use **AES-GCM (Advanced Encryption Standard - Galois/Counter Mode)** for encryption.
- AES-GCM provides both **confidentiality and integrity** through authenticated encryption.

## **2. Key Management**

- **Do Not Hardcode Keys**: Store keys securely using **Deno KV**, **environment variables**, or a **secure vault**.
- **Use Secure Key Generation**:
  - Generate a **256-bit AES key** using `crypto.subtle.generateKey()`.
  - Mark keys as **non-extractable** unless needed for export.

## **3. Secure IV (Initialization Vector) Handling**

- **Always use a random IV** for each encryption operation.
- **Never reuse IVs** with the same key.
- **Store the IV** alongside the ciphertext, as it is required for decryption.

## **4. Avoid Weak Ciphers & Hash Functions**

- **Do not use AES-CBC** (Cipher Block Chaining) as it lacks integrity protection.
- **Use SHA-256** for key derivation instead of older hashing algorithms like MD5.

## **5. Ensure Data Integrity**

- AES-GCM provides **built-in authentication**, preventing ciphertext tampering.
- **Do not rely on manual integrity checks** (e.g., HMAC separately) when using AES-GCM.

## **6. Secure Key Storage**

- Use **Deno KV** or **environment variables** to store encryption keys.
- Avoid storing keys in plaintext files or embedding them in code.

## **7. Secure Decryption Practices**

- **Validate the IV and ciphertext length** before decrypting to avoid security vulnerabilities.
- **Catch decryption errors** to detect potential tampering.

## **8. Use Web Crypto API for Encryption**

- Deno provides the **crypto.subtle** API, which is based on the Web Crypto API.
- Avoid using third-party crypto libraries unless necessary.

## **9. Minimize Data Exposure**

- **Encrypt sensitive data as soon as possible**.
- **Decrypt only when needed**, and keep the plaintext in memory for the shortest duration possible.

## **10. Regularly Rotate Keys**

- Implement key rotation policies and **invalidate old keys** when necessary.
- Store encrypted data in a format that allows seamless key updates.

---

The `crypto` module in Node.js provides cryptographic functionality, including hashing, encryption, decryption, key generation, and signing. It's built on OpenSSL, making it a powerful tool for securing applications.

---

## 1. **Importing the `crypto` module**

The `crypto` module is part of Node.js core, so you can require it without installing additional packages.

```javascript
const crypto = require("crypto");
```

---

## 2. **Hashing Data**

Hashing is a one-way function used to generate a fixed-length string from input data.

### **Example: Creating a Hash**

```javascript
const hash = crypto.createHash("sha256").update("Hello, World!").digest("hex");
console.log(hash);
```

- `createHash('sha256')`: Uses the SHA-256 algorithm.
- `update('Hello, World!')`: Adds data to be hashed.
- `digest('hex')`: Converts output to a readable format (hex, base64, etc.).

### **Using HMAC (Hash-based Message Authentication Code)**

HMAC is a hash function with a secret key for added security.

```javascript
const hmac = crypto
  .createHmac("sha256", "secret-key")
  .update("Hello, World!")
  .digest("hex");
console.log(hmac);
```

---

## 3. **Generating Random Bytes**

Useful for generating secure tokens.

```javascript
crypto.randomBytes(16, (err, buffer) => {
  if (err) throw err;
  console.log(buffer.toString("hex"));
});
```

---

## 4. **Encryption & Decryption (Symmetric)**

AES (Advanced Encryption Standard) is commonly used for symmetric encryption.

### **Example: Encrypting and Decrypting Data**

```javascript
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16); // 128-bit IV

// Encryption
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update("Hello, World!", "utf8", "hex");
encrypted += cipher.final("hex");
console.log("Encrypted:", encrypted);

// Decryption
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");
console.log("Decrypted:", decrypted);
```

- `createCipheriv(algorithm, key, iv)`: Encrypts data.
- `createDecipheriv(algorithm, key, iv)`: Decrypts data.
- `update()`: Adds data to process.
- `final()`: Completes the operation.

---

## 5. **Public-Key Cryptography (Asymmetric)**

Uses a key pair (private & public) for encryption, decryption, signing, and verification.

### **Generating a Key Pair**

```javascript
crypto.generateKeyPair(
  "rsa",
  {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  },
  (err, publicKey, privateKey) => {
    if (err) throw err;
    console.log("Public Key:", publicKey);
    console.log("Private Key:", privateKey);
  }
);
```

### **Signing and Verifying Data**

```javascript
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

const data = "Important message";
const sign = crypto.createSign("sha256").update(data).sign(privateKey, "hex");
console.log("Signature:", sign);

const isVerified = crypto
  .createVerify("sha256")
  .update(data)
  .verify(publicKey, sign, "hex");
console.log("Verified:", isVerified);
```

- `createSign()`: Signs data with a private key.
- `createVerify()`: Verifies a signature using a public key.

---

## 6. **Password Hashing with `pbkdf2`**

Securely hashes passwords with a salt.

```javascript
crypto.pbkdf2(
  "password123",
  "salt",
  100000,
  64,
  "sha512",
  (err, derivedKey) => {
    if (err) throw err;
    console.log("Hashed Password:", derivedKey.toString("hex"));
  }
);
```

---

## **Use Cases of `crypto` Module**

- **Password hashing** (e.g., `bcrypt`, `pbkdf2`, `argon2`)
- **Token generation** (e.g., `randomBytes`)
- **Message integrity verification** (e.g., HMAC)
- **Data encryption and decryption** (AES, RSA)
- **Digital signatures** (signing and verifying)

The `crypto` module is a core part of securing Node.js applications, and understanding its functions is crucial for building secure authentication systems and encrypting sensitive data.

Want a deep dive into any specific feature? 🚀
