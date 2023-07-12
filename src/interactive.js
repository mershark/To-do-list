export const updateTaskStatus = (tasks, taskId, completed) => {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = completed;
  }
};

export const getCompletedTasks = (tasks) => {
  return tasks.filter((task) => task.completed);
};

export const getIncompleteTasks = (tasks) => {
  return tasks.filter((task) => !task.completed);
};
