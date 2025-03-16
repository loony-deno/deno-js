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

### **Example of Secure AES-GCM Usage in Deno**

```typescript
const iv = crypto.getRandomValues(new Uint8Array(12)); // Secure IV
const key = await crypto.subtle.generateKey(
  { name: "AES-GCM", length: 256 },
  true,
  ["encrypt", "decrypt"]
);
```

Following these best practices ensures secure encryption and decryption in Deno applications.
