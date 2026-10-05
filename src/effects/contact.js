// Contact form: no backend. Builds a mailto: link from the form (Q6 decision).
import { owner } from '../data/content.js';

export function initContactForm(container) {
  const form = container.querySelector('[data-contact-form]');
  if (!form) return;
  const status = form.querySelector('[data-contact-status]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!owner.email) {
      status.textContent = 'Email address coming soon. Set owner.email in content.js.';
      return;
    }
    if (!form.checkValidity()) {
      status.textContent = 'Please fill in your name, a valid email, and a message.';
      form.querySelector(':invalid')?.focus();
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent(`Hello from ${data.get('name')} (via your portfolio)`);
    const body = encodeURIComponent(`${data.get('message')}\n\nReply to: ${data.get('email')}`);
    window.location.href = `mailto:${owner.email}?subject=${subject}&body=${body}`;
    status.textContent = 'Opening your email app. Thanks for stopping by!';
  });
}
