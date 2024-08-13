<template>
  <div class="create-project-container">
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#" @click="goHome">MagicFounder</a>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
          </li>
        </ul>
      </div>
      <button class="btn logout-button ml-auto" @click="logout">Logout</button>
    </nav>
    <div class="container mt-5">
      <h3 class="text-center">Cadastro de Projeto</h3>
      <form @submit.prevent="submitProject" class="form-card shadow-sm p-4">
        <div class="form-group">
          <label for="title">Título <span class="text-danger">*</span></label>
          <input type="text" class="form-control" id="title" v-model="project.title" placeholder="Digite o título do projeto" required>
        </div>
        <div class="form-group">
          <label for="description">Descrição <span class="text-danger">*</span></label>
          <textarea class="form-control" id="description" v-model="project.description" placeholder="Descreva seu projeto" required></textarea>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="goal">Meta <span class="text-danger">*</span></label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <input type="number" class="form-control no-spinners" id="goal" v-model="project.goal" placeholder="Digite a meta do projeto" step="0.01" min="0" required>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="deadline">Prazo <span class="text-danger">*</span></label>
            <input type="date" class="form-control" id="deadline" v-model="project.deadline" required>
          </div>
        </div>
        <div class="form-group">
          <label for="image">Imagem <span class="text-danger">*</span></label>
          <input type="text" class="form-control" id="image" v-model="project.image" placeholder="URL da imagem do projeto" required>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="category">Categoria <span class="text-danger">*</span></label>
            <select class="form-control custom-select" id="category" v-model="project.category" >
              <option value="" disabled selected>Selecione uma categoria</option>
              <option value="Artes">Artes</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Inovação">Inovação</option>
              <option value="Leitura">Leitura</option>
              <option value="Natureza">Natureza</option>
              <option value="Jogos">Jogos</option>
              <option value="Culinária">Culinária</option>
              <option value="Podcast">Podcast</option>
              <option value="Áudio visual">Áudio visual</option>
              <option value="Revista">Revista</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="author">Autor <span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="author" v-model="project.author" placeholder="Digite o nome do autor" required>
          </div>
        </div>
        <div class="form-group">
          <label for="chavePix">Chave Pix <span class="text-danger">*</span></label>
          <input type="text" class="form-control" id="chavePix" v-model="project.chavePix" placeholder="Digite a chave Pix" required>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Cadastrar Projeto</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateProject',
  data() {
    return {
      project: {
        title: '',
        description: '',
        goal: 0,
        image: '',
        deadline: '',
        category: '',
        author: '',
        chavePix: ''
      },
    };
  },
  methods: {
    async submitProject() {
      try {
        if (this.project.goal < 0) {
          alert('A meta do projeto não pode ser um valor negativo.');
          return;
        }
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/projects/create', this.project, {
          headers: {
            'x-auth-token': token,
          },
        });
        alert('Projeto cadastrado com sucesso!');
        this.$router.push('/home');
      } catch (error) {
        console.error('Erro ao cadastrar projeto:', error);
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
    goHome() {
      this.$router.push('/home');
    }
  },
};
</script>

<style scoped>
.create-project-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
}

/* Navbar */
.navbar {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 20px;
}

.navbar .navbar-brand {
  color: #17a2b8;
  font-weight: bold;
  margin-right: 20px;
  cursor: pointer;
}

.navbar .nav-link {
  color: #555555;
  margin-right: 10px;
  cursor: pointer;
}

.navbar .form-control {
  border-radius: 20px;
  padding: 10px;
}

.logout-button {
  color: #555555;
  border-color: #555555;
}

.logout-button:hover {
  background-color: #dc3545;
  color: #ffffff;
  border-color: #dc3545;
}

.ml-auto {
  margin-left: auto;
}

.container {
  padding-top: 50px;
  text-align: center;
}

.form-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.input-group-text {
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.custom-select {
  background-color: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 10px;
}

.btn-primary {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-primary:hover {
  background-color: #31b0d5;
  border-color: #31b0d5;
}

.no-spinners::-webkit-outer-spin-button,
.no-spinners::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spinners {
  -moz-appearance: textfield;
}
</style>
