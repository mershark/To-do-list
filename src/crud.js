export const clearCompleted = (tasks) => {
  return tasks.filter((task) => !task.completed);
};

export const addTask = (tasks, description) => {
  const newTask = {
    description: description,
    completed: false,
    index: tasks.length + 1,
  };
  return [...tasks, newTask];
};

export const deleteTask = (tasks, index) => {
  return tasks.filter((task) => task.index !== index);
};

export const editTaskDescription = (tasks, index, newDescription) => {
  return tasks.map((task) => {
    if (task.index === index) {
      return { ...task, description: newDescription };
    }
    return task;
  });
};
