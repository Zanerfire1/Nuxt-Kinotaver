import { defineStore } from 'pinia'
import { api } from '~/api';

export const useProfileStore = defineStore('profile', () => {
    const userData = ref(null);
    const authStore = useAuthStore();
    const reviewsData = ref([]);
    const ratingsData = ref([]);
  
    async function fetchUserData(id: number) {
      const res = await api.get(`/users/${id}`, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });
      userData.value = res.data;
    }

    async function fetchReviewsData() {
      const res = await api.get(`/users/${authStore.authData.id}/reviews`, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });
      reviewsData.value = res.data.reviews;
    }

    async function removeUserData() {
      await api.delete(`/users`, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      })
      authStore.removeAuthData();
    }

    async function fetchRatingsData() {
      const res = await api.get(`/users/${authStore.authData.id}/ratings`, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });
      ratingsData.value = res.data.ratings;
    }

    async function updateProfile(fio:string, email:string, birthday:string, gender_id: number) {
      const res = await api.put(`/users`,{
        fio,
        email,
        birthday,
        gender_id,
      },{
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });

    }


    fetchReviewsData();
    fetchRatingsData();


    return {
      userData,
      reviewsData,
      ratingsData,
      fetchUserData,
      updateProfile,
      removeUserData
    }
});