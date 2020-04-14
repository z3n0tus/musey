import moment from "moment";
import uuid from "uuid-v4";
import { db } from "../firebase.setup.js";

export const saveItemToDb = (user, text, date, tags = []) => {
  console.log('saving!')
  if (text.trim().length !== 0) {
    const formattedDate = moment().format("LLL");
    const newItem = { text, date, tags, formattedDate, trackingId: uuid() };
    if (user) {
      db.collection(`${user.uid}/items/${date}`).add(newItem);
      tags.forEach(tag => {
        db.collection(`${user.uid}/tags/${tag}`).add(newItem);
        db.collection(`${user.uid}/tags/all-tags`).add({ name: tag });
      });
    }
  }
};

export const getTagsFromDb = (user, callback) =>
  db.collection(`${user.uid}/tags/all-tags`).onSnapshot(callback);

export const getItemsFromDb = (uid, date, callback) =>
  db.collection(`${uid}/items/${date}`).onSnapshot(callback);

export const deleteItemFromDb = (uid, item) => {
  db.collection(`${uid}/items/${item.date}`).onSnapshot(doc => {
    const mainItems = doc.docs.map(mainDoc => ({
      ...mainDoc.data(),
      dbId: mainDoc.id
    }));

    const mainItem = mainItems.find(
      mainDoc => item.trackingId === mainDoc.trackingId
    );

    if (mainItem) {
      const mainItemId = mainItem.dbId;

      db.collection(`${uid}/items/${item.date}`)
        .doc(mainItemId)
        .delete();

      item.tags.forEach(tag => {
        db.collection(`${uid}/tags/${tag}`).onSnapshot(tagDoc => {
          const nextItem = tagDoc.docs
            .map(tagDoc => ({ ...tagDoc.data(), dbId: tagDoc.id }))
            .find(tagDoc => item.trackingId === tagDoc.trackingId);

          if (nextItem) {
            db.collection(`${uid}/tags/${tag}`)
              .doc(nextItem.dbId)
              .delete();
          }
        });
      });
    }
  });
  db.collection(`${uid}/items/${item.date}`)
    .doc(item.dbId)
    .delete();

  item.tags.forEach(tag => {
    db.collection(`${uid}/tags/${tag}`)
      .doc(item.dbId)
      .delete();

    db.collection(`${uid}/tags/${tag}`).onSnapshot(documents => {
      if (documents.empty) {
        db.collection(`${uid}/tags/all-tags`).onSnapshot(val => {
          const toDelete = val.docs.find(v => v.data().name === tag);
          if (toDelete) {
            db.collection(`${uid}/tags/all-tags`)
              .doc(toDelete.id)
              .delete();
          }
        });
      }
    });
  });
};

export const getItemsFromDbByTag = (user, tag, callback) =>
  db.collection(`${user.uid}/tags/${tag}`).onSnapshot(callback);
