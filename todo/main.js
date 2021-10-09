const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const finaliselist = document.querySelector('.finalise-list');


document.addEventListener('DOMContentLoaded',getodos);

todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);
finaliselist.addEventListener('click',addtoflist);

function addtoflist() {
  localStorage.clear();
  location.reload();
}
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText= todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
     savelocaltodos(todoInput.value);
 

    const compleetedButton = document.createElement('button');
    compleetedButton.innerHTML = '<i class="fas fa-check"></i>';
    compleetedButton.classList.add("complete-btn");
    todoDiv.appendChild(compleetedButton);

       const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

    todoInput.value="";
}

function deleteCheck(e) {
    const item = e.target;

    if(item.classList[0]=="delete-btn") {
        const todo = item.parentElement;
        deletetodos(todo);
        todo.remove();
    }

    if(item.classList[0]=="complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
   
    todos.forEach(function(todo) {
      
      switch(e.target.value) {
          case "all":
        //   todo.style.display="flex";
        document.querySelector(".todo-list").style.display="flex";
          break;
          case "completed":
              if(document.querySelector(".todo-list").classList.contains('completed')) {
                document.querySelector(".todo-list").style.display="flex";
              }
              else {
                 document.querySelector(".todo-list").style.display="none";
              }
      }

    });
 
}

function savelocaltodos(todo) {
    let todos;
    if(localStorage.getItem('todos')==null) {
        todos=[];
    }
    else {
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getodos() {
       let todos;
    if(localStorage.getItem('todos')==null) {
        todos=[];
    }
    else {
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){

  const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText= todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
   

    const compleetedButton = document.createElement('button');
    compleetedButton.innerHTML = '<i class="fas fa-check"></i>';
   
    compleetedButton.classList.add("complete-btn");
    todoDiv.appendChild(compleetedButton);

       const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
    });
    
}

function deletetodos(todo) {
    console.log("scsc");
    let todos;

    if(localStorage.getItem("todos")===null) {
        todos=[];
    }
    else {
        todos=JSON.parse(localStorage.getItem("todos"));
    }

   const todoindex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoindex),1);
   localStorage.setItem('todos',JSON.stringify(todos));

}

