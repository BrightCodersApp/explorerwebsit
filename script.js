// Ø¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ø´Ø¨ÙƒØ©
const x = Array.from({ length: 50 }, (_, i) => i * 0.2);
const y = Array.from({ length: 50 }, (_, i) => i * 0.2);
const xMesh = x.map(xVal => Array(y.length).fill(xVal));
const yMesh = Array(x.length).fill(y);

// Ø¯Ø§Ù„Ø© Ù„Ø­Ø³Ø§Ø¨ Ø§Ù„Ø£Ù…ÙˆØ§Ø¬
function wave(amplitude, wavelength, frequency, time) {
  return xMesh.map((row, i) =>
    row.map((xVal, j) =>
      amplitude * Math.sin(2 * Math.PI * frequency * (xVal / wavelength) + time)
    )
  );
}

// Ø¥Ù†Ø´Ø§Ø¡ Ø§Ù„Ø±Ø³Ù… Ø«Ù„Ø§Ø«ÙŠ Ø§Ù„Ø£Ø¨Ø¹Ø§Ø¯
function createPlot(amplitude, wavelength, frequency) {
  const z = wave(amplitude, wavelength, frequency, 0);

  const trace = {
    x: x,
    y: y,
    z: z,
    type: 'surface',
    colorscale: [[0, 'rgb(0, 105, 148)'], [1, 'rgb(0, 191, 255)']], // Ø£Ù„ÙˆØ§Ù† Ø§Ù„Ø¨Ø­Ø±
    showscale: false,
    surfacecolor: z
  };

  const layout = {
    title: '3D Ocean Wave Simulation',
    scene: {
      xaxis: { title: 'X-axis', gridcolor: 'rgba(200, 200, 200, 0.5)' },
      yaxis: { title: 'Y-axis', gridcolor: 'rgba(200, 200, 200, 0.5)' },
      zaxis: { title: 'Z-axis', gridcolor: 'rgba(200, 200, 200, 0.5)' },
      camera: {
        up: { x: 0, y: 0, z: 1 }, // Ø§ØªØ¬Ø§Ù‡ Ø§Ù„ÙƒØ§Ù…ÙŠØ±Ø§
        center: { x: 0, y: 0, z: 0 }, // Ù…Ø±ÙƒØ² Ø§Ù„ØªØ¯ÙˆÙŠØ±
        eye: { x: 1.25, y: 1.25, z: 1.25 } // Ù…ÙˆØ¶Ø¹ Ø§Ù„ÙƒØ§Ù…ÙŠØ±Ø§
      }
    },
    paper_bgcolor: 'rgba(135, 206, 235, 0.3)', // Ø®Ù„ÙÙŠØ© Ø²Ø±Ù‚Ø§Ø¡ Ø®ÙÙŠÙØ©
    plot_bgcolor: 'rgba(255, 255, 255, 1)', // Ø®Ù„ÙÙŠØ© Ø¨ÙŠØ¶Ø§Ø¡
    dragmode: 'orbit' // ØªÙ…ÙƒÙŠÙ† Ø§Ù„ØªØ¯ÙˆÙŠØ± Ø¨Ø§Ù„Ù…Ø§ÙˆØ³
  };

  Plotly.newPlot('plot', [trace], layout);
}

// Ø¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„ØµÙˆØª Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = audioContext.createOscillator();
let gainNode = audioContext.createGain();

oscillator.type = 'sine'; // Ù†ÙˆØ¹ Ø§Ù„ØµÙˆØª (Ù…ÙˆØ¬Ø© Ø¬ÙŠØ¨ÙŠØ©)
oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Ø§Ù„ØªØ±Ø¯Ø¯ Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠ
gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Ù…Ø³ØªÙˆÙ‰ Ø§Ù„ØµÙˆØª Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠ

oscillator.connect(gainNode);
gainNode.connect(audioContext.destination);

// ØªÙØ¹ÙŠÙ„ Ø§Ù„ØµÙˆØª Ø¹Ù†Ø¯ Ø§Ù„Ù†Ù‚Ø± ÙÙŠ Ø£ÙŠ Ù…ÙƒØ§Ù† ÙÙŠ Ø§Ù„ØµÙØ­Ø©
document.addEventListener('click', () => {
  audioContext.resume().then(() => {
    oscillator.start();
    console.log('Ø§Ù„ØµÙˆØª Ù…ÙØ¹Ù„ Ø§Ù„Ø¢Ù†');
  });
}, { once: true }); // { once: true } ÙŠØ¹Ù†ÙŠ Ø£Ù† Ø§Ù„Ø­Ø¯Ø« ÙŠØ¹Ù…Ù„ Ù…Ø±Ø© ÙˆØ§Ø­Ø¯Ø© ÙÙ‚Ø·

// ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø±Ø³Ù… ÙˆØ§Ù„ØµÙˆØª Ø¹Ù†Ø¯ ØªØºÙŠÙŠØ± Ø§Ù„Ù‚ÙŠÙ…
function updateWave(time) {
  const amplitude = parseFloat(document.getElementById('amplitude').value);
  const wavelength = parseFloat(document.getElementById('wavelength').value);
  const frequency = parseFloat(document.getElementById('frequency').value);

  const z = wave(amplitude, wavelength, frequency, time);

  Plotly.update('plot', {
    z: [z]
  });

  // ØªØ­Ø¯ÙŠØ« ØªØ±Ø¯Ø¯ Ø§Ù„ØµÙˆØª Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ ØªØ±Ø¯Ø¯ Ø§Ù„Ø£Ù…ÙˆØ§Ø¬
  oscillator.frequency.setValueAtTime(frequency * 100, audioContext.currentTime);

  // ØªØ­Ø¯ÙŠØ« Ù…Ø³ØªÙˆÙ‰ Ø§Ù„ØµÙˆØª Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø³Ø±Ø¹Ø© Ø§Ù„Ø£Ù…ÙˆØ§Ø¬ (Ø§Ù„ØªØ±Ø¯Ø¯)
  gainNode.gain.setValueAtTime(frequency / 5, audioContext.currentTime); // Ø²ÙŠØ§Ø¯Ø© Ø§Ù„ØµÙˆØª Ù…Ø¹ Ø²ÙŠØ§Ø¯Ø© Ø§Ù„ØªØ±Ø¯Ø¯
}

// Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ø£Ø­Ø¯Ø§Ø« Ù„Ø¹Ù†Ø§ØµØ± Ø§Ù„ØªØ­ÙƒÙ…
document.getElementById('amplitude').addEventListener('input', function () {
  document.getElementById('amplitude-value').textContent = this.value;
  updateWave(time);
});

document.getElementById('wavelength').addEventListener('input', function () {
  document.getElementById('wavelength-value').textContent = this.value;
  updateWave(time);
});

document.getElementById('frequency').addEventListener('input', function () {
  document.getElementById('frequency-value').textContent = this.value;
  updateWave(time);
});

// Ø±Ø³Ù… Ø§Ù„Ù…ÙˆØ¬Ø© Ø§Ù„Ø£ÙˆÙ„ÙŠØ©
createPlot(1, 1, 1);

// ØªØ­Ø±ÙŠÙƒ Ø§Ù„Ø£Ù…ÙˆØ§Ø¬ Ø¨Ø´ÙƒÙ„ ØªÙ„Ù‚Ø§Ø¦ÙŠ
let time = 0;
setInterval(() => {
  time += 0.1; // Ø²ÙŠØ§Ø¯Ø© Ø§Ù„ÙˆÙ‚Øª Ù„ØªØ­Ø±ÙŠÙƒ Ø§Ù„Ø£Ù…ÙˆØ§Ø¬
  updateWave(time);
}, 100); // ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø±Ø³Ù… ÙƒÙ„ 100 Ù…Ù„Ù„ÙŠ




