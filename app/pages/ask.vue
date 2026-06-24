<template>
  <div style="padding: 20px; max-width: 800px; margin: auto;">
    <h1>Ask a Question</h1>

    <form @submit.prevent="submitQuestion">

      <div style="margin-bottom: 15px;">
        <label>Question Title</label>
        <br />
        <input
          v-model="title"
          type="text"
          placeholder="Enter question title"
          style="width:100%; padding:10px;"
        />
      </div>

      <div style="margin-bottom: 15px;">
        <label>Description</label>
        <br />
        <textarea
          v-model="description"
          rows="6"
          placeholder="Explain your question..."
          style="width:100%; padding:10px;"
        />
      </div>

      <button type="submit">
        Post Question
      </button>

    </form>
  </div>
</template>

<script setup>
const title = ref("")
const description = ref("")

const submitQuestion = async () => {
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
  }
}
</script>