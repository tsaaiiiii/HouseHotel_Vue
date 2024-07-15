<template>
  <div class="flex w-full flex-wrap bg-transparent">
    <div
      class="order-1 flex w-full bg-home-green-100 px-10 py-10 lg:px-40 lg:py-16 xl:order-none xl:w-1/3 xl:px-16 xl:py-8"
    >
      <VForm
        class="block w-full justify-center md:flex md:gap-10 lg:block lg:w-full xl:w-60 xl:gap-4"
      >
        <div class="lg:w-full">
          <div
            class="flex w-full justify-center gap-10 md:block lg:flex lg:w-full xl:block xl:w-60"
          >
            <div class="mb-5 w-full">
              <div class="flex items-center gap-5">
                <label for="name" class="mb-1 block text-white">姓名</label>
                <ErrorMessage name="name" class="text-sm text-yellow-500" />
              </div>
              <VField
                name="name"
                type="name"
                rules="required"
                id="name"
                class="h-9 w-full p-2 text-home-gray-150 focus:outline-0"
                label="姓名"
                :initial="true"
                v-model="userInfo.name"
              />
            </div>
            <div class="mb-5 w-full">
              <div class="flex items-center gap-5">
                <label for="phone" class="mb-1 block text-white">電話</label>
                <ErrorMessage name="phone" class="text-sm text-yellow-500" />
              </div>
              <VField
                name="phone"
                type="text"
                id="phone"
                label="電話"
                rules="required|phoneStartingWith09|max:10"
                class="h-9 w-full p-2 text-home-gray-150 focus:outline-0"
                v-model="userInfo.tel"
              />
            </div>
          </div>
          <div
            class="w-full gap-10 sm:block md:block md:justify-center lg:flex lg:w-full xl:block xl:w-60"
          >
            <div class="mb-5 w-full">
              <label for="checkinDate" class="mb-1 block text-white">入住日期</label>
              <div class="w-full">
                <VDatePicker
                  v-model="orderRange.start"
                  :popover="false"
                  :min-date="today"
                  :max-date="new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)"
                  :select-attribute="attribute"
                  :drag-attribute="attribute"
                  :disabled-dates="disabledDates"
                  @click="apiDateFormat"
                  class="h-9 p-2 text-home-gray-150 focus:outline-0"
                  expanded
                  borderless
                >
                  <template #default="{ inputEvents, togglePopover }">
                    <div class="flex w-full lg:w-full xl:w-60">
                      <input
                        :value="userInfo.date[0]"
                        v-on="inputEvents"
                        class="h-9 flex-grow p-2 text-home-gray-150 focus:outline-0"
                      />
                      <button
                        type="button"
                        class="e flex items-center justify-center border-none bg-white"
                        @mousedown="stopPropagation"
                        @click="() => togglePopover()"
                      >
                        <span
                          class="material-symbols-rounded border-none text-3xl text-home-green-100"
                        >
                          arrow_drop_down
                        </span>
                        <IconCalendar class="" />
                      </button>
                    </div>
                  </template>
                </VDatePicker>
              </div>
            </div>
            <div class="mb-5 w-full">
              <label for="checkinDate" class="mb-1 block text-white">退房日期</label>
              <div class="w-full">
                <VDatePicker
                  v-model="orderRange.end"
                  :popover="false"
                  :min-date="today"
                  :max-date="new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)"
                  :select-attribute="attribute"
                  :drag-attribute="attribute"
                  :disabled-dates="disabledDates"
                  class="h-9 p-2 text-home-gray-150 lg:w-64 xl:w-2/3"
                  @click="apiDateFormat"
                  expanded
                  borderless
                >
                  <template #default="{ togglePopover, inputEvents }">
                    <div class="flex w-full lg:w-full xl:w-60">
                      <input
                        :value="userInfo.date[userInfo.date.length - 1]"
                        v-on="inputEvents"
                        class="h-9 flex-grow p-2 text-home-gray-150 focus:outline-0"
                      />
                      <button
                        type="button"
                        class="e flex items-center justify-center border-none bg-white"
                        @mousedown="stopPropagation"
                        @click="() => togglePopover()"
                      >
                        <span
                          class="material-symbols-rounded border-none text-3xl text-home-green-100"
                        >
                          arrow_drop_down
                        </span>
                        <IconCalendar class="" />
                      </button>
                    </div>
                  </template>
                </VDatePicker>
              </div>
            </div>
          </div>
        </div>
        <div class="px-2 pt-16">
          <p class="mb-2 text-sm font-normal text-home-green-50 md:pt-10" v-show="!checkNight">
            {{ allNight + 1 }}天，{{ totalWeekdays }}晚平日與{{ totalWeekends }}晚假日
          </p>
          <p class="text-sm text-yellow-500" v-show="checkNight">請選擇正確日期</p>
          <div class="mb-[10px] h-[1px] w-full bg-home-green-50"></div>
          <div class="mb-4 text-right text-white">
            <p>總計</p>
            <p class="text-[26px]">
              ${{
                roomService.normalDayPrice * totalWeekdays +
                roomService.holidayPrice * totalWeekends
              }}
            </p>
          </div>
          <div class="py-6">
            <button
              class="mb-[18px] w-full border py-2 font-bold text-white hover:text-yellow-500 hover:duration-100 xl:border-none"
              @click="sendButton(false)"
            >
              確認送出
            </button>
            <p class="text-center text-xs text-white">此預約系統僅預約功能，並不會對您進行收費</p>
          </div>
        </div>
      </VForm>
    </div>

    <div class="w-full border border-home-green-100 bg-white pb-3 pl-4 md:pl-8 xl:w-2/3">
      <div class="mt-10 flex cursor-pointer justify-end pr-10" @click="cancelButton(false)">
        <img src="../assets/images/icons8-cancel.png" alt="" />
      </div>
      <div>
        <div class="w-[85%]">
          <div class="mb-2 flex w-full items-center">
            <div class="w-1/3">
              <h2 class="font-bold text-home-green-100">{{ roomService.name }}</h2>
            </div>
            <div class="h-[1px] w-full bg-home-green-50"></div>
          </div>
          <p class="text-home-green-100">
            <span>
              {{ roomService.descriptionShort.GuestMin }}
            </span>
            <span
              v-if="roomService.descriptionShort.GuestMin !== roomService.descriptionShort.GuestMax"
              >～ {{ roomService.descriptionShort.GuestMax }}
            </span>
            <span> 人 ・ </span>
            {{ roomService.descriptionShort.Bed[0] }} Size床・附早餐・ 衛浴{{
              roomService.descriptionShort['Private-Bath']
            }}間・{{ roomService.descriptionShort.Footage }}平方公尺<br />
            平日（一～四）價格：{{ roomService.normalDayPrice }} / 假日（五〜日）價格：{{
              roomService.holidayPrice
            }}
          </p>
          <ul class="my-3 flex flex-wrap items-center gap-4 text-center lg:my-7 lg:gap-8">
            <li
              v-for="(item, key) in Object.entries(roomService.amenities)"
              :key="key"
              :class="{ ' hidden': !item[1] }"
              class="relative flex w-16 flex-row justify-between gap-1"
            >
              <div class="flex w-full flex-col items-center justify-between gap-1">
                <img
                  :src="`../amenities/icon_amenities_${item[0]}.svg`"
                  alt=""
                  class="h-8 w-8"
                />
                <p class="whitespace-nowrap text-[10px] leading-[15px] text-home-green-50">
                  {{ item[0] }}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="w-[85%]">
          <div class="mb-3 flex w-full items-center gap-1">
            <div class="w-20">
              <h4 class="font-bold text-home-green-100">訂房資訊</h4>
            </div>
            <div class="h-[1px] w-full bg-home-green-50"></div>
          </div>
          <p class="mb-3 text-xs leading-6 text-home-green-100">
            ・入住時間：最早{{ roomService.checkInAndOut.checkInEarly }}，最晚
            {{ roomService.checkInAndOut.checkInLate }}；退房時間：{{
              roomService.checkInAndOut.checkOut
            }}，請自行確認行程安排。<br />
            ・平日定義週一至週四；假日定義週五至週日及國定假日。<br />
            ・好室旅店全面禁止吸菸。<br />
            ・若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 - 18:00 )。
          </p>
        </div>
        <div class="w-[85%]">
          <div class="mb-[19px] flex w-full items-center gap-1">
            <div class="w-20">
              <h4 class="font-bold text-home-green-100">預約流程</h4>
            </div>
            <div class="h-[1px] w-full bg-home-green-50"></div>
          </div>
          <div
            class="block w-full justify-evenly px-4 sm:flex lg:justify-evenly xl:justify-between"
          >
            <div class="h-32 w-56 rounded-b-[10px] border sm:h-40 sm:w-40 lg:h-36 lg:w-44">
              <div class="mb-1 flex h-8 justify-center bg-home-green-50 sm:h-10 lg:mb-4 lg:h-12">
                <img
                  src="@/assets/images/amenities/reservationflow_step_1.svg"
                  alt=""
                  class="w-5 lg:w-8"
                />
              </div>
              <div>
                <p class="text-center text-[8px] text-home-green-100 lg:text-xs">送出線上預約單</p>
              </div>
            </div>
            <div class="invisible px-2 pt-4 sm:visible lg:pl-1">
              <img src="@/assets/images/process.png" alt="" />
            </div>
            <div class="h-32 w-56 rounded-b-[10px] border sm:h-40 sm:w-40 lg:h-36 lg:w-44">
              <div
                class="mb-5 flex h-8 justify-center bg-home-green-50 sm:mb-1 sm:h-10 lg:mb-4 lg:h-12"
              >
                <img
                  src="@/assets/images/amenities/reservationflow_step_2.svg"
                  alt=""
                  class="w-5 lg:w-8"
                />
              </div>
              <div>
                <p class="text-center text-[6px] text-home-green-100 md:text-[8px] lg:text-xs">
                  系統立即回覆是否預訂成功<br />
                  並以簡訊發送訂房通知 <br />(若未收到簡訊請來電確認)
                </p>
              </div>
            </div>
            <div class="invisible px-2 pt-4 sm:visible lg:pl-1">
              <img src="@/assets/images/process.png" alt="" />
            </div>
            <div class="h-32 w-56 rounded-b-[10px] border sm:h-40 sm:w-40 lg:h-36 lg:w-44">
              <div
                class="mb-5 flex h-8 justify-center bg-home-green-50 sm:mb-1 sm:h-10 lg:mb-4 lg:h-12"
              >
                <img
                  src="@/assets/images/amenities/reservationflow_step_3.svg"
                  alt=""
                  class="w-5 lg:w-8"
                />
              </div>
              <div>
                <p class="text-center text-[6px] text-home-green-100 md:text-[8px] lg:text-xs">
                  入住當日憑訂房通知 <br />以現金或刷卡付款即可 <br />(僅接受VISA.JCB.銀聯卡)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order.js'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const orderDate = useOrderStore()
