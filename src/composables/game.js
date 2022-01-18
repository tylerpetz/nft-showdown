import { reactive, computed } from 'vue'

const state = reactive({
  nfts: [],
  used: [],
  result: '',
  streak: 0,
  best: 0,
})

export function getNfts() {
  fetch('https://api.opensea.io/api/v1/assets?order_by=sale_date&offset=0&limit=50', { method: 'GET' })
    .then(async (response) => {
      response = await response.json()
      state.nfts = response.assets.filter(asset => asset.name && asset.image_preview_url)
    })
    .catch(err => console.error(err))
}

export function checkAnswer(id) {
  if (state.result) {
    return
  }

  if (id == correctAnswer.value) {
    state.streak++
    state.result = 'correct'
  } else {
    if (state.streak > state.best) {
      state.best = state.streak
    }
    state.streak = 0
    state.result = 'incorrect'
  }
}

export function storeNfts() {
  state.result = ''
  randomNfts.value.forEach(nft => state.used.push(nft.id))
}

export const randomNfts = computed(() => state.nfts.filter(nft => !state.used.includes(nft.id)).sort(() => .5 - Math.random()).slice(0, 2))
export const correctAnswer = computed(() => Number(randomNfts.value[0].last_sale.total_price) > Number(randomNfts.value[1].last_sale.total_price) ? randomNfts.value[0].id : randomNfts.value[1].id)
export const result = computed(() => state.result)
export const bestStreak = computed(() => state.streak > state.best ? state.streak : state.best)
export const currentStreak = computed(() => state.streak)