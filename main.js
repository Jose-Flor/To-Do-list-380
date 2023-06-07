// Get HTML elements
const todoButton = document.getElementById('show-todo-button');
const todoSection = document.getElementById('todo-section');
const addButton = document.getElementById('add-button');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Show To Do List section when button is clicked
todoButton.addEventListener('click', () => {
  todoSection.style.display = 'block';
});

// Add item to the list
addButton.addEventListener('click', () => {
  const listItem = document.createElement('li');
  const deleteButton = document.createElement('button');

  // Add delete functionality to the button
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    todoList.removeChild(listItem);
  });

  // Add text to the list item
  listItem.textContent = todoInput.value;
  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);
  
  // Clear the input field
  todoInput.value = '';
});
