const dayes = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thuresday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDate(){
    const date = new Date();
    const day = date.getUTCDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const mins = date.getMinutes();
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}  - ${hours}:${mins}`;
}
export default  getDate;