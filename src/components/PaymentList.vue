<template>
  <div>
    <v-app-bar app color="primary">
      <v-toolbar-title>Моё приложение</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Пользователи</v-btn>
      <v-btn to="/payment" text>Платежи</v-btn>
    </v-app-bar>
    <h2>Список платежей</h2>
    <v-card v-for="(payment, index) in payments" :key="index" class="payment-card">
      <v-card-title>{{ payment.user }}</v-card-title>
      <v-card-text>Время: {{ payment.time }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'; 

export default {
  computed: {
    ...mapState(['payments']) 
  }
};
</script>

<style scoped>
.payment-card {
  margin-bottom: 20px;
}
</style>
