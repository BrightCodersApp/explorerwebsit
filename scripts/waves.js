// scripts/waves.js

document.addEventListener('DOMContentLoaded', () => {
    const plotDiv = document.getElementById('plot');
    const amplitudeSlider = document.getElementById('amplitude');
    const wavelengthSlider = document.getElementById('wavelength');
    const frequencySlider = document.getElementById('frequency');

    const amplitudeValue = document.getElementById('amplitude-value');
    const wavelengthValue = document.getElementById('wavelength-value');
    const frequencyValue = document.getElementById('frequency-value');

    // Update displayed slider values
    amplitudeValue.textContent = amplitudeSlider.value;
    wavelengthValue.textContent = wavelengthSlider.value;
    frequencyValue.textContent = frequencySlider.value;

    // Function to generate wave data
    function generateWave(amplitude, wavelength, frequency) {
        const x = [];
        const y = [];
        const z = [];

        const numPoints = 100;
        for (let i = 0; i < numPoints; i++) {
            const xi = i * (10 / numPoints);
            const yi = i * (10 / numPoints);
            const zi = amplitude * Math.sin((2 * Math.PI / wavelength) * (xi + yi) - frequency);
            x.push(xi);
            y.push(yi);
            z.push(zi);
        }

        return { x, y, z };
    }

    // Initial wave parameters
    let amplitude = parseFloat(amplitudeSlider.value);
    let wavelength = parseFloat(wavelengthSlider.value);
    let frequency = parseFloat(frequencySlider.value);

    // Function to plot the wave
    function plotWave() {
        const waveData = generateWave(amplitude, wavelength, frequency);

        const trace = {
            x: waveData.x,
            y: waveData.y,
            z: waveData.z,
            mode: 'lines',
            type: 'scatter3d',
            line: {
                color: 'blue',
                width: 4
            }
        };

        const data = [trace];

        const layout = {
            title: '3D Ocean Wave Simulation',
            autosize: true,
            scene: {
                xaxis: { title: 'X Axis' },
                yaxis: { title: 'Y Axis' },
                zaxis: { title: 'Wave Height (Z Axis)' }
            }
        };

        Plotly.newPlot(plotDiv, data, layout);
    }

    // Initial plot
    plotWave();

    // Event listeners for sliders
    amplitudeSlider.addEventListener('input', () => {
        amplitude = parseFloat(amplitudeSlider.value);
        amplitudeValue.textContent = amplitude;
        plotWave();
    });

    wavelengthSlider.addEventListener('input', () => {
        wavelength = parseFloat(wavelengthSlider.value);
        wavelengthValue.textContent = wavelength;
        plotWave();
    });

    frequencySlider.addEventListener('input', () => {
        frequency = parseFloat(frequencySlider.value);
        frequencyValue.textContent = frequency;
        plotWave();
    }
    );
});
