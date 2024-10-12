var str = '';
var str2 = " World"
const stringConcat = (str) =>{
return str.concat(str2)
}
stringConcat(str);

const reverse = (str) =>{
return str.split("").reverse().join("")
}
reverse(str);

module.exports = {
    stringConcat : stringConcat,
    reverse : reverse
}