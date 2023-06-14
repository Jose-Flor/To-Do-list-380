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
  deleteButton.textContent = 'X';
  deleteButton.classList.add('deleteButton'); // assign a class to the button for styling

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

// Generate stars
for (let i = 0; i < 100; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  document.body.appendChild(star);
}

