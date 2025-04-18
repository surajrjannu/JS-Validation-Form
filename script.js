// Password Fields
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const togglePasswordIcon = document.getElementById('togglePasswordIcon');
const passwordStrengthBar = document.getElementById('password-strength-bar');
const passwordStrengthText = document.getElementById('password-strength-text');
const passwordError = document.getElementById('password-error');

// Confirm Password Fields
const confirmPasswordInput = document.getElementById('confirm-password');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const toggleConfirmPasswordIcon = document.getElementById('toggleConfirmPasswordIcon');
const confirmPasswordError = document.getElementById('confirm-password-error');

// Other Inputs
const fullNameInput = document.getElementById('full-name');
const fullNameError = document.getElementById('full-name-error');

const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phone-error');

const termsCheckbox = document.getElementById('terms');


// password toggle

togglePasswordBtn.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  togglePasswordIcon.classList.toggle('fa-eye');
  togglePasswordIcon.classList.toggle('fa-eye-slash');
});

toggleConfirmPasswordBtn.addEventListener('click', () => {
  const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  confirmPasswordInput.setAttribute('type', type);
  toggleConfirmPasswordIcon.classList.toggle('fa-eye');
  toggleConfirmPasswordIcon.classList.toggle('fa-eye-slash');
});


// Password strenth checking

function evaluatePasswordStrength(password) {
  let score = 0;
  if (!password) return score;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[\W_]/.test(password)) score += 1;

  return score;
}

function updatePasswordStrength(password) {
  const score = evaluatePasswordStrength(password);

  let width = 0;
  let color = 'transparent';
  let text = '';

  switch (score) {
    case 1:
      width = 20;
      color = '#dc2626';
      text = 'Very Weak';
      break;
    case 2:
      width = 40;
      color = '#f97316';
      text = 'Weak';
      break;
    case 3:
      width = 60;
      color = '#eab308';
      text = 'Moderate';
      break;
    case 4:
      width = 80;
      color = '#22c55e';
      text = 'Strong';
      break;
    case 5:
      width = 100;
      color = '#16a34a';
      text = 'Very Strong';
      break;
  }

  passwordStrengthBar.style.width = width + '%';
  passwordStrengthBar.style.backgroundColor = color;
  passwordStrengthText.textContent = text;
}


// Real-time Field Reset on Input

passwordInput.addEventListener('input', (e) => {
  updatePasswordStrength(e.target.value);
  passwordError.textContent = '';
});

fullNameInput.addEventListener('input', () => fullNameError.textContent = '');
emailInput.addEventListener('input', () => emailError.textContent = '');
phoneInput.addEventListener('input', () => phoneError.textContent = '');
confirmPasswordInput.addEventListener('input', () => confirmPasswordError.textContent = '');


// Form Validation & Submission

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  // Full Name Validation
  const fullName = fullNameInput.value.trim();
  if (!fullName) {
    fullNameError.textContent = 'Please enter your full name';
    valid = false;
  } else if (fullName.length < 5) {
    fullNameError.textContent = 'Name must be at least 5 characters';
    valid = false;
  }

  // Email Validation
  const email = emailInput.value.trim();
  if (!email) {
    emailError.textContent = 'Please enter your email';
    valid = false;
  } else if (!email.includes('@')) {
    emailError.textContent = 'Email must contain @ character';
    valid = false;
  } else if (!email.endsWith('@gmail.com')) {
    emailError.textContent = 'Email must end with @gmail.com';
    valid = false;
  }

  // Phone Validation
  const phone = phoneInput.value.trim();
  const phoneRegex = /^\d{10}$/;
  if (!phone) {
    phoneError.textContent = 'Please enter your phone number';
    valid = false;
  } else if (!phoneRegex.test(phone)) {
    phoneError.textContent = 'Phone number must be a 10-digit number';
    valid = false;
  } else if (phone === '123456789' || phone === '1234567890') {
    phoneError.textContent = 'Phone number cannot be 123456789 or 1234567890';
    valid = false;
  }

  // Password Validation
  const password = passwordInput.value;
  const nameInPassword = password.toLowerCase().includes(fullName.toLowerCase());
  if (!password) {
    passwordError.textContent = 'Please enter a password';
    valid = false;
  } else if (password.toLowerCase() === 'password') {
    passwordError.textContent = 'Password cannot be "password"';
    valid = false;
  } else if (nameInPassword) {
    passwordError.textContent = 'Password cannot contain your name';
    valid = false;
  } else if (password.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters';
    valid = false;
  }

  // Confirm Password Validation
  const confirmPassword = confirmPasswordInput.value;
  if (!confirmPassword) {
    confirmPasswordError.textContent = 'Please confirm your password';
    valid = false;
  } else if (confirmPassword !== password) {
    confirmPasswordError.textContent = 'Passwords do not match';
    valid = false;
  }

  // T&C box
  if (!termsCheckbox.checked) {
    showToast('You must accept the terms and conditions', false);
    valid = false;
  }

  // Final Submission
  if (valid) {
    showToast('Form submitted successfully!', true);
    this.reset();
    passwordStrengthBar.style.width = '0%';
    passwordStrengthBar.style.backgroundColor = 'transparent';
    passwordStrengthText.textContent = '';
  }
});


// Toast Notification Handler

function showToast(message, isSuccess = false) {
  const toastEl = document.getElementById('toastMessage');
  const toastBody = document.getElementById('toastBody');
  const toastHeader = toastEl.querySelector('.toast-header');

  toastBody.textContent = message;

  if (isSuccess) {
    toastEl.classList.remove('bg-danger');
    toastEl.classList.add('bg-success');
    toastHeader.classList.remove('bg-danger');
    toastHeader.classList.add('bg-success');
    toastHeader.querySelector('.me-auto').textContent = 'Success';
  } else {
    toastEl.classList.remove('bg-success');
    toastEl.classList.add('bg-danger');
    toastHeader.classList.remove('bg-success');
    toastHeader.classList.add('bg-danger');
    toastHeader.querySelector('.me-auto').textContent = 'Form Error';
  }

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}
