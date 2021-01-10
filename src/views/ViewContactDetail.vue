<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/contacts"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ editing ? "Edit" : "Add New" }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div>
        <ion-item>
          <ion-label position="stacked">Full Name</ion-label>
          <ion-input
              v-model="name"
              :value="contact.name"
              placeholder="Full Name"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Phone Number</ion-label>
          <ion-input
              :value="contact.phone_number"
              v-model="phone_number"
              placeholder="Phone Number"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Email address</ion-label>
          <ion-input
              :value="contact.email"
              v-model="email"
              placeholder="Email"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Address</ion-label>
          <ion-input
              v-model="address"
              :value="contact.address"
              placeholder="Address"
          ></ion-input>
        </ion-item>

        <ion-button @click="saveContact" expand="block" class="ion-margin-top">
          {{ editing ? "Update Contact" : "Save Contact" }}
        </ion-button>

        <ion-button color="danger" v-if="editing" @click="deleteContact" expand="block" class="ion-margin-top">
          Delete Contact
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  alertController
} from "@ionic/vue";

import axios from "axios";
import router from "@/router";

export default {
  name: "ViewContactDetail",
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
  },
  data() {
    return {
      contact: {},
      editing: false,
      id: 0,
      name: "",
      phone_number: "",
      address: "",
      email: "",
    };
  },
  watch: {},
  created() {
    const id = parseInt(this.$route.params.id);
    this.id = id;
    if (id) {
      this.editing = true;
      this.getContact(id);
    }
  },
  methods: {
    async getContact(id) {
      const response = await axios.get(`?id=${id}`);
      this.contact = response.data;
      this.name = this.contact.name;
      this.phone_number = this.contact.phone_number;
      this.address = this.contact.address;
      this.email = this.contact.email;
    },
    async saveContact() {
      const body = {
        name: this.name,
        phone_number: this.phone_number,
        address: this.address,
        email: this.email,
        id: this.id
      };
      let url = "?" + (this.editing === true ? 'update_contact' : 'save_contact');
      await axios.post(url, body);
      await router.replace('/contacts?changed=true');
    },


    async deleteContact() {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: 'DELETE!',
            message: 'Are you sure you want to delete this contact?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: blah => {
                  console.log('Confirm Cancel:', blah);
                },
              },
              {
                text: 'Okay',
                handler: async () => {
                  await axios.delete("?id=" + this.id);
                  await router.replace('/contacts?changed=true');
                },
              },
            ],
          });
      return alert.present();

    }
  },
};
</script>

<style scoped>
</style>