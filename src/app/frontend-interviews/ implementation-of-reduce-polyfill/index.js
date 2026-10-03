/*
    Implementation of Reduce Polyfill

    Input: [1, 2, 3, 4], callback: (accumulator, currentValue) => accumulator + currentValue, initialValue: 0
    Output: 10
*/

function reducePolyfill(callback, initialValue) {
  if (this === null || this === undefined) {
    throw new TypeError("Array.prototype.reduce called on null or undefined");
  }

  if (!callback || typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  if (!this.length) {
    if (arguments.length < 2) {
      throw new TypeError("Reduce of empty array with no initial value");
    } else if (arguments.length === 2) {
      return initialValue;
    }
  }

  let k = 0;
  let accumulator = initialValue;

  if (arguments.length < 2) {
    accumulator = this[0];
    k++;
  }

  while (k < this.length) {
    if (Object.prototype.hasOwnProperty.call(this, k)) {
      accumulator = callback(accumulator, this[k], k, this);
    }
    k++;
  }

  return accumulator;
}

Array.prototype.reducePolyfill = reducePolyfill;

const arr = [1, 2, 3, 4];
const sum = arr.reducePolyfill(
  (accumulator, currentValue) => accumulator + currentValue,
  0,
);
console.log(sum); // Output: 10
