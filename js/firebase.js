// ─── FIREBASE CONFIG ───
// Replace these values with your actual Firebase project config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── CONTACT FORM ───
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const successMsg = document.getElementById('successMsg');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      companyName: formData.get('companyName'),
      email: formData.get('email'),
      region: formData.get('region'),
      service: formData.get('service'),
      message: formData.get('message'),
      submittedAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'inquiries'), data);
      contactForm.style.display = 'none';
      successMsg.style.display = 'block';
    } catch (err) {
      console.error('Error submitting form:', err);
      formStatus.textContent = 'Something went wrong. Please email us directly.';
      formStatus.style.color = '#ef4444';
      formStatus.style.display = 'block';
      submitBtn.textContent = 'Submit Inquiry';
      submitBtn.disabled = false;
    }
  });
}

// ─── NEWSLETTER (Firestore) ───
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    try {
      await addDoc(collection(db, 'newsletter'), { email, subscribedAt: serverTimestamp() });
      newsletterForm.querySelector('input').value = '';
      newsletterForm.querySelector('button').textContent = '✓';
    } catch (err) {
      console.error('Newsletter error:', err);
    }
  });
}
