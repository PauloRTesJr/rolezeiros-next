import { db } from '@rolezeiros/firebase';
import axios from 'axios';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const collectionFetcher = (collectionName: string) =>
  getDocs(collection(db, collectionName)).then(formatCollectionData);

export const documentFetcher = (docId: string) =>
  getDoc(doc(db, docId)).then(formatDocumentData);

const formatCollectionData = (res) => {
  const data = [] as unknown[];
  res.forEach((doc) => data.push(Object.assign({ id: doc.id }, doc.data())));

  return data;
};

const formatDocumentData = (res) => {
  return { id: res.id, ...res.data() };
};

export const axiosFetcher = (url: string) =>
  axios.get(url).then((res) => res.data);
