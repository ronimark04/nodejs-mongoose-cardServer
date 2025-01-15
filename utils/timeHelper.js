const now = new Date();
const addZero = (num) => {
    //return num < 10 ? `0${num}` : num; // same as:
    return num.toString().padStart(2, '0'); //if num length is less than 2, pad it with '0' on the left
};

const currentTime = () => {
    let result = {
        year: now.getFullYear(),
        month: now.getMonth() + 1, // months are zero-based: January === 0
        day: now.getDate(),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
    };

    for (const key in result) {
        result[key] = addZero(result[key]);
    };

    return result;
};

module.exports = { currentTime };