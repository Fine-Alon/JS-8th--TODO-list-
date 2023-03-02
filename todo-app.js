(function () {
    // array that include (NAME, ID, DONE-status like objects) of each task
    const todoTasksArray = [];
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    };
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'type name of new task';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'ADD TASK';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        }

    };
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    };
    function gettNewId(arr) {
        let maxId = 0;
        for (let todoObj of arr) {
            if (todoObj.id >= maxId) {
                maxId = todoObj.id;
            }
        }
        return maxId += 1;
    };
    function createTodoItem(obj) {
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deliteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = obj.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'DONE';
        deliteButton.classList.add('btn', 'btn-danger');
        deliteButton.textContent = 'DELITE';

        doneButton.addEventListener('click', function () {
            item.classList.toggle('list-group-item-success')
            for (let element of todoTasksArray) {
                if (obj.id == element.id) { obj.done = !obj.done };
            };
        });

        deliteButton.addEventListener('click', function () {
            if (confirm('are you sure?')) {
                item.remove();
                for (let element = 0; element < todoTasksArray.length; element++) {
                    if (todoTasksArray[element].id == obj.id) {
                        todoTasksArray.splice(element, 1);
                    };
                };
            };
        });

        buttonGroup.append(doneButton);
        buttonGroup.append(deliteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deliteButton,
        }
    };
    function createTodoApp(container, title = 'TODO-LIST') {
        // her we assign functions into variables
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        // set DISABLED to form btn when page has been loaded
        todoItemForm.button.setAttribute('disabled', '');
        // check if form input has text and save the btn DISABLED or diferent
        todoItemForm.input.addEventListener('input', function () {
            if (todoItemForm.input.value !== '') {
                todoItemForm.button.removeAttribute('disabled');
            } else {
                todoItemForm.button.setAttribute('disabled', '');
            };
        });

        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();
            // check if we have value of input field
            if (!todoItemForm.input.value) {
                return;
            };

            todoNewTask = {
                name: todoItemForm.input.value,
                done: false,
                id: gettNewId(todoTasksArray),
            };

            let todoItem = createTodoItem(todoNewTask);
            // here we add new TASK into DOM element
            todoList.append(todoItem.item);

            // here we delite input value(new task that user has enter) after adding new task
            todoItemForm.input.value = '';
            // set DISABLED to form btn after adding new task 
            todoItemForm.button.setAttribute('disabled', '');
            // here we add new TASK into Array of tasks
            todoTasksArray.push(todoNewTask);
            console.log(todoTasksArray)
        });
    };

    window.createTodoApp = createTodoApp;

})();
