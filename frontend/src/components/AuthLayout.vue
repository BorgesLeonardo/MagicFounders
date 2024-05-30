<template>
  <div class="auth-container">
    <div class="auth-card">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.auth-card {
  width: 400px;
  border-radius: 10px;
  padding: 40px;
  border: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}
</style>
