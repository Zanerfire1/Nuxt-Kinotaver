<script setup lang="ts">
  const authStore = useAuthStore();
</script>

<template>
        <nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="/public/fusion3.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
      KinoTower
    </a>
  <template v-if="!authStore.authData">
    <div class="d-fiex">
        <button @click="$router.push('/signup')" class="btn btn-outline-primary me-3">Sign Up</button>
        <button @click="$router.push('/signin')" class="btn btn-outline-success" >Sign in</button>
    </div>
  </template>
  <template v-else>
  <div class="d-flex align-items-center">
    <a href="#" class="link-offset-1 pe-3">{{  authStore.authData.fio }}</a>
    <button class="btn btn-outline-danger me-3 " @click="authStore.signout">Sign Out</button>
  </div>
  </template>
   </div>
    </nav>
    <div class="container py-2 mb-auto" style="min-height: calc(100vh-190px);">
      <slot />
    </div>
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
      </a>
      <span class="mb-3 mb-md-0 text-body-secondary">© 2024 Kinotower, Inc</span>
    </div>
    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></a></li>
      <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></a></li>
      <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li>
    </ul>
</footer>
</template>

<style>
    .container {
        min-height: calc(100vh - 40px - 150px);
    }
</style>
    