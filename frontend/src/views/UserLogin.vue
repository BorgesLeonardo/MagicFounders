<template>
  <AuthLayout>
    <h3 class="card-title text-center">Login</h3>
    <form @submit.prevent="login">
      <div class="form-group">
        <input type="email" v-model="email" class="form-control" placeholder="Seu e-mail" required>
      </div>
      <div class="form-group">
        <input type="password" v-model="password" class="form-control" placeholder="Sua senha" required>
      </div>
      <div class="form-check">
        <input type="checkbox" v-model="rememberMe" class="form-check-input" id="rememberMe">
        <label class="form-check-label" for="rememberMe">Mantenha-se logado</label>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Logar</button>
      </div>
    </form>
    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
    <div class="text-center mt-3">
      <a href="/forgot-password">Esqueceu sua senha?</a>
    </div>
    <div class="text-center mt-3">
      Ainda não tem conta? <a href="/register">Cadastrar-se</a>
    </div>
  </AuthLayout>
</template>

<script>
import axios from 'axios';
import AuthLayout from '../components/AuthLayout.vue';

export default {
  name: 'UserLogin',
  components: {
    AuthLayout
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password
        });
        const token = response.data.token;
        const userId = response.data.user.id;

        // Armazena o token e o ID do usuário no localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        localStorage.setItem('token', response.data.token);
        this.$router.push('/home');
      } catch (error) {
        this.errorMessage = 'Erro ao fazer login. Verifique suas credenciais e tente novamente.';
      }
    }
  }
};
</script>

<style scoped>
.card-title {
  margin-bottom: 30px;
  color: #17a2b8;
}

.btn-primary {
  background-color: #5bc0de; /* Verde azulado claro */
  border-color: #5bc0de; /* Verde azulado claro */
}

.btn-primary:hover {
  background-color: #31b0d5; /* Verde azulado mais escuro */
  border-color: #31b0d5; /* Verde azulado mais escuro */
}

.text-center a {
  color: #17a2b8;
}

.text-center a:hover {
  color: #138496;
}

.form-control {
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
}

.alert {
  margin-top: 20px;
}
</style>
