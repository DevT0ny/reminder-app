
var Hour = document.getElementById("hr")
var Min =  document.getElementById("min")
var Period = document.getElementsByName("period")

function setHr(ele) {
    Hour.innerHTML=ele.innerHTML

}
function setMin(ele) {
    Min.innerHTML=ele.innerHTML   
}

function toggle() {
    document.getElementById("addWindow").classList.toggle("disp");
    document.getElementById("op").classList.toggle("rotate");
}
/**
 * @param {Iterable} timeoutsIds collection of setTimeout IDs 
 * example : {1592154000000: 1}
 */
var timeoutsIds={}

/**
 * Sets the alarm and displays in HTML DOM
 * @arg {number} reminder it represents the alarm date and time in unixTimestamp format (ms)
 * @param {number} timeout it is difference of alarm time and current time (for setTimeout)
 * @param {number} id ID of setTimeout, used for clearTimeout
 */
var sound = document.getElementById("sound")

function setAlarm(reminder){
    var timeout = Math.abs(reminder - new Date().getTime()) 
    // console.log(timeout) 
    var id = setTimeout(()=>{
        document.getElementById("sound").play()
        navigator.vibrate([500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]) // for vibrating credit :https://youtu.be/EZpdEljk5dY?t=563
        destroyReminder(reminder)
        alert(new Date(reminder).toLocaleTimeString())  
    },timeout)
    timeoutsIds[reminder]= id; 
    document.getElementById("reminders").innerHTML+=`<reminder-card id="${reminder}" unixTimestamp="${reminder}"></reminder-card>`
}

function loadReminders(){
    var reminders = JSON.parse(localStorage.getItem("reminders"))
    //console.log("Reminders :",reminders)
    // console.group("Timeouts")
    if (reminders) reminders.forEach(reminder=>setAlarm(reminder))
    // console.groupEnd()
}

/**
 * creates a new reminder and saves it to LS
 */
function saveReminder(){
    document.getElementById("addWindow").classList.toggle("disp");

    var hour= parseInt(Hour.innerHTML)
    var min = parseInt(Min.innerHTML)

    // converting 24hr to 24hr 
    if      (Period[1].checked && hour<12 ) hour+=12; // PM
    else if (Period[0].checked && hour==12) hour=00; // AM
    // console.log(hour, min)

    // generate unixTimestamp/reminder
    var currentDate = new Date()
    var reminder = new Date(`${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}, ${hour}:${min}:00`).getTime()
    // console.log("new Reminder :",reminder)

    // we need to add this new reminder with already stored in localStorage 
    var reminders= JSON.parse(localStorage.getItem("reminders"))  
    var newReminders = (reminders)? reminders:[] 
    newReminders.push(reminder) 
    localStorage.setItem("reminders", JSON.stringify(newReminders))
    
    // now we need to set alarm also
    setAlarm(reminder)
}



/* this function is invoked on 2 situations  
    1. when reminder is fired
    2, when user clicks remove
*/
function destroyReminder(reminderToDelete) {
    // console.error(reminderToDelete)
    navigator.vibrate(0)
    var reminders = JSON.parse( localStorage.getItem("reminders"))
    var filteredReminders = reminders.filter(reminder=>reminder!==reminderToDelete)
    localStorage.setItem("reminders",JSON.stringify(filteredReminders))
    clearTimeout(timeoutsIds[reminderToDelete]) // clear setTimeout of reminder
    document.getElementById(reminderToDelete.toString()).remove() // remove from DOM
}

