<template>
  <div id="app">
    <FormData />
    <Toast />
  </div>
</template>

<script>
import FormData from "@/components/FormData";
import { EventBus } from "@/EventBus/eventBus.js";
import { mapActions } from "vuex";
import Toast from "primevue/toast";

export default {
  name: "App",
  components: {
    FormData,
    Toast,
  },
  methods: {
    ...mapActions(["updateUserAction"]),
  },

  mounted() {
    EventBus.$on("sendData", (userData) => {
      try {
        this.updateUserAction(userData);
        this.$toast.add({
          severity: "success",
          summary: "Vuex:Saved",
          detail: "Data Saved Successfully in Global Store",
          life: 3000,
        });
      } catch (error) {
        alert("error");
        console.log(error);
      }
    });
  },
};
</script>

<style>
@import "./assets/styles.scss";
</style>
