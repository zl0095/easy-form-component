<template>
  <div id="box" :class="{ 'easy-form-focused': isFocused }" class="easy-form-box">
    <div class="easy-form-label">
      <div class="easy-form-fill-title">
        <div style="width: 70%;display: flex;align-items: center">
          <div class="easy-form-serial-number">
            <slot name="serial"></slot>
          </div>
          <div class="easy-form-fill-title-value">
            <div class="easy-form-input-container">
              <input v-model="localTitle" :placeholder="props.placeholder" class="easy-form-box-content"
                     type="text"
                     @blur="(e) => (isFocused = false, emit('blurTitle', localTitle, e))"
                     @focus="(e) => (isFocused = true, emit('focusTitle', localTitle, e))"
                     @input="(e) => watchTitleInput(localTitle, e)">
              <SvgIcon name="clear" v-if="allowClear && localTitle !== ''" class="easy-form-clear"
                       @click="handleClear"/>
            </div>
          </div>
        </div>
        <div class="easy-form-operation">
          <slot name="operation"></slot>
        </div>
      </div>
      <div class="easy-form-content">
        <div class="easy-form-fill-input" tabindex="0" :contenteditable="editTable" id="editTableId"
             @focus="showMenu = true,editTable=true">
          <span v-html="editableContent"></span>
        </div>
        <div v-if="showMenu">
          <button class="easy-form-context-menu" @click="insertUnderline">插入填空符</button>
        </div>
        <SvgIcon name="setting" class="easy-form-setting-icon" @click="showSettings = true"/>
      </div>
      <p class="easy-form-set-switch" v-if="isRequiredShow">
        <span class="easy-form-tit">是否必填</span>
        <Switch @change="()=>emit('update:modelValue',propsModelValue)" size="small"
                v-model:checked="propsModelValue.required"></Switch>
      </p>
    </div>
    <!-- 遮罩层 -->
    <div v-if="showSettings" class="easy-form-overlay">
      <div class="easy-form-settings-dialog">
        <div class="easy-form-dialog-content">
          <h3>编辑内容</h3>
          <hr/>
          <div class="easy-form-fill-input" tabindex="0">
            {{ editableContent }}
          </div>
          <table class="easy-form-settings-table">
            <thead>
            <tr>
              <th>填空序号</th>
              <th>内容限制</th>
              <th>范围</th>
              <th>此空必填</th>
            </tr>
            </thead>
            <tbody v-if="underlines.length > 0">
            <tr v-for="(underline, index) in underlines" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <select class="easy-form-select" v-model="underline.type" @click.stop
                        @change="() => updateUnderline(index, 'type', underline.type)">
                  <option v-for="item in selectOptions" :key="item.id" :value="item.name">{{ item.name }}</option>
                </select>
              </td>
              <td>
                <span>最多填写<input @change="() => updateUnderline(index, 'maxLength', underline.maxLength)"
                                     class="easy-form-ranger" type="text" v-model="underline.maxLength" @click.stop/>字</span>
              </td>
              <td>
                <input type="checkbox" @change="() => updateUnderline(index, 'required', underline.required)"
                       v-model="underline.required" @click.stop/>
              </td>
            </tr>
            </tbody>
          </table>
          <p v-if="underlines.length === 0" style="text-align: center;margin: 40px auto">
            请先添加填空符
          </p>
        </div>
        <div class="easy-form-dialog-footer">
          <button class="easy-form-dialog-footer-btn " @click="showSettings = false">取消</button>
          <button class="easy-form-dialog-footer-btn easy-form-footer-btn" @click="showSettings = false">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps, nextTick, onMounted, type PropType, ref, watch} from 'vue';
import SvgIcon from "@/package/svg-icon/index.vue";
import Switch from "@/package/common/Switch.vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      title: string;
      content: string;
      underlines: { index: number; type: string; maxLength: string; required: boolean; }[];
      required: boolean;
      error: string
    }>,
    default: () => ({
      title: '请填写以下内容',
      content: '姓名___年龄___岁,联系方式___',
      underlines: [],
      required: false,
      error: ''
    })
  },
  maxLength: {
    type: [Number, String],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  isRequiredShow: {
    type: Boolean,
    default: true
  },
});
const emit = defineEmits(['update:modelValue', 'blurTitle', 'focusTitle', 'inputTitle']);
const isFocused = ref(false);
const editTable = ref(false);
const showMenu = ref(false);
const showSettings = ref(false);
const localTitle = ref(props.modelValue.title);
const editableContent = ref(props.modelValue.content);
const propsModelValue = ref({
  required: props.modelValue.required
})
interface UnderlinesData{
  index: number | string;
  type: string;
  maxLength: string;
  required: boolean;
}
const underlines = ref<UnderlinesData[]>(props.modelValue.underlines)

