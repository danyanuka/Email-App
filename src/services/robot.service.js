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
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy) {
  const emails = await storageService.query(STORAGE_KEY);

  return emails;
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function save(robotToSave) {
  if (robotToSave.id) {
    return storageService.put(STORAGE_KEY, robotToSave);
  } else {
    robotToSave.isOn = false;
    return storageService.post(STORAGE_KEY, robotToSave);
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
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
