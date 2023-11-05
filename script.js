const contactForm = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');

const contactData = [];

function addContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const contact = {
        name,
        phone,
        email
    };

    contactData.push(contact);

    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>Name:</strong> ${name}<br><strong>Phone:</strong> ${phone}<br><strong>Email:</strong> ${email}`;
    listItem.addEventListener('click', () => selectContact(listItem));
    contactList.appendChild(listItem);

    contactForm.reset();
}

function viewContacts() {
    contactList.innerHTML = '';

    if (contactData.length === 0) {
        const noContacts = document.createElement('li');
        noContacts.innerText = 'No contacts found.';
        contactList.appendChild(noContacts);
        return;
    }

    contactData.forEach((contact, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Name:</strong> ${contact.name}<br><strong>Phone:</strong> ${contact.phone}<br><strong>Email:</strong> ${contact.email}`;
        listItem.addEventListener('click', () => selectContact(listItem));
        listItem.setAttribute('data-index', index);
        contactList.appendChild(listItem);
    });
}

let selectedContactIndex = -1;

function selectContact(contactItem) {
    contactList.querySelectorAll('li').forEach(item => item.classList.remove('selected'));
    contactItem.classList.add('selected');
    selectedContactIndex = parseInt(contactItem.getAttribute('data-index'));
}

function editContact() {
    if (selectedContactIndex === -1) {
        alert('Please select a contact to edit.');
        return;
    }

    const contact = contactData[selectedContactIndex];
    const name = prompt('Enter updated name:', contact.name);
    const phone = prompt('Enter updated phone number:', contact.phone);
    const email = prompt('Enter updated email address:', contact.email);

    contactData[selectedContactIndex] = {
        name,
        phone,
        email
    };
    viewContacts();
}

function deleteContact() {
    if (selectedContactIndex === -1) {
        alert('Please select a contact to delete.');
        return;
    }

    if (confirm('Are you sure you want to delete this contact?')) {
        contactData.splice(selectedContactIndex, 1);
        viewContacts();
        selectedContactIndex = -1;
    }
}

