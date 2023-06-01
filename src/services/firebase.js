import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getAuth, GoogleAuthProvider, } from "firebase/auth";
import { doc, updateDoc, deleteDoc, getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";


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
      await addDoc(collection(db, collections), data);
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

// Delete a document from a Firestore collection
export const deleteDocument = async (collection, id) => {
   try {
      await deleteDoc(doc(db, collection, id));
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


// Storage functions

// Get a reference to the Firebase storage
const storage = getStorage();

export const uploadFile = (file, setFileUrl) => {
   try {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         "state_changed",
         (snapshot) => {
            console.log("upload file successfully");
         },
         (err) => console.log(err),
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then(url => {
               console.log(url);
               setFileUrl(url);
            })
         }
      );
      // return fileUrl;
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

