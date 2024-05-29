<template>
  <div class="home-container">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#" @click.prevent="goHome">MagicFounder</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="startProject">Comece seu projeto</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0 ml-3" @submit.prevent="searchProjects">
          <input class="form-control mr-sm-2" v-model="searchQuery" type="search" placeholder="Buscar projetos" aria-label="Search">
        </form>
      </div>
      <button class="btn btn-outline-danger ml-auto" @click="logout">Logout</button>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container text-center">
        <h1 class="display-4">Contos Fantásticos Filipinos</h1>
        <p class="lead">Inédito no Brasil! São 61 contos de várias etnias filipinas reunidos por Mabel Cook em 1916</p>
        <button class="btn btn-primary btn-lg" @click="startProject">Conheça o projeto</button>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <div class="container mt-5">
      <h3 class="text-center">Projetos em destaque</h3>
      <div class="row justify-content-center">
        <div class="col-md-4" v-for="project in featuredProjects" :key="project._id">
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
      <div class="text-center">
        <button type="button" class="btn btn-primary" @click="viewAllProjects">Ver todos</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      featuredProjects: [],
      searchQuery: ''
    };
  },
  methods: {
    async fetchFeaturedProjects() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/projects/limit', {
          headers: {
            'x-auth-token': token
          }
        });
        this.featuredProjects = response.data;
      } catch (error) {
        console.error('Erro ao buscar projetos em destaque:', error);
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
    startProject() {
      this.$router.push('/create-project');
    },
    viewAllProjects() {
      this.$router.push('/projects');
    },
    viewProject(id) {
      const token = localStorage.getItem('token');
      this.$router.push({
        path: `/project/${id}`,
        query: { token: token }
      });
    },
    async searchProjects() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/projects/search?query=${this.searchQuery}`, {
          headers: {
            'x-auth-token': token
          }
        });
        this.featuredProjects = response.data;
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    },
    goHome() {
      this.$router.push('/home');
    }
  },
  mounted() {
    this.fetchFeaturedProjects();
  }
};
</script>

<style scoped>
.home-container {
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

/* Hero Section */
.hero-section {
  background: url('https://via.placeholder.com/1920x600') no-repeat center center;
  background-size: cover;
  padding: 100px 0;
  color: white;
  text-align: center;
}

.hero-section .container {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 50px;
  border-radius: 10px;
}

.hero-section h1 {
  font-size: 2.5rem;
}

.hero-section p {
  font-size: 1.25rem;
}

/* Container */
.container {
  padding-top: 50px;
  text-align: center;
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
