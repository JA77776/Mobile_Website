document.addEventListener('DOMContentLoaded', () => {
    // Set the current time
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('time').textContent = `${hours}:${minutes}`;
        document.getElementById('statusBar').textContent = `${hours}:${minutes}`;
    }
    setInterval(updateTime, 1000);
    updateTime();
  

    const apiKey = 'af5298ae4f5234d0fd2339d03c71c60a'; 




// Fetch weather information
async function fetchWeather() {
    const city = 'Cape Town'; 
    const country = 'ZA'; 

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            const temperature = `${data.main.temp}°C`;
            const location = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = temperature;
            document.getElementById('location').textContent = location;
        } else {
            document.getElementById('temperature').textContent = '--°';
            document.getElementById('location').textContent = 'Error fetching data';
        }
    } catch (error) {
        document.getElementById('temperature').textContent = '--°';
        document.getElementById('location').textContent = 'Error fetching data';
        console.error('Error fetching weather data:', error);
    }
}

fetchWeather();




// Slide to unlock
let isSliding = false;
const lockScreen = document.getElementById('lockScreen');
const slideToUnlock = document.getElementById('slideToUnlock');
slideToUnlock.addEventListener('mousedown', () => {
    isSliding = true;
});

document.addEventListener('mouseup', () => {
    if (isSliding) {
        lockScreen.style.top = '-100%';
        isSliding = false;
    }
});

document.addEventListener('mousemove', (e) => {
    if (isSliding) {
        const offsetY = e.clientY - slideToUnlock.getBoundingClientRect().top;
        if (offsetY < -50) {
            lockScreen.style.top = '-100%';
            isSliding = false;
        }
    }
});
    


// Toggle notifications panel
const statusBar = document.getElementById('statusBar');
const notifications = document.getElementById('notifications');
statusBar.addEventListener('click', () => {
    notifications.style.display = notifications.style.display === 'block' ? 'none' : 'block';
});



// Task Manager
const taskManager = document.getElementById('taskManager');
const apps = document.querySelectorAll('.app');
let currentIndex = 0;
    
taskManager.addEventListener('click', () => {
        
    apps[currentIndex].classList.remove('active');


    currentIndex = (currentIndex + 1) % apps.length;

    
    apps[currentIndex].classList.add('active');
       
    });
});



// Switch Between apps

switchButtons.forEach(button => {
    button.addEventListener('click', switchApp);
});

const apps = document.querySelectorAll('.app');
let currentIndex = 0;

    function switchApp() {
    
    apps[currentIndex].classList.remove('active');

    
    currentIndex = (currentIndex + 1) % apps.length;

    
    apps[currentIndex].classList.add('active');
}




function openApp(appId) {
    document.getElementById(appId).classList.add('active');
}
function closeApp(appId) {
    document.getElementById(appId).classList.remove('active');
}
function goHome() {
    const appScreens = document.querySelectorAll('.app-screen');
    appScreens.forEach(screen => {
        screen.classList.remove('active');
    });
}
function goBack() {
    const activeScreens = document.querySelectorAll('.app-screen.active');
    if (activeScreens.length > 0) {
        activeScreens[activeScreens.length - 1].classList.remove('active');
    }
}
function openSettings() {
    document.getElementById('settingsPanel').classList.add('active');
}
function closeSettings() {
    document.getElementById('settingsPanel').classList.remove('active');
}

function goToLockScreen() {
    const lockScreen = document.getElementById('lockScreen');
    lockScreen.style.top = '0';
}

function changeTheme() {
    const theme = document.getElementById('themeSelect').value;
    if (theme === 'dark') {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = '#fff';
    } else {
        document.body.style.backgroundColor = '#f0f0f0';
        document.body.style.color = '#000';
    }
}

function changeAppIcon(appId, inputId) {

    const fileInput = document.getElementById(inputId);
    const appElement = document.getElementById(appId);

    if (fileInput.files && fileInput.files[0]) {

        const reader = new FileReader();

        reader.onload = function(e) {
            appElement.style.backgroundImage = `url(${e.target.result})`;
            appElement.style.backgroundSize = 'cover';
        };
        
        reader.readAsDataURL(fileInput.files[0]);
    }
};


