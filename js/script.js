
// ******************* //

// let form = document.getElementById('form')
// let input = document.getElementById('input')
// let msg = document.getElementById('msg')
// let posts = document.getElementById('posts')

//let data = {}

// function createPost(){
    //     posts.innerHTML += `
    //     <div class="flex p-2">
//         <p>${data.text}</p>
//         <span class="options ml-2">
//             <ion-icon onclick="editPost(this)" name="create"></ion-icon>
//             <ion-icon onclick="deletePost(this)" name="trash"></ion-icon>
//         </span>
//     </div>`;
//     input.value = "";
// }

// function acceptData(){
//     data["text"] = input.value;
//     createPost();
// }

// function formValidation(){
//     if(input.value == ""){
//         msg.textContent = "Post cannot be blank";
//     }else{
//         msg.textContent = "";
//         acceptData();
//     }
// }

// const deletePost = (e) =>{
//     e.parentElement.parentElement.remove();
// }

// const editPost = (e) =>{
//     input.value = e.parentElement.previousElementSibling.innerHTML;
//     e.parentElement.parentElement.remove();
// }


// form.addEventListener('submit', (e) =>{
//     e.preventDefault()
//     formValidation();
// })

// ******************* //


// TO-DO APP START
let modal = document.querySelector('.modal');
let taskForm = document.getElementById('taskForm');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let tasks = document.getElementById('tasks');
let cancelBtn = document.getElementById('cancel');
let msg = document.getElementById('msg');

let data = [];

function openModal(){
    modal.classList.toggle('hidden');
    cancelBtn.removeAttribute('disabled')
    resetForm();
}

function resetForm(){
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
    msg.textContent = "";
}

function createTask(){
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += `
            <div id=${y} class="border-4 border-blue-300 my-1">
                <span class="text-xl font-medium">${x.text}</span>
                <span class="block text-gray-500">${x.date}</span>
                <p class="p-1 py-3 max-h-64 overflow-auto">${x.description}</p>

                <span class="options ml-2">
                    <ion-icon onclick="editTask(this)" name="create" class="cursor-pointer border border-gray-300 p-1 hover:bg-green-300"></ion-icon>
                    <ion-icon onclick="deleteTask(this)" name="trash" class="cursor-pointer border border-gray-300 p-1 hover:bg-red-300"></ion-icon>
                </span>
            </div>
        `)
    })

    resetForm();
}

(() => {
    data = JSON.parse(localStorage.getItem('data')) || [];
    createTask();
})();

function acceptData(){
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    });

    localStorage.setItem("data", JSON.stringify(data));
    createTask();
    openModal();
}

function formValidation(){
    if( textInput.value == ""){
        msg.textContent = "Title cannot be blank"
    }else{
        acceptData();
    }
}

function editTask(e) {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    modal.classList.remove('hidden')
    msg.textContent = "";
    cancelBtn.setAttribute("disabled","disabled")
    deleteTask(e);
}

function deleteTask(e) {
    e.parentElement.parentElement.remove()

    data.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem('data', JSON.stringify(data));

    // console.log(data)
}

taskForm.addEventListener('submit',(e) => {
    e.preventDefault();

    formValidation();
})
