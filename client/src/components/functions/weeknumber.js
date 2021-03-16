function weekNumbers(time) {
    var d = new Date(Date.UTC(time.getFullYear(), time.getMonth(), time.getDate()));
    var dayNum = d.getUTCDay() || 7; 
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var result = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
    var year=(String(time)).split(" ")[3]; 

    return year+"-"+result;
}
export default weekNumbers;