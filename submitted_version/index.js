//sends initial welcome message with a 2 second timeout
setTimeout(sendWelcomeMessage, 2000);
//sends receiving messages into chat app in intervals for a set amount of time asynchronously (I have been learning very briefly recently about how JavaScript works asynchronously)
const sendReceivingMessages = setInterval(() => {
    setTimeout(() => {
        clearInterval(sendReceivingMessages);
    }, 120000);
    receiveMessage();
 }, 10000);
 
//found the solution for this particular event listener from: https://stackoverflow.com/questions/979662/how-can-i-detect-pressing-enter-on-the-keyboard-using-jquery
$(document).on('keypress', function(key) {
    if(key.which == 13) {
        sendMessage(input);
    }
});

//function interacts with the DOM with jQuery send an outgoing message to the chat app
function sendMessage(input) {
        if (input.value === '') {
            return;
        }
        else {
            let $chatWindowBody = $('.chat-window-body');
            let $messageDiv = $('<div>');
            let $message = $('<p>');
            let $breakElement = $('<br>');
            let $messageTime = $('<p>');
            let date = new Date();

            
            $chatWindowBody
                .append($messageDiv);

            $message.text(input.value)
                .addClass('outgoing-message');

            $messageDiv
                .append($message)
                .append($messageTime)
                .append($breakElement);

            $messageTime
                .addClass('time-sent-outgoing-message')
                .text(`Sent at: ${date.getDate()}/${date
                    .getMonth() + 1}/${date
                    .getFullYear()} ${date
                    .getHours()}:${date
                    .getMinutes()}:${date
                    .getSeconds()}`);

            
            console.log(`[SENT MESSAGE: "${input.value}" AT: ${date
                .getHours()}:${date
                .getMinutes()}:${date
                .getSeconds()}]`);
            
            input.value = null;

            setTimeout(scrollToBottom, 200);
    }
}

//function to receive messages being displayed within the chat app by interacting with the DOM using jQuery 
function receiveMessage(string) {
    let messageResponses = ['Are you up to much today?',
        'What is your favourite food?',
        'What is your favourite film?',
        'What is your favourite holiday destination?',
        'Do you have any Hobbies?',
        'What is your favourite type of car?',
        'What is your favourite pet?'];

    let $message = $('<p>')
        .addClass('incoming-message');
    
    if (string) $message.text(string);
    else $message.text(messageResponses[Math.floor(Math.random() * messageResponses.length)]);

    let date = new Date();
    let $breakElement = $('<br>');
    let $messageTime = $('<p>')
        .addClass('time-sent-incoming-message')
        .text(`Sent at: ${date
        .getDate()}/${date
        .getMonth() + 1}/${date
        .getFullYear()} ${date
        .getHours()}:${date
        .getMinutes()}:${date
        .getSeconds()}`);

    let $messageDiv = $('<div>')
        .append($message)
        .append($messageTime)
        .append($breakElement);

    let $chatWindowBody = $('.chat-window-body')
        .append($messageDiv);

    setTimeout(scrollToBottom, 200);
    
    console.log(`[RECEIVED MESSAGE: "${$message.text()}" AT: ${date
        .getHours()}:${date
        .getMinutes()}:${date
        .getSeconds()}]`);
}

//sends welcome message for use as a callback function
function sendWelcomeMessage() {
    receiveMessage('Hello! How are you today?');
}

//found this line of code from: https://stackoverflow.com/questions/14918787/jquery-scroll-to-bottom-of-div-even-after-it-updates
function scrollToBottom() {
    $(".chat-window-body").animate({ scrollTop: $(".chat-window-body")[0].scrollHeight}, 1000);
}