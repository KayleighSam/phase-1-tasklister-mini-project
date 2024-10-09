document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form');
  
  //add an event listener
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskDescription = document.getElementById('new-task-description').value;
    const priority = document.getElementById('priority').value;



    todo(taskDescription, priority);
    form.reset();
  });

  document.getElementById('sort-btn').addEventListener('click', sortTasks);
});

function todo(todo, priority) {
  const li = document.createElement('li'); 
  const btn = document.createElement('button');

  //edit button function
  btn.textContent = 'Edit';
  btn.addEventListener('click', () => edit(li, todo, priority));
  
  //delete button function
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'x';
  deleteBtn.addEventListener('click', handleDelete);
  
  li.textContent = todo + ' ';
  li.style.color = getColorByPriority(priority);
  li.appendChild(btn);
  li.appendChild(deleteBtn);
  
  document.querySelector('#list').appendChild(li); 
}

function handleDelete(e) {
  e.target.parentNode.remove(); 
}


//edit priority and todos
function edit(li, todo, priority) {
  const newDescription = prompt("Edit your task:", todo);
  const newPriority = prompt("Edit priority (low, medium, high):", priority);
  
  if (newDescription !== null && newDescription.trim() !== "") {
    li.firstChild.textContent = newDescription + ' ';
    li.style.color = getColorByPriority(newPriority);
  }
}
//check priority
function getColorByPriority(priority) {
  switch (priority) {
    case 'high':
      return 'red';
    case 'medium':
      return 'yellow';
    case 'low':
      return 'green';
    default:
      
  }
}

function sortTasks() {
  const list = document.getElementById('list');
  const items = Array.from(list.children);

  items.sort((a, b) => {
    const priorityA = a.style.color === 'red' ? 1 : a.style.color === 'yellow' ? 2 : 3;
    const priorityB = b.style.color === 'red' ? 1 : b.style.color === 'yellow' ? 2 : 3;
    return priorityA - priorityB;
  });

  // Clear the list 
  list.innerHTML = '';
  items.forEach(item => list.appendChild(item));
}
