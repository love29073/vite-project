import { defineStore } from 'pinia'

type UserConfigState = {
  response_type: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
  code_challenge_method: string;
  code_challenge: string;
};
export const useUserConfig = defineStore("userConfig", {
  state: () => {
    return {
      response_type: 'code',
      client_id: '77or6qbh1de45pogvubjtn9mnr',
      redirect_uri: 'http://localhost:3000/login',
      scope: 'email',
      code_challenge_method: 'S256',
      code_challenge: 'pgoD4jN1X-GRQ4paDGPHW5tXh-sRkFPpOktI2xSToP8'
    } as UserConfigState;
  },
  actions: {
    getUrl(){
      return `https://gjerigoe0egdjo8023.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?response_type=${this.response_type}&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&scope=${this.scope}&code_challenge_method=${this.code_challenge_method}&code_challenge=${this.code_challenge}`
    }
  },
});