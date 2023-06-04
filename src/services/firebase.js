import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {getAuth, GoogleAuthProvider,} from "firebase/auth";
import {addDoc, getDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where, deleteField, arrayRemove, arrayUnion } from "firebase/firestore";


// Initialize Firebase
const firebaseConfig = {
   // Your Firebase configuration
   apiKey: "AIzaSyDP9EHsdddH7fjGgmo-r0Vz6KdkpzFRYqs",
   authDomain: "tetu-3be72.firebaseapp.com",
   projectId: "tetu-3be72",
   storageBucket: "tetu-3be72.appspot.com",
   messagingSenderId: "827087020606",
   appId: "1:827087020606:web:117bb5069edd78362a276f",
   measurementId: "G-BSY6RBRE8M",
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

// Read a document from a Firestore collection
export const getDocument = async (collection, id) => {
   try {
      const docRef = await db.collection(collection).doc(id).get();
      if (docRef.exists) {
         return { id: docRef.id, ...docRef.data() };
      } else {
         throw new Error('Document not found.');
      }
   } catch (error) {
      console.error('Error getting document:', error);
      throw error;
   }
};

// Update a document in a Firestore collection
export const updateDocument = async (ref, data) => {
   try {
      await updateDoc(ref, data);
   } catch (error) {
      console.error('Error updating document:', error);
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

export const deleteDocumentField = async (collection, documentId, fieldName) => {
   try {
      const ref = doc(db, collection, documentId);
      await updateDoc(ref, {
         [fieldName]: deleteField()
      });
   } catch (error) {
      console.log("Error deleting field:", error);
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
   } catch(error) {
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


// Authentication 
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);

// const provider = new GoogleAuthProvider();
// export const signInWithGoogle = () => {
//    signInWithPopup(auth, provider)
//       .then((result) => {
//          console.log(result);
//          const name = result.user.displayName;
//          const email = result.user.email;
//          const profilePic = result.user.photoURL;

//          localStorage.setItem("name", name);
//          localStorage.setItem("email", email);
//          localStorage.setItem("profilePic", profilePic);
//       })
//       .catch((error) => {
//          console.log(error);
//       })
// }

