const tinput = document.getElementById("taskin");
const tform = document.getElementById("taskForm");  
const tlist = document.getElementById("taskList");
const submit = document.getElementById("submit");
const butt = document.querySelectorAll(".filter");
const count = document.getElementById("count");
const addbtn = document.getElementById("add");
let tasks =[];
let t=0;

tform.addEventListener("submit",(e)=>{
    e.preventDefault();
    
  const inp = tinput.value.trim();
    if (!inp) return;

    const task = { text: inp, completed: false };
    tasks.push(task);
    saveTasks();
    addTaskToDOM(task);

    t++;
    count.innerText = tasks.length + " tasks";
    tinput.value = "";
});

function addTaskToDOM(task)
{
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task.text;
    const done = document.createElement("button");
    if(task.completed)
        {
            li.classList.add("completed");
            span.style.color = "red";
            done.style.display = "none";
        }
        const btnBox = document.createElement("div");
        btnBox.style.display="flex";
        btnBox.style.gap = "6px";
        done.textContent = "✓";
        done.style.backgroundColor="green";
        done.style.color = "white";
        done.style.cursor="pointer";
        const delbtn = document.createElement("button");
        delbtn.textContent = "X";
        delbtn.style.backgroundColor="red";
        delbtn.style.color = "black";
        delbtn.style.cursor = "pointer";
        done.addEventListener("click",()=>{
            li.classList.add("completed");
            span.style.textDecoration = "line-through";
            span.style.color  = "red";
            done.style.display = "none";
            task.completed = true;
            saveTasks();
        }); 
        delbtn.addEventListener("click",()=>{
            li.remove();
            t--;
            tasks = tasks.filter(ts=> ts!== task);
            saveTasks();
            count.innerText = tasks.length+" tasks";
        });

        btnBox.append(done, delbtn);
        li.append(span, btnBox);
        tlist.appendChild(li);
}

butt.forEach(b =>{
    b.addEventListener("click",()=>{
        const type  = b.dataset.filter;
        const items = tlist.querySelectorAll("li");
        items.forEach(it =>{
            if(type == "all"){
                it.style.display= "flex";}
            else if (type === "completed") {
        it.style.display = it.classList.contains("completed") ? "flex" : "none";}
            else if(type == "pending"){
                it.style.display = !it.classList.contains("completed")?"flex":"none";}
        });
        butt.forEach(btn =>{
            btn.classList.remove("active");
        });
        b.classList.add("active");
    });
});
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function loadTasks(){
    const stored = localStorage.getItem("tasks");
    if(stored)
    {
        tasks = JSON.parse(stored);
        tasks.forEach(ts => addTaskToDOM(ts));
        count.innerText = tasks.length + " tasks"
    }
}
window.addEventListener("load", loadTasks);