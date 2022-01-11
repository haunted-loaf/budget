<script setup lang="ts">
import { money} from "@/format"
import { ref } from "vue";
defineProps(["data"])
const approveDrawer = ref(false)
const payDrawer = ref(false)
const selectedExpense : any = ref(null)
const floorMoney = (amount: number) => Math.floor(amount * 100) / 100
function divideMoney (amount: number, ways: number) : [number, number | null] {
  const min = floorMoney(amount / ways);
  const max = min + amount - ways * min;
  if (max > min)
    return [min, max]
  else
    return [min, null]
}
</script>

<template>
  <el-table :data="data.costs">
    <el-table-column type="expand">
      <template #default="props">
        <div v-if="props.row.approvals.length === 0">
        <strong>Not approved by anyone</strong>.
        </div>
        <div v-else="props.row.approvals.length !== 0">
        <strong>Approved by</strong>: {{ props.row.approvals.join(", ") }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Num" prop="num" width="64" />
    <el-table-column label="Person" prop="member.name" width="192" />
    <el-table-column label="Amount" prop="amount" width="128" :formatter="(r, c, v, i) => money(v)" />
    <el-table-column label="Outstanding" prop="unpaid" width="128" :formatter="(r, c, v, i) => money(v)" />
    <el-table-column label="State" prop="state" width="128" />
    <el-table-column label="Description" prop="description" />
    <el-table-column label="Approvals" prop="approvals.length" width="128" />
    <el-table-column label="Actions" width="256">
      <template #default="props">
        <el-button @click="selectedExpense = props.row; approveDrawer = true" size="mini">Approve</el-button>
        <el-button @click="selectedExpense = props.row; payDrawer = true" size="mini">Pay</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-model="approveDrawer" title="Approve expense">
    <div v-if="selectedExpense !== null">
      <p v-if="selectedExpense.state === 'PROPOSED'">
        This is a proposed expense. No money has been spent yet. {{ selectedExpense.member.name }} might
        not spend anything until the full amount has been approved.
      </p>
      <p v-if="selectedExpense.state === 'SPENT'">
        This is a past expense. The money has been spent.
      </p>
      <p>
        By approving the expense you are indicating to {{ selectedExpense.member.name }} that you
        are willing to reimburse them for some portion of the {{ money(selectedExpense.unpaid) }}
        still outstanding.
      </p>
      <p>
        By default the final amount owed will be split evenly between each person that
        approves the expense. If four people approve the expense, then each will owe {{ money(selectedExpense.unpaid / 4, 3) }}.
        You can also limit the total amount you're willing to consider paying.
      </p>
      <el-form :label-width="128">
        <el-form-item label="Max. amount">
          <el-slider :min="0" :max="selectedExpense.unpaid" :step="0.01" :model-value="selectedExpense.unpaid"/>
        </el-form-item>
        <el-button type="primary" >Confirm</el-button>
      </el-form>
    </div>
  </el-drawer>
  <el-drawer v-model="payDrawer" title="Record payment">
    <div v-if="selectedExpense !== null">
      <p>
        By recording a payment, you are promising to pay {{ selectedExpense.member.name }} some money.
      </p>
      <p>
        <strong>This system does not actually take and transfer payments. You must still do that yourself.</strong>
      </p>
      <el-form :label-width="128">
        <el-form-item label="Notes">
          <el-input />
        </el-form-item>
        <el-form-item label="Amount">
          <el-slider :min="0" :max="selectedExpense.unpaid" :step="0.01" :model-value="selectedExpense.unpaid" />
        </el-form-item>
        <el-button type="primary">Confirm</el-button>
      </el-form>
    </div>
  </el-drawer>
</template>
