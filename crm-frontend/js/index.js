

const SERVER_URL = "http://localhost:3000"

async function serverAddClient(ClientObj) {

    let response = await fetch(SERVER_URL + '/api/clients', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ClientObj),
    })
    let data = await response.json()

    console.log(1111)
    return data
}
async function serverGetClient() {
    let response = await fetch(SERVER_URL + '/api/clients', {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    })

    let data = await response.json()

    return data
}

async function serverGetByIdClient(id) {
    let response = await (fetch(SERVER_URL + '/api/clients/' + id, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    }))
    let data = await response.json()

    return data
}

async function serverPatchClient(id, ClientObj) {
    let response = await (fetch(SERVER_URL + '/api/clients/' + id, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ClientObj),
    }))
    let data = await response.json()

    return data
}

async function serverDeleteClient(id) {
    let response = await fetch(SERVER_URL + '/api/clients/' + id, {
        method: "DELETE",
    })

    let data = await response.json()

    return data
}

let serverData = await serverGetClient()

let listClients = []


if (serverData !== null) {
    listClients = serverData
}



let ListOfContacts = []
let tooltipElem;

document.onmouseover = function (event) {
    let target = event.target;
    let tooltipHtml = target.dataset.tooltip;
    if (!tooltipHtml) return;
    tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip-content';
    tooltipElem.innerHTML = tooltipHtml;
    document.body.append(tooltipElem);

    let coords = target.getBoundingClientRect();

    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0;

    let top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';
};

document.onmouseout = function (e) {

    if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
    }

};

function createDeleteModal(id, tr) {
    const $modalContainer = document.querySelector('.modal__container');
    const $modalContent = document.querySelector('.modal-content');
    $modalContent.innerHTML = ''
    const $modalTitle = document.createElement('h2');
    const $modalText = document.createElement('p');
    const $modalBtnDelete = document.createElement('button');
    const $modalCancel = document.createElement('button');

    if ($modalContainer.classList.contains('modal-container-addClient')) {
        $modalContainer.classList.remove('modal-container-addClient')
        $modalContainer.classList.add('modal-container-deleteClient')
    }

    $modalTitle.classList.add('modal-title')
    $modalTitle.textContent = 'Удалить клиента'
    $modalText.textContent = 'Вы действительно хотите удалить данного клиента?'
    $modalText.classList.add('modal-delete-text')

    $modalBtnDelete.classList.add('modal__submit', 'btn-reset')
    $modalBtnDelete.setAttribute('id', "delete-contact")
    $modalBtnDelete.innerHTML = 'Удалить'

    $modalBtnDelete.addEventListener('click', async function () {
        await serverDeleteClient(id)
        tr.remove()
    })


    $modalCancel.classList.add('modal-cancel', 'btn-reset')
    $modalCancel.innerHTML = 'Отмена';
    $modalContent.append($modalTitle, $modalText, $modalBtnDelete, $modalCancel)
    // $modalContainer.append($modalContent, $modalBtnClose)
    // $modal.append($modalContainer)
    // body.append($modal)
}

function createModal() {
    let body = document.querySelector('body');
    const $modal = document.createElement('div');
    const $modalContainer = document.createElement('div');
    const $modalBtnClose = document.createElement('button');
    const $modalContent = document.createElement('div');

    $modal.classList.add('modal');
    $modalContainer.classList.add('modal__container', 'flex');
    $modalContainer.setAttribute('data-target', 'modal-first');
    $modalBtnClose.classList.add('modal-close', 'btn-reset');
    $modalBtnClose.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0.666641 15.3043L15.3333 3.17761e-05L16 0.695679L1.33331 15.9999L0.666641 15.3043Z"
                        fill="#B0B0B0" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0.666725 -2.96187e-06L15.3334 15.3042L14.6667 15.9999L5.76143e-05 0.695644L0.666725 -2.96187e-06Z"
                        fill="#B0B0B0" />
                </svg>`
    $modal.classList.add('modal');
    $modalContainer.classList.add('modal__container', 'flex');
    $modalContainer.setAttribute('data-target', 'modal-first');
    $modalBtnClose.classList.add('modal-close', 'btn-reset');
    $modalBtnClose.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0.666641 15.3043L15.3333 3.17761e-05L16 0.695679L1.33331 15.9999L0.666641 15.3043Z"
                                    fill="#B0B0B0" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0.666725 -2.96187e-06L15.3334 15.3042L14.6667 15.9999L5.76143e-05 0.695644L0.666725 -2.96187e-06Z"
                                    fill="#B0B0B0" />
                            </svg>`
    $modalContent.classList.add('modal-content')
    $modalContainer.append($modalBtnClose, $modalContent)
    $modal.append($modalContainer)
    body.append($modal)
}
createModal();

