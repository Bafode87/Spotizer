<template>
    <Teleport to="body">
        <div v-if="props.open" class="modal">
            <div class="modal__container">

                <h3>{{ props.label }}</h3>
                <input type="text" :placeholder="placeholder" v-model="name">
                <div class="modal__button">
                    <button @click="cancel">Annuler</button>
                    <button @click="confirmModal">Créer</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps ({
    open: {
        type: Boolean,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: true
    }
})

const emits = defineEmits(['close', 'confirm']);

const name = ref('');

function confirmModal () {
    if (name.value !== '') {
        emits('confirm', name.value);
        emits('close');
        name.value = '';
    }
}

function cancel () {
    emits('close');
}
</script>
