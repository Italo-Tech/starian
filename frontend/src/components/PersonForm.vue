<template>
  <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-1">
      <label for="name" class="text-sm font-semibold text-gray-700">Nome *</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        placeholder="Nome completo"
        maxlength="150"
        class="rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2"
        :class="errors.name ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'"
        @blur="validateField('name')"
      />
      <span v-if="errors.name" class="text-xs text-red-500">{{ errors.name }}</span>
    </div>

    <div class="flex flex-col gap-1">
      <label for="email" class="text-sm font-semibold text-gray-700">E-mail *</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        placeholder="exemplo@email.com"
        maxlength="150"
        class="rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2"
        :class="errors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'"
        @blur="validateField('email')"
      />
      <span v-if="errors.email" class="text-xs text-red-500">{{ errors.email }}</span>
    </div>

    <div class="flex flex-col gap-1">
      <label for="cpf" class="text-sm font-semibold text-gray-700">CPF *</label>
      <input
        id="cpf"
        :value="form.cpf"
        type="text"
        placeholder="000.000.000-00"
        maxlength="14"
        class="rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2"
        :class="errors.cpf ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'"
        @input="onCpfInput"
        @blur="validateField('cpf')"
      />
      <span v-if="errors.cpf" class="text-xs text-red-500">{{ errors.cpf }}</span>
    </div>

    <div class="flex flex-col gap-1">
      <label for="birthDate" class="text-sm font-semibold text-gray-700">Data de Nascimento *</label>
      <input
        id="birthDate"
        v-model="form.birthDate"
        type="date"
        class="rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2"
        :class="errors.birthDate ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'"
        @blur="validateField('birthDate')"
      />
      <span v-if="errors.birthDate" class="text-xs text-red-500">{{ errors.birthDate }}</span>
    </div>

    <div class="flex flex-col gap-1">
      <label for="phone" class="text-sm font-semibold text-gray-700">Telefone *</label>
      <input
        id="phone"
        :value="form.phone"
        type="text"
        placeholder="(00) 00000-0000"
        maxlength="15"
        class="rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2"
        :class="errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'"
        @input="onPhoneInput"
        @blur="validateField('phone')"
      />
      <span v-if="errors.phone" class="text-xs text-red-500">{{ errors.phone }}</span>
    </div>

    <div class="mt-2 flex justify-end gap-3">
      <button
        type="button"
        class="rounded-lg bg-gray-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-600 cursor-pointer"
        @click="$emit('cancel')"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        :disabled="loading"
      >
        {{ loading ? 'Salvando...' : submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { PersonFormData } from '../types/person';
import {
  formatCpf,
  formatPhone,
  validateCpf,
  validateEmail,
  validatePhone,
} from '../utils/validators';

const props = defineProps<{
  initialData?: PersonFormData;
  submitLabel: string;
  loading: boolean;
}>();

const emit = defineEmits<{
  submit: [data: PersonFormData];
  cancel: [];
}>();

const form = reactive<PersonFormData>({
  name: '',
  email: '',
  cpf: '',
  birthDate: '',
  phone: '',
});

const errors = reactive<Record<string, string>>({});

watch(
  () => props.initialData,
  (data) => {
    if (data) {
      Object.assign(form, data);
    }
  },
  { immediate: true },
);

function onCpfInput(event: Event) {
  const input = event.target as HTMLInputElement;
  form.cpf = formatCpf(input.value);
}

function onPhoneInput(event: Event) {
  const input = event.target as HTMLInputElement;
  form.phone = formatPhone(input.value);
}

function validateField(field: keyof PersonFormData): boolean {
  errors[field] = '';

  switch (field) {
    case 'name':
      if (!form.name.trim()) {
        errors.name = 'O nome é obrigatório';
        return false;
      }
      break;

    case 'email':
      if (!form.email.trim()) {
        errors.email = 'O e-mail é obrigatório';
        return false;
      }
      if (!validateEmail(form.email)) {
        errors.email = 'E-mail inválido';
        return false;
      }
      break;

    case 'cpf':
      if (!form.cpf.trim()) {
        errors.cpf = 'O CPF é obrigatório';
        return false;
      }
      if (!validateCpf(form.cpf)) {
        errors.cpf = 'CPF inválido';
        return false;
      }
      break;

    case 'birthDate':
      if (!form.birthDate) {
        errors.birthDate = 'A data de nascimento é obrigatória';
        return false;
      }
      if (new Date(form.birthDate) > new Date()) {
        errors.birthDate = 'A data de nascimento não pode ser no futuro';
        return false;
      }
      break;

    case 'phone':
      if (!form.phone.trim()) {
        errors.phone = 'O telefone é obrigatório';
        return false;
      }
      if (!validatePhone(form.phone)) {
        errors.phone = 'Telefone inválido. Use o formato (XX) XXXXX-XXXX';
        return false;
      }
      break;
  }

  return true;
}

function validateAll(): boolean {
  const fields: (keyof PersonFormData)[] = [
    'name',
    'email',
    'cpf',
    'birthDate',
    'phone',
  ];
  return fields.map(validateField).every(Boolean);
}

function handleSubmit() {
  if (!validateAll()) return;
  emit('submit', { ...form });
}
</script>
