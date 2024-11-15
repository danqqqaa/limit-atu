import { defineStore } from 'pinia'

type UserCredentials = {
  token: string,
  user: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: undefined as undefined | string,
    username: undefined as undefined | string
  }),

  actions: {

    setToken(data: UserCredentials) {
      console.log(data);
      
      localStorage.setItem('TOKEN', data.token || '')
      localStorage.setItem('USERNAME', data.user || '')
    },
    getUser() {
      return localStorage.getItem('USERNAME')
    },
    getToken() {
      return localStorage.getItem('TOKEN')
    }
  }
})