const { today } = storeToRefs(orderDate)
const { userInfo, orderRange } = orderDate
const disabledDates = ref([])

const props = defineProps({
  roomService: {
    required: true
  },
  src: {
    required: true
  },
  bookedDate: {
    type: Array
  }
})
const changeBookedDate = () => {
  props.bookedDate.forEach((item) => {
    disabledDates.value.push(item.date)
  })
  console.log(disabledDates.value)
}
watch(
  () => props.bookedDate,
  () => {
    changeBookedDate()
  },
  { immediate: true }
)

const route = useRoute()
const attribute = ref({
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

const apiDateFormat = () => {
  const pointer = new Date(orderRange.start)
  userInfo.date = []
  while (pointer <= new Date(orderRange.end)) {
    let dates = orderDate.changeDateFormat(pointer)
    userInfo.date.push(dates)
    pointer.setDate(pointer.getDate() + 1)
  }
}

const allNight = computed(() => {
  const startDate = new Date(userInfo.date[0])
  const endDate = new Date(userInfo.date[userInfo.date.length - 1])
  const diffTime = Math.abs(endDate - startDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
})

const checkNight = computed(() => {
  return allNight.value <= 0 || isNaN(allNight.value)
})

const totalWeekdaysAndWeekends = computed(() => {
  const startDate = new Date(userInfo.date[0])
  const endDate = new Date(userInfo.date[userInfo.date.length - 1])
  const diffTime = Math.abs(endDate - startDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  let weekdays = 0
  let weekends = 0
  for (let i = 1; i <= diffDays; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    const dayOfWeek = currentDate.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekends++
    } else {
      weekdays++
    }
  }
  return { weekdays, weekends }
})

const totalWeekdays = computed(() => totalWeekdaysAndWeekends.value.weekdays)
const totalWeekends = computed(() => totalWeekdaysAndWeekends.value.weekends)

watch([orderRange, userInfo], ([newOrderRange, newUserInfo], [oldOrderRange, oldUserInfo]) => {
  console.log(oldOrderRange, oldUserInfo)
  console.log('orderRange changed:', newOrderRange)
  console.log('userInfo changed:', newUserInfo)
})

const stopPropagation = (event) => {
  event.stopPropagation()
}
const emit = defineEmits(['window-event'])
const cancelButton = (value) => {
  emit('window-event', value)
}
const sendButton = (value) => {
  const roomId = route.params.id
  orderDate.postReservation(roomId, userInfo)
  emit('window-event', value)
  userInfo.name = ''
  userInfo.tel = ''
}
</script>
