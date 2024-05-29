<template>
  <div class="container forgot-password-container">
    <div class="row justify-content-center align-items-center min-vh-100">
      <div class="col-12">
        <div class="card forgot-password-card">
          <div class="card-body">
            <h3 class="card-title text-center">Esqueceu sua senha?</h3>
            <form @submit.prevent="sendResetEmail">
              <div class="form-group">
                <input type="email" v-model="email" class="form-control" placeholder="Seu e-mail" required>
              </div>
              <div class="form-group text-center">
                <button type="submit" class="btn btn-primary">Enviar e-mail de redefinição</button>
              </div>
              <div v-if="errorMessage" class="alert alert-danger mt-3">
                {{ errorMessage }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      errorMessage: ''
    };
  },
  methods: {
    async sendResetEmail() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
          email: this.email
        });
        console.log('E-mail de redefinição enviado:', response.data);
        alert('E-mail de redefinição enviado com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar e-mail de redefinição:', error);
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'Erro ao enviar e-mail de redefinição. Verifique os dados e tente novamente.';
        }
      }
    }
  }
};
</script>

<style scoped>
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.forgot-password-card {
  width: 400px; /* Ajuste aqui para a largura desejada */
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

.form-control {
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
}
</style>
