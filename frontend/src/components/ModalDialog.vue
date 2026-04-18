<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="$emit('close')"
    >
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.9, y: -20 }"
        :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 250 } }"
        class="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl"
      >
        <div class="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
          <button
            class="text-2xl leading-none text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            @click="$emit('close')"
          >
            &times;
          </button>
        </div>
        <div class="p-5">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();

defineEmits<{
  close: [];
}>();
</script>
