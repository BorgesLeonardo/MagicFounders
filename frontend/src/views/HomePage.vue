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
      </div>
      <button class="btn btn-outline-danger ml-auto" @click="logout">Logout</button>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container text-center">
        <b-carousel
          id="carousel-1"
          style="text-shadow: 1px 1px 2px #333;"
          controls
          indicators
          :interval="4000"
          img-width="1024"
          img-height="480"
        >
          <b-carousel-slide
            v-for="(project, index) in featuredProjects.slice(0, 5)"
            :key="index"
            :caption="project.title"
            :text="project.description"
          >
            <img :src="project.image" class="d-block w-100" alt="Project Image" />
            <button class="btn btn-primary btn-lg" @click="viewProject(project._id)">Conheça o projeto</button>
          </b-carousel-slide>
        </b-carousel>
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
import { BCarousel, BCarouselSlide } from 'bootstrap-vue-3';

export default {
  name: 'HomePage',
  components: {
    BCarousel,
    BCarouselSlide
  },
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
        console.log(this.featuredProjects); // Verificar os dados recebidos
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
  background-color: #5bc0de; /* Verde azulado claro */
  border-color: #5bc0de; /* Verde azulado claro */
}

.btn-primary:hover {
  background-color: #31b0d5; /* Verde azulado mais escuro */
  border-color: #31b0d5; /* Verde azulado mais escuro */
}
</style>
