var morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
};

document.getElementById('translateButton').addEventListener('click', function() {
    var text = document.getElementById('textInput').value.toUpperCase();
    var morseCode = text.split('').map(function(char) {
        return morseCodeMap[char];
    }).join(' ');

    document.getElementById('morseCodeOutput').textContent = morseCode;
});

document.getElementById('playSound').addEventListener('click', function() {
    var morseCode = document.getElementById('morseCodeOutput').textContent;
    playMorseCodeSound(morseCode);
});

function playMorseCodeSound(morseCode) {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var time = context.currentTime;

    morseCode.split('').forEach(function(char) {
        switch (char) {
            case '.':
                playSound(context, time, 0.1);
                time += 0.2;
                break;
            case '-':
                playSound(context, time, 0.3);
                time += 0.4;
                break;
            case ' ':
                time += 0.2;
                break;
            case '/':
                time += 0.6;
                break;
        }
    });

    function playSound(context, startTime, duration) {
        var oscillator = context.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = 1000; // Frequency in hertz
        oscillator.connect(context.destination);
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }
}

document.getElementById('speakText').addEventListener('click', function() {
    // Get the text from the 'textInput' field
    var text = document.getElementById('textInput').value.toUpperCase();

    // Speak the text
    speak(text);
});

function speak(text) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
}