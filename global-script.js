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

/*****************/
/* Firebase Auth */
/*****************/

window.addEventListener('load', function(event) {

  Brandstof.auth = new class {

    constructor() {
      firebase.auth().onAuthStateChanged(this._handleUser.bind(this));

      this._signInBtn = document.querySelector('#signInBtn');
      this._signOutBtn = document.querySelector('#signOutBtn');
    }

    _handleUser(user) {
      if (user) {
        // User is signed in.
        this.user = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
          providerData: user.providerData,
        };
        this._signInBtn.hidden = true;
        this._signOutBtn.hidden = false;
      } else {
        // User is signed out.
        this.user = null;
        this._signInBtn.hidden = false;
        this._signOutBtn.hidden = true;
      }
    }

    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        console.log(`Signed in using ${result.additionalUserInfo.profile.email}.`);
      }).catch((error) => {
        console.error(`[${error.code}] ${error.message}`);
      });
    }

    signOut() {
      firebase.auth().signOut().then(() => {
        console.log('Signed out successfully.');
      }).catch((error) => {
        console.error(`[${error.code}] ${error.message}`);
      });
    }

  };

});