function createContact() {
    let contacts = document.querySelector('.contacts');
    const $select = document.createElement('select');
    const $optionPhone = document.createElement('option');
    const $optionOtherPhone = document.createElement('option');
    const $optionFacebook = document.createElement('option');
    const $optionVk = document.createElement('option');
    const $optionEmail = document.createElement('option');

    const $contactsInput = document.createElement('input');
    const $contactsBtn = document.createElement('button');
    const $contact = document.createElement('div');

    $select.setAttribute("name", "select");
    $select.setAttribute("id", "selected");
    $contactsBtn.setAttribute("type", "button");

    $optionOtherPhone.textContent = "Доп. телефон";
    $optionVk.textContent = "Vk";
    $optionFacebook.textContent = "Facebook";
    $optionPhone.textContent = "Телефон";
    $optionEmail.textContent = "Email";

    $optionOtherPhone.setAttribute('id', 'option-other');
    $optionVk.setAttribute('id', 'option-vk');
    $optionFacebook.setAttribute('id', 'option-facebook');
    $optionPhone.setAttribute('id', 'option-phone');
    $optionEmail.setAttribute('id', 'option-email');


    $select.classList.add('choices');
    $contact.classList.add('contact');
    $contact.id = 'contact';
    $contactsInput.classList.add("contact__input");
    $contactsBtn.classList.add("contact__btn");
    $contactsBtn.classList.add("btn-reset");
    const addConact = document.getElementById('addContact')
    $contactsBtn.addEventListener('click', function (eve) {
        eve.preventDefault();
        const indexOfContact = ListOfContacts.indexOf($contact)
        $contact.remove();
        if (ListOfContacts.length <= 10) {
            addConact.style.display = 'block';
        }
        else {
            addConact.style.display = 'none'
        }
        ListOfContacts.splice(indexOfContact, 1)
        console.log(indexOfContact)
    })

    $contactsInput.setAttribute("type", "text");
    $contactsInput.setAttribute('placeholder', 'Введите данные контакта')
    $contactsBtn.setAttribute('type', 'button')
    // $contactsInput.addEventListener('input', function (evv) {
    //     if (evv.target.value.length > 0) {
    //         $contactsBtn.style.display = 'block'
    //     }
    //     else {
    //         $contactsBtn.style.display = 'none'
    //     }
    // });
    $contactsBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0" /></svg>'
    $select.append($optionPhone, $optionOtherPhone, $optionVk, $optionEmail, $optionFacebook)
    $contact.append($select, $contactsInput, $contactsBtn)
    contacts.append($contact)
    multiDefault();
    ListOfContacts.push($contact)
}

