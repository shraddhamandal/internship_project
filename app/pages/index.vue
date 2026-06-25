<template>
  <div class="min-h-screen bg-slate-100">

    <div class="max-w-7xl mx-auto px-8 py-10">

      <!-- Header -->
<div
  class="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-10"
>

  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

    <!-- Left -->

    <div>

      <h1
        class="text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight"
      >
        Diguu Bhaiya
      </h1>

      <p
        class="mt-4 text-lg text-slate-500"
      >
        Ask questions • Share knowledge • Learn together 🚀
      </p>

    </div>

    <!-- Right -->

    <div
      class="flex flex-col sm:flex-row gap-4"
    >

      <NuxtLink to="/notifications">

        <button
          class="w-full sm:w-auto bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          🔔 Notifications
        </button>

      </NuxtLink>

      <NuxtLink to="/ask">

        <button
          class="w-full sm:w-auto bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 transition duration-300"
        >
          + Ask Question
        </button>

      </NuxtLink>

    </div>

  </div>

</div>

<!-- Hero Banner -->

<div
  class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white mb-10 shadow-xl"
>

  <div class="flex flex-col lg:flex-row items-center justify-between gap-8">

    <div>

      <h2 class="text-4xl md:text-5xl font-extrabold leading-tight">
        Welcome to Diguu Bhaiya Q&A 🚀
      </h2>

      <p class="mt-4 text-lg text-blue-100 max-w-2xl">
        Ask questions, share your knowledge, help others, and become part of
        an amazing learning community.
      </p>

      <NuxtLink to="/ask">

        <button
          class="mt-8 bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl hover:bg-blue-100 transition"
        >
          Ask Your First Question
        </button>

      </NuxtLink>

    </div>

    <div class="text-8xl">
      💡
    </div>

  </div>

</div>

      <!-- Search -->

<div class="relative mb-10">

  <span
    class="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-slate-400"
  >
    🔍
  </span>

  <input
    v-model="search"
    type="text"
    placeholder="Search questions..."
    class="w-full py-5 pl-16 pr-6 rounded-2xl border border-slate-300 shadow-md text-lg
           focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition"
  />

</div>

  <!-- Statistics -->

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

  <!-- Questions -->

  <div class="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 mb-8 hover:border-blue-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

    <p class="text-slate-500 text-lg">
      📚 Total Questions
    </p>

    <h2 class="text-4xl font-bold mt-3">
      {{ filteredQuestions.length }}
    </h2>

  </div>

  <!-- Answers -->

  <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

    <p class="text-slate-500 text-lg">
      💬 Total Answers
    </p>

    <h2 class="text-4xl font-bold mt-3">
      {{ totalAnswers }}
    </h2>

  </div>

  <!-- Upvotes -->

<div class="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

  <p class="text-slate-500 text-lg">
    👍 Total Upvotes
  </p>

  <h2 class="text-4xl font-bold mt-3">
    {{ totalUpvotes }}
  </h2>

</div>

</div>

<!-- Paste here 👇 -->

<div class="flex flex-wrap gap-4 mb-8">

  <button
    @click="sortBy='latest'"
    :class="[
      'px-5 py-3 rounded-xl transition font-semibold',
      sortBy==='latest'
        ? 'bg-blue-600 text-white'
        : 'bg-white text-slate-700 shadow'
    ]"
  >
    🆕 Latest
  </button>

  <button
    @click="sortBy='upvotes'"
    :class="[
      'px-5 py-3 rounded-xl transition font-semibold',
      sortBy==='upvotes'
        ? 'bg-blue-600 text-white'
        : 'bg-white text-slate-700 shadow'
    ]"
  >
    👍 Most Upvoted
  </button>

  <button
    @click="sortBy='answers'"
    :class="[
      'px-5 py-3 rounded-xl transition font-semibold',
      sortBy==='answers'
        ? 'bg-blue-600 text-white'
        : 'bg-white text-slate-700 shadow'
    ]"
  >
    💬 Most Answered
  </button>

</div>

<!-- Questions -->

