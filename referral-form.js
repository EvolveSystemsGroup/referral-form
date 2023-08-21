// Dynamic Referral Form
// Copyright (C) 2023 Evolvepreneur Pty Ltd
// 
// This program is free software: you can redistribute it and/or modify it
// under the terms of the Lesser GNU General Public License as published by the
// Free Software Foundation, either version 3 of the License, or (at your
// option) any later version. 
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the Lesser GNU General Public License
// for more details. 
//
// You should have received a copy of the Lesser GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.
//
// This program updates the Email Preview when the visitor enters text, and
// prepares a percentage-encoded mailto: URL for the visitor to click. It will
// open the email in their email client, ready to send.

function referralEmailInit(person, email, referralTypes){
  // XXX: Variables are global so other functions can reference them.
  // Set static values for Person to refer
  window.referPerson = {value: person};
  window.referPersonEmail = {value: email};

  // Initialise Referral Type Select
  window.referText = document.getElementById('refer-type-text');
  window.referralSelect = document.getElementById('referral-types');
  [...referralTypes].forEach(obj => {
    referralSelect.options[referralSelect.options.length] = new Option(obj.name, obj.value);
  });
  window.referralSelect = document.getElementById('referral-types');

  window.emailText = document.getElementById('preview-text');

  window.interestedPerson = document.getElementById('interested-person');
  window.interestedPersonEmail = document.getElementById('interested-person-email');

  window.yourName = document.getElementById('your-name');
  window.recipientDesc = document.getElementById('recipient-description');

  // Initialise Copy to Clipboard Button
  let copyBtn = document.getElementById('copy-mail');
  copyBtn.addEventListener('click', copyMail)

  // Initialise email preview and mailto button on page load
  initPreview();

  // Update email preview and mailto button when user updates fields
  referralSelect.addEventListener('change', initPreview);
  emailText.addEventListener('keyup', initPreview);
  interestedPerson.addEventListener('keyup', initPreview);
  interestedPersonEmail.addEventListener('keyup', initPreview);
  yourName.addEventListener('keyup', initPreview);
  recipientDesc.addEventListener('keyup', initPreview);
}

function updateDetails(className, field){
  document.querySelectorAll(className).forEach(elem => {
    elem.innerText = field.value;
  });
}

function updateReferTypeText(){
  [...referralTypes].forEach(obj => {
    if(obj.value === referralSelect.value){
      referText.innerText = obj.text;
    }
  });
}

function updatePreview(){
  updateDetails('.email-preview', emailText);
  updateDetails('.refer-who', referPerson);
  updateDetails('.referred-email', referPersonEmail);
  updateDetails('.interested-who', interestedPerson);
  updateDetails('.interested-email', interestedPersonEmail);
  updateDetails('.about-recipient', recipientDesc);
  updateDetails('.sig', yourName);
  updateReferTypeText();
}

function convertHTMLToPercentEncoded(){
  // Convert HTML Email body to a percentage-encoded Email Body
  let emailBody = document.getElementById('email-body');
  let convEmailBody = '';
  const regex = /\n\n/gi;
  const percentBreak = '%0D%0A%0D%0A';

  for (let item of emailBody.children) {
    if (item.innerText !== ''){
      convEmailBody += item.innerText.replace(regex, percentBreak) + percentBreak; // convert \n linebreaks to percentage-encoded linebreaks and add a percentage-encoded linebreak after every element
    }
  }

  convEmailBody = convEmailBody.slice(0, -6); // Remove linebreak for last element.
  return convEmailBody;
}

function updateEmailBtn(){
  let emailBtn = document.getElementById('refer-mail');
  let convEmailBody = convertHTMLToPercentEncoded();

  emailBtn.href = `mailto:${interestedPersonEmail.value}?cc=${referPersonEmail.value}&subject=${interestedPerson.value}, I'd like you to meet ${referPerson.value}&body=${convEmailBody}`
}

function initPreview(){
  updatePreview();
  updateEmailBtn();
}

function copyMail(){
  let emailBody = document.getElementById('email-body');
  navigator.clipboard.writeText(emailBody.innerText);
}
