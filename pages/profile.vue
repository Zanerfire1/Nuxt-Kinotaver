<script setup lang="ts">
  const profileStore = useProfileStore();
  const genderStore = useGendersStore();
  
  const fio = ref();
  const email = ref();
  const birthday = ref();
  const gender = ref(0);
  const authStore = useAuthStore();

  const profileLoad = async () =>{  
    await profileStore.fetchUserData(authStore.authData.id);
    fio.value = profileStore.userData.fio;
    email.value = profileStore.userData.email;
    birthday.value = profileStore.userData.birthday;
    gender.value = profileStore.userData.gender.id
    

}
profileLoad();


  const editProfile = async () =>{
    if (fio.value && email.value && birthday.value && gender.value) {
      await profileStore.updateProfile(fio.value, email.value, birthday.value, gender.value);
      profileLoad();
      
    }
  }
</script>

<template>
  <template v-if="profileStore.userData">
  
  <h3>{{ profileStore.userData.fio }}</h3>
  <p class="mb-1">Review count: {{ profileStore.userData.reviewCount }}</p>
  <p>Count scores: {{ profileStore.userData.ratingCount }}</p>
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" role="tab" aria-controls="profile-tab-pane" aria-selected="true" aria-current="page" href="#">My profile</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" role="tab" aria-controls="reviews-tab-pane" aria-selected="false" href="#">My reviews</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="scores-tab"  data-bs-toggle="tab" data-bs-target="#scores-tab-pane" role="tab" aria-controls="scores-tab-pane" aria-selected="false" href="#">My scores</a>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
    <p class="mt-3">Email: {{ profileStore.userData.email }}</p>
    <p>Birthday: {{ profileStore.userData.birthday }}</p>
    <p>Gender: {{ profileStore.userData.gender.name }}</p>
    <div>
      <button type="button" class="btn btn-warning me-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Edit</button>
      <button class="btn btn-danger" @click="profileStore.removeUserData(), $router.push('/')" >Delete Account</button>
    </div>
    
  </div>
  <div class="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
    <div v-for="review in profileStore.reviewsData" :key="review.id">
      <div class="row">
        <div class="col-9" >
         <h5>{{ review.film.name }}</h5> 
        </div>
        <div 
        class="col-1"
        :class="{'text-success':review.is_approved, 'text-danger':!review.is_approved}">
        {{ (review.is_approved) ? 'Approved': 'На рассмотрении' }}
      </div>
        <div class="col-2">{{ review.created_at }}</div>
      </div>
      <div class="row">
        <div class="col-10">
          {{ review.message }}
        </div>
        <div class="col-2">
          <button class="btn btn-danger">Remove</button>
        </div>
      </div>
      <hr class="divider"> 
    </div>
 

  </div>
  <div class="tab-pane fade" id="scores-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
    <div v-for="rating in profileStore.ratingsData" :key="rating.id">
      <div class="row">
        <div class="col-10">
         <h5>{{ rating.film.name }}</h5> 
        </div>
        <div class="col-2">{{ rating.created_at }}</div>
      </div>
      <div class="row">
        <div class="col-10 fw-bold" >
          {{ rating.score }} &#9734;
        </div>
        <div class="col-2">
          <button class="btn btn-danger">Remove</button>
        </div>
      </div>
      <hr class="divider">
    </div>
  </div>

</div>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit profile</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">FIO:</label>
              <input type="text" v-model="fio" class="form-control" id="fio">
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Email address:</label>
              <input type="email" class="form-control" v-model="email" id="email">
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Birthday:</label>
              <input type="date" class="form-control" v-model="birthday" id="birthday">
            </div>
            <div class="mb-3 mt-2">
              <label for="gender">Select Gender</label>
              <select v-model="gender" class="form-select" id="gender">
                <option value="null"></option>
                <option v-for="gender in genderStore.genders" :key="gender.id"  :value="gender.id" >{{ gender.name }}</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" @click="editProfile" data-bs-dismiss="modal"  class="btn btn-primary"> Change</button>
        </div>
      </div>
    </div>
  </div>
</template>
<div class="d-flex justify-content-center" v-else>
  <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
</template>

<style>

</style>