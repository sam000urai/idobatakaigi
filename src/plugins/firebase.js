import { getApps, initializeApp } from 'firebase/app';
import {
    collection, query, getDocs, setDoc, addDoc, where,
    getFirestore, updateDoc, doc, deleteDoc
} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const apps = getApps;
if (!apps.length) {
    initializeApp(firebaseConfig);
}

const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();


export { auth, createUserWithEmailAndPassword };

export const createUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        console.log(user);
        console.log('create user success!!');
        return 'success';
    } catch (error) {
        console.log(error.message);
        return 'failed';
    }
};


export const signOutUser = async () => {
    try {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    } catch (error) {

    }
}

export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        console.log(user);
        console.log('sign in user success!!');
        return 'success';
    } catch (error) {
        console.log(error.message);
        return 'failed';
    }
};

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleAuthProvider); // Googleログイン用のポップアップを表示
        const user = result.user;
        console.log(user);
        console.log('Google sign in success!!');
        return 'success';
    } catch (error) {
        console.log(error.message);
        return 'failed';
    }
};

export const db = getFirestore();

export const createDataInFirebase = async () => {
    let returnObj = ""
    console.log('firebase start')
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "saa",
            last: "Lovelace",
            born: 181995
        });
        returnObj = "test1"
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        returnObj = "test2"
        console.error("Error adding document: ", e);
    }
    return returnObj
}

export const myDataCreateInFirebase = async (firstName, lastName, birthYear) => {
    let returnObj = ""
    console.log('firebase start')
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: firstName,
            last: lastName,
            born: parseInt(birthYear),
        });
        returnObj = "test1"
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        returnObj = "test2"
        console.error("Error adding document: ", e);
    }
    return returnObj
}

export const newCreateInFirebase = async (firstName, lastName, birthYear) => {
    let returnObj = ""
    console.log('firebase start')
    try {
        await setDoc(doc(db, "users", "programmingAcademy"), {
            first: firstName,
            last: lastName,
            born: parseInt(birthYear),
        });
        returnObj = "test1"
    } catch (e) {
        returnObj = "test2"
        console.error("Error adding document: ", e);
    }
    return returnObj
}

export const readData = async () => {
    console.log('readData')
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
};

export const readCollection = async () => {
    const q = query(collection(db, "users"), where("born", "==", 1815));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
};

export const updateData = async () => {
    const washingtonRef = doc(db, "users", "ApmqI2r81wu1HDkyyElY");
    await updateDoc(washingtonRef, {
        first: true
    });
};


export const deleteData = async (id) => {
    try {
        const docRef = doc(db, "users", "8RkhaRawZtbyK2gH5k8u");
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error removing document: ", error);
    }
};

