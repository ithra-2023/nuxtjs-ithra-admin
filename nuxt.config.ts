// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
    ssr: false, // default behavior
    typescript: { shim: false },
    app: {
        baseURL: '/nuxtjs-ithra-admin/', // baseURL: '/<repository>/'
        buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
    },
    
	devtools: { enabled: false },
	modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxt/ui'
    ],
    pinia: {},
    colorMode: {
        preference: 'light'
    },
    
    piniaPersistedstate: {
		storage: 'localStorage',
		debug: true,
	},
    css: ['~/assets/css/main.scss'],
    imports: { dirs: ['stores'] },
    devServer: {
		port: 5555,
	},
    runtimeConfig: {
		public: {
			GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
			GOOGLE_AUTH_DOMAIN: process.env.GOOGLE_AUTH_DOMAIN,
			GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
			GOOGLE_STORAGE_BUCKET: process.env.GOOGLE_STORAGE_BUCKET,
			GOOGLE_MESSAGING_SENDER_ID: process.env.GOOGLE_MESSAGING_SENDER_ID,
			GOOGLE_APP_ID: process.env.GOOGLE_APP_ID,
			GOOGLE_MEASUREMENT_ID: process.env.GOOGLE_MEASUREMENT_ID,
			NUXT_PUBLIC_GTAG_ID: process.env.NUXT_PUBLIC_GTAG_ID,
		},
	},
    tailwindcss: {
		viewer: false,
	},

});
