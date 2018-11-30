<template>
  <div class="alert" :class="alertClass">
    <slot>
      <strong>default  xxxxx</strong>
    </slot>
    <span class="alert_close">x</span>
  </div>
</template>

<script>

export default {
  props: ['type'],
  computed: {
    alertClass() {
      return {
        'alert-success': this.type === 'success',
        'alert-error': this.type === 'error'
      }
    }
  }
}
</script>
<style>
.alert{
  width: 200px;
  height: 60px;
  border: solid 1px red;
}
.alert-success{
  color: blue;
}
.alert-error{
  color: red;
}
</style>
