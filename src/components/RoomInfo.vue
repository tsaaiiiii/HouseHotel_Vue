<template>
  <div class="mb-[28px] flex flex-col justify-start text-[14px] leading-6 text-home-green-100">
    <div class="mb-[38px] flex flex-wrap items-center justify-between">
      <p class="text-[30px] font-medium leading-[55px]">{{ roomService.name }}</p>
      <p class="flex flex-wrap whitespace-nowrap">
        <span>
          {{ roomService.descriptionShort.GuestMin }}
        </span>

        <span v-if="roomService.descriptionShort.GuestMin !== roomService.descriptionShort.GuestMax"
          >～ {{ roomService.descriptionShort.GuestMax }}
        </span>
        <span> 人 ・ </span>
        <span
          >{{ roomService.descriptionShort.Bed.length }} 張
          {{ roomService.descriptionShort.Bed[0] }} Size 床 </span
        >・ <span> 附早餐・衛浴{{ roomService.descriptionShort['Private-Bath'] }}間 </span>・
        <span> {{ roomService.descriptionShort.Footage }}平方公尺 </span>
      </p>
    </div>
    <ul class="mb-[35px] font-[300]">
      <li>
        平日（一～四） 價格：{{ roomService.normalDayPrice }} / 假日（五〜日）價格：{{
          roomService.holidayPrice
        }}
      </li>
      <li>
        入住時間：{{ roomService.checkInAndOut.checkInEarly }}（最早）/
        {{ roomService.checkInAndOut.checkInLate }}（最晚）
      </li>
      <li>退房時間：{{ roomService.checkInAndOut.checkOut }}</li>
    </ul>
    <ul class="mb-[48px] font-[300]">
      <li>
        ・ {{ roomService.name }} 僅供 {{ roomService.descriptionShort.GuestMax }} 位客人使用。
      </li>
      <li>・ 臥室配有{{ bedToChinese }}床和私人浴室。</li>
      <li>・ 您需要的一切為您準備：床單和毯子，毛巾，肥皂和洗髮水，吹風機。</li>
      <li>・ 房間裡有AC，當然還有WiFi。</li>
    </ul>
    <ul class="grid grid-cols-3 gap-x-[36px] gap-y-[25px] sm:grid-cols-5 md:grid-cols-6">
      <li
        v-for="(item, key) in Object.entries(roomService.amenities)"
        :key="key"
        :class="{ ' opacity-20': !item[1] }"
        class="relative flex flex-row justify-between gap-1"
      >
        <div class="flex w-full flex-col items-center justify-between gap-[7.5px]">
          <img
            :src="`../amenities/icon_amenities_${item[0]}.svg`"
            alt=""
            class="h-10 w-10"
          />
          <p class="whitespace-nowrap text-[10px] leading-[15px] text-home-green-50">
            {{ item[0] }}
          </p>
        </div>
        <div class="absolute -right-1 top-0">
          <img v-if="item[1]" src="../assets/images/amenities/icons-ok.svg" alt="" />
          <img v-if="!item[1]" src="../assets/images/amenities/icons-cancel.svg" alt="" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  roomService: {
    required: true
  }
})

const bedChinese = [
  ['Single', '單人'],
  ['Small Double', '小型雙人'],
  ['Double', '雙人'],
  ['Queen', '加大雙人']
]
const bedToChinese = ref('單人')

bedChinese.map((item) => {
  if (item[0] === props.roomService.descriptionShort.Bed[0]) {
    bedToChinese.value = item[1]
  }
})
</script>
<style></style>
