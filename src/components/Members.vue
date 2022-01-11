<script setup lang="ts">
import { money} from "@/format"
import { ref } from "vue";
defineProps(["data"])
const payDrawer = ref(false)
const selectedMember: any = ref(null)
</script>

<template>
  <el-table :data="Object.values(data.members)">
    <el-table-column label="Name" prop="name" />
    <el-table-column label="Total Owed" prop="owed" :formatter="(r, c, v, i) => money(v)" />
    <el-table-column label="Your Recommended Payment" prop="owedShare" :formatter="(r, c, v, i) => money(v)" />
    <el-table-column label="Actions">
      <template #default="props">
        <el-button :disabled="!props.row.shouldPay" @click="selectedMember = props.row; payDrawer = true" size="mini">Pay</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-model="payDrawer" title="Record payment">
    <div v-if="selectedMember">
      <p>
        By recording a payment, you are promising to pay {{ selectedMember.name }} some money.
      </p>
      <p>
        <strong>This system does not actually take and transfer payments. You must still do that yourself.</strong>
      </p>
      <el-form :label-width="128">
        <el-form-item label="Expense">
          <el-select :model-value="''">
            <el-option value="" label="(None)" />
            <el-option v-for="item in data.costs.filter((x: any) => x.member.num === selectedMember.num)" :key="item.num" :label="item.description + '(' + money(item.unpaid) + ')'" :value="item.num"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Notes">
          <el-input />
        </el-form-item>
        <el-form-item label="Amount">
          <el-slider :min="0" :max="selectedMember.owedShare" :step="0.01" :model-value="selectedMember.owedShare" />
        </el-form-item>
        <el-button type="primary">Confirm</el-button>
      </el-form>
    </div>
  </el-drawer>
</template>
