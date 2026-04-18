<template>
  <div class="overflow-x-auto">
    <table
      v-if="persons.length > 0"
      v-motion
      :initial="{ opacity: 0, y: 15 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
      class="w-full border-collapse overflow-hidden rounded-xl bg-white shadow-sm"
    >
      <thead>
        <tr>
          <th class="border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-600">Nome</th>
          <th class="border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-600">E-mail</th>
          <th class="border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-600">CPF</th>
          <th class="border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-600">Data de Nascimento</th>
          <th class="border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-600">Telefone</th>
          <th class="border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(person, index) in persons"
          :key="person.id"
          v-motion
          :initial="{ opacity: 0, x: -10 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: index * 50, duration: 300 } }"
          class="border-b border-gray-100 transition-colors hover:bg-gray-50"
        >
          <td class="px-4 py-3 text-sm text-gray-800">{{ person.name }}</td>
          <td class="px-4 py-3 text-sm text-gray-800">{{ person.email }}</td>
          <td class="px-4 py-3 text-sm text-gray-800">{{ person.cpf }}</td>
          <td class="px-4 py-3 text-sm text-gray-800">{{ formatDate(person.birthDate) }}</td>
          <td class="px-4 py-3 text-sm text-gray-800">{{ person.phone }}</td>
          <td class="flex gap-2 whitespace-nowrap px-4 py-3">
            <button
              class="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 cursor-pointer"
              @click="$emit('edit', person)"
            >
              Editar
            </button>
            <button
              class="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700 cursor-pointer"
              @click="$emit('delete', person)"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-else
      v-motion
      :initial="{ opacity: 0, scale: 0.95 }"
      :enter="{ opacity: 1, scale: 1, transition: { duration: 400 } }"
      class="rounded-xl bg-white p-12 text-center text-gray-500 shadow-sm"
    >
      <p class="text-base">Nenhuma pessoa cadastrada.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Person } from '../types/person';

defineProps<{
  persons: Person[];
}>();

defineEmits<{
  edit: [person: Person];
  delete: [person: Person];
}>();

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}
</script>
