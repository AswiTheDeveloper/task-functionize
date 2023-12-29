<template>
  <div v-if="loading" class="loader">
    <div class="loader-spinner"></div>
  </div>
</template>
  
  <script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false, // Default value for the loading prop
    },
  },
};
</script>
  
  <style scoped>
.loader {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.loader-spinner {
  border: 4px solid #3498db;
  border-top: 4px solid transparent;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
  