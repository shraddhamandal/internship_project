<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center">

    <div class="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

      <div class="text-center mb-8">

        <h1 class="text-4xl font-bold text-slate-800">
          Welcome Back 👋
        </h1>

        <p class="text-slate-500 mt-3">
          Login to continue to Diguu Bhaiya
        </p>

      </div>

      <form @submit.prevent="login">

        <div class="mb-5">

          <label class="block font-semibold mb-2">
            Email
          </label>

          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div class="mb-8">

          <label class="block font-semibold mb-2">
            Password
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
        >
          Login
        </button>

      </form>

      <!-- Divider -->
      <div class="flex items-center my-6">
        <div class="flex-1 border-t"></div>
        <span class="px-4 text-slate-400">OR</span>
        <div class="flex-1 border-t"></div>
      </div>

      <!-- Google Login -->
      <button
        @click="googleLogin"
        type="button"
        class="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold transition"
      >
        Continue with Google
      </button>

    </div>

  </div>
</template>

<script setup>
const email = ref("")
const password = ref("")

const login = async () => {
  try {
    const response = await $fetch(
      "http://localhost:3000/api/auth/login",
      {
        method: "POST",
        body: {
          email: email.value,
          password: password.value
        }
      }
    )

    console.log(response)

    alert("Login Successful!")

    await navigateTo("/")

  } catch (error) {
    console.error(error)
    alert("Invalid email or password")
  }
}

const googleLogin = () => {
  window.location.href = "/api/auth/google"
}
</script>