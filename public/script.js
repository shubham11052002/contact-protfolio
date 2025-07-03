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
  texts[index].classList.remove('active');
  index = (index + 1) % texts.length;
  texts[index].classList.add('active');
}

setInterval(showText, 1250);

const form = document.getElementById("contactForm");
const responseEl = document.getElementById("responseMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };

  try {
    const res = await fetch("https://contact-form-1-nbgy.onrender.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.text();

    if (res.ok) {
      responseEl.innerText = "✅ Message sent successfully!";
      responseEl.style.color = "green";
      form.reset();
    } else {
      responseEl.innerText = "❌ Failed to send message.";
      responseEl.style.color = "red";
    }

  } catch (error) {
    responseEl.innerText = "❌ Something went wrong.";
    responseEl.style.color = "red";
  }
});

const skills = [
  { name: "HTML/CSS", percent: 95 },
  { name: "JavaScript", percent: 83 },
  { name: "React.js", percent: 90 },
  { name: "Node.js", percent: 90 },
  { name: "Express.js", percent: 80 },
  { name: "MongoDB", percent: 85 },
  { name: "DSA", percent: 60 }
];

let currentSkill = 0;
const nameEl = document.getElementById("skill-name");
const progressEl = document.getElementById("skill-progress");

function updateSkill() {
  const skill = skills[currentSkill];
  nameEl.textContent = skill.name;
  progressEl.style.width = "0%";
  setTimeout(() => {
    progressEl.textContent = skill.percent + "%";
    progressEl.style.width = skill.percent + "%";
  }, 100);
  currentSkill = (currentSkill + 1) % skills.length;
}

updateSkill();
setInterval(updateSkill, 1400);

const nameText = "Shubham Sharma";
const typedEl = document.getElementById("typed-name");
let charIndex = 0;
let typing = true;

function typeDeleteLoop() {
  if (typing) {
    if (charIndex <= nameText.length) {
      typedEl.textContent = nameText.substring(0, charIndex);
      charIndex++;
      setTimeout(typeDeleteLoop, 100);
    } else {
      typing = false;
      setTimeout(typeDeleteLoop, 1000);
    }
  } else {
    if (charIndex >= 0) {
      typedEl.textContent = nameText.substring(0, charIndex);
      charIndex--;
      setTimeout(typeDeleteLoop, 80);
    } else {
      typing = true;
      setTimeout(typeDeleteLoop, 100);
    }
  }
}

typeDeleteLoop();
