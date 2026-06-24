<template>
  <div style="max-width:800px; margin:auto; padding:30px;">

    <h1>Notifications</h1>

    <div
      v-for="notification in notifications"
      :key="notification.id"
      style="
        border:1px solid #ddd;
        padding:15px;
        margin-top:15px;
        border-radius:8px;
      "
    >
      <p>{{ notification.message }}</p>

      <small>
        {{ notification.type }}
      </small>

      <br>

      <small>
        Read:
        {{ notification.isRead ? "Yes" : "No" }}
      </small>
    </div>

  </div>
</template>

<script setup>
const { data } = await useFetch(
  "http://localhost:3000/api/notifications?userId=1"
)

const notifications = data.value.notifications
</script>