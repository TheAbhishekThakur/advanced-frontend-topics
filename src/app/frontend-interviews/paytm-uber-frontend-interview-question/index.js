function getUserById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime);
}

function mapLimit(inputs, limit, iterateeFn, callback) {
  let index = 0;
  const responses = [];
  let completedTasks = 0;

  function postCompletionCallback(activeIndex, output) {
    responses[activeIndex] = output;
    completedTasks++;

    if (completedTasks === inputs.length) {
      callback(responses);
      return;
    }

    if (index < inputs.length) {
      iterateeFn(inputs[index], postCompletionCallback.bind(null, index));
      index++;
    }
  }

  while (index < limit) {
    iterateeFn(inputs[index], postCompletionCallback.bind(null, index));
    index++;
  }
}

mapLimit([1, 2, 3, 4, 5], 2, getUserById, (allResults) => {
  console.print("output:", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});
