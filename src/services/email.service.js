import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

const loggedinUser = {
  email: "danyanuka@gmail.com",
  fullname: "Dan Yanuka",
};

export const emailService = {
  query,
  save,
  remove,
  getById,
  createEmail,
  loggedinUser,
  countUnreadEmails,
};

const STORAGE_KEY = "emails";
countUnreadEmails();
_createEmails();

async function query(filterBy) {
  try {
    let emails = await storageService.query(STORAGE_KEY);

    if (!filterBy) return "Loading";
    const fieldsToSearch = ["body", "subject"];
    let { isRead, text = "", tab = "" } = filterBy;

    // filtering By Tabs
    if (tab === "inbox") {
      emails = emails.filter(
        (email) => email.to === loggedinUser.email && email.sentAt !== null
      );
    }

    if (tab === "starred") {
      emails = emails.filter((email) => email.isStarred === true);
    }

    if (tab === "sent") {
      emails = emails.filter(
        (email) => email.from === loggedinUser.email && email.sentAt !== null
      );
    }

    if (tab === "draft") {
      emails = emails.filter((email) => email.sentAt === null);
    }

    if (tab === "all") {
      emails = emails.filter((email) => email.sentAt !== null);
    }

    if (tab === "trash") {
      emails = emails.filter((email) => email.removedAt !== null);
    }
    // body and subject filter by text

    emails = emails.filter((email) =>
      fieldsToSearch.some((field) =>
        email[field].toLowerCase().includes(text.toLowerCase())
      )
    );
    // filter by read/undread/all
    if (isRead !== null) {
      emails = emails.filter((email) => email.isRead === isRead);
    }

    return emails;
  } catch (error) {
    console.error(error);
  }
}

async function countUnreadEmails() {
  try {
    const emails = await storageService.query(STORAGE_KEY);
    const emailsFromInbox = emails.filter((email) => {
      return email.to === loggedinUser.email && email.sentAt !== null;
    });

    const propertyToCheck = "isRead";
    const count = emailsFromInbox.reduce((accumulator, currentEmaill) => {
      if (currentEmaill[propertyToCheck] === false) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);

    return count;
  } catch (error) {
    console.log("Could not count unread messeges");
  }
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function save(emailToSave) {
  if (emailToSave.id) {
    console.log("2st put", emailToSave);
    return storageService.put(STORAGE_KEY, emailToSave);
  } else {
    console.log("1st post", emailToSave);
    return storageService.post(STORAGE_KEY, emailToSave);
  }
}

function createEmail(
  subject = "",
  body = "",
  isRead = false,
  isStarred = false,
  sentAt = null,
  removedAt = null,
  from = loggedinUser.email,
  to = ""
) {
  return {
    subject,
    body,
    isRead,
    isStarred,
    sentAt,
    removedAt,
    from,
    to,
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = [
      {
        id: "e101",
        subject: "Miss you!",
        body: "Belongs to inbox, sent to danyanuka",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "user@appsus.com",
        to: "danyanuka@gmail.com",
      },

      {
        id: "e105",
        subject: "Miss you!",
        body: "Belongs to draft, sentAt is null",
        isRead: false,
        isStarred: false,
        sentAt: null,
        removedAt: null, //for later use
        from: "danyanuka@gmail.com",
        to: "user@appsus.com",
      },
      {
        id: "e106",
        subject: "Miss you! ",
        body: "Belongs to sent, sent by danyanuka",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "danyanuka@gmail.com",
        to: "user@appsus.com",
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
