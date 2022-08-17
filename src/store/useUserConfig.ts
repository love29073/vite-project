import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import qs from "qs";

export const useUserConfig = defineStore("userConfig", () => {
  //state
  const host =
    "https://gjerigoe0egdjo8023.auth.ap-northeast-1.amazoncognito.com/oauth2";
  const response_type = "code";
  const client_id = "77or6qbh1de45pogvubjtn9mnr";
  const redirect_uri = "http://localhost:3000/process";
  const scope = "email%20openid";
  const code_challenge_method = "S256";
  let code_challenge = "";
  let codeVerifier = "";
  const grant_type = "authorization_code";
  let access_token = ref("");
  let loginSuccess = ref(false);
  const logoutUrl = ref(
    `https://gjerigoe0egdjo8023.auth.ap-northeast-1.amazoncognito.com/logout?client_id=${client_id}&logout_uri=http://localhost:3000/login`
  );

  //action
  const getUrl = async () => {
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let length = 43;

    for (var i = 0; i < length; i++) {
      codeVerifier += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }
    sessionStorage.setItem("codeVerifier", codeVerifier);
    let digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(codeVerifier)
    );
    code_challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    return Promise.resolve(
      `${host}/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&code_challenge_method=${code_challenge_method}&code_challenge=${code_challenge}`
    );
  };

  const getToken = (code: string) => {
    let codeVerifier_data = sessionStorage.getItem("codeVerifier");
    let data = {
      grant_type: grant_type,
      client_id: client_id,
      code: code,
      code_verifier: codeVerifier_data,
      redirect_uri: redirect_uri,
    };

    axios
      .post(`${host}/token`, qs.stringify(data), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        sessionStorage.removeItem("codeVerifier");
        access_token.value = res.data.access_token;
        getInfo();
      })
      .catch((error) => {
        console.log(error, "失敗");
        loginSuccess.value = false;
      });
  };

  const getInfo = () => {
    axios
      .get(`${host}/userInfo`, {
        // axios.get(`http://mydemoalb-82893112.ap-northeast-1.elb.amazonaws.com/api/userInfo`, {
        headers: {
          Authorization: `Bearer ${access_token.value}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        loginSuccess.value = true;
        localStorage.setItem("isAuthenticated", loginSuccess.value.toString());
      })
      .catch((error) => {
        console.error(error, "失敗");
        loginSuccess.value = false;
      });
  };

  return {
    getUrl,
    getToken,
    access_token,
    logoutUrl,
    loginSuccess,
  };
});
