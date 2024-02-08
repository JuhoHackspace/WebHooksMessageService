var form = document.querySelector('form');
var result = document.querySelector('span');
var msg_box =  document.getElementById('msg_content');
msg_box.focus();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    var messageToSend = msg_box.value;
    fetch('/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: messageToSend
        }),
    }).then(response => response.json()).then(data => {
        if(data === 200) {
            result.innerHTML = "Message succesfully sent!";
        }else if(data === 'Empty message') {
            result.innerHTML = "You tried sending an empty message";
        }else {
            result.innerHTML = "Something went wrong!";
        }
    }).catch(error => {
        result.innerHTML = "Error: " + error;
    });
});