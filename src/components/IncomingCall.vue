<template>
  <div class="incoming-call text-center">
    <h2>Incoming Call from {{ callerName }}</h2>
    <button class="btn btn-success m-2" @click="$emit('acceptCall')">
      <i class="fa fa-phone"></i> Accept
    </button>
    <button class="btn btn-danger m-2" @click="$emit('rejectCall')">
      <i class="fa fa-phone-slash"></i> Reject
    </button>
  </div>
</template>

<script>
export default {
  props: ['callerName'],
};
</script>


