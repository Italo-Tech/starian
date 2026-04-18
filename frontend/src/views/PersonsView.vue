<template>
  <div class="mx-auto max-w-6xl px-6 py-8">
    <header
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="mb-6 flex items-center justify-between"
    >
      <h1 class="text-2xl font-bold text-gray-800">Cadastro de Pessoas</h1>
      <button
        class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md cursor-pointer"
        @click="openCreateModal"
      >
        + Nova Pessoa
      </button>
    </header>

    <div
      v-if="loading"
      class="py-12 text-center text-gray-500"
    >
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <p class="mt-3 text-base">Carregando...</p>
    </div>

    <PersonTable
      v-else
      :persons="persons"
      @edit="openEditModal"
      @delete="openDeleteConfirm"
    />

    <!-- Modal Criar -->
    <ModalDialog
      v-if="showCreateModal"
      title="Nova Pessoa"
      @close="showCreateModal = false"
    >
      <PersonForm
        submit-label="Cadastrar"
        :loading="saving"
        @submit="handleCreate"
        @cancel="showCreateModal = false"
      />
    </ModalDialog>

    <!-- Modal Editar -->
    <ModalDialog
      v-if="showEditModal"
      title="Editar Pessoa"
      @close="showEditModal = false"
    >
      <PersonForm
        submit-label="Salvar"
        :loading="saving"
        :initial-data="editFormData"
        @submit="handleUpdate"
        @cancel="showEditModal = false"
      />
    </ModalDialog>

    <!-- Modal Confirmar Exclusão -->
    <ModalDialog
      v-if="showDeleteModal"
      title="Confirmar Exclusão"
      @close="showDeleteModal = false"
    >
      <ConfirmDialog
        :message="`Deseja realmente excluir o cadastro de ${personToDelete?.name}?`"
        @confirm="handleDelete"
        @cancel="showDeleteModal = false"
      />
    </ModalDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import type { Person, PersonFormData } from '../types/person';
import { personService } from '../services/person.service';
import PersonTable from '../components/PersonTable.vue';
import PersonForm from '../components/PersonForm.vue';
import ModalDialog from '../components/ModalDialog.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';

const toast = useToast();

const persons = ref<Person[]>([]);
const loading = ref(false);
const saving = ref(false);

const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);

const editingPerson = ref<Person | null>(null);
const editFormData = ref<PersonFormData>();
const personToDelete = ref<Person | null>(null);

function extractErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  ) {
    const response = (error as { response?: { data?: { message?: string | string[] } } }).response;
    const message = response?.data?.message;
    if (Array.isArray(message)) return message.join(', ');
    if (typeof message === 'string') return message;
  }
  return 'Ocorreu um erro inesperado';
}

async function loadPersons() {
  loading.value = true;
  try {
    persons.value = await personService.getAll();
  } catch (error) {
    toast.error(extractErrorMessage(error));
  } finally {
    loading.value = false;
  }
}

function openCreateModal() {
  showCreateModal.value = true;
}

function openEditModal(person: Person) {
  editingPerson.value = person;
  editFormData.value = {
    name: person.name,
    email: person.email,
    cpf: person.cpf,
    birthDate: person.birthDate,
    phone: person.phone,
  };
  showEditModal.value = true;
}

function openDeleteConfirm(person: Person) {
  personToDelete.value = person;
  showDeleteModal.value = true;
}

async function handleCreate(data: PersonFormData) {
  saving.value = true;
  try {
    await personService.create(data);
    showCreateModal.value = false;
    toast.success('Pessoa cadastrada com sucesso!');
    await loadPersons();
  } catch (error) {
    toast.error(extractErrorMessage(error));
  } finally {
    saving.value = false;
  }
}

async function handleUpdate(data: PersonFormData) {
  if (!editingPerson.value) return;
  saving.value = true;
  try {
    await personService.update(editingPerson.value.id, data);
    showEditModal.value = false;
    toast.success('Pessoa atualizada com sucesso!');
    await loadPersons();
  } catch (error) {
    toast.error(extractErrorMessage(error));
  } finally {
    saving.value = false;
  }
}

async function handleDelete() {
  if (!personToDelete.value) return;
  try {
    await personService.remove(personToDelete.value.id);
    showDeleteModal.value = false;
    toast.success('Pessoa excluída com sucesso!');
    await loadPersons();
  } catch (error) {
    toast.error(extractErrorMessage(error));
  }
}

onMounted(loadPersons);
</script>
