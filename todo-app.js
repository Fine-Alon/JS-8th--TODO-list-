(function () {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }
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

    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name) {
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deliteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'DONE';
        deliteButton.classList.add('btn', 'btn-danger');
        deliteButton.textContent = 'DELITE';

        buttonGroup.append(doneButton);
        buttonGroup.append(deliteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deliteButton,
        }
    }

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
            }
        });

        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();
            // check if we have value of input field
            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);
            todoList.append(todoItem.item);

            todoItem.doneButton.addEventListener('click', function () {
                todoItem.item.classList.toggle('list-group-item-success');
            });

            todoItem.deliteButton.addEventListener('click', function () {
                if (confirm('are you sure?')) {
                    todoItem.item.remove();
                }
            });

            // here we delite input value(new task that user has enter) after adding new task
            todoItemForm.input.value = '';
            // set DISABLED to form btn after adding new task 
            todoItemForm.button.setAttribute('disabled', '');

        });
    }

    window.createTodoApp = createTodoApp;

})();
