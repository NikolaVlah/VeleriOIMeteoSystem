<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">Meteorološke postaje</div>

    <q-btn color="primary" label="Dodaj postaju" @click="openAddDialog" class="q-mb-md" />

    <q-table
      title="Popis meteoroloških postaja"
      :rows="stations"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td>
          <q-btn flat color="primary" icon="edit" @click="openEditDialog(props.row)" />
          <q-btn flat color="negative" icon="delete" @click="confirmDelete(props.row)" />
        </q-td>
      </template>
    </q-table>

    <div class="text-h5 q-mt-lg q-mb-md">Hijerarhijski prikaz postaja i senzora</div>

    <q-list bordered>
      <q-expansion-item
        v-for="station in stations"
        :key="station.id"
        :label="station.name"
        icon="place"
      >
        <q-list>
          <q-item v-for="sensor in station.sensors" :key="sensor.id">
            <q-item-section>
              {{ sensor.name }} - {{ sensor.type }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>

    <q-dialog v-model="dialog">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">{{ isEdit ? 'Uredi postaju' : 'Dodaj postaju' }}</div>
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="form.name" label="Naziv postaje" />
          <q-input filled v-model="form.location" label="Lokacija" class="q-mt-md" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Odustani" v-close-popup />
          <q-btn color="primary" label="Spremi" @click="saveStation" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from 'src/firebase/firebase'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'

const dialog = ref(false)
const isEdit = ref(false)

const form = ref({
  id: null,
  name: '',
  location: ''
})

const stations = ref([])

const columns = [
  {
    name: 'name',
    label: 'Naziv postaje',
    field: 'name',
    align: 'left',
    sortable: true
  },
  {
    name: 'location',
    label: 'Lokacija',
    field: 'location',
    align: 'left',
    sortable: true
  },
  {
    name: 'actions',
    label: 'Akcije',
    field: 'actions',
    align: 'center'
  }
]
const loadStations = async () => {
  const querySnapshot = await getDocs(collection(db, 'meteoStation'))
  
  stations.value = querySnapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }))
}

onMounted(() => {
  loadStations()
})

const openAddDialog = () => {
  isEdit.value = false
  form.value = {
    id: null,
    name: '',
    location: ''
  }
  dialog.value = true
}

const openEditDialog = (row) => {
  isEdit.value = true
  form.value = { ...row }
  dialog.value = true
}

const saveStation = async () => {
  if (isEdit.value) {
    const stationRef = doc(db, 'meteoStation', form.value.id)

    await updateDoc(stationRef, {
      name: form.value.name,
      location: form.value.location
    })
  } else {
    await addDoc(collection(db, 'meteoStation'), {
      name: form.value.name,
      location: form.value.location,
      sensors: []
    })
  }

  dialog.value = false
  await loadStations()
}

const confirmDelete = async (row) => {
  if (confirm('Jeste li sigurni da želite obrisati postaju?')) {
    await deleteDoc(doc(db, 'meteoStation', row.id))
    await loadStations()
  }
}
</script>