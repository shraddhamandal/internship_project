<template>
  <div class="min-h-screen bg-slate-100">

  <div class="max-w-4xl mx-auto px-8 py-10">
    <div class="mb-6">
  <NuxtLink
    to="/"
    class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
  >
    ← Back to Home
  </NuxtLink>
</div>
   <div class="mb-8">

  <span
    class="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold"
  >
    ✍️ Ask a Question
  </span>

  <h1 class="text-5xl font-bold text-slate-800 mt-5">
    Share Your Knowledge
  </h1>

  <p class="text-slate-500 text-lg mt-3">
    Ask anything you're curious about. The community is here to help.
  </p>

</div>

    <form
  @submit.prevent="submitQuestion"
  class="bg-white rounded-3xl shadow-lg border border-gray-100 p-10"
>

      <div class="mb-6">

  <label class="block text-lg font-semibold text-slate-700 mb-3">
    Question Title
  </label>
        <input
  v-model="title"
  type="text"
  placeholder="Enter your question title..."
  class="w-full rounded-xl border border-slate-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
      </div>

      <div class="mb-8">

  <label class="block text-lg font-semibold text-slate-700 mb-3">
    Description
  </label>
        <textarea
  v-model="description"
  rows="8"
  placeholder="Describe your question in detail..."
  class="w-full rounded-xl border border-slate-300 p-4 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
></textarea>

<div class="mt-2 text-right text-sm text-slate-500">
  {{ description.length }} / 500 characters
</div>
      </div>

    <button
  type="submit"
  :disabled="loading"
  class="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-lg hover:shadow-xl"
>
  {{ loading ? "Posting..." : "🚀 Post Question" }}
</button>
   </form>

  </div>

</div>
</template>

<script setup>
const title = ref("")
const description = ref("")
const loading = ref(false)

const submitQuestion = async () => {if (!title.value.trim() || !description.value.trim()) {
  alert("Please fill in both the title and description.")
  return
}

loading.value = true

  try {
    const response = await $fetch(
      "http://localhost:3000/api/questions/create",
      {
        method: "POST",
        body: {
          title: title.value,
          description: description.value,
          userId: 1
        }
      }
    )

    await navigateTo(`/questions/${response.question.id}`)

  } catch (error) {
    console.error(error)
    alert("Failed to create question")
    loading.value = false
  }
  finally {
  loading.value = false
}
}
</script>