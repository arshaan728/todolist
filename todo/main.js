/*getting all the classes and putting in a constant*/

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const finaliselist = document.querySelector('.finalise-list');

/* making a even listener inorder to make the function work when the button is clicked*/
document.addEventListener('DOMContentLoaded',getodos);

todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);
finaliselist.addEventListener('click',addtoflist);

/* function is clear the list , it clears the local storage and reloads the page*/
function addtoflist() {
  localStorage.clear();
  location.reload();
}
/* works when the item is added to the list , each time when is entered it creates a new div tag and a line and a complete button and 
a delete button and also records the entered value */
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
/*when the delete button is clicked it checks whether the delete or complete button is clicked , if delete is clicked it removes from the list 
if complete is clicked a animation will work*/
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

/* to filter the completed , deleted and all items in the list*/
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
/* saves the items in the local storage , happens when it is called when adding the items to list */
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

/* displays the items in local storage by creating the design all over again */
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

/* deletes the item in local storage when delete is clicked */
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

