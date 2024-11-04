<template>
  <div class="call-active text-center">
    <h2>Call in Progress with {{ callerName || phoneNumber }}</h2>
    <div class="timer-container">
      <svg viewBox="0 0 36 36" class="circular-timer">
        <path class="circle-bg" d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831" />
        <path class="circle" :style="{ strokeDasharray: progress + ', 100' }" d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831" />
        <text x="18" y="20.35" class="timer-text">{{ formattedDuration }}</text>
      </svg>
    </div>
    <button class="btn btn-danger mt-3 end-call-btn" @click="$emit('endCall')">
      <i class="fa fa-phone-slash"></i> End Call
    </button>
  </div>
</template>

<script>
export default {
  props: ['callerName', 'phoneNumber', 'callDuration'],
  computed: {
    formattedDuration() {
      const minutes = Math.floor(this.callDuration / 60);
      const seconds = this.callDuration % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    },
    progress() {
      return (this.callDuration % 60) * (100 / 60);
    },
  },
};
</script>


