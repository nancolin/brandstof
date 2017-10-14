window.Brandstof = window.Brandstof || {};

document.addEventListener('DOMContentLoaded', function(event) {

  const formElements = {
    form: document.querySelector('#form'),
    title: document.querySelector('#formTitle'),
    firstName: document.querySelector('#formFN'),
    lastName: document.querySelector('#formLN'),
    submit: document.querySelector('#submit'),
  };

  const previewElements = {
    preview: document.querySelector('#preview'),
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
  previewElements.overlay.addEventListener('click', function(event) {

    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = function(inputEvent) {

      const reader = new FileReader();

      reader.addEventListener('load', function () {
        previewElements.overlay.style.backgroundImage = 'url()';
        previewElements.preview.style.backgroundImage = `url(${reader.result})`;
      });

      reader.readAsDataURL(inputEvent.target.files[0]);

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
