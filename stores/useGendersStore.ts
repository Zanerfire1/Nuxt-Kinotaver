import { defineStore } from 'pinia'
import { api } from '~/api';

export const useGendersStore = defineStore('gender', () =>{
  
  const genders = ref([]);
  async function fetchGender() {
   

    const res = await api.get('/genders');
    genders.value = res.data.genders;


    

  }  
  fetchGender()
  
  return {
      genders,
   }
})
