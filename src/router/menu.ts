export const menu = [
    {
        path: '/radio',
        name: 'Radio',
        meta: {
            label: '单选'
        },
        redirect: '/radio/configuration',
        children: [
            {
                path: 'configuration',
                name: 'RadioConfiguration',
                component: () => import('@/views/pages/radio/radioConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'RadioPreview',
                component: () => import('@/views/pages/radio/radioPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/checkBox',
        name: 'CheckBox',
        meta: {
            label: '多选'
        },
        redirect: '/checkBox/configuration',
        children: [
            {
                path: 'configuration',
                name: 'CheckBoxConfiguration',
                component: () => import('@/views/pages/checkBox/checkBoxConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'CheckboxPreview',
                component: () => import('@/views/pages/checkBox/checkBoxPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/nps',
        name: 'NPS',
        meta: {
            label: 'NPS'
        },
        redirect: '/nps/configuration',
        children: [
            {
                path: 'configuration',
                name: 'NPSConfiguration',
                component: () => import('@/views/pages/NPS/NPSConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'NPSPreview',
                component: () => import('@/views/pages/NPS/NPSPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/numberInput',
        name: 'NumberInput',
        meta: {
            label: '数字输入框'
        },
        redirect: '/numberInput/configuration',
        children: [
            {
                path: 'configuration',
                name: 'NumberInputConfiguration',
                component: () => import('@/views/pages/number-input/numberInputConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'NumberInputPreview',
                component: () => import('@/views/pages/number-input/numberInputPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/singleFill',
        name: 'SingleFill',
        meta: {
            label: '填空'
        },
        redirect: '/singleFill/configuration',
        children: [
            {
                path: 'configuration',
                name: 'SingleFillConfiguration',
                component: () => import('@/views/pages/singleFill/singleFillConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'SingleFillPreview',
                component: () => import('@/views/pages/singleFill/singleFillPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/multipleFill',
        name: 'MultipleFill',
        meta: {
            label: '多项填空'
        },
        redirect: '/multipleFill/configuration',
        children: [
            {
                path: 'configuration',
                name: 'MultipleConfiguration',
                component: () => import('@/views/pages/multipleFill/multipleFillConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'MultiplePreview',
                component: () => import('@/views/pages/multipleFill/multipleFillPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/textarea',
        name: 'TextArea',
        meta: {
            label: '文本域'
        },
        redirect: '/textarea/configuration',
        children: [
            {
                path: 'configuration',
                name: 'TextAreaConfiguration',
                component: () => import('@/views/pages/textarea/textAreaConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'TextAreaPreview',
                component: () => import('@/views/pages/textarea/textAreaPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/pullDown',
        name: 'PullDown',
        meta: {
            label: '下拉'
        },
        redirect: '/pullDown/configuration',
        children: [
            {
                path: 'configuration',
                name: 'pullDownConfiguration',
                component: () => import('@/views/pages/pullDown/pullDownConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'pullDownPreview',
                component: () => import('@/views/pages/pullDown/pullDownPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/multiplePullDown',
        name: 'MultiplePullDown',
        meta: {
            label: '多级下拉'
        },
        redirect: '/multiplePullDown/configuration',
        children: [
            {
                path: 'configuration',
                name: 'multiplePullDownConfiguration',
                component: () => import('@/views/pages/multiplePullDown/multiplePullDownConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'multiplePullDownPreview',
                component: () => import('@/views/pages/multiplePullDown/multiplePullDownPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/signature',
        name: 'Signature',
        meta: {
            label: '电子签名'
        },
        redirect: '/signature/configuration',
        children: [
            {
                path: 'configuration',
                name: 'signatureConfiguration',
                component: () => import('@/views/pages/signature/signatureConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'signaturePreview',
                component: () => import('@/views/pages/signature/signaturePreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/sort',
        name: 'Sort',
        meta: {
            label: '排序'
        },
        redirect: '/sort/configuration',
        children: [
            {
                path: 'configuration',
                name: 'sortConfiguration',
                component: () => import('@/views/pages/sort/sortConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'sortPreview',
                component: () => import('@/views/pages/sort/sortPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/evaluate',
        name: 'Evaluate',
        meta: {
            label: '评价'
        },
        redirect: '/evaluate/configuration',
        children: [
            {
                path: 'configuration',
                name: 'evaluateConfiguration',
                component: () => import('@/views/pages/evaluate/evaluateConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'evaluatePreview',
                component: () => import('@/views/pages/evaluate/evaluatePreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/divider',
        name: 'Divider',
        meta: {
            label: '分割线'
        },
        redirect: '/divider/configuration',
        children: [
            {
                path: 'configuration',
                name: 'dividerConfiguration',
                component: () => import('@/views/pages/divider/dividerConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'dividerPreview',
                component: () => import('@/views/pages/divider/dividerPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/datePacker',
        name: 'DatePacker',
        meta: {
            label: '日期选择器'
        },
        redirect: '/datePacker/configuration',
        children: [
            {
                path: 'configuration',
                name: 'datePackerConfiguration',
                component: () => import('@/views/pages/datePicker/datePickerConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'datePackerPreview',
                component: () => import('@/views/pages/datePicker/datePickerPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/uploadImage',
        name: 'UploadImage',
        meta: {
            label: '图片选择'
        },
        redirect: '/uploadImage/configuration',
        children: [
            {
                path: 'configuration',
                name: 'uploadImageConfiguration',
                component: () => import('@/views/pages/uploadImage/uploadImageConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'uploadImagePreview',
                component: () => import('@/views/pages/uploadImage/uploadImagePreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/uploadFile',
        name: 'UploadFile',
        meta: {
            label: '文件收集'
        },
        redirect: '/uploadFile/configuration',
        children: [
            {
                path: 'configuration',
                name: 'uploadFileConfiguration',
                component: () => import('@/views/pages/uploadFile/uploadFileConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'uploadFilePreview',
                component: () => import('@/views/pages/uploadFile/uploadFilePreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/receivingInformation',
        name: 'ReceivingInformation',
        meta: {
            label: '收货信息'
        },
        redirect: '/receivingInformation/configuration',
        children: [
            {
                path: 'configuration',
                name: 'receivingInformationConfiguration',
                component: () => import('@/views/pages/receivingInformation/receivingInformationConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'receivingInformationPreview',
                component: () => import('@/views/pages/receivingInformation/receivingInformationPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/timeSelector',
        name: 'TimeSelector',
        meta: {
            label: '时间选择器'
        },
        redirect: '/timeSelector/configuration',
        children: [
            {
                path: 'configuration',
                name: 'timeSelectorConfiguration',
                component: () => import('@/views/pages/timeSelector/timeSelectorConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'timeSelectorPreview',
                component: () => import('@/views/pages/timeSelector/timeSelectorPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    }, {
        path: '/matrixFill',
        name: 'MatrixFill',
        meta: {
            label: '矩阵填空'
        },
        redirect: '/matrixFill/configuration',
        children: [
            {
                path: 'configuration',
                name: 'matrixFillConfiguration',
                component: () => import('@/views/pages/matrixFill/matrixConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'matrixFillPreview',
                component: () => import('@/views/pages/matrixFill/matrixPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/matrixScoring',
        name: ' MatrixScoring',
        meta: {
            label: '矩阵打分'
        },
        redirect: '/matrixScoring/configuration',
        children: [
            {
                path: 'configuration',
                name: 'matrixScoringConfiguration',
                component: () => import('@/views/pages/matrixScoring/scoringConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'matrixScoringPreview',
                component: () => import('@/views/pages/matrixScoring/scoringPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/horizontalFill',
        name: ' HorizontalFill',
        meta: {
            label: '横向填空'
        },
        redirect: '/horizontalFill/configuration',
        children: [
            {
                path: 'configuration',
                name: 'horizontalFillConfiguration',
                component: () => import('@/views/pages/horizontalFill/horizontalFillConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'horizontalFillPreview',
                component: () => import('@/views/pages/horizontalFill/horizontalFillPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    },
    {
        path: '/matrixSelection',
        name: ' MatrixSelection',
        meta: {
            label: '矩阵选择'
        },
        redirect: '/matrixSelection/configuration',
        children: [
            {
                path: 'configuration',
                name: 'matrixSelectionConfiguration',
                component: () => import('@/views/pages/matrixSelection/selectionConfiguration.vue'),
                meta: {
                    label: '配置'
                }
            },
            {
                path: 'preview',
                name: 'matrixSelectionPreview',
                component: () => import('@/views/pages/matrixSelection/selectionPreview.vue'),
                meta: {
                    label: '预览'
                }
            }
        ]
    }
]