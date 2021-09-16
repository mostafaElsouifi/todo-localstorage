import Dom from "./Dom.js";
export const updateData = ()=>{
        let finalData = [];
        const sections = document.querySelectorAll('section');
        sections.forEach((section, i) => {
            const date = section.querySelector('.list-header').textContent.trim();
            const data = {
                date: date,
                todo: []
            }
            const lis = section.querySelectorAll('li');
            if (lis.length > 0) {
                lis.forEach(li => {
                    let text = li.querySelector('span').textContent;
                    let checked = li.querySelector('.check-todo').checked;
                    data.todo.push({
                        text: text,
                        checked: checked
                    })
                })
            }
    
            finalData[i] = data;
    
        });
        localStorage.setItem('data', JSON.stringify(finalData));
    }


    export const getData = ()=>{
        const data = JSON.parse(localStorage.getItem('data'));
        if(data && data.length > 0){
            data.forEach((section,i)=>{
                const newSection =  document.createElement('section');
                newSection.setAttribute('data-index', i);
                let html =`
                <div class="todo-list" draggable="true">
                <div class="list-header">
                ${section.date} 
                <i class="delete-list-icon fas fa-times"></i>
                </div>
                <div class="input-container">
                    <input type="text" class="todo-input">
                    <i class="new-todo-icon fas fa-arrow-circle-right"></i>
                </div>
                <ul>`
                if(section.todo.length > 0){
                    section.todo.forEach((todo,i)=>{
                        html +=  `<li data-index="${i}" class="todo-li">
                        <div draggable="true" class="todo-draggable">
                        <input type="checkbox" class="check-todo" ${todo.checked === true ? `checked`: ''}>
                        <span ${todo.checked === true ? `class="todo-checked"`: ''}>${todo.text}</span>
                        <i class="delete-icon fas fa-trash"></i>
                        </div>
                        </li>`
                    })
                }
                html +=
                    `
                </ul>
             </div>
             `
             newSection.innerHTML = html;
             Dom.gridContainer.appendChild(newSection)
    
            })
        }
    }