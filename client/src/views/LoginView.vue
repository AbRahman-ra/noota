<template>
  <form class="login-form">
    <h2>Login</h2>
    <label for="username">Username or Email</label>
    <input type="text" id="username" required />

    <label for="password">Password</label>
    <input type="password" id="password" required />

    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LoginView",
});
</script>

<style>
.login-form {
  width: 90%;
  max-width: 540px;
  margin: 10% auto;
  background-color: #dde;
  box-sizing: border-box;
  padding: 15px;
}

.login-form * {
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}

.login-form label {
  width: 90%;
  text-align: left;
  margin-top: 20px;
}

.login-form input {
  width: 90%;
  font-size: 1.5rem;
  border: none;
  text-align: center;
  padding: 0.5rem;
}

.login-form button {
  width: 50%;
  font-size: 1.5rem;
  box-shadow: none;
  padding: 10px;
  margin-top: 20px;
  border-radius: 1rem;
  border: none;
  background-color: rgb(39, 109, 221);
  color: whitesmoke;
}
</style>
