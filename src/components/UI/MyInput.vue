<template>
  <div>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
  </div>
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  width: 98%;
  border: 2px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>