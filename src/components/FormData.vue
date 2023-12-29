<template>
  <div>
    <main
      v-if="isVisible"
      class="flex flex-column align-items-center w-full text-lg"
    >
      <h1 class="w-5 text-left">TASK - FUNCTIONIZE</h1>
      <div class="flex flex-column align-items-start w-5">
        <label class="my-2 mr-3"
          >User Name <span class="required text-red-500">*</span>
        </label>
        <div class="flex w-full">
          <InputText
            type="text"
            v-model="user.name"
            class="w-6 mr-1"
            placeholder="Enter your User Name"
          />
          <InlineMessage v-if="hasError && !user.name"> Required</InlineMessage>
        </div>
      </div>
      <div class="flex flex-column align-items-start w-5">
        <label class="my-2">Role</label>
        <InputText
          disabled
          type="text"
          v-model="user.role"
          class="w-6 text-lg font-bold"
        />
      </div>

      <div class="w-5 flex gap-3">
        <div class="flex flex-column align-items-start">
          <label class="my-2"
            >Expected Salary <span class="required text-red-500">*</span>
          </label>
          <div class="flex w-full gap-2">
            <div class="salary">
              <span>$</span>
              <input type="number" v-model="user.expSalary" />
            </div>
            <InlineMessage v-if="hasError && !user.expSalary"
              >Required</InlineMessage
            >
          </div>
        </div>
        <div class="flex flex-column align-items-start">
          <label class="my-2"
            >Increment <span class="required text-red-500">*</span>
          </label>
          <div class="flex w-15rem gap-2">
            <div class="salary w-full">
              <input type="number" min="0" max="100" v-model="user.increment" />
              <span class="percentage">%</span>
            </div>
            <InlineMessage v-if="hasError && !user.increment"
              >Required</InlineMessage
            >
          </div>
        </div>
      </div>

      <div class="w-5 flex flex-column align-items-start">
        <label class="my-2"
          >Age <span class="required text-red-500">*</span>
        </label>
        <div class="flex gap-2 w-full">
          <InputNumber
          class="w-6"
            v-model="user.age"
            inputId="minmax"
            :min="0"
            :max="100"
          />
          <InlineMessage v-if="hasError && !user.age">Required</InlineMessage>
        </div>
      </div>

      <div class="w-5 flex flex-column align-items-start">
        <label class="my-2"
          >Address <span class="required text-red-500">*</span>
        </label>
        <div class="flex gap-2 align-items-center w-full">
          <Textarea  v-model="user.address" autoResize rows="4" cols="45" />
          <InlineMessage v-if="hasError && !user.address"
            >Required</InlineMessage
          >
        </div>
      </div>
      <!-- <Dropdown :options="cities" optionLabel="name" v-model="selectedCity" /> -->

      <div class="w-5 flex flex-column align-items-start">
        <label class="my-2"
          >Date Of Birth <span class="required text-red-500">*</span>
        </label>
        <div class="flex gap-2 align-items-center w-full">
          <Calendar class="w-6" v-model="user.dob" />

          <InlineMessage v-if="hasError && !user.dob">Required</InlineMessage>
        </div>
      </div>

      <div class="w-5 flex flex-column align-items-start my-3">
        <div class="w-full flex align-items-center gap-4">
          <label class="my-2"
            >Skills <span class="required text-red-500">*</span>
          </label>
          <InlineMessage v-if="hasError && !user.skills.length"
            >Required</InlineMessage
          >
        </div>
        <div class="flex gap-2 align-items-center">
          <div class="flex flex-column gap-2">
            <div class="flex gap-2">
              <Checkbox v-model="user.skills" name="REACT" value="react" />
              <label for="">REACT</label>
            </div>
            <div class="flex gap-2">
              <Checkbox v-model="user.skills" name="VUE" value="vue" />
              <label for="">VUE</label>
            </div>
            <div class="flex gap-2">
              <Checkbox v-model="user.skills" name="ANGULAR" value="angular" />
              <label for=""> ANGULAR </label>
            </div>
          </div>
        </div>
      </div>

      <div class="w-5 flex flex-column align-items-start">
        <label class="my-2"
          >Select Country <span class="required text-red-500">*</span>
        </label>
        <div class="flex gap-2 align-items-center w-full">
          <Dropdown
            v-model="user.selectedCity"
            :options="cities"
            optionLabel="name"
            placeholder="Select a City"
            class="w-6"
          />
          <InlineMessage v-if="hasError && !user.selectedCity"
            >Required</InlineMessage
          >
        </div>
      </div>
      <div class="w-5 flex flex-column align-items-start">
        <label class="my-2"
          >Upload Your Resume <span class="required text-red-500">*</span>
        </label>
        <div class="flex flex-column gap-2 align-items-start p-2">
          <div class="flex gap-3 align-items-center">
            <input class="file-upload" type="file" @change="onUpload" />
            <InlineMessage v-if="hasError && !user.resume"
              >Required</InlineMessage
            >
          </div>
          <Chip v-if="user.resume" :image="chipImg" :label="fileName" />
        </div>
      </div>
      <Toast />
      <Button class="m-4 py-2 px-4" @click="saveData" label="SAVE" />
    </main>
    <LoadingState :loading="loading" />
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import InlineMessage from "primevue/inlinemessage";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Checkbox from "primevue/checkbox";
import Toast from "primevue/toast";
import Button from "primevue/button";
import Chip from "primevue/chip";
import LoadingState from "./LoadingState.vue";

import { EventBus } from "@/EventBus/eventBus.js";

export default {
  name: "FormData",
  data() {
    return {
      user: {
        name: "",
        role: "Front-end(vue)",
        expSalary: "",
        increment: "",
        age: null,
        address: "",
        dob: "",
        selectedCity: "",
        skills: [],
        resume: "",
      },
      fileName: "",
      chipImg: "",
      cities: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
      hasError: false,
      loading: true,
      isVisible: false,
    };
  },
  watch: {
    "user.salary"(value) {
      this.user.salary = Number(value);
    },
    "user.increment"(value) {
      this.user.increment = Number(value);
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      this.isVisible = true;
      setTimeout(() => {
        this.$toast.add({
          severity: "info",
          summary: "Add Details",
          detail: "please fill all fields",
          life: 7000,
        });
        this.$toast.add({
          severity: "warn",
          summary: "fill * required fields",
          detail: "please fill all fields",
          life: 3000,
        });
      }, 1000);
    }, 3000);
  },
  methods: {
    show() {
      this.$toast.add({
        severity: "info",
        summary: "Info",
        detail: "Message Content",
        life: 3000,
      });
    },
    onUpload(e) {
      let file = e.target.files[0];
      this.user.resume = file;
      this.fileName = file.name;
      this.chipImg = URL.createObjectURL(file);
    },
    saveData() {
      this.hasError = !Object.values(this.user).every((e) => e);
      if (this.hasError) {
        this.$toast.add({
          severity: "warn",
          summary: "Fill Required Fields",
          detail: "*",
          life: 3000,
        });
      } else {
        this.loading = true;
        setInterval(() => {
          this.loading = false;
        }, 2000);
        EventBus.$emit("sendData", this.user);
        
      }
    },
  },
  components: {
    InputText,
    InlineMessage,
    InputNumber,
    Textarea,
    Dropdown,
    Calendar,
    Checkbox,
    Toast,
    Button,
    Chip,
    LoadingState,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/form.scss";
</style>