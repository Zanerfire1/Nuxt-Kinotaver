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

    async function fetchRatingsData() {
      const res = await api.get(`/users/${authStore.authData.id}/ratings`, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });
      ratingsData.value = res.data.ratings;
    }

    fetchUserData(authStore.authData.id);
    fetchReviewsData();
    fetchRatingsData();


    return {
      userData,
      reviewsData,
      ratingsData
    }
});