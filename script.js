import Events from './modules/Events.js';
import Dom from './modules/Dom.js';
import { getData, updateData } from './modules/localStorage.js'

// event listeners 

// add new list btn 
Dom.addNewListBtn.addEventListener('click', Events.addList);

//add new todo by press enter 
Dom.body.addEventListener('keypress', e => e.target.className === 'todo-input' && e.code === 'Enter' && Events.addTodo(e.target));

// add new todo by click add-new-todo btn 
Dom.body.addEventListener('click', e => e.target.className.includes('new-todo-icon') && Events.addTodo(e.target.previousElementSibling));

// delete todo 
Dom.body.addEventListener('click', e => Events.deleteTodo(e))

// line trough the todo item when click the checkbox  or opposite
Dom.body.addEventListener('click', e => Events.todoDone(e));

//delete list 
Dom.body.addEventListener('click', e => Events.deleteList(e));

// drag and drop todos &lists 

Dom.body.addEventListener('dragstart', e => Events.dragStart(e));
Dom.body.addEventListener('dragover', e => e.preventDefault());
Dom.body.addEventListener('drop', e => Events.dragDrop(e));

// update local storage for check box 

Dom.body.addEventListener('click', e => Events.checkBoxUpdated(e));


getData();