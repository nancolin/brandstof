window.Brandstof = window.Brandstof || {};

document.addEventListener('DOMContentLoaded', function(event) {

  const formElements = {
    form: document.querySelector('#form'),
    title: document.querySelector('#formTitle'),
    firstName: document.querySelector('#formFirstName'),
    lastName: document.querySelector('#formLastName'),
    submit: document.querySelector('#submit'),
  };

  const previewElements = {
    preview: document.querySelector('#preview'),
    image: document.querySelector('#previewImage'),
    overlay: document.querySelector('#previewOverlay'),
    title: document.querySelector('#previewTitle'),
    name: document.querySelector('#previewName'),
  };

  function bindTitleToPreview(event) {
    previewElements.title.textContent = formElements.title.value || formElements.title.placeholder;
  }

  function bindNameToPreview(event) {
    const name = `${formElements.firstName.value} ${formElements.lastName.value}`;
    previewElements.name.textContent = name !== ' ' ? name : 'Your Name';
  }

  // Bind form values to preview
  formElements.title.addEventListener('input', bindTitleToPreview);
  formElements.firstName.addEventListener('input', bindNameToPreview);
  formElements.lastName.addEventListener('input', bindNameToPreview);

  // Upload image to preview
  previewElements.preview.addEventListener('click', function(event) {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = function(inputEvent) {
      const url = URL.createObjectURL(inputEvent.target.files[0]);
      previewElements.overlay.style.backgroundImage = 'none';
      previewElements.image.style.backgroundImage = `url('${url}')`;
    };
    input.click();
  });

  // Handle form submit
  formElements.form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (formElements.title.value &&
        formElements.firstName.value &&
        formElements.lastName.value) {
      alert('Success!');
    } else {
      alert('Please fill in all fields...');
    }
  });

});
