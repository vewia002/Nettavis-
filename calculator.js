window.addEventListener("keydown", onkeydown)
evl = true;
function remove() {
    console.log("yes");
    document.getElementById("regnestykke").value = "";
}
function regn_ut() {
    rs = document.getElementById("regnestykke").value;
    if (evl == true) {
        rs = rs.charAt(0).toUpperCase() + rs.slice(1)
        document.getElementById("regnestykke").value = eval(rs);
    } else {
        document.getElementById("regnestykke").value = operator(rs);
    }
}
function display(char) {
    elm = document.getElementById("regnestykke").value;
    wl = elm.substring(0, elm.length - 1);
    l = elm.substr(elm.length - 1);
    if ((char=="-"||char=="+"||char=="/"||char=="*")&&(l=="-"||l=="+"||l=="/"||l=="*")) {
        document.getElementById("regnestykke").value = wl + char;
    } else {
        document.getElementById("regnestykke").value += char;
    }
}
function operator(str) {
    var reg = /[^\d.]/g;
    console.log(reg);
    var match = str.match(reg);
    var multiply = 0;
    var divide = 0;
    var numbers = str.split(reg);
    console.log(numbers);
    console.log(match);
    numbers = numbers.map(i=>Number(i));
    for (var i = 0; i < numbers.length; i++) {
        if (match[i] == "+") {
            multiply = divide = 0;
            numbers[0] += numbers[i+1]
        } else if (match[i] == "-") {
            multiply = divide = 0;
            numbers[0] -= numbers[i+1]
        } else if (match[i] == "*") {
            divide = 0;
            if (i > 0 && match[i-1] == "-") { 
                numbers[0] += numbers[i]
                numbers[i-multiply] *= numbers[i+1]
                numbers[0] -= numbers[i]
            } else if (i > 0 && match[i-1] == "+") {
                numbers[0] -= numbers[i]
                numbers[i-multiply] *= numbers[i+1]
                numbers[0] += numbers[i]
            } else {
                numbers[i-multiply] *= numbers[i+1];
            }
            multiply++;
        } else if (match[i] == "/") {
            multiply = 0
            if (i > 0 && match[i-1] == "-") { 
                numbers[0] += numbers[i]
                numbers[i-divide] /= numbers[i+1]
                numbers[0] -= numbers[i]
            } else if (i > 0 && match[i-1] == "+") {
                numbers[0] -= numbers[i]
                numbers[i-divide] /= numbers[i+1]
                numbers[0] += numbers[i]
            } else if (i > 0 && match[i-1] == "*") {
                
            } else {
                numbers[i-divide] /= numbers[i+1];
            }
            divide++;
        }
    }
    console.log(numbers)
    return numbers[0];
}
function onkeydown(e) {
    if (e.keyCode != 8) {
        var input = document.getElementById("regnestykke");
        input.focus();
        const length = input.value.length;
        input.setSelectionRange(length, length);
    } if (e.keyCode == 13) {
        regn_ut();
        e.preventDefault();
    } 
}
function toggle_eval() {
    if (document.getElementById("toggle_eval").innerHTML == "Without eval()") {
        document.getElementById("toggle_eval").innerHTML = "With eval()";
        evl = false;
    } else {
        document.getElementById("toggle_eval").innerHTML = "Without eval()";
        evl = true;
    }
}