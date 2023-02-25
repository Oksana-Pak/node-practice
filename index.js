const { program } = require('commander');
const { getAll, getById, createTask, removeTask, updateTask } = require('./handlers/handle');

program
  .name('myCli')
  .description('A simple CLI to manage your tasks')
  .version('1.0.0')
  .option('--method <method>', 'Action to perform')
  .option('--id <id>', 'Task id')
  .option('--title <title>', 'Task title')
  .option('--completed <completed>', 'Task completion status')
  .parse(process.argv);

const { method, id, title, completed } = program.opts();
// console.log(method, id, title, completed);

(async () => {
  if (method === 'list') {
    const tasks = await getAll();
    console.log(tasks);
  }
  if (method === 'get') {
    const task = await getById(id);
    if (!task) {
      throw new Error(`Product with ${id} not found`);
    }
    console.log(task);
  }
  if (method === 'create') {
    const newTask = await createTask(title, completed);
    console.log(newTask);
  }
  if (method === 'update') {
    const taskToUpdate = await updateTask(id, title, completed);
    console.log(taskToUpdate);
    if (!taskToUpdate) {
      throw new Error(`Product with ${id} not found`);
    }
  }
  if (method === 'remove') {
    const result = await removeTask(id);
  }
})();
