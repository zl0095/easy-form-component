<template>
  <main>
    <div class="left">
      <Menu/>
    </div>
    <div class="right">
      <div class="tabStatus">
        <Switch v-model:checked="isDark" class="input" @change="()=>changeDark()"></Switch>
        <span>暗黑模式</span>
      </div>
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts" setup>
import Menu from '@/views/Menu.vue'
import {ref} from 'vue'
import {useDarkStore} from '@/stores/dark'
import {Switch} from "easy-form-component";

const darkStore = useDarkStore()
const isDark = ref(darkStore.isDark)

function changeDark() {
  darkStore.tabDark()
}
</script>

<style lang="less" scoped>
main {

  .left {
    width: 250px;
    height: 100vh;
    padding: 20px 0;
    border-right: 1px solid var(--easy-form-border-color-component-1);
    box-sizing: border-box;
    background: var(--easy-form-background-component-1);
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--easy-form-border-color-component-1);
      border-radius: 20px;
    }
  }

  .right {
    padding: 30px 80px;
    box-sizing: border-box;
    margin: 0 0 0 250px;
    background: var(--easy-form-background-component-1);
    color: var(--easy-form-color-text-component-1);

    .tabStatus {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 30px;

      .input {
        margin-right: 10px;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  main {
    .right {
      padding: 20px 2%;
    }
  }
}

@media screen and (max-width: 768px) {
  main {
    .left {
      display: none;
    }

    .right {
      margin: 0;
    }
  }
}
</style>
