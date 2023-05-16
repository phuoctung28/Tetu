import firebase from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    // Your Firebase configuration
};

const app = firebase.initializeApp(firebaseConfig);

// Firestore functions

// Get a reference to the Firestore database
const db = getFirestore();

// Create a document in a Firestore collection
export const createDocument = async (collection, data) => {
    try {
        const docRef = await db.collection(collection).add(data);
        return docRef.id;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};

// Read a document from a Firestore collection
export const getDocument = async (collection, id) => {
    try {
        const docRef = await db.collection(collection).doc(id).get();
        if (docRef.exists) {
            return {id: docRef.id, ...docRef.data()};
        } else {
            throw new Error('Document not found.');
        }
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
};

// Update a document in a Firestore collection
export const updateDocument = async (collection, id, data) => {
    try {
        await db.collection(collection).doc(id).update(data);
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
};

// Delete a document from a Firestore collection
export const deleteDocument = async (collection, id) => {
    try {
        await db.collection(collection).doc(id).delete();
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};

// Query multiple documents from a collection
export const getDocuments = async (collection) => {
    try {
        const querySnapshot = await db.collection(collection).get();
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
    } catch (error) {
        console.error('Error getting documents:', error);
        throw error;
    }
};

// Query multiple documents from a collection with condition
export const queryDocuments = async (collection, field, operator, value) => {
    try {
        const querySnapshot = await db
            .collection(collection)
            .where(field, operator, value)
            .get();
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
    } catch (error) {
        console.error('Error querying documents:', error);
        throw error;
    }
};


// Storage functions

// Get a reference to the Firebase storage
const storage = firebase.storage();

// Upload a file to Firebase storage
export const uploadFile = async (file) => {
    try {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        return fileRef.getDownloadURL();
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

// Delete a file from Firebase storage
export const deleteFile = async (fileURL) => {
    try {
        const fileRef = storage.refFromURL(fileURL);
        await fileRef.delete();
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};

// Get download URL
export const getFileDownloadURL = async (fileURL) => {
    try {
        const fileRef = storage.refFromURL(fileURL);
        return fileRef.getDownloadURL();
    } catch (error) {
        console.error('Error getting file download URL:', error);
        throw error;
    }
};



