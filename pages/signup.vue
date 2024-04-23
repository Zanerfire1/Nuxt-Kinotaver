<template>

<main class="form-signup w-100 m-auto">
  <form @submit.prevent="signup" >
  <div class="d-flex justify-content-center">
    <img class="mb-4 " src="/fusion3.png" alt="" width="57" height="57">
  </div>
    <h1 class="h3 mb-3 fw-normal text-center">Please sign up</h1>
  
    <div class="alert alert-danger" role="alert" v-show="errorMsg">
      {{ errorMsg }}
    </div>

    <div class="form-floating mb-3">
      <input type="text" v-model="fio" class="form-control" id="floatingFio" placeholder="Input User Name">
      <label for="floatingFio">User Name</label>
    </div>
    <div class="form-floating mb-3">
      <input type="email" v-model="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating mb-3">
      <input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <div class="form-floating mb-3">
      <input type="date" v-model="birthday" class="form-control" id="floatingBirthday">
      <label for="floatingBirthday">Birthday</label>
    </div>
    <div class="form-floating mb-3">
      <select v-model="gender" class="form-select" id="gender">
        <option value="null"></option>
        <option v-for="gender in genderStore.genders" :key="gender.id"  :value="gender.id">{{ gender.name }}</option>
      </select>
      <label for="gender">Select Gender</label>
      
    </div>
    <button class="btn btn-primary w-100 py-2" type="submit">Sign up</button>
  </form>
</main>

</template>

<script lang="ts" setup>
  const authStore = useAuthStore();
  const genderStore = useGendersStore();
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const errorMsg = ref('');
  const fio = ref('');
  const birthday = ref('');
  const gender = ref(null);

  const signup = async () => {
    if (fio.value && email.value && password.value && birthday.value  && gender.value) {
      try {
        await authStore.signup({fio: fio.value,
        email: email.value,
        password: password.value,
        birthday: birthday.value,
        gender_id: gender.value});
        router.push('/');
      }catch (error: any){
        errorMsg.value = error.message;
      }
    }
  };
</script>

<style>
.form-signup{
  max-width: 330px;
  padding: 1em;
}
</style>