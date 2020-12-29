const collectionTasks = document.querySelector('.collection');
const taskForm = document.querySelector('.task-form');
const addTask = document.querySelector('#add-task');
const filter = document.querySelector('#filter');
const clearTasks = document.querySelector('#clear-tasks');

allEventListeners();

function allEventListeners() {
    // Load all the local task when HTML completely loaded
    document.addEventListener('DOMContentLoaded', loadTaskInLS)

    // Add a single new task
    taskForm.addEventListener('submit', addSingleTask);

    // Delete a particular task
    collectionTasks.addEventListener('click', deleteTask);
    
    // Clear all the tasks
    clearTasks.addEventListener('click', clearAllTasks);

    // filter a task
    filter.addEventListener('keyup', filterAllTheTasks);
}


function loadTaskInLS() {
    let tasks = []
    
    // check if there are task in LS
    if (localStorage.getItem('task')) {
        tasks = JSON.parse(localStorage.getItem('task'));
    } 

    // Load all tasks and insert into html
    tasks.forEach(function(item) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(item));
    
        const link = document.createElement('a');
        link.innerHTML = "<i class='fas fa-trash-alt'></i>";

        li.appendChild(link);
        collectionTasks.appendChild(li);
    })
}
function addSingleTask(e) {
    // Check if empty value is added
    if(addTask.value === '') {
        alert("Please add a task!");
    } else {
        // create li tag
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(addTask.value));
    
        // create a link
        const link = document.createElement('a');
        link.innerHTML = "<i class='fas fa-trash-alt'></i>";

        // append link to li
        li.appendChild(link);

        // append li to ul
        collectionTasks.appendChild(li);

        // Adding a task to local storage
        addTaskToLS(addTask.value);
 
        // set value back to empty
        addTask.value = '';
        e.preventDefault();
    }
}

function addTaskToLS(value) {
    let tasks = []
    
    // Check if there are tasks in LS
    if (localStorage.getItem('task')) {
        tasks = JSON.parse(localStorage.getItem('task'));
    } 
    // Adding new task
    tasks.push(value);
    localStorage.setItem('task', JSON.stringify(tasks));
}

function deleteTask(e) {

    // Delete a task 
    if(e.target.classList.contains('fa-trash-alt')) {
        e.target.parentElement.parentElement.remove();
    }

    // Remove task in LS
    searchItem = e.target.parentElement.parentElement.textContent;

    let tasks = []
    
    if (localStorage.getItem('task')) {
        tasks = JSON.parse(localStorage.getItem('task'));
        tasks.forEach(function(contents, index) {
            if(searchItem === contents) {
                tasks.splice(index, 1)
            }
        })

        console.log(tasks.length);
        if(tasks.length == 0) {
            localStorage.clear();
        } else {
            localStorage.setItem('task', JSON.stringify(tasks));
        }
    } 
    e.preventDefault();
}

function clearAllTasks() {

    // Clear the UL
    // slow 
    // collectionTasks.textContent = '';

    // Faster
    while(collectionTasks.firstChild) {
        collectionTasks.removeChild(collectionTasks.firstChild);
    }

    // Reset local storage
    localStorage.clear();

}



function filterAllTheTasks(val) {
    val = val.target.value.toLowerCase();
    const tasks = document.querySelectorAll('.collection-item');
    tasks.forEach(function(item) {
        if (item.textContent.toLowerCase().indexOf(val) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })


}