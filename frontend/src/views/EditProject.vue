<template>
  <div class="edit-project-container">
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#" @click.prevent="goHome">MagicFounder</a>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
        </ul>
      </div>
      <button class="btn btn-outline-danger logout-button ml-auto" @click="logout">Logout</button>
    </nav>
    <div class="container mt-5">
      <h3 class="text-center">Editar Projeto</h3>
      <form @submit.prevent="updateProject" class="form-card shadow-sm p-4">
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
            <input type="number" class="form-control" id="goal" v-model="project.goal" placeholder="Digite a meta do projeto" required>
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
            <select class="form-control" id="category" v-model="project.category" required>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="author">Autor <span class="text-danger">*</span></label>
            <input type="text" class="form-control" id="author" v-model="project.author" placeholder="Digite o nome do autor" required>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Atualizar Projeto</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditProject',
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
      },
      categories: ['Artes', 'Tecnologia', 'Inovação', 'Leitura', 'Natureza', 'Jogos', 'Culinária', 'Podcast', 'Áudio visual', 'Revista', 'Outros']
    };
  },
  methods: {
    async fetchProjectDetails() {
      try {
        const projectId = this.$route.params.id;
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`, {
          headers: {
            'x-auth-token': token
          }
        });
        this.project = response.data;
      } catch (error) {
        console.error('Erro ao buscar detalhes do projeto:', error);
      }
    },
    async updateProject() {
      try {
        const projectId = this.$route.params.id;
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:5000/api/projects/${projectId}`, this.project, {
          headers: {
            'x-auth-token': token
          }
        });
        alert('Projeto atualizado com sucesso!');
        this.$router.push(`/project/${projectId}`);
      } catch (error) {
        console.error('Erro ao atualizar projeto:', error);
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');  // Remover o userId do localStorage ao fazer logout
      this.$router.push('/');
    },
    goHome() {
      this.$router.push('/home');
    }
  },
  mounted() {
    this.fetchProjectDetails();
  }
};
</script>

<style scoped>
.edit-project-container {
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
  cursor: pointer;
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

.btn-primary {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-primary:hover {
  background-color: #138496;
  border-color: #138496;
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
</style>