const selectOptions = ref<{ id: number; name: string }[]>([
  {id: 1, name: '不限'},
  {id: 2, name: '数字'},
  {id: 3, name: '字母'},
  {id: 4, name: '中文'},
  {id: 5, name: 'Email'},
  {id: 6, name: '手机号码'},
])

function watchTitleInput(title: string, event: Event) {
  if (props.maxLength && title.length > parseInt(props.maxLength.toString(), 10)) {
    localTitle.value = title.substring(0, parseInt(props.maxLength as string, 10));
  }
  emit('update:modelValue', {
    title: localTitle.value,
    content: editableContent.value,
    underlines: underlines.value,
    required: propsModelValue.value.required,
    error: ''
  });
  emit('inputTitle', localTitle.value, event);
}

const handleClear = () => {
  localTitle.value = '';
  emit('update:modelValue', {
    title: '',
    content: editableContent.value,
    underlines: underlines.value,
    required: propsModelValue.value.required,
    error: ''
  });
};

function updateEditableContent() {
  nextTick(() => {
    const editTableId = document.getElementById('editTableId');
    if (editTableId) {
      editableContent.value = editTableId.textContent || editTableId.innerText;
      emit('update:modelValue', {
        title: localTitle.value,
        content: editableContent.value,
        underlines: underlines.value,
        required: propsModelValue.value.required,
        error: ''
      });
    }
  });
}

function insertUnderline() {
  const selection = window.getSelection();
  if (selection && selection.rangeCount) {
    const range = selection.getRangeAt(0);
    // 插入下划线
    const textNode = document.createTextNode('___');
    range.deleteContents();
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    showMenu.value = false;
    updateEditableContent();

    // 更新下划线信息到数组
    const newUnderlineCount = countUnderlines(editableContent.value);
    if (newUnderlineCount > underlines.value.length) {
      const newUnderline = {
        index: `${newUnderlineCount}`,
        type: '不限',
        maxLength: '',
        required: false,
      };
      underlines.value = [...underlines.value, newUnderline];
    }

    emit('update:modelValue', {
      title: localTitle.value,
      content: editableContent.value,
      underlines: underlines.value,
      required: propsModelValue.value.required
    });
  }
}

function countUnderlines(content: string): number {
  return (content.match(/_+/g) || []).length;
}

// 防抖函数
function debounce(func: (...args: any[]) => void, delay: number) {
  let timer: number | null = null;
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
      timer = null;
    }, delay);
  };
}

// 防抖后的更新函数
const debouncedUpdateUnderlines = debounce((newContent: string) => {
  const newUnderlineCount = countUnderlines(newContent);
  if (newUnderlineCount !== underlines.value.length) {
    const newUnderlines = Array.from({ length: newUnderlineCount }, (_, index) => {
      const existing = underlines.value[index] || {};
      return {
        index: `${index + 1}`,
        type: existing.type || '不限',
        maxLength: existing.maxLength || '',
        required: existing.required || false,
      };
    });
    underlines.value = newUnderlines;
    emit('update:modelValue', {
      title: localTitle.value,
      content: editableContent.value,
      underlines: newUnderlines,
      required: propsModelValue.value.required,
      error: ''
    });

  }
}, 500);

watch(
    () => props.modelValue.content,
    (newContent) => {
      updateEditableContent()
      debouncedUpdateUnderlines(newContent);
    },
    { immediate: true }
);

watch(
    () => showSettings.value,
    () => {
      updateEditableContent();
      debouncedUpdateUnderlines(props.modelValue.content);
    }
);

onMounted(() => {
  const underlineCount = countUnderlines(props.modelValue.content);
  underlines.value = Array(underlineCount).fill(null).map((_, index) => ({
    index: `${index + 1}`,
    type: '不限',
    maxLength: '',
    required: false,
  }));
  emit('update:modelValue', {
    title: localTitle.value,
    content: editableContent.value,
    underlines: underlines.value,
    required: propsModelValue.value.required
  });
});

