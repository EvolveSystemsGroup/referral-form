# Dynamic Referral Form

This repository contains a script for creating a dynamic referral form. The user needs to fill out a few fields, and the referral email will be automatically generated live. When the user clicks "Send Email", it will open their email client with the content of the referral email. They then only need to click "Send".

See it live here: https://evolvecall.com/page/referral

## Dependencies

* The `referral-form.js` script only depends on browsers with support for ES6+ Javascript. Modern browsers like Firefox and Google Chrome are supported.
* The `example.html` page included in this repository uses Bootstrap 5 classes for styling. The page links to a CDN version of the stylesheet.

## Usage

To use this form, you need to include the `referral-form.js` script inside of your HTML page. Your HTML page needs to have the right classes. Use the provided `example.html` page as a reference.

You can initialise the form by calling `referralEmailInit(person, email, referralTypes);`. 

You'll need to provide the name of the person being referred, the email address to send the referral email to, and an array of objects with values for the "Referral Type" `<select>`:

```
let referralTypes = [
    {name: "General", value: "general", text: ``},
    {name: "Book Publishing", value: "book-publishing", text: `Through his company, Evolve Global Publishing, John been responsible for publishing hundreds of books and all of them, without fail, have achieved #1 best-seller status on Amazon. They offer a worry-free professional service to achieve the creation, publishing, and launch of your book.`},
    {name: "Best Seller Campaign", value: "best-seller", text: `John has been involved with over 2,500+ Amazon campaigns with 100% Success rate. His team handles the entire campaign from start to finish and ensure you achieve #1 International Best Seller for your book.`},
    {name: "Launch Podcast", value: "launch-podcast", text: `John can elevate your podcasting Journey with his comprehensive "all in one" system. He can have a complimentary VIP Discovery Call with you to discuss the power of profitable podcasting using what he calls his "Onion System".`},
    {name: "Evolvepreneur app Platform", value: "ep-app", text: `Evolvepreneur.app ® offers an easy and cost-effective way to build your online business by helping you avoid the pain and stress of implementing multiple systems, giving you the freedom to automate and scale.

John's mission is to start a revolution that will help entrepreneurs establish their own complete business system that can compete with the big end of town and mainstream social media platforms.`},
    ];
referralEmailInit('John North', 'refer@email.com', referralTypes);
```

### Non-Default Email Clients

The `mailto:` URL scheme works on all modern browsers and operating systems as intended—even on mobile operating systems like iOS and Android. However, if the visitor is using a non-default email client, like Outlook on Windows or macOS, it won't behave as expected. It will instead attempt to open the Mail email client on both operating systems. 

Users will need to set their default email client to their preferred email client for their operating system. It's a good idea to provide users some help on the page to set their default email client. Some example help is included in the `example.html` file.

Incidentally, GNOME always gives the user the option to choose what email client they want to open, so Linux users with that desktop environment are not impacted by this platform defaults issue.

## License

`referral-form.js` is licensed under LGPLv3 or later. See [COPYING.LESSER](./COPYING.LESSER) for full license details.

Copyright (C) Evolvepreneur Pty Ltd
