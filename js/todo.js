const assets_checkbox = "/assets/checkbox.svg";
const assets_todo_check = "/assets/todo-check.svg";
const assets_xmark = "/assets/xmark.svg";

const CategoryEnum = Object.freeze({
    "ALL": 0,
    "COMPLETE": 1,
    "UNFINISH": 2
})

function* IdGenerator() {
    let id = 0;
    while (true) {
        yield id;
        id++;
    }
}

let generator = IdGenerator();

let todo_list = [
    {
        id: generator.next().value,
        content: "把冰箱發霉的檸檬拿去丟",
        isComplete: false
    },
    {
        id: generator.next().value,
        content: "打電話叫媽媽匯款給我",
        isComplete: true
    },
    {
        id: generator.next().value,
        content: "整理電腦資料夾",
        isComplete: false
    },
    {
        id: generator.next().value,
        content: "繳電費水費冷氣費",
        isComplete: true
    },
    {
        id: generator.next().value,
        content: "約vicky禮拜三泡溫泉",
        isComplete: false
    },
    {
        id: generator.next().value,
        content: "約ada禮拜四吃晚餐",
        isComplete: true
    }
];

let render_list = [...todo_list];

let currentCategory = CategoryEnum.ALL;



function switchCategory(view, category) {
    let parent = view.parentNode;
    parent.children[currentCategory].classList.toggle("active");    // toggle previous category

    if (category >= 0 && category <= 2)
        currentCategory = category;
    else
        currentCategory = 0;

    parent.children[currentCategory].classList.toggle("active");    // toggle current clicked category
    checkList();
}

function addTodo() {

    // get input
    let content = document.getElementById("input-todo-content").value;

    let item = {
        id: generator.next().value,
        isComplete: false,
        content: content
    }
    
    todo_list.unshift(item);
    if(todo_list.length === 1)
    {
        toggleBlock();
    }

    checkList();

    // clear input
    document.getElementById("input-todo-content").value = "";
}

function checkList() {
    let list = document.getElementById("todo-list");
    let counter = document.getElementById("wait-for-complete");
    switch (currentCategory) {
        case CategoryEnum.ALL:
            render_list = [...todo_list]; break;
        case CategoryEnum.UNFINISH:
            render_list = todo_list.filter(item => item.isComplete); break;
        case CategoryEnum.COMPLETE:
            render_list = todo_list.filter(item => !item.isComplete); break;
    }

    let result = render_list.map((item, index) => {
        return itemTemplate(item, index);
    }).join("");

    list.innerHTML = result;

    let unFinishCount = todo_list.filter(item => !item.isComplete).length;
    counter.innerText = `${unFinishCount}個待完成項目`;

    console.log("count", unFinishCount);
    if(todo_list.length <= 0) {
        toggleBlock();
    }
}

function toggleBlock() {
    const todo_list = document.querySelector(".todo-box");
    const empty_background = document.getElementById("empty-background");
    todo_list.classList.toggle("d-none");
    empty_background.classList.toggle("d-none");
}

function itemTemplate(item, index) {
    return `
        <li class="todo-item ${item.isComplete ? "check" : ""}">
            <span onClick="toggleComplete(${item.id})"><img src="${item.isComplete ? assets_todo_check : assets_checkbox}" alt="">${item.content}</span>
            <img onClick="deleteItem(${item.id})" class="delete" src="/assets/xmark.svg" alt="">
        </li>
    `
}

function toggleComplete(id) {
    console.log(id);
    let item = todo_list.find((item) => item.id === id);
    item.isComplete ^= true; // toggle boolean
    checkList();
}

function deleteItem(id) {
    todo_list = todo_list.filter(item => item.id !== id);
    checkList();
}

function clearCompleted() {
    todo_list = todo_list.filter(item => !item.isComplete);
    checkList();
}


window.onload = () => {
    checkList();
}