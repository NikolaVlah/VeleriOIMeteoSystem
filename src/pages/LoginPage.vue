<template>
    <div class="flex flex-center" style="height: 100vh">

    <q-card style="width: 400px">

      <q-card-section>
        <div class="text-h5">
          Prijava korisnika
        </div>
      </q-card-section>

      <q-card-section>

        <q-input
          filled
          v-model="email"
          label="Email"
        />

        <q-input
          filled
          v-model="password"
          label="Lozinka"
          type="password"
          class="q-mt-md"
        />

      </q-card-section>

      <q-card-actions align="right">

        <q-btn
          color="primary"
          label="Prijava"
          @click="login"
        />

      </q-card-actions>

    </q-card>

  </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase'

const router = useRouter()

const email = ref('')
const password = ref('')

const login = async () => {

  try {

    await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    )

    router.push('/dashboard')

  }
  catch (error) {

    alert('Neispravan email ili lozinka')

    console.log(error)

  }

}

</script>