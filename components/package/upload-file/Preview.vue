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
          <label class="easy-form-upload-part">
            <input :accept="format" :multiple="multiple" class="easy-form-upload-input" maxlength="10" type="file" ref="fileInputRef" @change="uploadFiles"/>
            <span class="easy-form-text-label">点击上传文件</span>
          </label>
          <SvgIcon :height="20" :width="20" class="easy-form-icon" color="#aaa" name="upload_file"></SvgIcon>
        </div>
        <p class="easy-form-text-desc">最多{{ maxCount }}个， 单个文件大小不超过{{ maxSize }}MB
          ，{{ restrictedFormat ? format : '不限制文件格式' }}</p>
        <div v-for="(item, index) in bindValue" :key="index" class="easy-form-image-list">
          <div class="easy-form-info-container">
            <img v-if="item.name.includes('jpeg') || item.name.includes('jpg') || item.name.includes('png') || item.name.includes('svg')" :src="item.url" alt=""
                 class="easy-form-image"/>
            <SvgIcon v-else :height="68" :name="item.url" :width="68" class="easy-form-image"></SvgIcon>
            <div class="easy-form-info">
              <div class="easy-form-name">{{ item.name }}</div>
              <div class="easy-form-size">{{ item.size }}</div>
            </div>
          </div>
          <SvgIcon :height="17" :width="17" class="easy-form-delete-icon" color="rgb(153, 153, 153)" name="delete_icon"
                   @click.stop="() => handleDel(index,item)"></SvgIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, type PropType, ref} from 'vue';
import SvgIcon from "../../package/svg-icon/index";

interface FileItem{
  name:string;
  url:string;
  size:string
  file?:File;
}

const props = defineProps({
  title: {
    type: String,
    default: '请上传图片',
  },
  maxCount: {
    type: [Number, String],
    default: 10,
  },
  maxSize: {
    type: [Number, String],
    default: 30,
  },
  restrictedFormat: {
    type: Boolean,
    default: false,
  },
  format: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Array as PropType<FileItem[]>,
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
  drag: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['upload', 'update:modelValue', 'delete']);
const upload = ref();
const fileInputRef = ref()

const defaultModelValue = ref<FileItem[]>([]);

function fileToBase64Async(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      resolve(e.target?.result);
    };
  });
}

const bindValue = computed<FileItem[]>({
  get: () => {
    return props.modelValue.length === 0 ? defaultModelValue.value : props.modelValue
  },
  set: (value) => {
    defaultModelValue.value = value as FileItem[]
    emit('update:modelValue', value)
  }
})

function uploadFile(fileList: FileList) {
  Array.from(fileList).forEach(async (item: File) => {
    let size = '';
    let imageUrl = ''
    if (item.type.includes('image')) {
      imageUrl = (await fileToBase64Async(item)) as string;
    } else if (item.type.includes('pdf')) {
      imageUrl = 'file_pdf';
    } else if (item.type.includes('zip')) {
      imageUrl = 'file_zip';
    } else if (item.type.includes('word')) {
      imageUrl = 'file_doc';
    } else if (item.type.includes('sheet')) {
      imageUrl = 'file_xlsx';
    } else if (item.name.includes('mp4')) {
      imageUrl = 'file_video';
    } else if (item.name.includes('ppt')) {
      imageUrl = 'file_ppt';
    }else if (item.name.includes('txt')) {
      imageUrl = 'file_txt';
    }else if (item.name.includes('mp3')) {
      imageUrl = 'file_mp3';
    }else {
      imageUrl = 'file_unknow';
    }
    if (item.size / 1024 / 1024 > 1 && item.size / 1024 > 1024) {
      size = `${(item.size / 1024 / 1024).toFixed(2)}MB`;
    } else if (item.size / 1024 <= 1024) {
      size = `${(item.size / 1024).toFixed(2)}KB`;
    }
    if (item.size / 1024 / 1024 <= parseInt(props.maxSize.toString(), 10)) {
      bindValue.value = [...bindValue.value,{name: item.name,file:item as File, size, url:imageUrl}]
    }
    if (props.modelValue.length > parseInt(props.maxCount.toString(), 10)) {
      bindValue.value.splice(parseInt(props.maxCount.toString(), 10));
    }
  });
  fileInputRef.value.value = ''
}

onMounted(() => {
  if (props.drag) {
    upload.value?.addEventListener('dragover', function (e: DragEvent) {
      // 阻止冒泡
      e.stopPropagation();
      // 阻止默认事件
      e.preventDefault();
    });

    upload.value?.addEventListener('drop', function (e: DragEvent) {
      e.stopPropagation();
      e.preventDefault();
      uploadFile(e.dataTransfer?.files as FileList);
      emit('upload', bindValue.value, e.dataTransfer?.files);
    });
  }
});

// 删除
function handleDel(index:number,item:FileItem){
  const newBindValue = JSON.parse(JSON.stringify(bindValue.value));
  newBindValue.splice(index,1);
  bindValue.value = newBindValue;
  emit('delete', bindValue.value, item)
}

function uploadFiles(e: Event) {
  if ((e.target as HTMLInputElement)?.files) {
    uploadFile((e.target as HTMLInputElement)?.files as FileList);
    emit('upload', bindValue.value, (e.target as HTMLInputElement)?.files);
  }
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
        width: 100%;
        height: 42px;
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

          .easy-form-text-label {
            display: inline-block;
            box-sizing: border-box;
            height: 100%;
            padding-left: 40px;
            color: var(--easy-form-color-text-component-3);
            font-size: 14px;
            line-height: 42px;
          }
        }

        .easy-form-icon {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 10px;
          margin: auto;
        }
      }

      .easy-form-text-desc {
        margin-top: 10px;
        color: var(--easy-form-color-text-component-3);
        font-size: 14px;
      }

      .easy-form-image-list {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        box-sizing: border-box;
        width: 100%;
        margin-top: 10px;
        padding: 6px 4px 6px 6px;
        background: rgb(241 243 246 / 50%);
        border-radius: var(--easy-form-border-radius-component-1);

        .easy-form-delete-icon {
          margin: 0 5px 5px 0;
          cursor: pointer;
        }

        .easy-form-info-container {
          display: flex;
          align-items: center;

          .easy-form-image {
            width: 68px;
            height: 68px;
            margin-right: 10px;
            border-radius: var(--easy-form-border-radius-component-1);
          }

          .easy-form-info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 62px;

            .easy-form-name {
              overflow: hidden;
              font-size: 14px;
              line-height: 18px;
              text-overflow: ellipsis;
              word-break: break-all;
            }

            .easy-form-size {
              color: var(--easy-form-color-text-component-2);
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
