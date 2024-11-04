<template>
  <div class="call-summary  p-3 text-center">
    <h2>Call Summary</h2>
    <p><strong>Start Time:</strong> {{ new Date(callSummary.startTime).toLocaleString() }}</p>
    <p><strong>End Time:</strong> {{ new Date(callSummary.endTime).toLocaleString() }}</p>
    <p><strong>Duration:</strong> {{ callSummary.duration }} seconds</p>
    <button class="btn btn-primary mt-3" @click="$emit('resetCall')">
      <i class="fa fa-redo"></i> Make Another Call
    </button>
  </div>
</template>
<script>
export default {
  props: {
    callSummary: Object,
  },
};
</script>
