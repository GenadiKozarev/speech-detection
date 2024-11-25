// Ensure cross-browser compatibility for Speech Recognition API
window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
const clearBtn = document.querySelector('.clear-btn');

const handleClear = () => {
    words.innerHTML = '';
};

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(results => results[0])
        .map(result => result.transcript)
        .join('');
    p.textContent = transcript;
    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
});
// Error handling
recognition.addEventListener('error', event => {
    console.error('Speech recognition error:', event.error);
});
recognition.addEventListener('end', recognition.start);

clearBtn.addEventListener('click', handleClear);

recognition.start();