function ModalAddContent() {
    const $modalContent = document.querySelector('.modal-content');
    const $modalContainer = document.querySelector('.modal__container');
    $modalContent.innerHTML = ''
    const $modalTitle = document.createElement('h2');
    const $modalForm = document.createElement('form');
    const $modalInputName = document.createElement('input');
    const $modalInputSurname = document.createElement('input');
    const $modalInputLastname = document.createElement('input');
    const $modalInputNameSpan = document.createElement('span');
    const $modalInputSurNameSpan = document.createElement('span');
    const $modalInputLastNameSpan = document.createElement('span');

    const $modalName = document.createElement('div')
    const $modalSurName = document.createElement('div')
    const $modalLastName = document.createElement('div')

    const $modalContacts = document.createElement('div');
    const $modalAddContacts = document.createElement('button');
    const $modalSubmit = document.createElement('button');

    const $modalCancel = document.createElement('button');

    $modalTitle.classList.add('modal-title')
    $modalTitle.textContent = 'Новый клиент'
    $modalForm.setAttribute('action', '#')
    if ($modalContainer.classList.contains('modal-container-deleteClient')) {
        $modalContainer.classList.add('modal-container-addClient')
        $modalContainer.classList.remove('modal-container-deleteClient')
    }
    $modalInputName.setAttribute('type', 'text')
    $modalInputSurname.setAttribute('type', 'text')
    $modalInputLastname.setAttribute('type', 'text')

    $modalInputName.setAttribute('id', 'contactsInputName')
    $modalInputSurname.setAttribute('id', 'contactsInputSurName')
    $modalInputLastname.setAttribute('id', 'contactsInputLastName')

    $modalInputNameSpan.textContent = 'Имя*'
    $modalInputLastNameSpan.textContent = 'Отчество'
    $modalInputSurNameSpan.textContent = 'Фамилия*'
    $modalInputName.setAttribute('required', '')
    $modalInputSurname.setAttribute('required', '')
    $modalInputLastname.setAttribute('required', '')

    $modalName.classList.add('inputBox')
    $modalSurName.classList.add('inputBox')
    $modalLastName.classList.add('inputBox')

    $modalContacts.classList.add('contacts');
    $modalContacts.setAttribute('id', 'contacts');
    $modalAddContacts.classList.add('btn-reset', 'add__contact')
    $modalAddContacts.innerHTML = 'Добавить контакт'
    $modalAddContacts.setAttribute('id', 'addContact')
    $modalAddContacts.setAttribute('type', 'button')

    $modalSubmit.classList.add('modal__submit', 'btn-reset')
    $modalSubmit.setAttribute('id', "add-form");
    $modalSubmit.setAttribute('type', "button");
    $modalSubmit.innerHTML = 'Сохранить'
    $modalContainer.classList.add('modal-container-addClient');
    $modalCancel.classList.add('modal-cancel', 'btn-reset')
    $modalCancel.innerHTML = 'Отмена';
    $modalContacts.append($modalAddContacts)
    $modalName.append($modalInputName, $modalInputNameSpan)
    $modalSurName.append($modalInputSurname, $modalInputSurNameSpan)
    $modalLastName.append($modalInputLastname, $modalInputLastNameSpan)
    $modalForm.append($modalName, $modalSurName, $modalLastName, $modalContacts, $modalSubmit)
    $modalContent.append($modalTitle, $modalForm, $modalCancel)



    document.querySelector(".modal__submit").addEventListener('click', async (event) => {
        event.preventDefault();
        const contactsInForm = []
        ListOfContacts.forEach(function (elem) {
            const elemOption = elem.querySelector('.is-selected');
            const elemInput = elem.querySelector('.contact__input')
            if (elemInput.value === '') {
                elemInput.value = 'Не указано'
            }
            const contactToServer = {
                type: `${elemOption.textContent}`,
                value: `${elemInput.value}`,

            }
            console.log(contactToServer)
            contactsInForm.push(contactToServer)
        })
        console.log(contactsInForm)
        let newClientObj = {
            name: document.getElementById('contactsInputName').value,
            surname: document.getElementById('contactsInputSurName').value,
            lastName: document.getElementById('contactsInputLastName').value,
            // contacts: [
            //     {
            //         type: `${document.getElementById('is-selected'.textContent)}`
            //     }
            // ]
            contacts: contactsInForm
        }
        if (document.getElementById('contactsInputSurName').value.length >= 2 && document.getElementById('contactsInputName').value.length >= 2) {
            let serverDataObj = await serverAddClient(newClientObj);
            let serverData = await serverGetClient()
            let listClients = []
            // listClients.push(serverDataObj);
            console.log(listClients)
            if (serverData !== null) {
                listClients = serverData
            }
            event.preventDefault();
            render(listClients);
        }
    })


    const addConact = document.getElementById('addContact')
    addConact.addEventListener('click', function () {
        if (ListOfContacts.length < 10) {
            createContact();
            console.log(ListOfContacts)
        }
        if (ListOfContacts.length >= 10) {
            addConact.style.display = 'none'
        }

    })

}
ModalAddContent()

document.getElementById('addClient').addEventListener('click', ModalAddContent);


