import { getApps, initializeApp } from 'firebase/app';
import {
    collection, query, getDocs, setDoc, addDoc, where,
    getFirestore, updateDoc, doc, deleteDoc, usersSnapshot,
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
const firestore = getFirestore(); // Firestoreのインスタンスを取得

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

        // Firestoreにユーザー情報を保存
        const userRef = doc(firestore, "users", user.uid); // usersコレクションの参照を取得
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            // 他に保存したい情報があればここに追加
        });

        return 'success';
    } catch (error) {
        console.log(error.message);
        return 'failed';
    }
};

export const createRoom = async (selectedUsers) => {
    // チャットルームを作成する処理
    const chatRoomRef = await firestore.collection("rooms").add({
        createdAt: getFirestore.FieldValue.serverTimestamp(),
        memberIds: selectedUsers.map((user) => user.uid),
    });
    const chatRoomId = chatRoomRef.id;
    selectedUsers.forEach((user) => {
        firestore
            .collection("users")
            .doc(user.id)
            .update({
                chatRoomIds: getFirestore.FieldValue.arrayUnion(chatRoomId),
            });
    });
};

export const getAllUsers = async () => {
    let users = []
    const q = query(collection(db, "users"))

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        users.push(doc.data());
    });
    console.log(users)
    return users;
};

export const getUsers = async () => {
    const db = getFirestore();
    const usersCol = collection(db, "users");
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return usersList;
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

