import { Task } from './task.js';
import { ToDoList } from './todoList.js';

const todoList = new ToDoList();

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('#task-filters button');

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';

    let tasksToRender = todoList.tasks;
    if (filter === 'completed') {
        tasksToRender = tasksToRender.filter(task => task.completed);
    } else if (filter === 'incomplete') {
        tasksToRender = tasksToRender.filter(task => !task.completed);
    }

    tasksToRender.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.className = task.completed ? 'completed' : '';
        taskElement.innerHTML = `
            <span>${task.title}</span>
            <span>${task.description}</span>
            <span>${task.dueDate}</span>
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        
        taskElement.querySelector('input').addEventListener('change', () => {
            todoList.toggleComplete(task.id);
            renderTasks(filter);
        });

        taskElement.querySelector('.edit').addEventListener('click', () => {
            document.getElementById('title').value = task.title;
            document.getElementById('description').value = task.description;
            document.getElementById('dueDate').value = task.dueDate;
            todoList.deleteTask(task.id);
            renderTasks(filter);
        });

        taskElement.querySelector('.delete').addEventListener('click', () => {
            todoList.deleteTask(task.id);
            renderTasks(filter);
        });

        taskList.appendChild(taskElement);
    });
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;

    const newTask = new Task(title, description, dueDate);
    todoList.addTask(newTask);
    taskForm.reset();
    renderTasks();
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        renderTasks(button.id.split('-')[1]);
    });
});

// Initial render
renderTasks();
