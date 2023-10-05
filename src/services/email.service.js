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
  filterBy,
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
        (email) =>
          email.to === loggedinUser.email &&
          email.sentAt !== null &&
          email.removedAt === null
      );
    }

    if (tab === "starred") {
      emails = emails.filter(
        (email) => email.isStarred === true && email.removedAt === null
      );
    }

    if (tab === "sent") {
      emails = emails.filter(
        (email) =>
          email.from === loggedinUser.email &&
          email.sentAt !== null &&
          email.removedAt === null
      );
    }

    if (tab === "draft") {
      emails = emails.filter(
        (email) => email.sentAt === null && email.removedAt === null
      );
    }

    if (tab === "all") {
      emails = emails.filter(
        (email) => email.sentAt !== null && email.removedAt === null
      );
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
      return (
        email.to === loggedinUser.email &&
        email.sentAt !== null &&
        email.removedAt === null
      );
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
  console.log("remove");
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

function filterBy(isRead = null, text = "", tab = "") {
  return {
    isRead,
    text,
    tab,
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = [
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
      // inbox
      {
        id: "i100",
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
        id: "i101",
        subject: "When can we meet?",
        body: "Hey dan, im free all weekend. can we meet?",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "shlomofrid@gmail.com",
        to: "danyanuka@gmail.com",
      },
      {
        id: "i102",
        subject: "טופס לקבלת כרטיס",
        body: "  דן שלום, אנא מלא את הטפסים כדי שנוכל לשלוח לך את הכרטיס החדש לכתובת.",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "hapoalim@gmail.com",
        to: "danyanuka@gmail.com",
      },
      {
        id: "i103",
        subject: "Delivery Update",
        body: "Order 30260678937620: at local delivery company",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "aliexpress@gmail.com",
        to: "danyanuka@gmail.com",
      },
      {
        id: "i104",
        subject: "Company meeting",
        body: "This is a reminder that we meet in my place at 10/10/23. IMPORTANT!",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "danicohen@gmail.com",
        to: "danyanuka@gmail.com",
      },
      {
        id: "i105",
        subject: "Job alerts",
        body: "We found some jobs that might suit your preferences! take a look",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "LinkedIn@gmail.com",
        to: "danyanuka@gmail.com",
      },
      {
        id: "i106",
        subject: "Replay to your previous mail",
        body: "The form is ready for you to fill, finish it and we can continue.",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "jackydorom@gmail.com",
        to: "danyanuka@gmail.com",
      },
      {
        id: "i107",
        subject: "כרטיס כניסה",
        body: "ההזמנה שלך התקבלה אצלנו במערכת! הנה הכרטיסים :",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "getin@gmail.com",
        to: "danyanuka@gmail.com",
      },
      {
        id: "i108",
        subject: "Enough",
        body: "Just created 8 fake emails. i think its enough",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "user@appsus.com",
        to: "danyanuka@gmail.com",
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
