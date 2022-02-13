<template>
  <div v-if="variabelTemplate.length > 0">
    <b-button-group
      v-for="(val, index) in variabelTemplate"
      :key="index"
      class="mr-1 mb-1"
    >
      <b-button
        :id="'CL' + index"
        size="sm"
        variant="light"
        class="pl-1 pr-1"
        v-b-tooltip.hover.top="val.name"
        :title="val.name"
      >
        {{ compressText(val.name) }}
      </b-button>
      <b-button
        v-if="buttonCopy"
        v-clipboard:copy="'<<' + val.name + '>>'"
        v-clipboard:success="alertCopy"
        type="button"
        variant="light"
        class="pl-1 pr-1"
        size="sm"
      >
        <feather-icon icon="CopyIcon" />
      </b-button>
    </b-button-group>
  </div>
  <div v-else>
    Tidak ada variabel
  </div>
</template>
<script>
import { BButton, BButtonGroup, VBTooltip } from 'bootstrap-vue'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import CustomNotification from '@/helpers/custom-notification'

export default {
  name: 'ClipBoards',
  components: {
    BButton,
    BButtonGroup,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: ['variabelTemplate', 'buttonCopy'],
  data() {
    return {
      queries: null,
    }
  },
  methods: {
    alertCopy() {
      CustomNotification.notif('success', 'Sukses', 'Berhasil disalin')
    },
    compressText(text) {
      let newText = text
      if (text.length > 20) {
        newText = text.substring(0, 17)
        newText = `${newText}...`
      }
      return newText
    },
  },
}
</script>
