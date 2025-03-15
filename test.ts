type ArrayNumber = number[];

function mergeSort(data: ArrayNumber): ArrayNumber {
  if (data.length <= 2) {
    if (data.length === 1) {
      return data;
    } else {
      if (data[0] > data[1]) {
        const t = data[0];
        data[0] = data[1];
        data[1] = t;
        return data;
      }
      return data;
    }
  }
  const half = data.length / 2;
  const firstHalf = data.slice(0, half);
  const secondHalf = data.slice(half, data.length);

  return [...mergeSort(firstHalf), ...mergeSort(secondHalf)];
}

const data = [3, 4, 1];
const res = mergeSort(data);
console.log(res);
