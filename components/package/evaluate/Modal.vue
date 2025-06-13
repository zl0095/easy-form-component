<template>
  <div v-if="showModal" class="easy-form-edit-modal">
    <div class="easy-form-edit-content">
      <div class="easy-form-edit-top">
        <div class="easy-form-edit-top-title">编辑选项</div>
        <SvgIcon :height="15" :width="15" class="easy-form-icon" name="error" @click="() => (showModal = false)"></SvgIcon>
      </div>
      <div class="easy-form-edit-disposition">
        <div class="easy-form-star-level">
          <div v-for="(item, index) in initOptions" :key="index" class="easy-form-start-level-item">
            <SvgIcon v-if="!item.checked" :height="30" :width="30" name="evaluate"></SvgIcon>
            <SvgIcon v-else :height="30" :width="30" name="evaluate_active"></SvgIcon>
          </div>
        </div>
        <div class="easy-form-label">"{{ initOptions[activeTab === -1 ? computedActiveTab : activeTab]?.label }}" </div>
        <div class="easy-form-desc">
          <div v-for="(item,index) in Array.from((new Set(desc.split('\n').filter((i:string)=>i.length>0))))" :key="index" class="easy-form-desc-item">
            <SvgIcon v-if="item === '写评价'" :heigth="15" :width="15" class="easy-form-write" name="edit_evaluate"></SvgIcon>
            {{ item }}
          </div>
          <div class="easy-form-desc-item">
            <SvgIcon :heigth="15" :width="15" class="easy-form-write" name="edit_evaluate"></SvgIcon>
            写评价
          </div>
        </div>
        <div class="easy-form-tabs">
          <div v-for="(item, index) in 5" :key="index" :class="['easy-form-tabs-item', index === (activeTab === -1 ? computedActiveTab : activeTab) ? 'easy-form-tab-option-active' : '']" @click="() => toggleTab(index)"> {{ item }}分 </div>
        </div>
        <div class="easy-form-tabs-container">
          <div v-for="(_, index) in initOptions" :key="index" :class="['easy-form-edit-container', index === (activeTab === -1 ? computedActiveTab : activeTab) ? 'easy-form-selected' : '']">
            <label>
              <i>分值说明</i>
              <span>（最多可输入10个字）</span>
            </label>
            <input id="scoreDescInput-1" v-model="initOptions[index].label" class="easy-form-score-desc-edit" maxlength="10" type="text" />
            <label>
              <i>标签设置</i>
              <span>（每行对应一个标签，可复制其他选项标签）</span>
            </label>
            <textarea v-model="desc" class="easy-form-label-list-edit"></textarea>
          </div>
        </div>
        <div class="easy-form-button">
          <div class="easy-form-cancel easy-form-btn" @click="cancel">取消</div>
          <div class="easy-form-save easy-form-btn" @click="save">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import SvgIcon from "@/package/svg-icon/index";

const props = defineProps({
  options: {
    type: Array<{
      label: string;
      desc: string[];
      checked?: boolean;
    }>,
    default: () => [],
  },
});

const emit = defineEmits(['update:options']);

const initOptions = ref<Array<{
  label: string;
  desc: string[];
  checked?: boolean;
}>>(JSON.parse(JSON.stringify(props.options)));

const showModal = ref(false);
const activeTab = ref(-1);
const computedActiveTab = computed({
  get: () => props.options.filter((item: { label: string; desc: string[]; checked?: boolean }) => item.checked).length - 1,
  set: (index) => {
    activeTab.value = index;
    return index;
  },
});

const desc = computed({
  get: () => initOptions.value[activeTab.value === -1 ? computedActiveTab.value : activeTab.value].desc.join('\n'),
  set: (val) => {
    initOptions.value[activeTab.value === -1 ? computedActiveTab.value : activeTab.value].desc = val.split('\n');
    return val;
  },
});

function toggleTab(index: number) {
  computedActiveTab.value = index;
  initOptions.value.forEach(
      (
          option: {
            label: string;
            desc: string[];
            checked?: boolean;
          },
          optionIndex: number
      ) => {
        if (index < optionIndex) {
          option.checked = false;
        } else {
          option.checked = true;
        }
      }
  );
}

function cancel() {
  showModal.value = false;
  activeTab.value = -1;
}

function save() {
  emit('update:options', JSON.parse(JSON.stringify(initOptions.value)));
  showModal.value = false;
  activeTab.value = -1;
}

