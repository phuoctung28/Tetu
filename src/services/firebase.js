import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {getAuth, GoogleAuthProvider,} from "firebase/auth";
import {
    addDoc,
    getDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where,
    deleteField,
    arrayRemove,
    arrayUnion
} from "firebase/firestore";


// Initialize Firebase
const firebaseConfig = {
    // Your Firebase configuration
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// Firestore functions

// Get a reference to the Firestore database
const db = getFirestore(app);
export const createRef = (collection, documentId) => {
    return doc(db, collection, documentId)
}
// Create a document in a Firestore collection
export const createDocument = async (collections, data) => {
    try {
        return await addDoc(collection(db, collections), data);
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};

// Function to update a document
export const updateDocumentProperty = async (collection, documentId, field, data) => {
    try {
        const ref = doc(db, collection, documentId);
        await updateDoc(ref, {
            [field]: data
        });
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
};


export const updateExistedDocumentArray = async (ref, arrayFieldName, dataId) => {
    try {
        await updateDoc(ref, {
            [arrayFieldName]: arrayUnion(dataId),
        });
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
};

// Delete a document from a Firestore collection
export const deleteDocument = async (collection, id) => {
    try {
        await deleteDoc(doc(db, collection, id));
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};

export const deleteArrayElement = async (collection, documentId, fieldName, element) => {
    try {
        const ref = doc(db, collection, documentId);
        await updateDoc(ref, {
            [fieldName]: arrayRemove(element)
        });
    } catch (error) {
        console.log("Error deleting array element:", error);
        throw error;
    }
};

// Query multiple documents from a collection with condition
export const queryDocuments = async (collections, field, operator, value) => {
    try {
        const documents = [];
        const q = query(collection(db, collections), where(field, operator, value));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            documents.push({id: doc.id, ...doc.data()});
        });
        return documents;
    } catch (error) {
        console.error('Error querying documents:', error);
        throw error;
    }
};

export const getAllDocument = async (collections) => {
  try {
    const documents = [];
    const querySnapshot = await getDocs(collection(db, collections));
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};

export const queryDocumentsCondition = async (collectionPath, conditions) => {
   try {
      const documents = [];
      let queryRef = collection(db, collectionPath);

      conditions.forEach(condition => {
         const { field, operator, value } = condition;
         queryRef = query(queryRef, where(field, operator, value));
      });

      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach((doc) => {
         documents.push({ id: doc.id, ...doc.data() });
      });

      return documents;
   } catch (error) {
      console.error('Error querying documents:', error);
      throw error;
   }
};

export const getDocumentById = async (collections, id) => {
    try {
        const docRef = doc(db, collections, id);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (error) {
        console.log(error)
    }
}
// Storage functions

// Get a reference to the Firebase storage
const storage = getStorage();

export const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        try {
            const storageRef = ref(storage, `/files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log("Upload in progress");
                },
                (error) => {
                    console.error("Error uploading file:", error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((url) => {
                            console.log("File uploaded successfully:", url);
                            resolve(url);
                        })
                        .catch((error) => {
                            console.error("Error getting file URL:", error);
                            reject(error);
                        });
                }
            );
        } catch (error) {
            console.error("Error uploading file:", error);
            reject(error);
        }
    });
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

// Authentication 
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);


