console.log("welcome to my app")

let todos = [];
console.log(todos);
let todoDataList = document.getElementById("todo-data-list");
let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("add-todo");
let getPendingTodosButton = document.getElementById("get-to-do");

getPendingTodosButton.addEventListener("click", () => {
    todos = todos.filter((todo) => todo.status != "Finished");
    reRenderTodo();
})

todoInputBar.addEventListener("keyup", function toggleSaveButton() {
    let todotext = todoInputBar.value;
    if(todotext.length == 0) {
        if(saveButton.classList.add("disabled"))return;
    }
    else {
        saveButton.classList.remove("disabled");
    }
})

// save todo
saveButton.addEventListener("click", function getTextAndAddTodo() {
    let todotext = todoInputBar.value;
    if(todotext.length == 0) return;
    let todo = {text: todotext, status: "In progress",finishButtonText: "Finished"};
    todos.push(todo);
    addToDo(todo,todos.length);
    todoInputBar.value = "";
})

// re-render todo
function reRenderTodo() {
    todoDataList.innerHTML = "";
    todos.forEach((element, idx) => {
        addToDo(element, idx+1);
    })
}
// delete todo
function removeTodo (event) {
    let deleteButtonPressed = event.target;
    let idxTobeRemoved = Number(deleteButtonPressed.getAttribute("todo-idx"));
    todos.splice(idxTobeRemoved, 1);
    reRenderTodo();
}

// finish todo
function finishTodo(event) {
    let finishedButtonPressed = event.target;
    let idxTobeFinished = Number(finishedButtonPressed.getAttribute("todo-idx"));

    // toggle
    if(todos[idxTobeFinished].status == "Finished") {
        todos[idxTobeFinished].status = "In progress";
        todos[idxTobeFinished].finishButtonText = "Finished";
    } else {
        todos[idxTobeFinished].status = "Finished";
        todos[idxTobeFinished].finishButtonText = "Undo";
    }

    todos.sort((a, b) => {
        if(a.status == "Finished") {
            return 1;
        }
        return -1;
    });
    reRenderTodo();    
}

// edit todo
function editTodo(event) {
    let editButtonPressed = event.target;
    let idxTobeEditted = Number(editButtonPressed.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`p[todo-idx="${idxTobeEditted}"]`);
    let input = document.querySelector(`input[todo-idx="${idxTobeEditted}"]`);
    detailDiv.style.display="none";
    input.type="text";
    input.value = detailDiv.textContent;
}
// save editted todo
function saveEdittedTodo(event) {
    let input = event.target;
    let idxTobeEditted = Number(input.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`p[todo-idx="${idxTobeEditted}"]`);
    
    if(event.keyCode == 13) {
        todos[idxTobeEditted].text = input.value;
        detailDiv.textContent = input.value;
        detailDiv.style.display="block";
        input.value = '';
        input.type="hidden";
    }
}

function addToDo(todo,todoCount) {
    console.log("called add to do")
    let rowDiv = document.createElement("div");
    let todoNumber = document.createElement("h6");
    let todoDetail = document.createElement("p");
    let todoStatus = document.createElement("p");
    let todoActions = document.createElement("div");
    let deleteButton = document.createElement("button");
    let finishedButton = document.createElement("button");
    let editButton = document.createElement("button");
    let hiddenInput = document.createElement("input");
    let hr = document.createElement("hr");

    
    // adding classes
    rowDiv.classList.add("row", "form-group");
    todoNumber.classList.add("todo-no", "col-1", "m-0", "p-0", "text-center");
    todoDetail.classList.add("todo-detail", "text-muted", "col-11", "col-sm-5");
    hiddenInput.classList.add("custom-width","todo-detail", "col-11", "col-sm-5");
    todoStatus.classList.add("todo-status","col-12", "col-sm-2", "text-center", "text-muted");
    todoActions.classList.add("todo-actions","col-sm-4","align-items-center")
    deleteButton.classList.add("col-12","col-sm-3","py-1","px-0","mb-1","me-1","btn","btn-danger","shadow", "delete-todo")  
    finishedButton.classList.add("col-12","col-sm-4","py-1","px-0","mb-1","me-1","btn","btn-success","shadow","finish-todo")
    editButton.classList.add("col-12","col-sm-3","py-1","px-0","mb-1","me-1","btn","btn-warning","shadow","edit-todo")

    // adding attributes
    finishedButton.setAttribute("todo-idx", todoCount-1);
    deleteButton.setAttribute("todo-idx", todoCount-1);
    todoDetail.setAttribute("todo-idx", todoCount-1);
    editButton.setAttribute("todo-idx", todoCount-1);
    hiddenInput.setAttribute("todo-idx", todoCount-1)
    hiddenInput.type = "hidden";
    
    // adding click listeners
    deleteButton.onclick = removeTodo;
    finishedButton.onclick = finishTodo;
    editButton.onclick = editTodo;
    hiddenInput.addEventListener("keypress",saveEdittedTodo); 

    todoNumber.textContent = `${todoCount}.`;
    todoDetail.textContent = todo.text;
    todoStatus.textContent = todo.status;
    deleteButton.textContent = "Delete";
    finishedButton.textContent = todo.finishButtonText;
    editButton.textContent = "Edit";

    rowDiv.appendChild(todoNumber);
    rowDiv.appendChild(todoDetail);
    rowDiv.appendChild(hiddenInput);
    rowDiv.appendChild(todoStatus);
    rowDiv.appendChild(todoActions);
    rowDiv.appendChild(hr);
    todoDataList.appendChild(rowDiv);

    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);
    todoActions.appendChild(editButton);

}
