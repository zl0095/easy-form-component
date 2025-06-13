import vue from '@vitejs/plugin-vue';
import {defineConfig} from "vite";
import {resolve} from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from 'vite-plugin-dts';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'


export default defineConfig({
    plugins: [
        vue(),
        createSvgIconsPlugin({
            iconDirs:[resolve(process.cwd(),'assets/icons')],
            symbolId: 'icon-[name]',

        }),
        cssInjectedByJsPlugin(),
        dts({
            entryRoot: '.',      // 入口根目录（包含 .ts 和 .vue）
            outDir: 'dist',         // 输出目录
            insertTypesEntry: true,    // 在 package.json 中自动生成 types 字段
            cleanVueFileName: true,    // 去掉 .vue 文件的后缀
            include: ['./**/*'],
        }),
    ],
    resolve: {
        alias: {
            '@': __dirname, // 确保路径与项目结构一致
        },
    },
    build: {
        cssCodeSplit: false,
        rollupOptions: {
            // input: './index.ts',
            external: ['vue', 'vue-draggable-plus', 'vue3-signature','vite-plugin-svg-icons'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            }
        },
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            name: 'easy-form-component',
            fileName: 'index',
        },
    },
})