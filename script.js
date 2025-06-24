window.addEventListener('DOMContentLoaded', () => {
  const progressBars = document.querySelectorAll('.progress');

  progressBars.forEach(bar => {
    const value = bar.getAttribute('data-skill');
    bar.style.width = `${value}%`;
  });
});

const texts = document.querySelectorAll('.text');
let index = 0;

function showText() {
  // Remove active class from current text
  texts[index].classList.remove('active');

  // Move to the next index
  index = (index + 1) % texts.length;

  // Add active class to the next text
  texts[index].classList.add('active');
}

// Show the next text every 1.5 seconds
setInterval(showText, 1250);

const form = document.getElementById("contactForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  const res = await fetch("https://contact-form-1-nbgy.onrender.com/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  const data = await res.text();
  document.getElementById("responseMsg").innerText = data;
});
