<script setup lang="ts">
import Dashboard from './components/Dashboard.vue'
import Members from './components/Members.vue'
import Costs from './components/Costs.vue'
import Payments from './components/Payments.vue'
import Settings from './components/Settings.vue'
</script>

<template>
  <el-tabs active-name="People">
    <el-tab-pane label="People" name="People">
      <Members :data="data" />
    </el-tab-pane>
    <el-tab-pane label="Expenses" name="Expenses">
      <Costs :data="data" />
    </el-tab-pane>
    <el-tab-pane label="Payments" name="Payments">
      <Payments :data="data" />
    </el-tab-pane>
    <el-tab-pane label="Settings" name="Settings">
      <Settings :data="data" />
    </el-tab-pane>
  </el-tabs>
</template>

<style>
  #app {
    font-family: "Open Sans", Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

<script lang="ts">

const data = {
  members: {
    "P0001": { num: "P0001", owed: 0, owedShare: 0, shouldPay: false, name: "Pyotr Kropotkin" },
    "P0002": { num: "P0002", owed: 0, owedShare: 0, shouldPay: false, name: "Emma Goldman" },
    "P0003": { num: "P0003", owed: 0, owedShare: 0, shouldPay: false, name: "Henry David Thoreau" },
    "P0004": { num: "P0004", owed: 0, owedShare: 0, shouldPay: false, name: "Voltairine de Cleyre" },
    "P0005": { num: "P0005", owed: 0, owedShare: 0, shouldPay: false, name: "Leo Tolstoy" },
    "P0006": { num: "P0006", owed: 0, owedShare: 0, shouldPay: false, name: "Ursula K. Le Guin" },
    "P0007": { num: "P0007", owed: 0, owedShare: 0, shouldPay: false, name: "Errico Malatesta" },
    "P0008": { num: "P0008", owed: 1.19, owedShare: 0.19, shouldPay: true, name: "Virginia Bolten" },
    "P0009": { num: "P0009", owed: 0, owedShare: 0, shouldPay: false, name: "Murray Bookchin" },
  }
}
data.payments = [
  {
    num: "P0001",
    from: data.members["P0001"],
    to: data.members["P0008"],
    amount: 0.50,
    description: "Put the money under the doormat",
    confirmed: true,
  },
  {
    num: "P0002",
    from: data.members["P0001"],
    to: data.members["P0008"],
    amount: 0.50,
    description: "Hid the money in a baguette",
    confirmed: false,
  }
]
data.costs = [
  {
    num: "E0001",
    member: data.members["P0008"],
    amount: 2.38,
    unpaid: 0.19,
    description: "Domain names",
    state: "SPENT",
    approvals: [
      "P0008",
      "P0001",
    ]
  },
  {
    num: "E0002",
    member: data.members["P0001"],
    amount: 444.66,
    unpaid: 444.66,
    description: "Asset pack for Unity",
    state: "PROPOSED",
    approvals: [
    ]
  },
]

export default {
  data() {
    return {
      data: data
    }
  }
}
</script>
