<template>
  <div class="dialer">
    <h2>Dial a Number</h2>
    <input v-model="phoneNumber" type="tel" placeholder="101" class="form-control my-3" />
    <div class="dialer-buttons">
      <button v-for="(num, index) in dialerKeys" :key="index" @click="appendToNumber(num)">
        {{ num }}
      </button>
    </div>
    <button @click="startCall" class="btn call mt-4">
      <i class="fa fa-phone"></i> Call
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: '',
      dialerKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']
    };
  },
  methods: {
    appendToNumber(num) {
      this.phoneNumber += num;
    }, startCall() {
      this.$emit('startCall', this.phoneNumber);
      this.phoneNumber = '';
    },

  }
};
</script>