function updateUnderline(index: number, field: string, value: number | string | boolean) {
  const newUnderlines = [...underlines.value];
  newUnderlines[index] = {...newUnderlines[index], [field]: value};
  underlines.value = newUnderlines; // 更新本地状态
  emit('update:modelValue', {
    title: localTitle.value,
    content: editableContent.value,
    underlines: newUnderlines,
    required: propsModelValue.value.required
  });
}

watch(() => props.modelValue.underlines, (newUnderlines) => {
  underlines.value = newUnderlines;
}, {deep: true});
</script>
<style lang="less" scoped>
.easy-form-focused {
  border-color: var(--easy-form-border-color-component-2) !important;
  transition: border 0.3s ease;
}

.easy-form-box {
  width: 100%;
  height: 100%;
  padding: var(--easy-form-item-padding-component);
  background-color: var(--easy-form-component-background);
  border: 1px solid transparent;
  border-radius: var(--easy-form-border-radius-component);
  outline: none;
  box-shadow: 0 6px 12px 0 rgb(0 0 0 / 10%);

  .easy-form-label {
    width: 100%;
  }

  .easy-form-fill-title {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .easy-form-serial-number {
      width: 35px;
      margin: auto;
    }

    .easy-form-fill-title-value {
      flex: 1;
    }
  }

  .easy-form-box-content {
    width: 100%;
    padding: var(--easy-form-select-padding-component);
    color: var(--easy-form-color-text-component-1);
    font-size: 16px;
    background: var(--easy-form-input-bg-component);
    border: 1px dashed transparent;
    border-radius: 4px;

    &:hover {
      border: 1px dashed #ccc;
    }

    &:focus {
      background: rgb(241 243 246 / 50%);
      border: 1px dashed transparent;
      outline: none;
    }
  }

  .easy-form-fill-input {
    box-sizing: border-box;
    width: calc(100% - 35px);
    margin-top: 5px;
    margin-left: 35px;
    padding: 10px 12px;
    overflow: hidden;
    font-size: 14px;
    border: 1px dashed transparent;
    border-radius: 4px;
  }

  .easy-form-error {
    box-sizing: border-box;
    padding: 5px 33px;
    color: red;
    font-size: 12px;
  }

  #editTableId {
    &:focus {
      background: rgb(241 243 246 / 50%);
      border: 1px dashed #ccc;
      outline: none;
    }

    &:hover {
      border: 1px dashed #ccc;
    }
  }

  .easy-form-content {
    position: relative;
    width: 70%;

    .easy-form-setting-icon {
      position: absolute;
      top: 24px;
      right: -24px;
      cursor: pointer;
    }

    .easy-form-context-menu {
      margin-left: 35px;
      color: #757575;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }

  .easy-form-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background-color: rgb(0 0 0 / 50%);
  }

  .easy-form-settings-dialog {
    position: relative;
    top: 50%;
    left: 50%;
    z-index: 10000;
    width: 900px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 10px rgb(0 0 0 / 50%);
    transform: translate(-50%, -50%);

    .easy-form-dialog-footer {
      position: absolute;
      right: 20px;
      bottom: 10px;
    }
  }

  .easy-form-dialog-content {
    margin-bottom: 40px;
  }

  .easy-form-settings-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;

    th,
    td {
      padding: 8px;
      text-align: left;
      border: 1px solid #ddd;
    }

    th {
      background-color: #f2f2f2;
    }
  }

  .easy-form-dialog-footer-btn {
    width: 77px;
    height: 28px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .easy-form-footer-btn {
    margin-left: 10px;
    color: white;
    background-color: #2672ff;
  }

  .easy-form-ranger {
    width: 50px;
    padding: 4px 6px;
    margin: 4px;

    &:focus {
      border: 1px solid #2672ff;
      outline: none;
    }
  }

  .easy-form-select {
    width: 80px;
    height: 26px;
    line-height: 26px;

    &:focus {
      border: 1px solid #2672ff;
      outline: none;
    }
  }
}

@media screen and (width <= 768px) {
  .easy-form-settings-dialog {
    width: 85vw !important;
  }
}
</style>
