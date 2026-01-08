const STATES = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};
class CustomPromise {
  #value = undefined;
  #state = STATES.PENDING;
  #resolutionHandlers = [];
  #rejectionHandlers = [];

  constructor(executor) {
    this.resolve = this.#_resolve.bind(this);
    this.reject = this.#_reject.bind(this);

    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  #_resolve(value) {
    queueMicrotask(() => {
      if (this.#state !== STATES.PENDING) {
        return;
      }
      this.#value = value;
      this.#state = STATES.FULFILLED;
      this.#runResolutionHandlers();
    });
  }
  #_reject(reason) {
    queueMicrotask(() => {
      if (this.#state !== STATES.PENDING) {
        return;
      }
      this.#value = reason;
      this.#state = STATES.REJECTED;
    });
  }

  #runResolutionHandlers() {
    if (this.#resolutionHandlers.length) {
      this.#resolutionHandlers.forEach((handler) => {
        handler(this.#value);
      });
      this.#resolutionHandlers = [];
      this.#runRejectionHandlers();
    }
  }

  #runRejectionHandlers() {
    if (this.#resolutionHandlers.length) {
      this.#rejectionHandlers.forEach((handler) => {
        handler(this.#value);
      });
      this.#resolutionHandlers = [];
    }
  }

  then(resulationHandler, rejectionHandler) {
    return new CustomPromise((resolve, reject) => {
      const thenHandler = (result) => {
        if (!resulationHandler) {
          return resolve(result);
        }
        try {
          const returned = resulationHandler(result);
          if (returned instanceof CustomPromise) {
            returned.then(resolve, reject);
          } else {
            resolve(returned);
          }
        } catch (error) {
          reject(error);
        }
      };

      this.#resolutionHandlers.push(thenHandler);

      const catchHandler = (result) => {
        if (!rejectionHandler) {
          return catchHandler(result);
        }
        try {
          const returned = rejectionHandler(result);
          if (returned instanceof CustomPromise) {
            returned.then(resolve, reject);
          } else {
            resolve(returned);
          }
        } catch (error) {
          reject(error);
        }
      };

      this.#rejectionHandlers.push(catchHandler);

      if (this.#state === STATES.FULFILLED) {
        this.#runResolutionHandlers();
      } else if (this.#state === STATES.REJECTED) {
        this.#runRejectionHandlers();
      }
    });
  }
  catch(rejectionHandler) {
    return this.then(null, rejectionHandler);
  }
}

// for debugging purposes
function init() {
  return new CustomPromise((resolve, reject) => {
    resolve(10);
  });
}
init()
  .then((value) => {
    console.log("Resolved with value:", value);
  })
  .catch((error) => {
    console.error("Caught error:", error);
  });