function modalChangeContent(Client, tr) {
    const $modalContent = document.querySelector('.modal-content');
    const $modalContainer = document.querySelector('.modal__container');
    $modalContent.innerHTML = ''
    const $modalTitle = document.createElement('h2');
    const $modalId = document.createElement('h3');
    const $modalForm = document.createElement('form');
    const $modalInputName = document.createElement('input');
    const $modalInputSurname = document.createElement('input');
    const $modalInputLastname = document.createElement('input');
    const $modalInputNameSpan = document.createElement('span');
    const $modalInputSurNameSpan = document.createElement('span');
    const $modalInputLastNameSpan = document.createElement('span');

    const $modalName = document.createElement('div')
    const $modalSurName = document.createElement('div')
    const $modalLastName = document.createElement('div')

    const $modalContacts = document.createElement('div');
    const $modalAddContacts = document.createElement('button');
    const $modalSubmit = document.createElement('button');

    const $modalCancel = document.createElement('button');
    $modalId.classList = 'modal-id'
    $modalId.id = Client.id
    $modalId.textContent = 'ID:' + Client.id
    $modalTitle.classList.add('modal-title')
    $modalTitle.textContent = 'Изменить данные'
    $modalForm.setAttribute('action', '#')
    if ($modalContainer.classList.contains('modal-container-deleteClient')) {
        $modalContainer.classList.add('modal-container-ChangeClient')
        $modalContainer.classList.remove('modal-container-deleteClient')
    } else if ($modalContainer.classList.contains('modal-container-addClient')) {
        $modalContainer.classList.add('modal-container-ChangeClient')
        $modalContainer.classList.remove('modal-container-addClient')
    }
    $modalInputName.setAttribute('type', 'text')
    $modalInputSurname.setAttribute('type', 'text')
    $modalInputLastname.setAttribute('type', 'text')

    $modalInputName.setAttribute('id', 'contactsInputName')
    $modalInputSurname.setAttribute('id', 'contactsInputSurName')
    $modalInputLastname.setAttribute('id', 'contactsInputLastName')

    $modalInputName.value = Client.name;
    $modalInputSurname.value = Client.surname;
    if (Client.lastName != '') {
        $modalInputLastname.value = Client.lastName;
    }
    let ListOfContactsServer = []
    ListOfContactsServer = Client.contacts


    $modalInputNameSpan.textContent = 'Имя*'
    $modalInputLastNameSpan.textContent = 'Отчество'
    $modalInputSurNameSpan.textContent = 'Фамилия*'
    $modalInputName.setAttribute('required', '')
    $modalInputSurname.setAttribute('required', '')
    // $modalInputLastname.setAttribute('required', '')

    $modalName.classList.add('inputBox')
    $modalSurName.classList.add('inputBox')
    $modalLastName.classList.add('inputBox')

    $modalContacts.classList.add('contacts');
    $modalContacts.setAttribute('id', 'contacts');
    $modalAddContacts.classList.add('btn-reset', 'add__contact')
    $modalAddContacts.innerHTML = 'Добавить контакт'
    $modalAddContacts.setAttribute('id', 'addContact')
    $modalAddContacts.setAttribute('type', 'button')

    $modalSubmit.classList.add('modal__submit', 'btn-reset')
    $modalSubmit.setAttribute('id', "add-form");
    $modalSubmit.setAttribute('type', "button");
    $modalSubmit.innerHTML = 'Сохранить'
    $modalContainer.classList.add('modal-container-addClient');
    $modalCancel.classList.add('modal-cancel', 'btn-reset')
    $modalCancel.innerHTML = 'Удалить клиента';
    $modalCancel.addEventListener('click', async function () {
        await serverDeleteClient(Client.id)
        tr.remove()
    })
    $modalContacts.append($modalAddContacts)
    $modalName.append($modalInputName, $modalInputNameSpan)
    $modalSurName.append($modalInputSurname, $modalInputSurNameSpan)
    $modalLastName.append($modalInputLastname, $modalInputLastNameSpan)
    $modalForm.append($modalName, $modalSurName, $modalLastName, $modalContacts, $modalSubmit)
    $modalContent.append($modalTitle, $modalId, $modalForm, $modalCancel)

    function createChangeContact(InputValue, typeOfContact) {
        let contacts = document.querySelector('.contacts');
        const $select = document.createElement('select');
        const $optionPhone = document.createElement('option');
        const $optionOtherPhone = document.createElement('option');
        const $optionFacebook = document.createElement('option');
        const $optionVk = document.createElement('option');
        const $optionEmail = document.createElement('option');

        const $contactsInput = document.createElement('input');
        const $contactsBtn = document.createElement('button');
        const $contact = document.createElement('div');

        $select.setAttribute("name", "select");
        $select.setAttribute("id", "selected");
        $contactsBtn.setAttribute("type", "button");

        $optionOtherPhone.textContent = "Доп. телефон";
        $optionVk.textContent = "Vk";
        $optionFacebook.textContent = "Facebook";
        $optionPhone.textContent = "Телефон";
        $optionEmail.textContent = "Email";

        $optionOtherPhone.setAttribute('id', 'option-other');
        $optionVk.setAttribute('id', 'option-vk');
        $optionFacebook.setAttribute('id', 'option-facebook');
        $optionPhone.setAttribute('id', 'option-phone');
        $optionEmail.setAttribute('id', 'option-email');

        if (InputValue != 'Не указано') {
            $contactsInput.value = InputValue
            $contactsBtn.style.display = 'block'
        }

        $select.classList.add('choices');
        $contact.classList.add('contact');
        $contact.id = 'contact';
        $contactsInput.classList.add("contact__input");
        $contactsBtn.classList.add("contact__btn");
        $contactsBtn.classList.add("btn-reset");
        $contactsBtn.addEventListener('click', function (eve) {
            eve.preventDefault();
            $contact.remove();
            const indexOfContact = ListOfContacts.indexOf($contact)
            $contact.remove();
            if (ListOfContacts.length <= 10) {
                addConact.style.display = 'block';
            }
            else {
                addConact.style.display = 'none'
            }
            ListOfContacts.splice(indexOfContact, 1)
        })

        $contactsInput.setAttribute("type", "text");
        $contactsInput.setAttribute('placeholder', 'Введите данные контакта')
        $contactsBtn.setAttribute('type', 'button')
        $contactsInput.addEventListener('input', function (evv) {
            if (evv.target.value.length > 0) {
                $contactsBtn.style.display = 'block'
            }
            else {
                $contactsBtn.style.display = 'none'
            }
        });
        $contactsBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0" /></svg>'
        if (typeOfContact == 'Телефон') {
            $select.append($optionPhone, $optionOtherPhone, $optionVk, $optionEmail, $optionFacebook)
        } else if (typeOfContact == 'Доп. телефон') {
            $select.append($optionOtherPhone, $optionPhone, $optionVk, $optionEmail, $optionFacebook)
        } else if (typeOfContact == 'Vk') {
            $select.append($optionVk, $optionPhone, $optionOtherPhone, $optionEmail, $optionFacebook)
        } else if (typeOfContact == 'Email') {
            $select.append($optionEmail, $optionPhone, $optionOtherPhone, $optionVk, $optionFacebook)
        } else if (typeOfContact == 'Facebook') {
            $select.append($optionFacebook, $optionPhone, $optionOtherPhone, $optionVk, $optionEmail)
        } else {
            $optionPhone, $optionOtherPhone, $optionVk, $optionEmail, $optionFacebook
        }
        $contact.append($select, $contactsInput, $contactsBtn)
        contacts.append($contact)
        multiDefault();
        ListOfContacts.push($contact)
    }
    ListOfContactsServer.forEach(function (e) {
        console.log(e)
        createChangeContact(e.value, e.type);

    })
    const addConact = document.getElementById('addContact')
    console.log(ListOfContacts)
    addConact.addEventListener('click', function () {
        if (ListOfContacts.length < 10) {
            createChangeContact('', 'Телефон');
            console.log(ListOfContacts)
        }
        if (ListOfContacts.length >= 10) {
            addConact.style.display = 'none'
        }

    })

    document.querySelector(".modal__submit").addEventListener('click', async (event) => {
        event.preventDefault();
        const contactsInForm = []
        const IdToServ = document.querySelector('.modal-id').id
        ListOfContacts.forEach(function (elem) {
            const elemOption = elem.querySelector('.is-selected');
            const elemInput = elem.querySelector('.contact__input')
            if (elemInput.value === '') {
                elemInput.value = 'Не указано'
            }
            const contactToServer = {
                type: `${elemOption.textContent}`,
                value: `${elemInput.value}`,

            }
            console.log(contactToServer)
            contactsInForm.push(contactToServer)
        })
        console.log(contactsInForm)
        let newClientObj = {
            name: document.getElementById('contactsInputName').value,
            surname: document.getElementById('contactsInputSurName').value,
            lastName: document.getElementById('contactsInputLastName').value,
            // contacts: [
            //     {
            //         type: `${document.getElementById('is-selected'.textContent)}`
            //     }
            // ]
            contacts: contactsInForm
        }
        if (document.getElementById('contactsInputSurName').value.length >= 2 && document.getElementById('contactsInputName').value.length >= 2) {
            let serverDataObj = await serverPatchClient(IdToServ, newClientObj);
            let serverData = await serverGetClient()
            let listClients = []
            // listClients.push(serverDataObj);
            console.log(listClients)
            if (serverData !== null) {
                listClients = serverData
            }
            event.preventDefault();
            render(listClients);
        }
    })
}

