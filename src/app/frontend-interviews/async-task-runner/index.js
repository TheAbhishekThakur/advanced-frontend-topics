class TaskRunner {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.runningTasks = 0;
    this.queue = [];
  }

  async push(task) {
    if (this.runningTasks < this.concurrency) {
      await this.execute(task);
    } else {
      this.queue.push(task);
    }
  }

  async execute(task) {
    this.runningTasks++;
    try {
      await task();
    } catch (error) {
      console.error("Error executing task:", error);
    } finally {
      this.runningTasks--;
      if (this.queue.length && this.runningTasks < this.concurrency) {
        const nextTask = this.queue.shift();
        await this.execute(nextTask);
      }
    }
  }
}

const runTasks = async (tasks, concurrency) => {
  const taskRunner = new TaskRunner(concurrency);
  const promises = tasks.map((task) => taskRunner.push(task));

  // Wait for all tasks to complete
  await Promise.all(promises);
};

runTasks(
  [
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve("Task 1 completed"), 1000)
      ),
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve("Task 2 completed"), 500)
      ),
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve("Task 3 completed"), 2000)
      ),
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve("Task 4 completed"), 1500)
      ),
  ],
  2 // Concurrency level
).then(() => console.log("All tasks completed"));
