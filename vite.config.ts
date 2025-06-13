import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import path from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[dir]-[name]'
        }),
        dts({
            include:['src/**/*'],
            copyDtsFiles:true
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: true,
                javascriptEnabled: true,
            }
        }
    },
    server: {
        host: '0.0.0.0',
        port: 5175,
        open: true
    },
    build: {
        outDir: 'dist',
        target: 'es2015',
        minify: 'terser',
        cssTarget: 'chrome80',
        chunkSizeWarningLimit: 2000,
        emptyOutDir: true,
        rollupOptions: {
            external: ['vue','vue-draggable-plus','vue3-signature',"vite-plugin-svg-icons","zh-address-parse"],
            output: {  // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue',
                    "vue-draggable-plus":"VueDraggablePlus",
                    "vue3-signature":"Vue3Signature",
                    "vite-plugin-svg-icons":"VitePluginSvgIcons",
                    "zh-address-parse":"ZhAddressParse"
                }
            }
        },
        lib: {
            entry: './src/packages/index.ts', // 入口文件，可以是相对于项目根目录的路径
            name: 'registerGlobalComponent', // 设置库的名称
            fileName:'survey_questionnaire_compnent',
            formats: ['es', 'umd']
        },
    },
})
