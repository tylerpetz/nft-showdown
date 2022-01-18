<script setup>
import { getNfts, checkAnswer, storeNfts, randomNfts, result, currentStreak, bestStreak } from './composables/game'
getNfts()
</script>

<template>
  <div class="text-center py-8">
    <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
      <span>NFT</span><span class="text-indigo-400">Showdown</span>
    </h1>

    <h2 class="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl text-indigo-800 mb-12">which nft sold for more, bruh?</h2>
    <div class="flex justify-center align-center space-x-8">
      <button v-for="nft in randomNfts" :index="nft.id" @click="checkAnswer(nft.id)" class="p-4 bg-gray-200 flex flex-col items-center space-y-2">
        <p>{{ nft.name }}</p>
        <img :src="nft.image_preview_url" :alt="nft.name" width="300"/>
        <p v-if="result">last sold for {{ Number(nft.last_sale.total_price) / 1000000000000000000 }} ETH (~${{  (Number(nft.last_sale.total_price) / 1000000000000000000 * Number(nft.last_sale.payment_token.usd_price)).toFixed(2) }})  </p>
      </button>
    </div>
    <template v-if="result">
      <p class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mt-8" :class="result === 'correct' ? 'text-green-600' : 'text-red-600'">
        {{ result }}
      </p>
      <button @click="storeNfts" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        try again
      </button>
    </template>
  </div>
  <div class="fixed left-0 bottom-0 p-4 text-xl">
    <p>streak: {{ currentStreak }}</p>
    <p>best: {{ bestStreak }}</p>
  </div>
  <a href="https://github.com/tylerpetz" target="_blank" class="fixed right-0 bottom-0 p-4 text-lg">made by tyler</a>
</template>