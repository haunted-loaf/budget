<script setup lang="ts">
</script>

<template>
  <el-form :label-width="128">
    <el-form-item label="Your name">
      <el-input model-value="Pyotr Kropotkin" />
    </el-form-item>
    <el-form-item label="Auto-approve">
      <el-input-number :model-value="1" :precision="2" :step="1" :min="0" />
      <div>Auto-approve any expense equal to or less than than this cost.</div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">Apply</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
