import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore"
import { auth, db } from "../config/firebase.config"

export const getUserDetail =  () => {
    return new Promise((resolve, reject) => { // Include 'reject' as a parameter
        const unsubscribe = auth.onAuthStateChanged((userCred) => {
            if (userCred) {
                const userData = userCred.providerData[0];
                // console.log(userData);
                const unsubscribe = onSnapshot(doc(db, "users", userData?.uid), (_doc) => {
                    if (_doc.exists()) {
                        resolve(_doc.data());
                    } else {
                        setDoc(doc(db, "users", userData?.uid), userData).then(() => {
                            resolve(userData);
                        })
                    }
                }
                )

                // Unsubscribe from the listener to prevent memory leakage
                return unsubscribe;
            } else {
                reject(new Error("User is not authenticated"))
            }

            // here it is prevent to memory likege
            unsubscribe()
        })
    })
}

export const getTemplates = () => {
    return new Promise((resolve, reject) => {
        const templateQuery = query(
            collection(db, "templates"),
            orderBy("timestamp", "asc")
        )

        const unsubscribe = onSnapshot(templateQuery, (querySnap) => {
            const templates = querySnap.docs.map((doc) => doc.data())
            resolve(templates)
        })

        return unsubscribe
    })
}
