// Obtener elementos del DOM
const button = document.getElementById('toggleButton');
const body = document.body;
const modeIcon = document.getElementById('modeIcon');
const fileInput = document.getElementById('fileInput');
const playPauseButton = document.getElementById('playPauseButton');
const playPauseIcon = document.getElementById('playPauseIcon');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const progressBar = document.getElementById('progressBar');
const currentSong = document.getElementById('currentSong');
const savedSongsList = document.getElementById('savedSongsList');

// Variables globales
let audio = new Audio();
let songs = [];
let currentSongIndex = 0;

// Verificar si hay preferencia de modo (día o noche) guardada en localStorage
if (localStorage.getItem('mode') === 'night') {
    body.classList.add('night-mode');
    button.classList.add('night-mode');
    modeIcon.classList.remove('fa-sun');
    modeIcon.classList.add('fa-moon');
    button.innerHTML = '<i id="modeIcon" class="fas fa-moon"></i> Cambiar a Día';
}

// Función para alternar entre modo día y noche
button.addEventListener('click', () => {
    if (body.classList.contains('night-mode')) {
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
        button.classList.remove('night-mode');
        button.innerHTML = '<i id="modeIcon" class="fas fa-sun"></i> Cambiar a Noche';
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
        localStorage.setItem('mode', 'day');
    } else {
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        button.classList.add('night-mode');
        button.innerHTML = '<i id="modeIcon" class="fas fa-moon"></i> Cambiar a Día';
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
        localStorage.setItem('mode', 'night');
    }
});

// Función para cargar y reproducir la canción seleccionada
fileInput.addEventListener('change', (event) => {
    const selectedSongs = Array.from(event.target.files);
    selectedSongs.forEach(song => {
        songs.push(song);
        const songItem = document.createElement('li');
        songItem.textContent = song.name;
        songItem.addEventListener('click', () => loadSong(songs.indexOf(song)));
        savedSongsList.appendChild(songItem);
    });

    // Si hay canciones, reproducir la primera
    if (songs.length > 0) {
        currentSongIndex = 0;
        loadSong(currentSongIndex);
    }
});

// Función para cargar una canción
function loadSong(index) {
    if (songs.length > 0) {
        audio.src = URL.createObjectURL(songs[index]);
        audio.play();
        currentSong.textContent = `Reproduciendo: ${songs[index].name}`;
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    }
}

// Función para alternar entre play/pause
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    } else {
        audio.pause();
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
});

// Función para avanzar a la siguiente canción
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

// Función para volver a la canción anterior
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

// Actualizar la barra de progreso mientras se reproduce la canción
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

// Hacer que la barra de progreso sea interactiva
progressBar.addEvent
