<template>
  <AuthLayout>
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
      <div class="text-center">
        <button type="submit" class="btn btn-primary btn-block">Confirmar</button>
      </div>
    </form>
  </AuthLayout>
</template>

<script>
import axios from 'axios';
import AuthLayout from '../components/AuthLayout.vue';

export default {
  name: 'ResetPassword',
  props: ['token'],
  components: {
    AuthLayout
  },
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
        alert('Senha redefinida com sucesso!');
        this.$router.push('/');
      } catch (error) {
        alert('Erro ao redefinir a senha. Verifique os dados e tente novamente.');
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

.form-control {
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
}
</style>
