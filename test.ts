function hash(key: string): number {
  const size = 53;
  let total = 0;
  const prime = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    total = (total * prime + key.charCodeAt(i)) % size;
    console.log(total);
  }
  return total;
}

const res = hash("sankar");
console.log(res);
