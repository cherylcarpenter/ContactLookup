<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="
            relative
            flex flex-col
            min-w-0
            break-words
            w-full
            mb-6
            shadow-lg
            rounded-lg
            bg-blueGray-200
            border-0
          "
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h1 class="text-3xl">Contact Lookup</h1>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="
                    block
                    uppercase
                    text-blueGray-600 text-xs
                    font-bold
                    mb-2
                  "
                >
                  Email
                </label>
                <input
                  v-model="v$.form.email.$model"
                  type="text"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-blueGray-300
                    text-blueGray-600
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                    mb-2
                  "
                  :class="{
                    'error-border': v$.form.email.$errors.length || noneFound,
                  }"
                  placeholder="Email"
                  required
                  @input="clearForm"
                />
                <div
                  v-for="(error, index) of v$.form.email.$errors"
                  :key="index"
                  class="input-errors"
                >
                  <p v-if="form.email" class="text-red-500 text-xs italic">
                    {{ error.$message }}
                  </p>
                </div>
              </div>
              <div class="text-center mt-6">
                <button
                  class="
                    bg-blueGray-800
                    text-white
                    active:bg-blueGray-600
                    text-sm
                    font-bold
                    uppercase
                    px-6
                    py-3
                    rounded
                    shadow
                    hover:shadow-lg
                    outline-none
                    focus:outline-none
                    mr-1
                    mb-1
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                  "
                  type="submit"
                  :disabled="v$.form.$invalid"
                  @click.prevent="lookUpContact"
                >
                  Lookup
                </button>
              </div>
              <div v-if="statusMsg && !form.email.$pending">
                <p class="text-red-500 italic">
                  {{ statusMsg }}
                </p>
              </div>
              <div v-if="selectedContact.length !== 0" class="bg-white p-4">
                <h3 class="text-center text-2xl mb-2 font-bold">
                  {{ selectedContact[0].name }}
                </h3>
                <div class="wrapper grid grid-cols-2 gap-2">
                  <div>
                    <p>{{ selectedContact[0].email }}</p>
                    <p>
                      {{ selectedContact[0].city }},
                      {{ selectedContact[0].city }}
                      {{ selectedContact[0].postal_code }}
                    </p>
                    <p>{{ selectedContact[0].country }}</p>

                    <p>
                      +{{ selectedContact[0].phone[0].country_code }} ({{
                        selectedContact[0].phone[0].area_code
                      }})-{{
                        selectedContact[0].phone[0].number.slice(0, 3)
                      }}-{{ selectedContact[0].phone[0].number.slice(3) }}
                    </p>
                  </div>
                  <div>
                    <div v-if="selectedContact[0].employments.length">
                      <h4 class="font-bold">Work History</h4>
                      <ul class="divide-y-2">
                        <li
                          v-for="(jobs, j) in selectedContact[0].employments"
                          :key="j"
                        >
                          <h5>{{ jobs.company }}</h5>
                          <p>{{ jobs.title }}</p>
                          <p>Currently employed here? {{ jobs.primary }}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

export default {
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  setup: () => ({ v$: useVuelidate() }),
  validationConfig: {
    $lazy: true,
  },
  data() {
    return {
      form: {
        email: '',
      },
      contacts: [],
      selectedContact: [],
      statusMsg: '',
      noneFound: false,
    }
  },
  async fetch() {
    this.contacts = await fetch('/data/contacts.json').then((res) => res.json())
  },
  methods: {
    clearForm() {
      this.statusMsg= ''
      this.noneFound=false
      this.selectedContact= []

    },
    lookUpContact() {
      this.selectedContact = this.contacts.filter(
        (contact) => contact.email === this.form.email
      )
      if (this.selectedContact.length === 0) {
        this.statusMsg = `No contacts with email ${this.form.email}`
        this.noneFound = true
      }
    },
  },

  validations() {
    return {
      form: {
        email: {
          required,
          email: helpers.withMessage(
            'This must be a valid email address.',
            email
          ),
        },
      },
    }
  },
}
</script>
<style scoped>
.error-border {
  border: 1px solid red;

  &:focus {
    box-shadow: 0 0 0 0 white, 0 0 0 3px rgba(255, 0, 0, 0.27),
      0 1px 3px 0px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
}
</style>
