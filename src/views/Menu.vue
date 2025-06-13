<template>
  <div class="menu">
    <div v-for="(item,index) in menuList" :key="index" class="menu-item">
      <div :class="['menu-item-title',route.path.includes(item.path) ? 'menu-item-title-active' : '']"
           @click="jumpRouter(item)">
        <div>{{ item.meta.label }}</div>
        <div>></div>
      </div>
      <div v-for="(k,v) in item.children" :key="v"
           :class="['menu-item-children',k.name === route.name ? 'menu-item-children-active' : '' ]"
           @click="jumpRouter(k)">
        {{ k.meta.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {menu} from '@/router/menu'

const menuList = ref(menu)
const router = useRouter()
const route = useRoute()

function jumpRouter(routes: any) {
  router.replace({name: routes.name})
}
</script>

<style lang="less" scoped>
.menu-item-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 16px;
  color: var(--easy-form-color-text-component-1);

  &.menu-item-title-active {
    color: #1677ff;
  }
}

.menu-item-children {
  padding: 10px 30px;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;
  color: var(--easy-form-color-text-component-1);

  &.menu-item-children-active {
    background: #e6f4ff;
    color: #1677ff;
  }
}
</style>