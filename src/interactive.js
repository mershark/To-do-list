export const updateTaskStatus = (task) => {
  if (task.completed) {
    // Perform actions when task is marked as completed
    console.log(`Task "${task.description}" marked as completed`);
  } else {
    // Perform actions when task is marked as incomplete
    console.log(`Task "${task.description}" marked as incomplete`);
  }
};