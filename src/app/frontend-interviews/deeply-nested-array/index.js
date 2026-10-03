/*
Question: Given a deeply nested array, create a function on the array, namely flatten, that when
invoked returns a flat version of the original array. Function should be defined in a way that it can
be invoked on the existing and future arrays.

var input = [
1,
2,
3,
[4],
[5,6, [7], [8, [9, [10]]]],
11,
12,
13,
[14, [[[[15, [16]]]]]],
17,
18,
[19, [20, [21, [22, [23, [24, [25]]]]]]],
];

Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]


*/

var input = [
  1,
  2,
  3,
  [4],
  [5, 6, [7], [8, [9, [10]]]],
  11,
  12,
  13,
  [14, [[[[15, [16]]]]]],
  17,
  18,
  [19, [20, [21, [22, [23, [24, [25]]]]]]],
];

// Approach 1: Using recursion
function flatten() {
  const result = [];
  const processing = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        processing(arr[i]);
      } else {
        result.push(arr[i]);
      }
    }
  };

  processing(this);
  return result;
}

Array.prototype.flatten = flatten;

const res = input.flatten();
console.log(res); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

// Approach 2: Using reduce and recursion
function flatten2() {
  return this.toString().split(",").map(Number);
}

Array.prototype.flatten2 = flatten2;

const res2 = input.flatten2();
console.log(res2); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
