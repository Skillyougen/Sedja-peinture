const panel = document.getElementById('advicePanel');
const overlay = document.getElementById('overlay');
const sendBtn = document.getElementById('sendAdvice');
const input = document.getElementById('adviceInput');
const messages = document.getElementById('adviceMessages');
const closeBtn = document.getElementById('closeAdvice');

// ouvrir depuis navbar
document.querySelector('[href="#conseils"]').addEventListener('click', e => {
  e.preventDefault();
  panel.classList.add('active');
  overlay.classList.add('active');
});

// fermer
closeBtn.onclick = overlay.onclick = () => {
  panel.classList.remove('active');
  overlay.classList.remove('active');
};

// envoyer conseil
sendBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;

  const div = document.createElement('div');
  div.className = 'advice-message';
  div.innerHTML = `<p>${text}</p><span class="tag">Peintre</span>`;

  messages.appendChild(div);
  input.value = '';
  messages.scrollTop = messages.scrollHeight;
};
