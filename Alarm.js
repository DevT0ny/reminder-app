
var _Hour = document.getElementById("_hr")
var _Min=  document.getElementById("_min")
var days = document.getElementsByName("Day")

function setHr(ele) {
    _Hour.innerHTML=ele.innerHTML

}
function setMin(ele) {
   _Min.innerHTML=ele.innerHTML   
}
var timeouts={}

function loadReminders(){
    var reminders = JSON.parse(localStorage.getItem("reminders"))
    console.log("Reminders :",reminders)

    if (reminders){
        console.group("Timeouts")
        reminders.forEach(reminder=>{
            var timeOut = reminder - new Date().getTime()
            console.log(timeOut)
            var id = setTimeout(()=>{
                alert(reminder/1000)
                destroyReminder(reminder)
            },timeOut)
            timeouts[reminder]= id;
            document.getElementById("fuck").innerHTML+=`<reminder-card id="${reminder}" unixTimestamp="${reminder}"></reminder-card>`
        })
        console.groupEnd()
    }
console.log("timeouts",timeouts)
}
// var reminderCard = 

function saveReminder(){
    var hour= parseInt(_Hour.innerHTML)
    var min = parseInt(_Min.innerHTML)
    if      (days[1].checked && hour<12 ) hour+=12;
    else if (days[0].checked && hour==12) hour=00;
    console.log(hour, min)
    var currentDate = new Date()
    var reminder = new Date(`${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}, ${hour}:${min}:00`).getTime() , time2=currentDate.getTime() 
    console.log("new Reminder :",reminder)
    var reminders= JSON.parse(localStorage.getItem("reminders"))
    var newReminders = (reminders)? reminders:[]
    newReminders.push(reminder)
    localStorage.setItem("reminders", JSON.stringify(newReminders))
    //location.reload()  // loadReminders()
    var timeOut = reminder - new Date().getTime()
    console.log(timeOut)
    var id = setTimeout(()=>{
        alert(reminder/1000)
        destroyReminder(reminder)
    },timeOut)
    timeouts[reminder]=id
    document.getElementById("fuck").innerHTML+=`<reminder-card id="${reminder}" unixTimestamp="${reminder}"></reminder-card>`


}


function toggle() {
    document.getElementById("addWindow").classList.toggle("disp");
    document.getElementById("op").classList.toggle("rotate");
}
function destroyReminder(reminderToDelete) {
    // remove from LS , clearSetTimeout , remove element
    console.error(reminderToDelete)

    var reminders = JSON.parse( localStorage.getItem("reminders"))
    var filteredReminders = reminders.filter((reminder)=>reminder!==reminderToDelete)
    console.log(filteredReminders)
    localStorage.setItem("reminders",JSON.stringify(filteredReminders))

    clearTimeout(timeouts[reminderToDelete])
    // console.log(reminderToDelete)
    var d=document.getElementById(reminderToDelete.toString())
    console.log(d)
    d.remove()
    
    
}

