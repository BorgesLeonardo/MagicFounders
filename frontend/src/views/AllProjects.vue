<template>
  <div class="all-projects-container">
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#" @click.prevent="goHome">MagicFounder</a>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="startProject">Comece seu projeto</a>
          </li>
          <li class="nav-item">
            <form class="form-inline my-2 my-lg-0" @submit.prevent="searchProjects">
              <input class="form-control mr-sm-2" v-model="searchQuery" type="search" placeholder="Buscar projetos" aria-label="Search">
            </form>
          </li>
        </ul>
      </div>
      <button class="btn logout-button ml-auto" @click="logout">Logout</button>
    </nav>

    <div class="container mt-5">
      <h3 class="text-center">Todos os Projetos</h3>
      <div class="row justify-content-center">
        <div class="col-md-4" v-for="project in filteredProjects" :key="project._id">
          <div class="card mb-4 shadow-sm">
            <img :src="project.image" class="card-img-top" alt="Project Image">
            <div class="card-body">
              <h5 class="card-title">{{ project.title }}</h5>
              <p class="card-text">Categoria: {{ project.category }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <button type="button" class="btn btn-sm btn-outline-secondary" @click="viewProject(project._id)">Ver Projeto</button>
                <small class="text-muted">Meta: R$ {{ project.goal }}</small>
              </div>
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
  name: 'AllProjects',
  data() {
    return {
      projects: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project =>
        project.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchProjects() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/projects/all', {
          headers: {
            'x-auth-token': token
          }
        });
        this.projects = response.data;
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    },
    searchProjects() {
      // A lógica de pesquisa já está integrada ao computed 'filteredProjects'
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
    viewProject(id) {
      const token = localStorage.getItem('token');
      this.$router.push({
        path: `/project/${id}`,
        query: { token: token }
      });
    },
    startProject() {
      this.$router.push('/create-project');
    },
    goHome() {
      this.$router.push('/home');
    }
  },
  mounted() {
    this.fetchProjects();
  }
};
</script>

<style scoped>
.all-projects-container {
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
}

.navbar .form-control {
  border-radius: 20px;
  padding: 10px;
  margin-right: 20px;
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

.card {
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

h3 {
  color: #333333;
  margin-bottom: 40px;
}

.btn-primary {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-primary:hover {
  background-color: #138496;
  border-color: #138496;
}
</style>
