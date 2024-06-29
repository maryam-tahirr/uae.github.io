let docTitle = document.title;
window.addEventListener("blur",()=> {
    document.title= "Come back!";
});

window.addEventListener("focus",() => {
    document.title= docTitle;
});


var images = ["image11.avif", "image12.avif", "image13.avif", "image7.jpg", "image4.jpg", "image5.jpg", "image6.jpg", "image9.jpg", "image10.jpg"];
var currentIndex = 0;
var backgroundImage = document.getElementById('backgroundImage');
var navBar = document.querySelector('nav');


var touristCounter = document.getElementById('Tourist');
var page2 = document.getElementById('page2');
var counting = false;

function changeBackground() {
    backgroundImage.src = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeBackground, 1000);

window.addEventListener('scroll', function () {
    if (window.scrollY > 600) {
        navBar.classList.add('show');
    } else {
        navBar.classList.remove('show');
    }

    // Check if .page2 is in the viewport
    var page2 = document.querySelector('.page2');
    var rect = page2.getBoundingClientRect();
    var isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    // If .page2 is in the viewport, increase the font size of #Tourist to 14
    if (isVisible) {
        document.getElementById('Tourist').style.fontSize = '8em';
    }
    if (window.innerWidth <= 699) {
        document.getElementById('Tourist').style.fontSize = '4em';
        if (window.scrollY > 100) {
            navBar.classList.add('show');
        } else {
            navBar.classList.remove('show');
        }
    }    
});




// Function to check if an element is in the viewport
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Function to handle the Intersection Observer callback
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}

// Set up the Intersection Observer for each element
document.querySelectorAll('.slide-in').forEach(slideInDiv => {
    var observer = new IntersectionObserver(handleIntersection, {
        root: null, // Use the viewport as the root
        threshold: 0.1 // Trigger when 50% of the element is visible
    });

    observer.observe(slideInDiv);

    // Optionally, handle the case when the element is already in view on page load
    if (isElementInViewport(slideInDiv)) {
        slideInDiv.classList.add('active');
        observer.unobserve(slideInDiv);
    }
});





//to initialize the counter
function startCounting(target, element) {
var start = 0;
var duration = 1500; // 1.5 seconds
var startTime;

function updateCounter(time) {
    if (!startTime) startTime = time;
    var progress = (time - startTime) / duration;
    var currentCount = Math.floor(progress * target);

    // Limit the count to the target value
    currentCount = Math.min(currentCount, target);

    element.textContent = currentCount;

    if (progress < 1) {
        requestAnimationFrame(updateCounter);
    }
}

requestAnimationFrame(updateCounter);
}

document.addEventListener("DOMContentLoaded", function () {
var targetCount = 14;
var touristCounter = document.getElementById('Tourist');

window.addEventListener('scroll', function () {
    var page2 = document.querySelector('.page2');
    var rect = page2.getBoundingClientRect();
    var isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible && !counting) {
        counting = true;
        startCounting(targetCount, touristCounter);
    }
});
});



//Importing API For Wheather Casting
document.addEventListener('DOMContentLoaded', function () {
const apiKey = 'MXGRWEWL9AH3YX33VDP4ED9DN'; // Replace with your Visual Crossing Weather API key
const cities = [
    'Sharjah',
    'Dubai',
    'Abu Dhabi',
    'Ras Al Khaimah',
    'Al Ain',
    'Ajman',
    'Umm Al Quwain'
];

// Function to fetch weather data for a given city
function fetchWeatherData(city) {
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=us&key=${apiKey}&contentType=json`;

    return fetch(apiUrl)
        .then(response => response.json())
        .catch(error => {
            console.error(`Error fetching weather data for ${city}:`, error);
            return null;
        });
}

// Function to display weather information
function displayWeather(weatherData) {
    const weatherInfoContainer = document.getElementById('weather-info');

    if (weatherData && weatherData.days && weatherData.days.length > 0) {
        const currentWeather = weatherData.days[0].conditions;
        const temperature = weatherData.days[0].temp;

        const weatherHtml = `
            <p><strong>Current Weather:</strong> ${currentWeather}</p>
            <p><strong>Temperature:</strong> ${temperature} °C</p>
        `;

        const cityDiv = document.createElement('div');
        cityDiv.classList.add('city');
        cityDiv.innerHTML = `<h2>${weatherData.resolvedAddress}</h2>${weatherHtml}`;
        weatherInfoContainer.appendChild(cityDiv);
    } else {
        const cityDiv = document.createElement('div');
        cityDiv.classList.add('city');
        cityDiv.innerHTML = `<h2>${weatherData.resolvedAddress}</h2><p>Weather data not available</p>`;
        weatherInfoContainer.appendChild(cityDiv);
    }
}

// Loop through cities and fetch/display weather data
cities.forEach(city => {
    fetchWeatherData(city).then(data => {
        displayWeather(data);
    });
});
});



document.addEventListener('DOMContentLoaded', function () {
    const openButton = document.getElementById('openButton');
    const overlay = document.getElementById('overlay');
    const closeButton = document.getElementById('closeButton');
    const close2 = document.getElementById('submit');

    openButton.addEventListener('click', function () {
        overlay.style.display = 'flex';
    });

    closeButton.addEventListener('click', function () {
        overlay.style.display = 'none';
    });

    close2.addEventListener('click', function(){
        overlay.style.display= 'none';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('menu');
    const menuoverlay = document.getElementById('menuoverlay');

    menu.addEventListener('click', function (event) {
        event.stopPropagation();
        menuoverlay.style.display = 'flex';
        sessionStorage.setItem('menuClicked', 'true');
    });

    document.addEventListener('click', function (event) {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickInsideOverlay = menuoverlay.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideOverlay) {
            menuoverlay.style.display = 'none';
            sessionStorage.removeItem('menuClicked');
        }
    });

    window.addEventListener('beforeunload', function () {
        sessionStorage.removeItem('menuClicked');
    });

    menuoverlay.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Check sessionStorage to hide overlay if menu was not clicked
    if (!sessionStorage.getItem('menuClicked')) {
        menuoverlay.style.display = 'none';
    }
});


//Img Crousel
// Global variables for image index and total images
let Indexcurrent= 0;
const totalImages = 5;

// Function to show a specific image
// Function to show a specific image
function showImage(index) {
    const images = document.querySelectorAll('.carousel-img');
    const text = document.querySelectorAll('.carousel-text');

    // Check for valid index
    if (index < 0) {
        Indexcurrent = totalImages - 1;
    } else if (index >= totalImages) {
        Indexcurrent = 0;
    } else {
        Indexcurrent = index;
    }

    // Hide all images
    images.forEach(img => img.style.opacity = 0);
    text.forEach(img => img.style.opacity = 0);

    // Show the current image
    images[Indexcurrent].style.opacity = 1;
    text[Indexcurrent].style.opacity = 1;
}


// Function to change the image with an offset
function changeImage(indexOffset) {
    showImage(Indexcurrent+ indexOffset);
}

// Initial setup: show the first image
showImage(currentIndex);

// Automatic image change every 3 seconds
setInterval(() => {
    changeImage(1);
}, 3000);




const detailsElements = document.querySelectorAll('details');

detailsElements.forEach(details => {
    details.addEventListener('toggle', () => {
        if (details.open) {
            detailsElements.forEach(otherDetails => {
                if (otherDetails !== details && otherDetails.open) {
                    otherDetails.open = false;
                }
            });
        }
    });
});

