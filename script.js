$(document).ready(function() {
    let lighted = false;
    const todoForm = $("form");
    const addBtn = $("#add-button");
    const todoInput = $("#todo-input");
    const todoTime = $("#todo-time");
    const todoDate = $("#todo-date");
    const todoListUL = $("#todo-list");

    let allTodos = getTodos();
    updateTodoList();

    todoForm.on("submit", function(e) {
        e.preventDefault();
        addTodo();
    });

    addBtn.click(function() {
        todoForm.submit();
    });

    $("#lighting").click(function() {
        if (lighted) {
            $("body").removeClass("lightmode");
            $("#todo-input, #todo-date, #todo-time").css("color-scheme", "dark");
            $("#lighting").html(`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Zm297-297Z"/></svg>`);
        } else {
            $("body").addClass("lightmode");
            $("#todo-input, #todo-date, #todo-time").css("color-scheme", "light");
            $("#lighting").html(`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)"><path d="M480-120q-151 0-255.5-104.5T120-480q0-138 90-239.5T440-838q13-2 23 3.5t16 14.5q6 9 6.5 21t-7.5 23q-17 26-25.5 55t-8.5 61q0 90 63 153t153 63q31 0 61.5-9t54.5-25q11-7 22.5-6.5T819-479q10 5 15.5 15t3.5 24q-14 138-117.5 229T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>`);
        }
        lighted = !lighted;
    });

    function addTodo() {
        const todoText = todoInput.val().trim();
        const tTime = todoTime.val().trim();
        const tDate = todoDate.val().trim();
        if (todoText.length > 0) {
            let data = {
                text: todoText,
                time: tTime,
                date: tDate,
                completed: false,
            }
            allTodos.push(data);
            updateTodoList();
            saveTodos();
            todoInput.val("");
            todoTime.val("");
            todoDate.val("");
        }
    }

    function updateTodoList() {
        todoListUL.empty();
        allTodos.forEach((todo, todoIndex) => {
            todoItem = createTodoItem(todo, todoIndex);
            todoListUL.append(todoItem);
        });
    }

    function createTodoItem(todo, todoIndex) {
        const todoId = "todo-" + todoIndex;
        const todoLI = $("<li></li>");
        todoLI.addClass("todo");
        todoLI.html(`
            <input type="checkbox" id="${todoId}">
            <label class="custom-checkbox" for="${todoId}">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent"><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>
            </label>
            <label for="${todoId}" class="todo-text">
                ${todo.text}
            </label>
            <label for="${todoId}" class="todo-time">
                ${todo.time}
            </label>
            <label for="${todoId}" class="todo-date">
                ${todo.date}
            </label>
            <button class="edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)"><path d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </button>
            <button class="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"/></svg>
            </button>    
        `);

        const deleteButton = todoLI.find(".delete-button")
        deleteButton.click(function() {
            deleteTodoItem(todoIndex);
        });

        const checkbox = todoLI.find("input");
        checkbox.change(function() {
            allTodos[todoIndex].completed = checkbox.is(":checked");
            saveTodos();
        });
        checkbox.prop("checked", todo.completed);
        return todoLI;
    }

    function deleteTodoItem(todoIndex) {
        allTodos = allTodos.filter((_, i) => i !== todoIndex);
        saveTodos();
        updateTodoList();
    }

    function saveTodos() {
        const todosJson = JSON.stringify(allTodos);
        localStorage.setItem("todos", todosJson);
    }

    function getTodos() {
        const todos = localStorage.getItem("todos") || "[]";
        return JSON.parse(todos);
    }
});
