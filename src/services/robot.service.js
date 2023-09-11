import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

export const robotService = {
  query,
  save,
  remove,
  getById,
  createRobot,
  loggedinUser,
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy) {
  try {
    console.log("from service :", filterBy);
    let emails = await storageService.query(STORAGE_KEY);
    if (filterBy) {
      const fieldsToSearch = ["body", "subject"];
      let { isRead, text = "" } = filterBy;
      if (isRead !== null) {
        emails = emails.filter((email) => email.isRead === isRead);
      }
      emails = emails.filter((email) =>
        fieldsToSearch.some((field) =>
          email[field].toLowerCase().includes(text.toLowerCase())
        )
      );
    }

    return emails;
  } catch (error) {
    console.error("You have no Unread emails");
  }
}
// if (filterBy) {
//   let { minBatteryStatus, type = '' } = filterBy
//   minBatteryStatus = minBatteryStatus || 0
//   robots = robots.filter(robot => robot.type.toLowerCase().includes(type.toLowerCase())
//       && robot.batteryStatus > minBatteryStatus)

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave);
  } else {
    return storageService.post(STORAGE_KEY, emailToSave);
  }
}

function createRobot(model = "", type = "", batteryStatus = 100) {
  return {
    model,
    batteryStatus,
    type,
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = [
      {
        id: "e101",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e102",
        subject: "Meet",
        body: "Would love to Meet For Work",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "shuki@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e103",
        subject: "Lecture Sum",
        body: "We started with code review and then We learned about routes. at the end we practices filtering  ",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "puki@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e104",
        subject: "Out of ideas",
        body: "Out of ideas Out of ideas Out of ideas Out of ideas  ",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null, //for later use
        from: "looki@momo.com",
        to: "user@appsus.com",
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
