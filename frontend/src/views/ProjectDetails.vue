<template>
  <div class="project-details-container">
    <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#">MagicFounder</a>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Comece seu projeto</a>
          </li>
          <li class="nav-item">
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Buscar projetos" aria-label="Search">
            </form>
          </li>
        </ul>
      </div>
      <button class="btn logout-button ml-auto" @click="logout">Logout</button>
    </nav>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8">
          <img :src="project.image" class="img-fluid rounded mb-3" alt="Project Image">
          <h1 class="mt-4">{{ project.title }}</h1>
          <p class="text-muted">por {{ project.author }}</p>
          <p>{{ project.description }}</p>
        </div>
        <div class="col-md-4">
          <div class="support-card shadow-sm p-3 mb-5 bg-white rounded">
            <h2>R$ {{ project.supported }}</h2>
            <p>apoiados por {{ project.supporters }} pessoas</p>
            <div class="progress mb-3 rounded-pill">
              <div class="progress-bar rounded-pill" role="progressbar" :style="{ width: project.progress + '%' }" :aria-valuenow="project.progress" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <p>{{ project.progress }}% financiado</p>
            <p>{{ project.daysLeft }} dias restantes</p>
            <h4>Meta R$ {{ project.goal }}</h4>
            <button class="btn btn-primary btn-block" @click="supportProject">Apoiar esse projeto</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProjectDetails',
  data() {
    return {
      project: {}
    };
  },
  methods: {
    async fetchProjectDetails() {
      try {
        const projectId = this.$route.params.id;
        const token = this.$route.query.token;
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
    supportProject() {
      // Lógica para apoiar o projeto
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchProjectDetails();
  }
};
</script>

<style scoped>
.project-details-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
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

.img-fluid.rounded {
  border-radius: 10px;
}

h1 {
  color: #333;
}

.text-muted {
  color: #555;
}

.support-card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.progress.rounded-pill {
  height: 20px;
}

.progress-bar.rounded-pill {
  background-color: #17a2b8;
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
