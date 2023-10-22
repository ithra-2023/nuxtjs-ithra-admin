import { getAuth,  GoogleAuthProvider,  signInWithPopup } from 'firebase/auth';

export const useAuth =  () => {
	const { firebaseApp } = useFirebase();
	const auth = getAuth(firebaseApp);

	const { setUser, clearUser } = useUserStore();
	const error = ref<Record<string, unknown> | null>(null);

	const loginWithProvider = async (provider: any) => {
		try {
			const result = await signInWithPopup(auth, provider);
			await setUser(result.user);
			return result;
		} 
        catch (error) {
			console.log(error);
			return null;
		}
	};

	const loginWithAuthProvider = (provider: string) => {
		switch (provider) {
			case 'google':
				const provider = new GoogleAuthProvider();
				provider.addScope('profile');
				loginWithProvider(provider);
				break;

			default:
				break;
		}
	};

	const signOut = async () => {
		try {
			await auth.signOut();
			clearUser();
		} 
        catch (error) {
			console.log(error);
		}
	};

    

	return { loginWithAuthProvider, signOut, error };
};

export const isAdmin = async (id: string) => {
    const owners = await getOwners();
    const owners_ids = owners.ids;
    return owners_ids.includes(id);
}
