<template>
  <modification-update
    :statusEdit="false"
  />
</template>

<script>
import ModificationUpdate from './update.vue'

export default {
  data() {
    return {}
  },
  components: {
    ModificationUpdate,
  },
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
</style>
