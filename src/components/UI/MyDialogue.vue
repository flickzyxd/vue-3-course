<template>
  <div class="dialogue" v-if="show" @click.stop="hideDialogue">
    <div @click.stop class="dialogue__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixins from "@/mixins/toggleMixins.js";

export default {
  name: 'my-dialogue',
  mixins: [toggleMixins]
}
</script>

<style lang="scss" scoped>
.dialogue {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialogue__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>