function show() {
  showModal.value = true;
  initOptions.value = JSON.parse(JSON.stringify(props.options));
}

defineExpose({
  show,
});
</script>

<style lang="less" scoped>
.easy-form-edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: var(--easy-form-background-component-6);

  .easy-form-edit-content {
    box-sizing: border-box;
    width: 700px;
    padding: 14px 0;
    background: var(--easy-form-component-background);
    border-radius: var(--easy-form-border-radius-component-1);

    .easy-form-edit-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 20px 14px;
      font-size: 16px;
      border-bottom: 1px solid var(--easy-form-border-color-component-1);

      .easy-form-edit-top-title{
        color: var(--easy-form-color-text-component-1);
      }

      .easy-form-icon {
        color: #aaa;
        cursor: pointer;
      }
    }

    .easy-form-edit-disposition {
      box-sizing: border-box;
      padding: var(--easy-form-item-padding-component);

      .easy-form-star-level {
        display: flex;
        align-items: center;
        justify-content: center;

        .easy-form-start-level-item {
          margin-right: 15px;

          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }

      .easy-form-label {
        margin: 5px 0 10px;
        color: #ffbe3a;
        font-size: 12px;
        text-align: center;
      }

      .easy-form-desc {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        .easy-form-desc-item {
          display: flex;
          align-items: center;
          height: 22px;
          margin-right: 6px;
          margin-bottom: 5px;
          padding: 3px 6px;
          color: #aaa;
          font-size: 12px;
          line-height: 12px;
          white-space: nowrap;
          border: 1px solid #eaeaea;
          border-radius: 2px;

          .easy-form-write {
            margin-right: 5px;
          }

          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }

      .easy-form-tabs {
        display: flex;
        align-items: center;
        margin-top: 50px;

        .easy-form-tabs-item {
          box-sizing: border-box;
          width: 67px;
          height: 28px;
          color: var(--easy-form-color-text-component-1);
          font-size: 12px;
          line-height: 28px;
          text-align: center;
          background: #fcfcfc;
          background: var(--easy-form-input-bg-component-1);
          border-top: 1px solid #eee;
          border-left: 1px solid #eee;
          cursor: pointer;

          &:hover {
            color: var(--easy-form-primary-background-component);
          }

          &:nth-last-child(1) {
            border-right: 1px solid #eee;
          }

          &.easy-form-tab-option-active {
            color: var(--easy-form-primary-background-component);
            border-top: 2px solid #2672ff;
          }
        }
      }

      .easy-form-tabs-container {
        box-sizing: border-box;
        padding: var(--easy-form-item-padding-component);
        border: 1px solid #eee;

        .easy-form-edit-container {
          display: none;

          &.easy-form-selected {
            display: block;
          }

          label {
            font-size: 12px;

            i{
              color: var(--easy-form-color-text-component-1) !important;
              font-style: normal;
            }

            span {
              color: #aaa !important;
            }
          }

          .easy-form-score-desc-edit {
            box-sizing: border-box;
            width: 100%;
            height: 32px;
            margin: 8px 0 11px;
            padding: 10px;
            color: var(--easy-form-color-text-component-1);
            background: var(--easy-form-input-bg-component);
            border: 1px solid #d8d8d8;
            border-radius: 2px;
            outline: none;

            &:focus {
              border-color: var(--easy-form-primary-background-component);
            }
          }

          .easy-form-label-list-edit {
            box-sizing: border-box;
            width: 100%;
            height: 142px;
            margin-top: 8px;
            padding: 10px;
            color: var(--easy-form-color-text-component-1);
            font-size: 12px;
            font-family: '微软雅黑', serif;
            white-space: pre-line;
            background: var(--easy-form-input-bg-component);
            border: 1px solid #d8d8d8;
            border-radius: 2px;
            outline: none;
            resize: none;

            &:focus {
              border-color: var(--easy-form-primary-background-component);
            }
          }
        }
      }

      .easy-form-button {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .easy-form-btn {
          box-sizing: content-box;
          width: 84px;
          height: 30px;
          margin-top: 20px;
          color: var(--easy-form-color-text-component-5);
          font-size: 12px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #d8d8d8;
          border-radius: 2px;
          cursor: pointer;

          &.easy-form-save {
            margin-left: 10px;
            color: #fff;
            background: var(--easy-form-primary-background-component);
            border-color: var(--easy-form-primary-background-component);
          }
        }
      }
    }
  }
}
</style>
