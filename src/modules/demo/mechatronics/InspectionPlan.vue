<template>
  <main-title />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainTitle from "@/components/layout/MainTitle.vue";

export default defineComponent({
  name: "DispatchRecord",
  components: { MainTitle },
  setup() {
    return {};
  },
});
</script>
