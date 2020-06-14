class reminder extends HTMLElement{
// This is web component and no third party framework is required
// This component represents card which shows reminder time and date in DOM
    constructor(){
        super();
        // const type= this.getAttribute('type');
        var timestamp = this.getAttribute('unixTimestamp')
        var data = new Date(parseInt(timestamp));
        var hour= data.getHours();
        var format = "AM";
        function putZero(n) {
            return (n < 10 ? '0' : '') + n;
        }
        if (hour == 0){ hour= 12;}
        else if (hour >= 12){ 
            format="PM";
            if (hour >12)  hour-=12;
        }

        this.innerHTML=`  
        <div class="reminder">
            <div class="reminder__cont1" >
                    <span class="date">${data.getDate()}</span><br>
                    <span class="month">${data.toDateString().slice(4,7).toLocaleUpperCase()}</span>
            </div>
            <div class="reminder__cont2" >
                <span class="hr" >${putZero(hour)}</span>
                :
                <span class="min">${putZero(data.getMinutes())} </span>
                <span class="stamp">${format}</span>
            </div>
            <div class="reminder__cont3" >
            <i class="im im-x-mark" onclick="destroyReminder(${data.getTime()})" ></i>
            </div>
        </div>
        `
    }
}
window.customElements.define('reminder-card',reminder)