function $getNewClientTR(ClientObj) {
    const $tr = document.createElement('tr');
    const $tdID = document.createElement('td');
    const $tdFIO = document.createElement('td');
    const $tdMade = document.createElement('td');
    const $tdLastChange = document.createElement('td');
    const $tdContacts = document.createElement('td');
    const $btnChange = document.createElement('button');
    const $tdAction = document.createElement('td');
    const $btnDelete = document.createElement('button');
    $btnDelete.classList.add('btn-danger', 'btn-reset');
    $btnChange.classList.add('btn-change', 'btn-reset')
    $btnDelete.textContent = `Удалить`;
    $btnDelete.setAttribute('data-path', 'modal-first')
    $btnChange.setAttribute('data-path', 'modal-first')
    $btnChange.textContent = `Изменить`;
    $tdID.textContent = ClientObj.id;


    const $dateCreatedAt = new Date(ClientObj.createdAt)
    let $dateCreatedAtTimeHours = $dateCreatedAt.getHours()
    if ($dateCreatedAtTimeHours < 10) $dateCreatedAtTimeHours = '0' + $dateCreatedAtTimeHours

    let $dateCreatedAtTimeMinutes = $dateCreatedAt.getMinutes()
    if ($dateCreatedAtTimeMinutes < 10) $dateCreatedAtTimeMinutes = '0' + $dateCreatedAtTimeMinutes
    const $dateCreatedTime = document.createElement('span')
    $dateCreatedTime.innerHTML = `${$dateCreatedAtTimeHours}:${$dateCreatedAtTimeMinutes}`
    $tdMade.textContent = `${$dateCreatedAt.toLocaleDateString()} `;
    $tdMade.append($dateCreatedTime)


    const $dateupdatedAt = new Date(ClientObj.updatedAt);
    let $dateupdatedAtTimeHours = $dateupdatedAt.getHours()
    if ($dateupdatedAtTimeHours < 10) $dateupdatedAtTimeHours = '0' + $dateupdatedAtTimeHours
    let $dateUpdatedAtTimeMinutes = $dateupdatedAt.getMinutes()
    const $dateupdatedTime = document.createElement('span')
    if ($dateUpdatedAtTimeMinutes < 10) $dateUpdatedAtTimeMinutes = '0' + $dateUpdatedAtTimeMinutes
    $dateupdatedTime.innerHTML = `${$dateupdatedAtTimeHours}:${$dateUpdatedAtTimeMinutes}`
    $tdLastChange.textContent = `${$dateupdatedAt.toLocaleDateString()}  `;
    $tdLastChange.append($dateupdatedTime)


    ClientObj.contacts.forEach(function (contact) {
        if (contact.type == 'Телефон') {
            const $contactBtnPhone = document.createElement('Button');
            $contactBtnPhone.id = contact.value;
            $contactBtnPhone.setAttribute('data-tooltip', `${contact.type}: ${contact.value}`)
            $contactBtnPhone.classList.add('btn-reset', 'tooltip', 'tooltip-phone')
            $tdContacts.append($contactBtnPhone)
        } else if (contact.type == 'Доп. телефон') {
            const $contactBtnOther = document.createElement('Button');
            $contactBtnOther.id = contact.value;
            $contactBtnOther.setAttribute('data-tooltip', `${contact.type}: ${contact.value}`)
            $contactBtnOther.classList.add('btn-reset', 'tooltip', 'tooltip-other')
            $tdContacts.append($contactBtnOther)
        } else if (contact.type == 'Vk') {
            const $contactBtnVk = document.createElement('Button');
            $contactBtnVk.id = contact.value;
            $contactBtnVk.setAttribute('data-tooltip', `${contact.type}: ${contact.value}`)
            $contactBtnVk.classList.add('btn-reset', 'tooltip', 'tooltip-vk')
            $tdContacts.append($contactBtnVk)
        } else if (contact.type == 'Email') {
            const $contactBtnEmail = document.createElement('Button');
            $contactBtnEmail.id = contact.value;
            $contactBtnEmail.setAttribute('data-tooltip', `${contact.type}: ${contact.value}`)
            $contactBtnEmail.classList.add('btn-reset', 'tooltip', 'tooltip-email')
            $tdContacts.append($contactBtnEmail)
        } else if (contact.type == 'Facebook') {
            const $contactBtnFacebook = document.createElement('Button');
            $contactBtnFacebook.id = contact.value;
            $contactBtnFacebook.setAttribute('data-tooltip', `${contact.type}: ${contact.value}`)
            $contactBtnFacebook.classList.add('btn-reset', 'tooltip', 'tooltip-facebook')
            $tdContacts.append($contactBtnFacebook)
        }
    })

    $tdFIO.textContent = `${ClientObj.surname} ${ClientObj.name} ${ClientObj.lastName}`;

    $btnDelete.addEventListener('click', async function () {
        remoteDeleteModal(ClientObj.id, $tr);
    });
    $btnChange.addEventListener('click', async function () {
        remoteChangeModal(ClientObj.id, $tr)
    })
    $tdAction.append($btnChange, $btnDelete);
    $tr.append($tdID, $tdFIO, $tdMade, $tdLastChange, $tdContacts, $tdAction);
    return $tr
}

