const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const tasksPath = path.join(__dirname, '..', 'db', 'tasks.json');

const getAll = async () => {
  try {
    const rawData = await fs.readFile(tasksPath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async taskId => {
  try {
    const tasks = await getAll();
    const task = tasks.find(({ id }) => String(id) === String(taskId));
    if (!task) {
      return null;
    }
    return task;
  } catch (error) {
    console.log(error.message);
  }
};

const createTask = async (title, completed) => {
  try {
    const id = crypto.randomUUID();
    const tasks = await getAll();
    const newTask = { id, title, completed };
    tasks.push(newTask);
    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 4));
    return newTask;
  } catch (error) {
    console.log(error.message);
  }
};

const removeTask = async taskId => {
  try {
    const tasks = await getAll();
    const newTaskList = tasks.filter(({ id }) => String(id) !== String(taskId));
    await fs.writeFile(tasksPath, JSON.stringify(newTaskList, null, 4));
  } catch (error) {
    console.log(`Something went wrong. ${error.message}`);
  }
};

const updateTask = async (taskId, title, completed) => {
  try {
    const tasks = await getAll();
    const idx = tasks.findIndex(({ id }) => String(id) === String(taskId));
    if (idx === -1) {
      return null;
    }
    if (title) {
      tasks[idx].title = title;
    }
    if (completed) {
      tasks[idx].completed = completed;
    }
    await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 4));
    return tasks[idx];
  } catch (error) {
    console.log(`Something went wrong. ${error.message}`);
  }
};

module.exports = {
  getAll,
  getById,
  createTask,
  removeTask,
  updateTask,
};
