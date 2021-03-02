//define the UI variables
//targetting the input that is being given to the paricular form
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all the event listeners
loadEventListeners();

//Load all event listeners

function loadEventListeners(){
    //add task event
    //DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks);
    form.addEventListener('submit',addTask);

    // Remove task events

    taskList.addEventListener('click',removeTask);

    //clear the task event
    clearBtn.addEventListener('click',clearTask);

    //Filter task events

    filter.addEventListener('keyup',filterTasks);
}

//get tasks from LS

function getTasks(){
    let tasks;// check if there is anything in the tasks
    if(localStorage.getItem('tasks') === 'null'){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');

    //Add class
        li.className = 'collection-item';

        //Create a text node and append to the li

        li.appendChild(document.createTextNode(task));

        //create a new link element

        const link = document.createElement('a');

        //Add Class

        link.className = 'delete-item secondary-content';

        //add the icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';

        //Append the link to li

        li.appendChild(link);


        //Append the li to the ul

        taskList.appendChild(li);
    });
}

//Add Task

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }


    //create an li element
    const li = document.createElement('li');

    //Add class
    li.className = 'collection-item';

    //Create a text node and append to the li

    li.appendChild(document.createTextNode(taskInput.value));

    //create a new link element

    const link = document.createElement('a');

    //Add Class

    link.className = 'delete-item secondary-content';

    //add the icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    //Append the link to li

    li.appendChild(link);


    //Append the li to the ul

    taskList.appendChild(li);


    //store in LS
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    
    
    e.preventDefault();
}

//Function to Store the Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Remove task

function removeTask(e){
    //event parameter
    if(e.target.parentElement.classList.contains('delete-item')){
    //console.log(e.target);
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();

    // Remove from ls
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Clear Tasks

function clearTask(){
    //taskList.innerHTML = '';

    //Faster

    while(taskList.firstChild){
        //is there is something in the list
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

//clear tasks from LS

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}