let listClientsTr = []
function render(arr) {
    let copyArr = [...arr]
    const $ClientTable = document.getElementById('ClientTable')
    $ClientTable.innerHTML = ''
    for (const ClientObj of copyArr) {
        const $newTr = $getNewClientTR(ClientObj)
        $ClientTable.append($newTr)
        listClientsTr.push($newTr)
    }
    const preloader = document.getElementById('loader');
    console.log(111)
    if (preloader) {
        preloader.outerHTML = '';
    }
    document.getElementById('searchbar').value = '';
}



class Modal {
    constructor(options) {
        let defaultOptions = {
            isOpen: () => { },
            isClose: () => { },
        }
        this.options = Object.assign(defaultOptions, options);
        this.modal = document.querySelector('.modal');
        this.speed = false;
        this.animation = false;
        this.isOpen = false;
        this.modalContainer = false;
        this.modalFormContacts = false;
        this.previousActiveElement = false;
        this.fixBlocks = document.querySelectorAll('.fix-block');
        this.focusElements = [
            'a[href]',
            'input',
            'select',
            'textarea',
            'button',
            '[tabindex]'
        ];
        this.events();
    }

    events() {
        if (this.modal) {
            document.addEventListener('click', function (e) {
                const clickedElement = e.target.closest('[data-path]');
                if (clickedElement) {
                    let target = clickedElement.dataset.path;
                    let animation = clickedElement.dataset.animation;
                    let speed = clickedElement.dataset.speed;
                    this.animation = animation ? animation : 'fade';
                    this.speed = speed ? parseInt(speed) : 170;


                    this.modalContainer = document.querySelector(`[data-target="${target}"]`);
                    this.open();
                    return;
                }

                if (e.target.closest('.modal-close')) {
                    this.close();
                    return;
                }
                if (e.target.closest('.modal__submit')) {
                    console.log(15545)
                    this.close();
                    return;
                }
                if (e.target.closest('.modal-cancel')) {
                    this.close();
                    return;
                }
            }.bind(this));
            document.getElementById('add-form').addEventListener('click', function () {
                console.log(777)
                ListOfContacts = []
                this.close();
                return;
            }.bind(this));

            window.addEventListener('keydown', function (e) {
                if (e.keyCode == 27) {
                    if (this.isOpen) {
                        this.close();
                    }
                }


                if (e.keyCode == 9 && this.isOpen) {
                    this.focusCatch(e);
                    return;
                }

            }.bind(this));

            this.modal.addEventListener('click', function (e) {
                if (!e.target.classList.contains('modal__container') && !e.target.closest('.modal__container') && !e.target.closest('.contact__btn') && !e.target.classList.contains('contact__btn') && this.isOpen) {
                    this.close();
                    return;
                }
            }.bind(this));
        }
    }

