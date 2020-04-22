import moment from "moment";
import uuid from "uuid-v4";
import { db } from "../firebase.setup.js";

export const createReminder = async (user, reminder) => {
  const id = uuid();
  const docRef = db.collection(user.uid).doc("reminders");
  const doc = await docRef.get();

  if (!doc.exists) {
    await docRef.set({ reminders: [{ ...reminder, id }] });
  } else {
    const { reminders } = doc.data();
    const updatedReminders = [...reminders, { ...reminder, id }];
    await docRef.update({ reminders: updatedReminders });
  }
};

export const getAllReminders = async (user) => {
  const docRef = db.collection(user.uid).doc("reminders");
  const res = await docRef.get();
  const data = res.data();
  return data ? data.reminders : [];
}