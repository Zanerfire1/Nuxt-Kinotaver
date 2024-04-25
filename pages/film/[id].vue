<script setup lang="ts">
  const detailFilmStore = useDetailFilmStore();
  const route = useRoute();
  const authStore = useAuthStore();
  const message = ref('');
  const hoverRating = ref(0);

  const sendReview = () =>{
    if(message.value){
        detailFilmStore.sendReview(route.params.id, message.value)
    }
  }


  detailFilmStore.fetchFilm(route.params.id);
  detailFilmStore.fetchReviews(route.params.id)

</script>

<template>

<template v-if="detailFilmStore.film">
<div class="row">
    <div class="col-1 mt-3"><h3>{{detailFilmStore.film.ratingAvg}}</h3></div>
    <div class="col"> <iframe width="980" height="500" :src='detailFilmStore.film.link_video' title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    
    </div>
<div class="col" v-if="authStore.authData">
    <div class="d-flex  flex-column align-items-center gap-2"> 
     <p v-for="index in [5, 4, 3, 2, 1]" :key="index"> 
      <a @click.prevent="detailFilmStore.addRating(index)" class="text-warning link-offset-2 link-underline link-underline-opacity-0"> 
       <i :class="hoverRating >= index ? 'fas fa-star fa-2xl' : 'fa-sharp fa-regular fa-star fa-2xl'" @mouseover="hoverRating = index"></i> 
      </a> 
    </p> 
</div>
</div>
<div class="col" v-else>
    <div class="d-flex  flex-column align-items-center gap-2">
        <h5 class="text-danger">SIGN UP STUPID MAAAN, TO SEND RATING!!!!!</h5>
        <p v-for="index in [5, 4, 3, 2, 1]" :key="index"> 
         <a  class="text-warning link-offset-2 link-underline link-underline-opacity-0"> 
          <i :class="hoverRating >= index ? 'fas fa-star fa-2xl' : 'fa-sharp fa-regular fa-star fa-2xl'" @mouseover="hoverRating = index"></i> 
         </a> 
        </p> 
 </div>
</div>
</div>
<div class="row mt-5">
    <div class="col">
        <h3>{{detailFilmStore.film.name}}</h3>
    </div>
</div>
<div class="row mt-2">
    <div class="col-1"><h6>{{detailFilmStore.film.duration}} </h6> </div>
    <div class="col-1"><h6>{{detailFilmStore.film.country.name}}</h6> </div>
    <div class="col-1"><h6>{{detailFilmStore.film.year_of_issue}}</h6>  </div>
    <div class="col-1"><h6>{{detailFilmStore.film.age}}+</h6> </div>
    <div class="col-1"><h6>{{(new Date(detailFilmStore.film.created_at)).toLocaleDateString() }}</h6></div>
    <div class="col-6"><h6><template v-for="(genre,index) in detailFilmStore.film.categories" :key="genre.id">
        {{ (index != detailFilmStore.film.categories.length -1) ? genre.name+',' :genre.name }}
        </template></h6> </div>
    <div class="col-1 d-flex "> <a href="https://www.youtube.com/embed/fCO7f0SmrDc?si=WNUseTmpUEFZ5OdC"> Link to Youtube</a></div>
</div>
<div class="row mt-5">
    <div class="col">
        <h3>Add review</h3>
    </div>
</div>
<div class="row" v-if="authStore.authData">
    <div class="col-9">
        <div class="form-floating">
            <textarea v-model="message" class="form-control" placeholder="Leave a comment here"  style="height: 100px"></textarea>
            <label for="floatingTextarea2">Comments</label>
          </div>
    </div>
    <div class="col mt-5">
        <button class="btn btn-primary" @click="sendReview">Send</button>
    </div>
</div>
<div class="row" v-else>
    <h3 class="text-center">Sign in if you what to add a comment</h3>
</div>

<div class="row mt-5">
    <div class="col">
        <h3>Reviews</h3>
    </div>
    <div class="ms-5" v-for="review in detailFilmStore.reviews" :key="review.id">
        <div class="row mt-2">
            <div class="col-9"><h5>{{ review.user.fio}}</h5></div>
            <div class="col"><h5>{{(new Date(review.created_at)).toLocaleDateString() }}</h5> </div>
        </div>
        <div class="row">
            <h6>{{ review.message}}</h6>
        </div>
        <hr class="mt-3">
    </div>
</div>

</template>
<div class="d-flex justify-content-center" v-else>
    <div class="spinner-grow text-dark" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>