document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mainNav = document.querySelector('[data-main-nav]');

  // Mobile navigation toggle for smaller screens.
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  const donorForm = document.querySelector('[data-donor-form]');
  if (donorForm) {
    const fields = {
      name: donorForm.querySelector('[name="name"]'),
      email: donorForm.querySelector('[name="email"]'),
      phone: donorForm.querySelector('[name="phone"]'),
      blood_group: donorForm.querySelector('[name="blood_group"]'),
      city: donorForm.querySelector('[name="city"]')
    };

    const errorBoxes = {
      name: donorForm.querySelector('[data-error-for="name"]'),
      email: donorForm.querySelector('[data-error-for="email"]'),
      phone: donorForm.querySelector('[data-error-for="phone"]'),
      blood_group: donorForm.querySelector('[data-error-for="blood_group"]'),
      city: donorForm.querySelector('[data-error-for="city"]')
    };

    const clearErrors = () => {
      Object.keys(errorBoxes).forEach((key) => {
        if (errorBoxes[key]) {
          errorBoxes[key].textContent = '';
        }
      });
    };

    const showError = (key, message) => {
      if (errorBoxes[key]) {
        errorBoxes[key].textContent = message;
      }
    };

    donorForm.addEventListener('submit', (event) => {
      clearErrors();

      const name = (fields.name?.value || '').trim();
      const email = (fields.email?.value || '').trim();
      const phone = (fields.phone?.value || '').trim();
      const bloodGroup = (fields.blood_group?.value || '').trim();
      const city = (fields.city?.value || '').trim();

      let valid = true;

      if (name.length < 3) {
        showError('name', 'Enter the full name of the donor.');
        valid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email', 'Enter a valid email address.');
        valid = false;
      }

      if (!/^[0-9]{10,15}$/.test(phone)) {
        showError('phone', 'Enter 10 to 15 digits only.');
        valid = false;
      }

      if (!bloodGroup) {
        showError('blood_group', 'Select a blood group.');
        valid = false;
      }

      if (city.length < 2) {
        showError('city', 'Enter the donor city.');
        valid = false;
      }

      if (!valid) {
        event.preventDefault();
      }
    });
  }

  // Confirm destructive operations from the admin dashboard.
  document.querySelectorAll('[data-delete-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      const ok = window.confirm('Are you sure you want to delete this donor record?');
      if (!ok) {
        event.preventDefault();
      }
    });
  });
});
