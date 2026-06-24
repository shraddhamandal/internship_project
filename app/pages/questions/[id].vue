<template>
  <div v-if="question" style="padding: 20px">

    <h1>{{ question.title }}</h1>

    <p>{{ question.description }}</p>

    <p>
      Asked By:
      <strong>{{ question.user.name }}</strong>
    </p>

    <hr>

    <h2>Answers</h2>

    <div
      v-for="answer in question.answers"
      :key="answer.id"
      style="
        border:1px solid #ccc;
        padding:10px;
        margin-top:10px;
      "
    >
      <p>{{ answer.content }}</p>

      <small>
        Answered By:
        {{ answer.user.name }}
      </small>

      <br><br>

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
        style="
          padding:5px 10px;
          cursor:pointer;
        "
      >
        Accept Answer
      </button>

    </div>

    <hr style="margin-top:30px">

    <h2>Your Answer</h2>

    <textarea
      v-model="answerContent"
      rows="5"
      placeholder="Write your answer here..."
      style="width:100%; padding:10px;"
    ></textarea>

    <br><br>

    <button @click="submitAnswer">
      Submit Answer
    </button>

  </div>
</template>

<script setup>
const route = useRoute()

const { data, refresh } = await useFetch(
  `http://localhost:3000/api/questions/question-detail?id=${route.params.id}`
)

const question = computed(() => data.value?.question)

const answerContent = ref("")

const submitAnswer = async () => {
  try {
    await $fetch(
      "http://localhost:3000/api/answers/create",
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
      "http://localhost:3000/api/answers/accept",
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