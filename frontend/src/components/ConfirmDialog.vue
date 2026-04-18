<template>
  <div>
    <p class="mb-5 text-base text-gray-700">{{ message }}</p>
    <div class="flex justify-end gap-3">
      <button
        class="rounded-lg bg-gray-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-600 cursor-pointer"
        @click="$emit('cancel')"
      >
        Cancelar
      </button>
      <button
        class="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 cursor-pointer"
        @click="$emit('confirm')"
      >
        Confirmar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();

defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>
