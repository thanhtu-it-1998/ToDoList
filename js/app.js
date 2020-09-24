// CODE EXPLAINED channel

// Variable
let LIST = [],
    id = 0;


// Select the Element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementsByClassName("input");

// Class names
const CHECK = "fa-check-circle";
const UNCHECKED = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Get item from loacalStorage
let data = localStorage.getItem("TODO");

// Check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length - 1;// set the id to the last one in the list
    loadList(LIST);// load the list to the user interface
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
}

//load the items to th users's interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//Clear the local storage
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})

//Show to date
const option = { weekday: "long", moth: "short", day: "numeric" }
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", option);

// Add to do function
function addToDo(todo, id, done, trash) {

    if (trash) { return; }
    const DONE = done ? CHECK : UNCHECKED;
    const LINE = done ? LINE_THROUGH : "";

    const item = '<li class="item"><i class="fa ' + DONE + ' co" job="complete" id="' + id + '"></i><p class="text ' + LINE + '">' + todo + '</p><i class="fa fa-trash-o de" job = "remove"id = "' + id + '"></i></li> ';
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}
// Add a item  to the list user the enter key
input[0].addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        let toDo = input[0].value;
        if (toDo) {
            addToDo(toDo, id, false, false);
        }
        LIST.push({
            name: toDo,
            id: id,
            done: false,
            trash: false,
        })
        // Add item to local store age(this code must be added where the List array is updated).
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        input[0].value = "";
    }
});

//Complete to do 
function completeToDo(element) {

    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECKED);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Remove to do 
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//Target the items
list.addEventListener('click', function (event) {
    const element = event.target; // return the click element inside list
    const elementJob = element.attributes.job.value;//complete or delete
    if (elementJob == "complete") {
        completeToDo(element);
    }
    else if (elementJob == "remove") {
        removeToDo(element);
    }

    // Add item to local store age(this code must be added where the List array is updated).
    localStorage.setItem("TODO", JSON.stringify(LIST));
})