import {defineStore} from 'pinia'

export const useDarkStore = defineStore('counter', {
    state: () => ({
        isDark: false
    }),
    actions: {
        tabDark() {
            this.isDark = !this.isDark
        }
    }
})
