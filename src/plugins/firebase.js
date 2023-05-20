import { getApps, initializeApp } from 'firebase/app';

import {
    collection, query, getDocs, setDoc, addDoc, where,
    getFirestore, updateDoc, doc, deleteDoc, usersSnapshot,
    serverTimestamp, onSnapshot,
} from "firebase/firestore";

import {
    createUserWithEmailAndPassword,
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
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


export const createUser = async (displayName, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        //** ユーザの名前をauthへ設定 */
        updateProfile(user, {
            displayName: displayName,
        })
            .then(() => {
                // Profile updated!
                console.log('Hello!! ', displayName);
            })
            .catch((error) => {
                console.log(
                    '🚀 ~ file: userRepository.ts:36 ~ UserRepository ~ .then ~ error',
                    error.code
                );
            });

        console.log(user);
        console.log('create user success!!');

        // Firestoreにユーザー情報を保存
        const userRef = doc(firestore, 'users', user.uid); // usersコレクションの参照を取得
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: displayName,
            photoUrl: user.photoURL,
            // 他に保存したい情報があればここに追加
        });

        return 'success';
    } catch (error) {
        console.log(error.message);
        return 'failed';
    }
};

export const createRoom = async (selectedUsers, roomName) => {
    // チャットルームを作成する処理
    const chatRoomRef = await addDoc(collection(db, "rooms"), {
        name: roomName,
        createdAt: serverTimestamp(),
        memberIds: selectedUsers.map((user) => user.uid),
    });
};

export const sendMessageForFirebase = async (
    message,
    displayName,
    uid,
    roomId
) => {
    let returnObj = '';
    try {
        const docRef = await addDoc(collection(db, 'messages', roomId, 'message'), {
            message,
            uid: uid,
            displayName,
            createdAt: serverTimestamp(),
        });
        returnObj = 'send success';
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        returnObj = 'error';
        console.error('Error adding document: ', e);
    }
    return returnObj;
};

export const getUsernameByUID = async (uid) => {
    console.log(uid)
    let username = ''
    try {
        const q = await query(collection(db, "users"), where("uid", "==", uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        return username;
    } catch (error) {
        console.error('Failed to get username:', error);
        return null;
    }
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

export const getRooms = async () => {
    const db = getFirestore();
    const roomsCol = collection(db, "rooms");
    const roomsSnapshot = await getDocs(roomsCol);
    const roomsList = roomsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return roomsList;
};


export const getMessages = async (roomId) => {
    const messages = [];
    const unsub = onSnapshot(doc(db, 'messages', roomId, 'message'), (doc) => {
        console.log("Current data: ", doc.data());
    });
    return messages;
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
