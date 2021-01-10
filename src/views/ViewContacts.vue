<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>All Contacts</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/contacts/add">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
            v-for="contact in contacts"
            :router-link="`/contacts/${contact.id}`"
            :key="contact.id"
        >
          <ion-label class="ion-text-wrap">
            <h2>
              {{ contact.name }}
            </h2>
            <h3>{{ contact.phone_number }}</h3>
          </ion-label>
        </ion-item>
      </ion-list>
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
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonIcon,
  IonButton,
} from "@ionic/vue";
import axios from "axios";
import {add} from "ionicons/icons";

export default {
  name: "ViewContacts",
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonIcon,
    IonButton,
  },
  data() {
    return {
      contacts: [],
      add,
    };
  },
  watch: {
    $route(to, from) {
      if (to && from) {
        this.getContacts();
      }
    }
  },
  created() {
    this.getContacts();
  },
  methods: {
    async getContacts() {
      const response = await axios.get("?all_contacts");
      this.contacts = response.data;
    },

    refresh: (ev) => {
      setTimeout(() => {
        ev.detail.complete();
      }, 3000);
    },
  },
};
</script>