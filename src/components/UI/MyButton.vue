<template>
  <button class="btn" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
.btn {
  cursor: pointer;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 2px solid teal
}
</style>