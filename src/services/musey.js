import moment from "moment";
import uuid from "uuid-v4";
import { db } from "../firebase.setup.js";

const removeMuseyFromTags = async (user, tags, id) => {
  const docRef = db.collection(user.uid).doc("tags");
  const doc = await docRef.get();
  const tagObj = doc.data();
  const updatedTagsObject = { ...tagObj };

  tags.forEach((tag) => {
    const updatedTags = updatedTagsObject[tag].filter(
      (musey) => musey.id !== id
    );
    updatedTagsObject[tag] = updatedTags;
    if (updatedTagsObject[tag].length === 0) {
      delete updatedTagsObject[tag];
    }
  });

  docRef.set({ ...updatedTagsObject });
};

const saveTags = async (user, musey) => {
  const docRef = db.collection(user.uid).doc("tags");
  const doc = await docRef.get();
  const tags = musey.tags;

  // A tag will have a number associated with it to define how many times it has been used.
  // This is so it's easy to know which tags can be safely deleted when a musey is deleted.
  if (!doc.exists) {
    const tagObj = {};
    tags.forEach((tag) => {
      tagObj[tag] = [musey];
    });
    docRef.set({ ...tagObj });
  } else {
    const allTagsObj = doc.data();
    const updatedTagsObject = { ...allTagsObj };
    tags.forEach((tag) => {
      if (updatedTagsObject[tag]) {
        updatedTagsObject[tag] = [...updatedTagsObject[tag], ...musey];
      } else {
        updatedTagsObject[tag] = [musey];
      }
    });

    docRef.set({ ...updatedTagsObject });
  }
};

export const createMusey = async (user, musey) => {
  const id = uuid();
  const docRef = db.collection(user.uid).doc("museys");
  const doc = await docRef.get();

  if (!doc.exists) {
    await docRef.set({ [musey.date]: [{ ...musey, id }] });
  } else {
    const museysForDate = doc.data()[musey.date];
    const updatedMuseys = [...museysForDate, { ...musey, id }];
    await docRef.update({ [musey.date]: updatedMuseys });
  }

  if (musey.tags.length > 0) {
    await saveTags(user, { ...musey, id });
  }
};

export const getMuseysByDate = async (user, date) => {
  const docRef = db.collection(user.uid).doc("museys");
  const doc = await docRef.get();
  const museysForDate = doc.data()[date];
  return museysForDate || [];
};

export const getMuseysByTag = async (user, tag) => {
  const docRef = db.collection(user.uid).doc("tags");
  const doc = await docRef.get();
  const museysForTag = doc.data()[tag];
  return museysForTag || [];
};

export const getAllTags = async (user) => {
  const docRef = db.collection(user.uid).doc("tags");
  const doc = await docRef.get();

  if (Object.keys(doc.data()).length > 0) {
    return Object.keys(doc.data());
  } else {
    return [];
  }
};

export const deleteMusey = async (user, { id, date, tags }) => {
  const museysByDate = await getMuseysByDate(user, date);

  const filteredMuseys = museysByDate.filter((musey) => musey.id !== id);

  const docRef = db.collection(user.uid).doc("museys");
  await docRef.update({ [date]: filteredMuseys });

  if (tags.length > 0) {
    await removeMuseyFromTags(user, tags.trim().split(","), id);
  }
};