    open() {
        this.previousActiveElement = document.activeElement;

        this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
        this.modal.classList.add('is-open');
        this.disableScroll();

        this.modalContainer.classList.add('modal-open');
        this.modalContainer.classList.add(this.animation);

        setTimeout(() => {
            this.options.isOpen(this);
            this.modalContainer.classList.add('animate-open');
            this.isOpen = true;
            this.focusTrap();
        }, this.speed);
    }

    close() {
        if (this.modalContainer) {
            this.modalContainer.classList.remove('animate-open');
            this.modalContainer.classList.remove(this.animation);
            this.modal.classList.remove('is-open');
            this.modalContainer.classList.remove('modal-open');
            if (this.modalContainer.classList.contains('modal-container-addClient') || this.modalContainer.classList.contains('modal-container-ChangeClient')) {
                this.modalInputName = document.getElementById('contactsInputName');
                this.modalInputSurName = document.getElementById('contactsInputSurName');
                this.modalInputLastName = document.getElementById('contactsInputLastName');
                this.modalFormContacts = document.getElementById('contacts');
                this.modalInputLastName.value = '';
                this.modalInputName.value = '';
                this.modalInputSurName.value = '';
                console.log(ListOfContacts)
            }
            ListOfContacts = [];
            this.enableScroll();
            this.options.isClose(this);
            this.isOpen = false;
            this.focusTrap();
        }
    }

