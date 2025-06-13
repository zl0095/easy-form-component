<template>
  <svg aria-hidden="true" :style="{ width, height }" :fill="color">
    <use :xlink:href="`#icon-${ name }`"  ></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
  name:'SvgIcon',
  props:{
    // svg矢量图的名字
    name: {
      type:String,
      default:'edit'
    },
    // svg图标的颜色
    color: {
      type: String,
      default: '#aaaaaa',
    },
    // svg宽度
    width: {
      type: Number,
      default: 18,
    },
    // svg高度
    height: {
      type: Number,
      default: 18,
    },
  },
})
</script>
