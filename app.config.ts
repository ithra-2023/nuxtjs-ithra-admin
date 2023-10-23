import { isProduction } from '~/utils/helpers'

export default defineAppConfig({
    baseURL: isProduction ? '/' : '/nuxtjs-ithra-admin/',
    buildAssetsDir: 'assets',
})