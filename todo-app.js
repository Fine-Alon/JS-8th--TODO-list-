(function () {
    // array that include objects(tasks) that contain(NAME, ID, DONE-status)
    let todoTasksArray = [],
        keyName = ''

    function createAppTitle(title) {
        let $appTitle = document.createElement('h2');
        $appTitle.innerHTML = title;
        return $appTitle;
    }

    function createTodoItemForm() {
        let $form = document.createElement('form');
        let $input = document.createElement('input');
        let $buttonWrapper = document.createElement('div');
        let $button = document.createElement('button');

        $form.classList.add('input-group', 'mb-3');
        $input.classList.add('form-control');
        $input.placeholder = 'type name of new task';
        $buttonWrapper.classList.add('input-group-append');
        $button.classList.add('btn', 'btn-primary');
        $button.textContent = 'ADD TASK';
        // set DISABLED to form btn when page has been loaded
        $button.disabled = true;

        // check if FORM input has text and save the btn DISABLED or the opposite
        $input.addEventListener('input', function () {
            if ($input.value !== "") {
                $button.disabled = false;
            } else {
                $button.disabled = true;
            }
        });

        $buttonWrapper.append($button);
        $form.append($input);
        $form.append($buttonWrapper);

        return {
            $form,
            $input,
            $button,
        }

    }

    function createTodoList() {
        let $list = document.createElement('ul');
        $list.classList.add('list-group');
        return $list;
    }

    function gettNewId(arr) {
        let maxId = 0;
        for (let todoObj of arr) {
            if (todoObj.id >= maxId) {
                maxId = todoObj.id;
            }
        }
        return maxId += 1;
    }

    function createTodoItem(obj) {
        let $item = document.createElement('li');

        let $buttonGroup = document.createElement('div');
        let $doneButton = document.createElement('button');
        let $deliteButton = document.createElement('button');

        $item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        $item.textContent = obj.name;

        $buttonGroup.classList.add('btn-group', 'btn-group-sm');
        $doneButton.classList.add('btn', 'btn-success');
        $doneButton.textContent = 'DONE';
        $deliteButton.classList.add('btn', 'btn-danger');
        $deliteButton.textContent = 'DELETE';

        $buttonGroup.append($doneButton);
        $buttonGroup.append($deliteButton);
        $item.append($buttonGroup);

        if (obj.done) {
            $item.classList.add('list-group-item-success')
        }

        $doneButton.addEventListener('click', function () {
            $item.classList.toggle('list-group-item-success')
            for (let element of todoTasksArray) {
                if (obj.id === element.id) {
                    obj.done = !obj.done
                }
                ;
            }
            saveTodoData(keyName, todoTasksArray);
        })

        $deliteButton.addEventListener('click', function () {
            if (confirm('are you sure?')) {
                $item.remove()
                for (let element = 0; element < todoTasksArray.length; element++) {
                    if (todoTasksArray[element].id === obj.id) {
                        todoTasksArray.splice(element, 1)
                    }
                }
                saveTodoData(keyName, todoTasksArray);
            }
        })

        return {
            $item,
            $doneButton,
            $deliteButton,
        }
    }

    function saveTodoData(keyName, arr) {
        localStorage.setItem(keyName, JSON.stringify(arr))
    }

    function createTodoApp(container, title = 'TODO-LIST', keyWord) {
        // her we assign functions into variables
        let $todoAppTitle = createAppTitle(title)
        let $todoItemForm = createTodoItemForm()
        let $todoList = createTodoList()

        container.append($todoAppTitle)
        container.append($todoItemForm.$form)
        container.append($todoList)

        keyName = keyWord

        // check if we have any stored string(ARRAY data) & parse it back to readable ARRAY
        let savedData = localStorage.getItem(keyName)

        if (savedData !== null && savedData !== '') {
            todoTasksArray = JSON.parse(savedData)
        }

        // add every object of main ARRAY to 'createTodoItem' func for doing DOM structure & add them to TODO List
        for (let listObj of todoTasksArray) {
            let $todoItem = createTodoItem(listObj)
            $todoList.append($todoItem.$item)
        }

        $todoItemForm.$form.addEventListener('submit', function (e) {
            e.preventDefault()
            // check if we have value in input field
            if (!$todoItemForm.$input.value) return

            const todoNewTaskObj = {
                name: $todoItemForm.$input.value,
                done: false,
                id: gettNewId(todoTasksArray),
            }

            let $todoItem = createTodoItem(todoNewTaskObj);

            // here we add new TASK into Array of tasks
            todoTasksArray.push(todoNewTaskObj)

            // here we add new TASK into DOM element
            $todoList.append($todoItem.$item)

            saveTodoData(keyName, todoTasksArray)
            // here we delete input value(new task that user has enter) after adding new task
            $todoItemForm.$input.value = ''

        })
    }

    window.createTodoApp = createTodoApp
})()
