const thumbnail = document.getElementsByClassName("project-thumbnail")[0];
const project_name = document.getElementsByClassName("project-name")[0];
const description = document.getElementsByClassName("project-description")[0];
const dev_status = document.getElementsByClassName("project-status")[0];
const progress = document.getElementById("TimeProgress");
const timeRemaining = document.getElementById("SlideTimeRemaining");

const slideDuration = 10_000;
let projects = [];
let currentSlide = 0;
let slideStartedAt = 0;
let animationFrameId;

function showSlide(index) {
    currentSlide = (index + projects.length) % projects.length;

    thumbnail.style.backgroundImage =
        `url("${projects[currentSlide]["thumbnail-url"]}")`;
    console.log(project_name, description);
    project_name.innerHTML = projects[currentSlide]["pretty-name"];
    description.innerHTML = projects[currentSlide]["description"];
    dev_status.textContent = projects[currentSlide]["development-status"];
    thumbnail.href = projects[currentSlide]["project-url"];


    slideStartedAt = performance.now();
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(updateTimer);
}

function updateTimer(now) {
    const remaining = Math.max(0, slideDuration - (now - slideStartedAt));

    progress.style.width = `${100 - (remaining / slideDuration) * 100}%`;
    timeRemaining.textContent = `${Math.ceil(remaining / 1000)}s`;

    if (remaining === 0) {
        showSlide(currentSlide + 1);
    } else {
        animationFrameId = requestAnimationFrame(updateTimer);
    }
}

document.getElementById("PreviousSlide").addEventListener("click", () => {
    showSlide(currentSlide - 1);
});

document.getElementById("NextSlide").addEventListener("click", () => {
    showSlide(currentSlide + 1);
});
async function FetchProjectIndex() {
    try {
    const response = await fetch('project-index.json');
    projects = await response.json();
    document.getElementById("placeloading_text").remove();
    showSlide(0);
    } catch (e) {
        console.error("Failed to load projects! > "+e)
        document.getElementById("placeloading_text").textContent = "Yeeks! Projects failed to load... :("
    }
}

FetchProjectIndex();