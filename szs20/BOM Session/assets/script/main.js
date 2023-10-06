
const addTodo = document.querySelector(".addTodo");
const todoInput = document.querySelector(".todoInput");
const editandsave =document.querySelectorAll(".edit");
const date = new Date();
const todoContainer = [];
let todoID = 1;

const saveDataToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
const displayTodoList = () => {
  let todoTemp = "";
  todoContainer.forEach((todo, index) => {
    todoTemp += `<tr data-id ="${todo.taskID}">
                <td>${todo.taskName}</td>
                <td><button class="btn btn-primary text-black" onclick="savecancel()">Edit</button></td>
                <td><button class="btn btn-danger btn-sm " onclick="deletTodo(${index})">Delete</button></td>
                <td><span>${date.getDate()} Aug ,${date.getFullYear()}</span></td>
            </tr>`;
  });
  document.getElementById("showTodo").innerHTML = todoTemp;
};
const createTodoTask = () => {
  let todoTaskInfo = {
    taskID: todoID,
    taskName: todoInput.value,
  };
  todoContainer.push(todoTaskInfo);
  todoID++;
  saveDataToLocalStorage("todoListStorage", JSON.stringify(todoContainer));
  displayTodoList();
  clearInputs();
};
addTodo.addEventListener("click", createTodoTask);

const getDataFromStorage = () => {
  if (localStorage.getItem("todoListStorage")) {
    todoContainer.push(...JSON.parse(localStorage.getItem("todoListStorage")));
    displayTodoList();
  }
};
getDataFromStorage();

function clearInputs() {
  todoInput.value = "";
}
function deletTodo(index) {
  todoContainer.splice(index, 1);
  displayTodoList();
  saveDataToLocalStorage("todoListStorage", JSON.stringify(todoContainer));
}
const savetodo = () => {
  let todoTemp = "";
  todoContainer.forEach((todo, index) => {
    todoTemp += `<tr data-id ="${todo.taskID}">
                <td><input type="text" class="form-control todoInput" placeholder="${todo.taskName}"></td>
                <td><button class="btn btn-info btn-sm" class="savetodo">save</button> <button class="btn btn-danger btn-sm">cancel</button></td>
                <td><button class="btn btn-danger btn-sm " onclick="deletTodo(${index})">Delete</button></td>
                <td><span>${date.getDate()} Aug ,${date.getFullYear()}</span></td>
            </tr>`;
  });
  document.getElementById("showTodo").innerHTML = todoTemp;
};
editandsave.addEventListener("click",savetodo())
