<template>
  <form class="signup-form">
    <h2>Sign Up</h2>
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      required
      v-model="username"
      @input="checkUser"
    />
    <span :class="status">{{ msg }}</span>

    <label for="email">Email</label>
    <input type="email" id="email" placeholder="optional" />

    <label for="password">Password</label>
    <input type="password" id="password" required />

    <button type="submit">Sign up</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SignupView",
  setup() {
    let username = ref("");
    let msg = ref("");
    let status = ref("");
    const checkUser = async () => {
      /*
       * send request to backend "/api/users"
       * If we found user => msg = "username {{ username }} already exists"
       * Else msg = "username {{ username }} is available"
       * */

      try {
        // Fetch from api => process the json => msg = processedJsonObj.msg
        let res = await fetch(
          `http://localhost:4000/api/users/${username.value}`
        );
        let msgObj = await res.json().then((msgObj) => msgObj);
        msg.value = msgObj.msg;
        status.value = msgObj.status;
      } catch (err) {
        console.log(err);
      }
    };
    return { username, checkUser, msg, status };
  },
});
</script>

<style>
.signup-form {
  width: 90%;
  max-width: 540px;
  margin: 10% auto;
  background-color: #dde;
  box-sizing: border-box;
  padding: 15px;
}

.signup-form * {
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}

.signup-form label {
  width: 90%;
  text-align: left;
  margin-top: 20px;
}

.signup-form input {
  width: 90%;
  font-size: 1.5rem;
  border: none;
  text-align: center;
  padding: 0.5rem;
}

.signup-form input[id="username"] {
  text-transform: lowercase;
}

.signup-form .ok {
  color: green;
}
.signup-form .warn {
  color: rgb(255, 133, 19);
}
.signup-form .err {
  color: crimson;
}

.signup-form button {
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
