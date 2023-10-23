import { isProduction } from '~/utils/helpers'

export default defineAppConfig({
    baseURL: isProduction ? 'https://ithra-2023.github.io/nuxtjs-ithra-admin/' : '/',
    buildAssetsDir: 'assets',
})