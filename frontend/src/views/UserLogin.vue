<template>
  <div class="container login-container">
    <div class="row justify-content-center align-items-center min-vh-100">
      <div class="col-12">
        <div class="card login-card">
          <div class="card-body">
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
              <button type="submit" class="btn btn-primary btn-block">Logar</button>
            </form>
            <div v-if="errorMessage" class="alert alert-danger mt-3">
              {{ errorMessage }}
            </div>
            <div class="text-center mt-3">
              <a href="/forgot-password">Esqueceu sua senha?</a>
            </div>
            <div class="text-center mt-3">
              Ainda não tem conta? <a href="/register">Cadastrar-se</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLogin',
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
      localStorage.setItem('token', response.data.token);
      this.$router.push('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  }
}
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.login-card {
  width: 900px; /* Ajuste aqui para a largura desejada */
  height: 500px; /* Ajuste aqui para a altura desejada */
  border-radius: 10px;
  padding: 40px;
  border: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: auto;
}

.card-title {
  margin-bottom: 30px;
  color: #17a2b8;
}

.btn-primary {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-primary:hover {
  background-color: #138496;
  border-color: #138496;
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