document.addEventListener('DOMContentLoaded', function () {
  const controlsIcon = document.getElementById('controls-icon');
  const optionsIcon = document.getElementById('options-icon');
  const infoIcon = document.getElementById('info-icon');
  const controls = document.getElementById('controls');
  const optionsMessage = document.getElementById('options-message');
  const infoMessage = document.getElementById('info-message');
  const listenIcon = document.querySelector('.info-icons .fa-volume-up');

  // Ø¥Ø¸Ù‡Ø§Ø± Ø£Ùˆ Ø¥Ø®ÙØ§Ø¡ Ø¹Ù†Ø§ØµØ± Ø§Ù„ØªØ­ÙƒÙ…
  controlsIcon.addEventListener('click', function () {
    controls.style.display = controls.style.display === 'none' ? 'block' : 'none';
    optionsMessage.style.display = 'none';
    infoMessage.style.display = 'none';
  });

  // Ø¥Ø¸Ù‡Ø§Ø± Ø±Ø³Ø§Ù„Ø© Options
  optionsIcon.addEventListener('click', function () {
    optionsMessage.style.display = optionsMessage.style.display === 'none' ? 'block' : 'none';
    controls.style.display = 'none';
    infoMessage.style.display = 'none';
  });

  // Ø¥Ø¸Ù‡Ø§Ø± Ø±Ø³Ø§Ù„Ø© Info
  infoIcon.addEventListener('click', function () {
    infoMessage.style.display = infoMessage.style.display === 'none' ? 'block' : 'none';
    controls.style.display = 'none';
    optionsMessage.style.display = 'none';
  });

  // ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ù†Øµ Ø¥Ù„Ù‰ ÙƒÙ„Ø§Ù… Ø¹Ù†Ø¯ Ø§Ù„Ù†Ù‚Ø± Ø¹Ù„Ù‰ Ø£ÙŠÙ‚ÙˆÙ†Ø© Listen
  if (listenIcon) {
    listenIcon.addEventListener('click', function () {
      // Ø§Ø³ØªØ®Ø±Ø§Ø¬ Ø§Ù„Ù†Øµ Ù…Ù† Ø¹Ù†Ø§ØµØ± <p> ÙÙ‚Ø· Ø¯Ø§Ø®Ù„ info-message
      const paragraphs = document.querySelectorAll('#info-message p');
      let textToRead = '';
      paragraphs.forEach(p => {
        textToRead += p.innerText + ' '; // Ø¬Ù…Ø¹ Ø§Ù„Ù†ØµÙˆØµ Ù…Ø¹ Ù…Ø³Ø§ÙØ© Ø¨ÙŠÙ†Ù‡Ø§
      });
      speakText(textToRead.trim()); // Ø§Ø³ØªØ¯Ø¹Ø§Ø¡ Ø¯Ø§Ù„Ø© ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ù†Øµ Ø¥Ù„Ù‰ ÙƒÙ„Ø§Ù…
    });
  }

  // Ø¯Ø§Ù„Ø© ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ù†Øµ Ø¥Ù„Ù‰ ÙƒÙ„Ø§Ù…
  function speakText(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù„ØºØ© (Ø§Ù„Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠØ©)
      utterance.rate = 1; // Ø³Ø±Ø¹Ø© Ø§Ù„ÙƒÙ„Ø§Ù… (1 = Ø³Ø±Ø¹Ø© Ø¹Ø§Ø¯ÙŠØ©)
      utterance.pitch = 1; // Ø¯Ø±Ø¬Ø© Ø§Ù„ØµÙˆØª (1 = Ø¯Ø±Ø¬Ø© Ø¹Ø§Ø¯ÙŠØ©)
      window.speechSynthesis.speak(utterance); // Ø¨Ø¯Ø¡ Ø§Ù„ÙƒÙ„Ø§Ù…
    } else {
      alert('Text-to-Speech is not supported in your browser.'); // Ø¥Ø´Ø¹Ø§Ø± Ø¥Ø°Ø§ Ù„Ù… ÙŠÙƒÙ† Ø§Ù„Ù…Ø¯Ø¹ÙˆÙ…
    }
  }
});



















// ÙØªØ­ ØµÙØ­Ø© Ø§Ù„ÙƒØ§Ù…ÙŠØ±Ø§ Ø¹Ù†Ø¯ Ø§Ù„Ù†Ù‚Ø± Ø¹Ù„Ù‰ ÙƒÙ„Ù…Ø© "CUBE"
document.getElementById('cube').addEventListener('click', function() {
  window.open('camera.html', '_blank'); // Ø§ÙØªØ­ Ø§Ù„ØµÙØ­Ø© ÙÙŠ Ø¹Ù„Ø§Ù…Ø© ØªØ¨ÙˆÙŠØ¨ Ø¬Ø¯ÙŠØ¯Ø©
});

// ØªØ­Ø¯ÙŠØ« Ø§Ù„Ù‚ÙŠÙ… Ø¹Ù†Ø¯ ØªØºÙŠÙŠØ± Ø§Ù„Ù€ Sliders
document.getElementById('amplitude').addEventListener('input', function() {
  document.getElementById('amplitude-value').textContent = this.value;
});

document.getElementById('wavelength').addEventListener('input', function() {
  document.getElementById('wavelength-value').textContent = this.value;
});

document.getElementById('frequency').addEventListener('input', function() {
  document.getElementById('frequency-value').textContent = this.value;
});


// Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ø¥Ù„Ù‰ ØµÙØ­Ø© index.html Ø¹Ù†Ø¯ Ø§Ù„Ù†Ù‚Ø± Ø¹Ù„Ù‰ back-icon
document.getElementById('back-icon').addEventListener('click', function() {
  window.location.href = 'index.html'; // Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªÙˆØ¬ÙŠÙ‡ Ø¥Ù„Ù‰ index.html
});
