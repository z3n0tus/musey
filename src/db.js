import moment from "moment";
import { db } from "./firebase.setup.js";

export const saveItemToDb = (user, text, date, tags = []) => {
  if (text.trim().length !== 0) {
    const formattedDate = moment().format("LLL");
    const newItem = { text, date, tags, formattedDate };
    if (user) {
      db.collection(`${user.uid}/items/${date}`).add(newItem);
      tags.forEach(tag => {
        db.collection(`${user.uid}/items/${tag}`).add(newItem);
      });
    }
  }
};

export const getItemsFromDb = (uid, date, callback) =>
  db.collection(`${uid}/items/${date}`).onSnapshot(callback);

export const deleteItemFromDb = (uid, date, docId) =>
  db
    .collection(`${uid}/items/${date}`)
    .doc(docId)
    .delete();
