//getting all required elements

const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user entered value
    if(userData.trim()!=0){ //if user data aren't only spaces
        addBtn.classList.add("active"); // active the add button
    }
    else{
        addBtn.classList.remove("active"); //unactive the add button
    }
}

//if user click on the add button
addBtn.onclick = ()=>{
    let userData =  inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr));//transform js object into json string

    showTasks(); //calling showTasks function
    addBtn.classList.remove("active"); //unactive the add button
}

//function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb
    if(listArr.length>0){ //if array length is greater than 0
        deleteAllBtn.classList.add("active"); //active the clearall button
    }
    else{
        deleteAllBtn.classList.remove("active"); //unactive the clearall button
    }
    let newLiTag = '';
    listArr.forEach((element,index) =>{
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}
// delete task function
function deleteTask(index){
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorageData);
    listArr.splice(index, 1); //delete or remove the li
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks(); //call the showTasks function
  }


//delete all tasks function
deleteAllBtn.onclick = ()=>{
    listArr = []; //empty an array
    //after delete all task again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a js string
    showTasks(); //calling showTasks function
}