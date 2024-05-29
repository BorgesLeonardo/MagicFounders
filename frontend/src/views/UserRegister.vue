<template>
  <div class="container register-container">
    <div class="row justify-content-center align-items-center min-vh-100">
      <div class="col-12">
        <div class="card register-card">
          <div class="card-body">
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
              <div class="form-group text-center">
                <button type="submit" class="btn btn-primary">Cadastro</button>
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
  name: 'UserRegister',
  data() {
    return {
      name: '', // Adicione esta linha
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
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          name: this.name, // Adicione esta linha
          email: this.email,
          password: this.password
        });
        console.log('Usuário registrado:', response.data);
        alert('Usuário registrado com sucesso!');
        // Redirecionar para a página de login após o registro
        this.$router.push('/');
      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        alert('Erro ao registrar usuário. Verifique os dados e tente novamente.');
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.register-card {
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
