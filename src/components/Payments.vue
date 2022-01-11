<script setup lang="ts">
import { money} from "@/format"
import { ref} from "vue"
defineProps(["data"])
const confirmDrawer = ref(false)
const selectedPayment = ref(null)
</script>

<template>
  <el-table :data="data.payments">
    <el-table-column label="Num" prop="num" width="64" />
    <el-table-column label="From" prop="from.name" width="192" />
    <el-table-column label="To" prop="to.name" width="192" />
    <el-table-column label="Amount" prop="amount" width="128" :formatter="(r, c, v, i) => money(v)" />
    <el-table-column label="Settled" prop="confirmed" width="128" />
    <el-table-column label="Description" prop="description" />
    <el-table-column label="Actions" width="256">
      <template #default="props">
        <el-button size="mini" :disabled="props.row.confirmed" @click="selectedPayment = props.row; confirmDrawer = true">Settle</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-model="confirmDrawer" title="Confirm payment">
    <div v-if="selectedPayment !== null">
      <p>
        By settling a payment, you are confirming that {{ selectedPayment.from.name }} no longer owes
        you the {{ money(selectedPayment.amount) }} for this payment.
      </p>
      <p>
        Use this no matter the reason for settling:
        whether they've paid you, somebody else has paid you, the payment has been cancelled out by money you owe <em>them</em>, or the debt has simply been forgiven.
      </p>
      <el-form :label-width="128">
        <el-button type="primary">Settle</el-button>
      </el-form>
    </div>
  </el-drawer>
</template>
