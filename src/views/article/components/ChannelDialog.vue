<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="30%"
    :before-close="onClose"
  >
    <el-form
      :model="formModel"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input text v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input text v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit"> 确认 </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useAddChannelService, useUpdateChannelInfoService } from '@/api'

const formRef = ref()
const formModel = ref({ id: '', cate_name: '', cate_alias: '' })
const rules = ref({
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{1,15}$/i,
      message: '分类别名必须是1-15位的大小写字母和数字',
      trigger: 'blur'
    }
  ]
})

const isEdit = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('')

// props获取父组件暴露的属性、方法
const emit = defineEmits(['updateList'])

const onSubmit = async () => {
  // 捕获error
  try {
    await formRef.value.validate()
    if (isEdit.value) {
      await useUpdateChannelInfoService(formModel.value)
      dialogVisible.value = false
      ElMessage.success('编辑分类成功')
    } else {
      await useAddChannelService(formModel.value)
      dialogVisible.value = false
      ElMessage.success('添加分类成功')
    }

    emit('updateList')
  } catch (error) {
    return
  }
}

const onCancel = () => {
  hideDialog()
}

const onClose = () => {
  hideDialog()
}

function hideDialog() {
  dialogVisible.value = false
}
function showDialog() {
  dialogVisible.value = true
}

const open = (row) => {
  showDialog()
  // 由于row是代理，需要解包赋值，防止编辑时直接改变原本分类内容
  formModel.value = { ...row } || { id: '', cate_name: '', cate_alias: '' }
  isEdit.value = row ? true : false
  dialogTitle.value = row ? '编辑分类' : '添加分类'
}

// 向父组件暴露子组件属性、方法（父组件通过子组件实例调用对应属性、方法）
defineExpose({
  open
})
</script>
