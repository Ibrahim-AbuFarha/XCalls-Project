<template>
  <div class="call-logs">
    <h2 class="text-center">Call Logs</h2>
    <ul class="list-unstyled">
      <li v-for="(log, index) in callLog" :key="index" class="p-3 mb-3 bg-light rounded shadow-sm">
        <p><strong>Start Time:</strong> {{ new Date(log.startTime).toLocaleString() }}</p>
        <p><strong>End Time:</strong> {{ new Date(log.endTime).toLocaleString() }}</p>
        <p><strong>Duration:</strong> {{ log.duration }} seconds</p>
        <p><strong>Status:</strong> {{ log.status }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    callLog: Array,
  },
};
</script>

