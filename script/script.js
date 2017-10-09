window.Brandstof = window.Brandstof || {};

/*************/
/* Dropdowns */
/*************/

// Toggle the dropdown which the user clicked on
function toggleDropdown(event) {
  const content = event.currentTarget.parentNode.querySelector('.dropdown-content');

  if (content.hasAttribute('opened')) {
    content.removeAttribute('opened');
    Brandstof.openedDropdown = null;
  } else {
    content.setAttribute('opened', '');
    Brandstof.openedDropdown = content;
  }
}

document.addEventListener('DOMContentLoaded', function(event) {
  // Add click listeners to every dropdown
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', toggleDropdown);
  });

  // Close the dropdown if the user clicks outside of it
  window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown .dropdown-toggle') && Brandstof.openedDropdown) {
      Brandstof.openedDropdown.removeAttribute('opened');
      Brandstof.openedDropdown = null;
    }
  });
});

/**********/
/* Footer */
/**********/

// Resize bottom padding on `<main>` to accommodate footer
function resizeFooterPadding() {
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const footerHeight = parseFloat(getComputedStyle(footer).getPropertyValue('height'));
  main.style.paddingBottom = `${footerHeight + 32}px`;
}

document.addEventListener('DOMContentLoaded', function(event) {

  // Add listener to resize padding as page resizes
  window.addEventListener('resize', resizeFooterPadding);

  // Initial call to set padding for footer
  resizeFooterPadding();

});
