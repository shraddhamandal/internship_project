<template>
  <div class="mb-6">
  <NuxtLink
    to="/"
    class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
  >
    ← Back to Questions
  </NuxtLink>
</div>
  <div
    v-if="question"
    class="min-h-screen bg-slate-100"
  >

    <div class="max-w-5xl mx-auto px-8 py-10">

   <!-- Question Card -->

<div class="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 mb-8">

  <div class="flex items-center gap-3 mb-5">

    <span
      class="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold"
    >
      📌 Question
    </span>

  </div>

  <h1
    class="text-5xl font-bold text-slate-800 leading-tight"
  >
    {{ question.title }}
  </h1>

  <p
    class="mt-6 text-xl text-slate-600 leading-8"
  >
    {{ question.description }}
  </p>

  <div
    class="flex items-center gap-4 mt-8 pt-6 border-t"
  >

    <div
      class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl"
    >
      👤
    </div>

    <div>

      <p class="font-semibold text-slate-800">
        {{ question.user.name }}
      </p>

      <p class="text-slate-500 text-sm">
        Question Author
      </p>

    </div>

  </div>
  <div class="mt-6">

  <span
    class="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
  >
    💬 {{ question.answers.length }}
    {{ question.answers.length === 1 ? "Answer" : "Answers" }}
  </span>

</div>

</div>



   <!-- Answers -->

<h2
  class="text-3xl font-bold text-slate-800 mb-6"
>
  💬 Answers
</h2>

    <div
  v-for="answer in question.answers"
  :key="answer.id"
  class="bg-white rounded-2xl shadow-md border border-gray-100 p-8 mb-6 hover:shadow-xl transition-all duration-300"
>
      <p class="text-lg text-slate-700 leading-8">
  {{ answer.content }}
</p>

      <div class="flex items-center gap-3 mt-6">

  <div
    class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
  >
    👤
  </div>

  <div>

    <p class="font-semibold text-slate-800">
      {{ answer.user.name }}
    </p>

    <p class="text-sm text-slate-500">
      Community Member
    </p>

  </div>

</div>
      <span
        v-if="answer.isAccepted"
        style="
          background:green;
          color:white;
          padding:5px 10px;
          border-radius:5px;
        "
      >
        ✓ Accepted Answer
      </span>

      <button
  v-else
  @click="acceptAnswer(answer.id)"
  class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-semibold"
>
  ✓ Accept Answer
</button>

    </div>

    <hr style="margin-top:30px">

    <!-- Your Answer -->

<div class="mt-10">

  <h2 class="text-3xl font-bold text-slate-800 mb-6">
    ✍️ Your Answer
  </h2>

  <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-8">

    <textarea
      v-model="answerContent"
      rows="6"
      placeholder="Write your answer here..."
      class="w-full rounded-xl border border-slate-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    ></textarea>

    <button
      @click="submitAnswer"
      class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
    >
      🚀 Submit Answer
    </button>

  </div>

</div>

    </div>

  </div>
</template>

<script setup>
const route = useRoute()

const { data, refresh } = await useFetch(
  `/api/questions/question-detail?id=${route.params.id}`
)

const question = computed(() => data.value?.question)

const answerContent = ref("")

const submitAnswer = async () => {
  try {
    await $fetch(
     "/api/answers/create" ,
      {
        method: "POST",
        body: {
          content: answerContent.value,
          userId: 1,
          questionId: Number(route.params.id)
        }
      }
    )

    answerContent.value = ""

    await refresh()

    alert("Answer posted successfully!")

  } catch (error) {
    console.error(error)
    alert("Failed to post answer")
  }
}

const acceptAnswer = async (answerId) => {
  try {
    await $fetch(
     "/api/answers/accept" ,
      {
        method: "POST",
        body: {
          answerId
        }
      }
    )

    await refresh()

    alert("Answer accepted!")

  } catch (error) {
    console.error(error)
    alert("Failed to accept answer")
  }
}
</script>