<template>
  <div class="container reset-password-container">
    <div class="row justify-content-center align-items-center min-vh-100">
      <div class="col-12">
        <div class="card reset-password-card">
          <div class="card-body">
            <h3 class="card-title text-center">Redefinir Senha</h3>
            <form @submit.prevent="resetPassword">
              <div class="form-group">
                <label for="newPassword">Digite sua nova senha</label>
                <input type="password" v-model="newPassword" class="form-control" placeholder="********" required>
              </div>
              <div class="form-group">
                <label for="confirmPassword">Digite sua senha novamente</label>
                <input type="password" v-model="confirmPassword" class="form-control" placeholder="********" required>
              </div>
              <div class="form-group text-center">
                <button type="submit" class="btn btn-primary">Confirmar</button>
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
  name: 'ResetPassword',
  props: ['token'],
  data() {
    return {
      newPassword: '',
      confirmPassword: ''
    };
  },
  methods: {
    async resetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }
      try {
        await axios.post('http://localhost:5000/api/auth/reset-password', {
          token: this.token,
          newPassword: this.newPassword
        });
        console.log('Senha redefinida com sucesso');
        alert('Senha redefinida com sucesso!');
        // Redirecionar para a página de login após redefinir a senha
        this.$router.push('/');
      } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        alert('Erro ao redefinir a senha. Verifique os dados e tente novamente.');
      }
    }
  }
};
</script>

<style scoped>
.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.reset-password-card {
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
