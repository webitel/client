<template>
    <v-app>
        <!--        ANIMATION CANVAS-->
        <canvas ref="login-canvas" class="login-canvas"></canvas>

        <v-container fluid class="pa-0">
            <v-layout>
                <v-flex xs12>

<!--                    alerts login error-->
                    <v-alert
                            class="error-message"
                        :value="error"
                        color="error"
                    >{{error}}</v-alert>

                    <section class="login">
                        <h2>{{$t('auth.loginTitle')}}</h2>
                        <v-form>
                            <v-text-field
                                    v-bind:label="$t('auth.user')"
                                    v-model="username"
                            ></v-text-field>
                            <v-text-field
                                    v-bind:label="$t('auth.password')"
                                    v-model="password"
                                    password
                            ></v-text-field>
                            <v-btn @click="login">{{$t('auth.submit')}}</v-btn>
                        </v-form>
                    </section>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import { login } from '../api/auth';
import errorMixin from '../mixins/errorMixin';
import loginAnimation from '../assets/js/loginAnimation';

export default {
  name: 'login',
  mixins: [errorMixin],
  data() {
    return {
      username: 'srgdemon@webitel.lo',
      password: '12qwaszx',
    };
  },
  mounted() {
    loginAnimation(this.$refs['login-canvas']);
  },
  methods: {
    login() {
      return new Promise(() => {
        login({ username: this.username, password: this.password });
      }).catch((error) => {
        console.log(error);
        this.showError();
      });
    },


  },
};
</script>

<style scoped>
    .login-canvas {
        position: relative;
        width: 100vw;
        height: 100vh;
        background: #04BBD3;
    }

    .login {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 20px;
        background: #fff;
        transform: translate(-50%, -50%);
        z-index: 2;
    }
</style>