    focusCatch(e) {
        const focusable = this.modalContainer.querySelectorAll(this.focusElements);
        const focusArray = Array.prototype.slice.call(focusable);
        const focusedIndex = focusArray.indexOf(document.activeElement);

        if (e.shiftKey && focusedIndex === 0) {
            focusArray[focusArray.length - 1].focus();
            e.preventDefault();
        }

        if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
            focusArray[0].focus();
            e.preventDefault();
        }
    }

    focusTrap() {
        const focusable = this.modalContainer.querySelectorAll(this.focusElements);
        if (this.isOpen) {
            focusable[0].focus();
        } else {
            this.previousActiveElement.focus();
        }
    }

    disableScroll() {
        let pagePosition = window.scrollY;
        this.lockPadding();
        document.body.classList.add('disable-scroll');
        document.body.dataset.position = pagePosition;
        document.body.style.top = -pagePosition + 'px';
    }

    enableScroll() {
        let pagePosition = parseInt(document.body.dataset.position, 10);
        this.unlockPadding();
        document.body.style.top = 'auto';
        document.body.classList.remove('disable-scroll');
        window.scroll({ top: pagePosition, left: 0 });
        document.body.removeAttribute('data-position');
    }

    lockPadding() {
        let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
        this.fixBlocks.forEach((el) => {
            el.style.paddingRight = paddingOffset;
        });
        document.body.style.paddingRight = paddingOffset;
    }

    unlockPadding() {
        this.fixBlocks.forEach((el) => {
            el.style.paddingRight = '0px';
        });
        document.body.style.paddingRight = '0px';
    }
}

const modal = new Modal({
    isOpen: (modal) => {
    },
    isClose: () => {
    },
});

document.getElementById('add-form').addEventListener('click', function (e) {
    console.log(11115)
    const mod = new Modal({
        isClose: () => {

        }
    })
});
function multiDefault() {
    const elements = document.querySelectorAll('select');
    elements.forEach(el => {
        const choices = new Choices(el, {
            searchEnabled: false,
            allowHTML: true,
            itemSelectText: '',
            // shouldSort: false,
        });
    })

}

multiDefault();
render(listClients);

document.getElementById('searchbar').oninput = async function () {
    let timerId = setTimeout(function () {
        let val = document.getElementById('searchbar').value.trim();
        if (val != '') {
            listClientsTr.forEach(function (elem) {
                if (elem.innerText.search(val) == -1) {
                    elem.classList.add('hideForSearch')
                }
                else {
                    elem.classList.remove('hideForSearch')
                }
            })
        }
        else {
            listClientsTr.forEach(function (elem) {
                elem.classList.remove('hideForSearch')
            })
        }
    }, 300)
}

const table = document.getElementById('sortable');
const headers = table.querySelectorAll('th');
const tableBody = table.querySelector('tbody');
const rows = tableBody.querySelectorAll('tr');

// Направление сортировки
const directions = Array.from(headers).map(function (header) {
    return '';
});

// Преобразовать содержимое данной ячейки в заданном столбце
const transform = function (index, content) {
    // Получить тип данных столбца
    const type = headers[index].getAttribute('data-type');
    switch (type) {
        case 'number':
            return parseFloat(content);
        case 'string':
        default:
            return content;
    }
};

const sortColumn = function (index) {
    // Получить текущее направление
    const direction = directions[index] || 'asc';

    // Фактор по направлению
    const multiplier = (direction === 'asc') ? 1 : -1;

    const newRows = Array.from(rows);

    newRows.sort(function (rowA, rowB) {
        const cellA = rowA.querySelectorAll('td')[index].innerHTML;
        const cellB = rowB.querySelectorAll('td')[index].innerHTML;

        const a = transform(index, cellA);
        const b = transform(index, cellB);

        switch (true) {
            case a > b: return 1 * multiplier;
            case a < b: return -1 * multiplier;
            case a === b: return 0;
        }
    });

    // Удалить старые строки
    [].forEach.call(rows, function (row) {
        tableBody.removeChild(row);
    });

    // Поменять направление
    directions[index] = direction === 'asc' ? 'desc' : 'asc';

    // Добавить новую строку
    newRows.forEach(function (newRow) {
        tableBody.appendChild(newRow);
    });
};

[].forEach.call(headers, function (header, index) {
    header.addEventListener('click', function () {
        sortColumn(index);
    });
});

function remoteDeleteModal(id, tr) {
    createDeleteModal(id, tr);
}

async function remoteChangeModal(id, tr) {
    let client = {};
    let serverDataClient = await serverGetByIdClient(id);
    if (serverData !== null) {
        client = serverDataClient
    }
    modalChangeContent(client, tr)
}