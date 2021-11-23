<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <el-input
      :class="{'is-invalid': error}"
      :value="value"
      v-bind="$attrs"
      @input="updateInput"
    />
    <div
      v-if="error"
      class="invalid-feedback"
    >
      {{ error }}
    </div>
    <span
      v-if="hint"
      class="form-text text-muted"
    >{{ hint }}</span>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: [Number, String],
    }
  },

  methods: {
    updateInput(evt) {
      this.$emit('input', evt)
    }
  }
}
</script>
