<template>
  <AuthLayout>
    <h3 class="card-title text-center">Cadastro</h3>
    <form @submit.prevent="register">
      <div class="form-group">
        <input type="text" v-model="name" class="form-control" placeholder="Seu nome" required>
      </div>
      <div class="form-group">
        <input type="email" v-model="email" class="form-control" placeholder="Seu e-mail" required>
      </div>
      <div class="form-group">
        <input type="password" v-model="password" class="form-control" placeholder="Sua senha" required>
      </div>
      <div class="form-group">
        <input type="password" v-model="confirmPassword" class="form-control" placeholder="Digite sua senha novamente" required>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Cadastro</button>
      </div>
    </form>
  </AuthLayout>
</template>

<script>
import axios from 'axios';
import AuthLayout from '../components/AuthLayout.vue';

export default {
  name: 'UserRegister',
  components: {
    AuthLayout
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }

      try {
        await axios.post('http://localhost:5000/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        alert('Usuário registrado com sucesso!');
        this.$router.push('/');
      } catch (error) {
        alert('Erro ao registrar usuário. Verifique os dados e tente novamente.');
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
