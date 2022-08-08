import { defineStore } from 'pinia';

type UserConfigState = {
  response_type: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
  code_challenge_method: string;
  code_challenge: string;
  codeVerifier: string;
};
export const useUserConfig = defineStore("userConfig", {
  state: () => {
    return {
      response_type: 'code',
      client_id: '77or6qbh1de45pogvubjtn9mnr',
      redirect_uri: 'http://localhost:3000/login',
      scope: 'email',
      code_challenge_method: 'S256',
      code_challenge: '',
      codeVerifier: ''
    } as UserConfigState;
  },
  actions: {
    async getUrl(){
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
      let length = 43;

      for (var i = 0; i < length; i++) {
        this.codeVerifier += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      let digest = await crypto.subtle.digest("SHA-256",new TextEncoder().encode(this.codeVerifier));
      this.code_challenge = btoa(String.fromCharCode(...new Uint8Array(digest))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

      return Promise.resolve(`https://gjerigoe0egdjo8023.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?response_type=${this.response_type}&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&scope=${this.scope}&code_challenge_method=${this.code_challenge_method}&code_challenge=${this.code_challenge}`)
    },
  }
});