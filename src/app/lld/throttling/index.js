<input type="text" onkeyup="changeEvent()" placeholder="Enter Value" />;

function callApi() {
  console.log("API Called");
}

function throttle(cb, delay) {
  let flag = true;
  return function () {
    if (flag) {
      cb();
      flag = false;
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}

const changeEvent = throttle(callApi, 1000);

// Using Arguments

const resize = (value) => {
  console.log("Resizing " + value);
};

const throttle = (callback, delay) => {
  let temp = true;
  const context = this;
  return function (...args) {
    if (temp) {
      callback.apply(context, args);
      temp = false;
      setTimeout(() => {
        temp = true;
      }, delay);
    }
  };
};

const clickHandler = throttle(resize, 300);
