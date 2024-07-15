<template>
  <div class="mb-[33px] w-full text-home-green-100">
    <p class="mb-2 text-[14px] font-medium leading-6">空房狀態查詢</p>
    <div class="mb-[6px] border border-home-green-100">
      <VDatePicker
        locale="en"
        v-model.range.number="orderRange"
        :columns="columns"
        :min-date="today"
        :max-date="new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)"
        :select-attribute="attribute"
        :drag-attribute="attribute"
        :disabled-dates="disabledDates"
        :masks="{ weekdays: 'WW' }"
        :attributes="attribute"
        expanded
        borderless
      />
    </div>
    <button
      type="button"
      @click="orderDate.resetOrderRange"
      class="text-[14px] leading-6 text-home-green-50"
    >
      重新選取
    </button>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order.js'
import { useScreens } from 'vue-screen-utils'

const props = defineProps({
  bookedDate: {
    type: Array
  }
})

const orderDate = useOrderStore()
const { today, orderRange } = storeToRefs(orderDate)
const disabledDates = ref([])

const changeBookedDate = () => {
  props.bookedDate.forEach((item) => {
    disabledDates.value.push(item.date)
  })
}

watch(
  () => props.bookedDate,
  () => {
    changeBookedDate()
  },
  { immediate: true }
)

const { mapCurrent } = useScreens({
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px'
})
const columns = mapCurrent({ lg: 2, md: 2 }, 1)

const attribute = ref({
  content: {
    color: '#38470B',
    font: '11px'
  },
  highlight: {
    start: {
      style: {
        backgroundColor: '#38470B'
      },
      contentStyle: {
        color: '#ffffff'
      }
    },
    base: {
      style: {
        backgroundColor: '#949C7C'
      },
      contentStyle: {
        color: '#ffffff'
      }
    },
    end: {
      style: {
        backgroundColor: '#38470B'
      },
      contentStyle: {
        color: '#ffffff'
      }
    }
  }
})
</script>
<style>
.vc-header {
  margin-bottom: 24px;
}
.vc-title {
  font-size: 12px;
  font-weight: bold;
  color: #38470b;
}
.vc-weekdays {
  border-bottom: 1px solid #38470b6d;
  padding-bottom: 10px;
  margin-bottom: 14px;
}
.vc-weekday {
  color: rgba(56, 71, 11, 0.5);
}
.vc-weeks {
  padding: 0 30px;
}
.vc-day-content {
  color: #38470b;
}
.vc-disabled {
  text-decoration: line-through;
}
</style>