<template v-if="filteredQuestions.length">

  <div
    v-for="question in filteredQuestions"
    :key="question.id"
    class="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-10 mb-8 border border-gray-100 hover:-translate-y-1"
  >

    <!-- Title -->
    <NuxtLink
      :to="`/questions/${question.id}`"
      class="block no-underline text-inherit"
    >

      <div class="flex items-center gap-4 flex-wrap">

        <h2
          class="text-4xl font-bold text-slate-800 hover:text-blue-600 transition"
        >
          {{ question.title }}
        </h2>

        <span
          v-if="question.upvotes >= 2"
          class="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold"
        >
          🔥 Trending
        </span>

      </div>

    </NuxtLink>

    <!-- Description -->

    <p class="mt-5 text-lg text-slate-600 leading-8">
      {{ question.description }}
    </p>

    <!-- User -->

    <div class="flex items-center gap-3 mt-8">

      <div
        class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl"
      >
        👤
      </div>

      <div>

        <p class="font-semibold text-slate-800">
          {{ question.user.name }}
        </p>

        <p class="text-sm text-slate-500">
          Asked {{ timeAgo(question.createdAt) }}
        </p>

      </div>

    </div>

    <!-- Tags -->

    <div class="flex gap-2 mt-6 flex-wrap">

      <span
        v-for="item in question.questionTags"
        :key="item.tag.id"
        class="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
      >
        #{{ item.tag.name }}
      </span>

    </div>

    <!-- Bottom -->

    <div class="flex justify-between items-center mt-8 border-t pt-6">

      <div
        class="bg-slate-100 px-4 py-2 rounded-full text-slate-600 font-medium"
      >
        💬 {{ question.answers.length }}
        {{ question.answers.length === 1 ? "Answer" : "Answers" }}
      </div>

      <div class="flex gap-4">

        <button
          @click="vote(question.id,'UPVOTE')"
          class="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-5 py-3 rounded-xl transition font-semibold"
        >
          👍 {{ question.upvotes }}
        </button>

        <button
          @click="vote(question.id,'DOWNVOTE')"
          class="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-5 py-3 rounded-xl transition font-semibold"
        >
          👎 {{ question.downvotes }}
        </button>

      </div>

    </div>

  </div>

</template>

<template v-else>

  <div
    class="bg-white rounded-3xl shadow-lg p-12 text-center"
  >

    <h2 class="text-3xl font-bold text-slate-700">
      🔍 No questions found
    </h2>

    <p class="text-slate-500 mt-3">
      Try searching with another keyword.
    </p>

  </div>

</template>
       

     </div>

</div>
</template>

<script setup>
import { computed, ref } from "vue"

const { data, refresh } = await useFetch(
  "http://localhost:3000/api/questions"
)

const questions = data.value.questions

// Search
const search = ref("")

// Sorting
const sortBy = ref("latest")

const filteredQuestions = computed(() => {

  let result = questions.filter((question) => {

    const text = (
      question.title +
      " " +
      question.description +
      " " +
      question.user.name
    ).toLowerCase()

    return text.includes(search.value.toLowerCase())

  })

  if (sortBy.value === "upvotes") {
    result.sort((a, b) => b.upvotes - a.upvotes)
  }

  else if (sortBy.value === "answers") {
    result.sort((a, b) => b.answers.length - a.answers.length)
  }

  else {
    result.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
  }

  return result

})

// Statistics
const totalAnswers = computed(() => {
  return filteredQuestions.value.reduce((total, question) => {
    return total + question.answers.length
  }, 0)
})

const totalUpvotes = computed(() => {
  return filteredQuestions.value.reduce((total, question) => {
    return total + question.upvotes
  }, 0)
})

// Voting
const vote = async (questionId, type) => {
  try {
    await $fetch("http://localhost:3000/api/votes/create", {
      method: "POST",
      body: {
        questionId,
        userId: 1,
        type
      }
    })

    await refresh()
  } catch (error) {
    alert("Voting failed")
  }
}

// 👇 Paste it here
const timeAgo = (date) => {

  const seconds = Math.floor(
    (new Date() - new Date(date)) / 1000
  )

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 }
  ]

  for (const interval of intervals) {

    const count = Math.floor(seconds / interval.seconds)

    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`
    }

  }

  return "Just now"

}

</script>