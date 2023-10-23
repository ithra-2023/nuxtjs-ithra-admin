import { doc, getFirestore, initializeFirestore, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

let isFirestoreInitialized = false;

export const useFirestore = () => {
	const { firebaseApp } = useFirebase();

	if (!isFirestoreInitialized) {
		initializeFirestore(firebaseApp, {
			experimentalForceLongPolling: true,
		});
		isFirestoreInitialized = true;
	}
	const firestore = getFirestore(firebaseApp);

	return {
		firestore,
	};
};

export const saveUserInFirestore = async (user: IUser): Promise<boolean> => {
    const { firestore } = useFirestore();

    try {
        const userRef = doc(firestore, 'users', user.uid);
        console.log('useFirestore.ts', 'Saving user:', user)
        const result = await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            providerId: user.providerId,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
        });
        console.log('useFirestore.ts', 'User saved:', result);
        return true;
    } catch (error: any) {
        console.error('useFirestore.ts', 'Error saving user:', error);
        return false;
    }
}

// returns the array of owner uids from collection(metadata) document(owners)
export const getOwners = async (): Promise<any> => {
    const { firestore } = useFirestore();

    const docRef = doc(firestore, 'metadata', 'owners');

    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    console.log('useFirestore.ts', 'getOwners', result);

    return result;
}

