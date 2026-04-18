<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="visible"
      class="mb-4 flex items-center justify-between rounded-lg border px-4 py-3 text-sm"
      :class="alertClasses"
    >
      <span>{{ message }}</span>
      <button
        class="pl-3 text-xl leading-none cursor-pointer"
        :class="closeClass"
        @click="$emit('close')"
      >
        &times;
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  message: string;
  type: 'success' | 'error' | 'warning';
  visible: boolean;
}>();

defineEmits<{
  close: [];
}>();

const alertClasses = computed(() => {
  const map = {
    success: 'border-green-300 bg-green-50 text-green-800',
    error: 'border-red-300 bg-red-50 text-red-800',
    warning: 'border-yellow-300 bg-yellow-50 text-yellow-800',
  };
  return map[props.type];
});

const closeClass = computed(() => {
  const map = {
    success: 'text-green-600 hover:text-green-800',
    error: 'text-red-600 hover:text-red-800',
    warning: 'text-yellow-600 hover:text-yellow-800',
  };
  return map[props.type];
});
</script>
