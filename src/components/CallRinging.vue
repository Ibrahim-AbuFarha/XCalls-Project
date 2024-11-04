<template>
  <div class="call-ringing text-center">
    <p class="call-status"><i i class="fa fa-phone mr-2"></i> Calling...</p>
    <div class="caller-info">
      <div class="profile-pic">
        <i class="fa fa-user-circle fa-5x" aria-hidden="true"></i>
      </div>
      <p class="caller-number">calling {{ phoneNumber }}</p>
    </div>
    <button class="end-call-btn" @click="endCall">
      <i class="fa fa-phone" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: [
    "phoneNumber"]
  ,
  methods: {
    endCall() {
      this.$emit("endCall");
    },
  },
};
</script>


