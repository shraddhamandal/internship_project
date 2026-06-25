<template>
  <div class="min-h-screen bg-slate-100">

    <div class="max-w-5xl mx-auto px-8 py-10">

      <!-- Back Button -->
      <div class="mb-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
        >
          ← Back to Home
        </NuxtLink>
      </div>

      <!-- Header -->
      <div class="mb-8">

        <span
          class="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold"
        >
          🔔 Notifications
        </span>

        <h1 class="text-5xl font-bold text-slate-800 mt-5">
          Notification Center
        </h1>

        <p class="text-slate-500 text-lg mt-3">
          Stay updated with answers, votes and activity on your questions.
        </p>

      </div>

      <!-- Notification Cards -->
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6 hover:shadow-xl transition"
      >

        <div class="flex justify-between items-start">

          <div>

            <p class="text-lg font-medium text-slate-800">
              {{ notification.message }}
            </p>

            <p class="text-sm text-slate-500 mt-2">
              📌 {{ notification.type }}
            </p>

          </div>

          <span
            :class="notification.isRead
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'"
            class="px-3 py-1 rounded-full text-sm font-semibold"
          >
            {{ notification.isRead ? "Read" : "Unread" }}
          </span>

        </div>

      </div>

      <!-- Empty State -->
      <div
        v-if="notifications.length === 0"
        class="bg-white rounded-2xl shadow-md p-10 text-center"
      >
        <h2 class="text-2xl font-bold text-slate-700">
          No Notifications Yet
        </h2>

        <p class="text-slate-500 mt-3">
          You're all caught up!
        </p>
      </div>

    </div>

  </div>
</template>

<script setup>
const { data } = await useFetch(
  "http://localhost:3000/api/notifications?userId=1"
)

const notifications = data.value?.notifications || []
</script>