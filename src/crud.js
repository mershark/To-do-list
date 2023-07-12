export const clearCompleted = (tasks) => tasks.filter((task) => !task.completed);

export const addTask = (tasks, description) => {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  return [...tasks, newTask];
};

export const deleteTask = (tasks, index) => tasks.filter((task) => task.index !== index);

export const editTaskDescription = (tasks, index, newDescription) =>
  tasks.map((task) => (task.index === index ? { ...task, description: newDescription } : task));
