
<template>
  <div>
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          :style="`background-image: url('${registerBg2}');`"
        ></div>
          <contact-book-screen/>
      </section>
    </main>
  </div>
</template>
<script>
import ContactBookScreen from '../components/ContactBookScreen.vue'

import registerBg2 from "~/assets/img/register_bg_2.png";

export default {
    components: { ContactBookScreen },

    data() {
      return {
        registerBg2,
      };
  },
  }
</script>
