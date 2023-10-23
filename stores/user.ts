import type { MapPosition } from '~/types';
import { defineStore } from 'pinia';
import { saveUserInFirestore } from '~/composables/useFirestore';

export const useUserStore = defineStore('USER_STORE', {
    state: () => ({
		user: null as IUser,
	}),

	actions: {
		async setUser(user: IUser) {
			this.user = user;
            //await saveUserInFirestore(user);
            window.location.reload();
		},

		clearUser() {
			this.user = null;
            window.location.reload();
		},

	},
    persist: true
    
});
