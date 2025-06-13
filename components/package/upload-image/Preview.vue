<template>
  <div class="easy-form-container-preview">
    <div class="easy-form-label">
      <slot name="serial" class="easy-form-serial-number"></slot>
      <div class="easy-form-title">{{ title }}</div>
    </div>
    <div class="easy-form-error" v-if="error !== ''">{{ error }}</div>
    <div class="easy-form-content">
      <div class="easy-form-upload-container">
        <div ref="upload" class="easy-form-upload">
          <label class="easy-form-upload-part" >
            <input ref="fileInputRef" :multiple="multiple" accept="image/*" class="easy-form-upload-input" type="file" @change="uploadImages"/>
          </label>
          <SvgIcon :height="20" :width="20" class="easy-form-icon" color="#aaa" name="default_image"></SvgIcon>
        </div>
        <div v-for="(item, index) in propsModelValue" :key="index" class="easy-form-image-list"
             @click="() => previewImage(item.url)">
          <img :src="item.url" alt="" class="easy-form-image"/>
          <div class="easy-form-icon-container"
               @click.stop="() => (propsModelValue.splice(index, 1), emit('delete', propsModelValue, item))">
            <SvgIcon :height="15" :width="15" class="easy-form-icon" color="#fff" name="close"></SvgIcon>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showPreviewImg" class="easy-form-preview-image" @click="() => (showPreviewImg = false)">
      <img :src="previewImg" alt="" class="easy-form-img"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import SvgIcon from "../../package/svg-icon/index";

interface FileItem{
  name:string;
  url:string;
  file?:File;
}

const props = defineProps({
  title: {
    type: String,
    default: '请上传图片',
  },
  modelValue: {
    type: Array<FileItem>,
    default: () => [],
  },
  error: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  maxCount: {
    type: [Number, String],
    default: 10,
  },
  drag: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['upload', 'update:modelValue', 'delete']);
const previewImg = ref('');
const showPreviewImg = ref(false);
const upload = ref();
const defaultModelValue = ref<FileItem[]>([]);
const fileInputRef = ref()

function fileToBase64Async(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      resolve(e.target?.result);
    };
  });
}

const propsModelValue = computed({
  get:()=>props.modelValue.length > 0 ? props.modelValue : defaultModelValue.value,
  set:(value)=>{
    defaultModelValue.value = value
    emit('update:modelValue',value)
  }
})

onMounted( () => {
  if (props.drag) {
    upload.value?.addEventListener('dragover', function (e: DragEvent) {
      // 阻止冒泡
      e.stopPropagation();
      // 阻止默认事件
      e.preventDefault();
    });

    upload.value?.addEventListener('drop', async function (e: DragEvent) {
      e.stopPropagation();
      e.preventDefault();
      const newModelValue = await Promise.all(
          Array.from(e.dataTransfer?.files as FileList).map(async (item) => ({
            file: item,
            name: item.name,
            url: await fileToBase64Async(item) as string
          }))
      )
      propsModelValue.value = [...propsModelValue.value,...newModelValue]
      if (propsModelValue.value.length > parseInt(props.maxCount.toString(), 10)) {
        propsModelValue.value.splice(parseInt(props.maxCount.toString(), 10));
      }
      emit('upload', propsModelValue.value, e.dataTransfer?.files);
    });
  }
});

async function uploadImages(e: Event) {
  if ((e.target as HTMLInputElement)?.files) {
    const newModelValue = await Promise.all(
        Array.from((e.target as HTMLInputElement)?.files as FileList).map(async (item) => ({
          file: item,
          name: item.name,
          url: await fileToBase64Async(item) as string
        }))
    )
    propsModelValue.value = [...propsModelValue.value,...newModelValue]
    if (propsModelValue.value.length > parseInt(props.maxCount.toString(), 10)) {
      propsModelValue.value.splice(parseInt(props.maxCount.toString(), 10));
    }
  }
  emit('upload', propsModelValue.value, (e.target as HTMLInputElement)?.files);
  fileInputRef.value.value = '';
}

function previewImage(item: string) {
  previewImg.value = item;
  showPreviewImg.value = true;
}
</script>

<style lang="less" scoped>
.easy-form-container-preview {
  box-sizing: border-box;
  border-radius: var(--easy-form-border-radius-component);

  .easy-form-label {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    .easy-form-title {
      box-sizing: border-box;
      width: var(--easy-form-container-width);
      font-size: 14px;
    }
  }

  .easy-form-content {

    .easy-form-upload-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .easy-form-upload {
        margin-top: 5px;
        position: relative;
        width: 78px;
        height: 78px;
        margin-right: 5px;
        background: rgb(241 243 246 / 50%);
        border-radius: var(--easy-form-border-radius-component-1);
        cursor: pointer;

        .easy-form-upload-part {
          position: relative;
          top: 0;
          left: 0;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          cursor: pointer;

          .easy-form-upload-input {
            display: none;
            opacity: 0;
          }
        }

        .easy-form-icon {
          position: absolute;
          inset: 0;
          margin: auto;
        }
      }

      .easy-form-image-list {
        position: relative;
        width: 78px;
        height: 78px;
        margin-right: 5px;
        background: rgb(241 243 246 / 50%);
        border-radius: var(--easy-form-border-radius-component-1);
        cursor: pointer;
        margin-top: 5px;

        .easy-form-image {
          width: 100%;
          height: 100%;
          vertical-align: middle;
          border-radius: var(--easy-form-border-radius-component-1);
        }

        .easy-form-icon-container {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: #333;
          border-radius: var(--easy-form-border-radius-component-1);
        }
      }
    }
  }

  .easy-form-preview-image {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: var(--easy-form-background-component-6);

    .easy-form-img {
      width: 40%;
      vertical-align: middle;
    }
  }
}

@media screen and (width <= 768px) {
  .easy-form-container {
    .easy-form-content {
      .easy-form-upload-container {
        .easy-form-upload {
          width: 60px;
          height: 60px;
        }

        .easy-form-image-list {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
}
</style>
