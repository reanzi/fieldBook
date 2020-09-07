// import firebaseKeys from "./config"
import firebase from "firebase"
var firebaseConfig = {
    apiKey: "AIzaSyDU6flc-8cY0Y120KZ6lYd6VDt-PT1Zsig",
    authDomain: "noticeap.firebaseapp.com",
    databaseURL: "https://noticeap.firebaseio.com",
    projectId: "noticeap",
    storageBucket: "noticeap.appspot.com",
    messagingSenderId: "1048357689823",
    appId: "1:1048357689823:web:797dab2362eaa71912cc6a"
};

class Fire {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
            // firebase.initializeApp(firebaseKeys);
        }
    }
    addPost = async({text, localUri}) => {
        const remoteUrl =await this.uploadPhotoAsync(localUri);

        return new Promise((res, rej) =>{
            this.firestore.collection("posts").add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUrl
            }).then( ref => {
                res(ref)
            }).catch(error => {
                rej(error)
            })
        })
    }
    uploadPhotoAsync = async uri => {
        const path = `photo/${this.uid}/${Date.now()}.jpg`

        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase.storage().ref(path).put(file)

            upload.on("state_changed", snapshot => {}, err => {
                rej(err)
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url)
            })
        })
    }
    get firestore() {
        return firebase.firestore()
    }
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    get timestamp() {
        return Date.now()
    }
}

Fire.shared = new Fire()
export default Fire;