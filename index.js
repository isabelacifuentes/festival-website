/*** Dark Mode ***/
let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

themeButton.addEventListener("click", toggleDarkMode);


/*** Form Handling (Refactored for Objects) ***/

// addParticipant now receives a PERSON object
const addParticipant = (person) => {
  const newParticipant = document.createElement("p");
  newParticipant.textContent = `🎟️ ${person.name} from ${person.hometown} has RSVP'd.`;

  const participantList = document.querySelector(".rsvp-participants");
  if (participantList) participantList.appendChild(newParticipant);
};


/*** Form Validation (builds the person object) ***/

let rsvpButton = document.getElementById("rsvp-button");

const validateForm = (event) => {
  event.preventDefault();

  let containsErrors = false;
  let rsvpInputs = document.getElementById("rsvp-form").elements;

  // Build the PERSON object from the form (order: name, state, email)
  let person = {
    name: rsvpInputs[0].value.trim(),
    hometown: rsvpInputs[1].value.trim(),
    email: rsvpInputs[2].value.trim()
  };

  // Validate each input
  for (let i = 0; i < rsvpInputs.length; i++) {
    let input = rsvpInputs[i];

    if (input.type === "submit" || input.type === "button") continue;

    if (input.value.trim().length < 2) {
      containsErrors = true;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  }

  // If no errors → add participant and show modal
  if (containsErrors === false) {
    addParticipant(person);
    toggleModal(person);

    // Clear form
    for (let i = 0; i < rsvpInputs.length; i++) {
      let input = rsvpInputs[i];
      if (input.type !== "submit" && input.type !== "button") {
        input.value = "";
      }
    }
  }
};

// Connect the validation to the button
rsvpButton.addEventListener("click", validateForm);


/*** Scroll Animations ***/

// Select all revealable elements
let revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let current = revealableContainers[i];

    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = current.getBoundingClientRect().top;
    let revealDistance = parseInt(
      getComputedStyle(current).getPropertyValue("--reveal-distance"),
      10
    );

    if (topOfRevealableContainer < windowHeight - revealDistance) {
      current.classList.add("active");
    } else {
      current.classList.remove("active");
    }
  }
};

// Listen for scroll
window.addEventListener("scroll", reveal);

// Run once on page load
reveal();


/*** Success Modal + Image Animation ***/

// Animation variables and image reference
// Animation variables and image reference
let rotateFactor = 0; // will toggle between 0 and -10
let modalImage = document.getElementById("modal-image");

// Function to animate the image
const animateImage = () => {
  rotateFactor = (rotateFactor === 0) ? -10 : 0;
  if (modalImage) {
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
  }
};

const toggleModal = (person) => {
  let modal = document.getElementById("success-modal");
  let modalText = document.getElementById("modal-text");

  if (!modal) return;

  // Show modal
  modal.style.display = "flex";

  // Personalized message like the GIF
  if (modalText) {
    modalText.innerHTML = `
      <span class="modal-heading">Mission Status: ✅ ACCEPTED</span>
      Welcome, ${person.name}! You are now an official guest of ELEV8 Festival.
      Get ready for a night of beats, lights, and elevated vibes!
    `;
  }

  // Start image animation every 0.5s
  let intervalId = setInterval(animateImage, 500);

  // Hide modal after 5 seconds and stop animation
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);

    // Reset rotation
    rotateFactor = 0;
    if (modalImage) {
      modalImage.style.transform = "rotate(0deg)";
    }
  }, 5000);
};


