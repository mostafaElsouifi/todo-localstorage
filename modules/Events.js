import getDate from './getDate.js';
import Dom from './Dom.js';
import { updateData } from './localStorage.js';


// for dragstart
let startDataIndex;
// array to store data in local storage;

/*
// structure of data stored 

const data = [
    {
        date: date,
        todo:{
            text:fgfgf.
            checked: false
        }
    }
]



*/

const Events = {
    addList: () => {
        let listIndex;
        const section = document.createElement('section');
        const sections = document.querySelectorAll('section');
        sections.length === 0 ? listIndex = 0 : listIndex = +sections[sections.length - 1].getAttribute('data-index') + 1
        section.setAttribute('data-index', listIndex);
        const date = getDate();
        section.innerHTML = `
        <div class="todo-list" draggable="true">
                        <div class="list-header">
                        ${date} 
                        <i class="delete-list-icon fas fa-times"></i>
                        </div>
                        <div class="input-container">
                            <input type="text" class="todo-input">
                            <i class="new-todo-icon fas fa-arrow-circle-right"></i>
                        </div>
                        <ul>
                        </ul>
        </div>
        `;
        Dom.gridContainer.appendChild(section);
        updateData();
    },
    addTodo: (e) => {
        let todoIndex;
        let input = e.value;
        const ul = e.parentNode.nextElementSibling;
        if (input == /[\s]*/ || !input) return;
        const newTodoLi = document.createElement('li');
        const lis = ul.querySelectorAll('li');
        lis.length === 0 ? todoIndex = 0 : todoIndex = +lis[lis.length - 1].getAttribute('data-index') + 1;
        newTodoLi.setAttribute('data-index', todoIndex);
        newTodoLi.setAttribute('class', 'todo-li');
        newTodoLi.innerHTML = `
        <div draggable="true" class="todo-draggable">
        <input type="checkbox" class="check-todo">
        <span>${input.trim()}</span>
        <i class="delete-icon fas fa-trash"></i>
        </div>
        `
        ul.appendChild(newTodoLi);
        e.value = '';
        updateData();
    },
    deleteTodo: (e) => {
        if (e.target.className.includes('delete-icon')) {
            const todoLi = e.target.closest('li');
            todoLi.parentNode.removeChild(todoLi);
            updateData();
        }
    },
    todoDone: (e) => {
        if (e.target.className.includes('check-todo')) {
            const todo = e.target.nextElementSibling;
            e.target.checked && todo.classList.add('todo-checked');
            e.target.checked || todo.classList.remove('todo-checked')
        }
    },
    deleteList: (e) => {
        if (e.target.className.includes('delete-list-icon')) {
            const section = e.target.closest('section');
            section.parentNode.removeChild(section);
            updateData();
        }
    },
    dragStart: (e) => {
        if (e.target.className.includes('todo-draggable')) startDataIndex = +e.target.closest('li').getAttribute('data-index');
        if (e.target.className.includes('todo-list')) startDataIndex = +e.target.closest('section').getAttribute('data-index');
    },

    dragDrop: (e) => {
        if (e.target.closest('li')) {
            let endDataIndex = +e.target.closest('li').getAttribute('data-index');
            let itemOne = e.target.closest('ul').querySelector(`li[data-index="${startDataIndex}"]`);
            let itemTwo = e.target.closest('ul').querySelector(`li[data-index="${endDataIndex}"]`);
            itemOne.appendChild(itemTwo.querySelector('div'));
            itemTwo.appendChild(itemOne.querySelector('div'));
            updateData();
        }
        if (e.target.parentNode.localName === 'section' || e.target.localName === 'section') {
            let endDataIndex = +e.target.parentNode.getAttribute('data-index');
            let listOne = Dom.body.querySelector(`section[data-index="${startDataIndex}"]`);
            let listTwo = Dom.body.querySelector(`section[data-index="${endDataIndex}"]`);
            listOne.appendChild(listTwo.querySelector('.todo-list'));
            listTwo.appendChild(listOne.querySelector('.todo-list'));
            updateData();
        }

    },
    checkBoxUpdated : (e)=>{
        if(e.target.className.includes('check-todo')){
            updateData();
        }
    }

}
export default Events;