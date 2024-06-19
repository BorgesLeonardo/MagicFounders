<template>
  <div class="project-details-container">
    <nav class="navbar navbar-expand-lg fixed-top">
      <a class="navbar-brand" href="#" @click.prevent="goHome">MagicFounder</a>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
          </li>
        </ul>
      </div>
      <button class="btn logout-button ml-auto" @click="logout">Logout</button>
    </nav>

    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-md-8">
          <img :src="project.image" class="img-fluid rounded mb-3" alt="Project Image">
          <h1 class="mt-4">{{ project.title }}</h1>
          <p class="text-muted">por {{ project.author }}</p>
          <p v-html="project.description"></p>
          <div v-if="isCreator">
            <button class="btn btn-danger mr-3" @click="deleteProject">Deletar Projeto</button>
            <button class="btn btn-primary" @click="editProject">Editar Projeto</button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="support-card shadow-sm p-3 mb-5 bg-white rounded">
            <h2>R$ {{ formattedSupported }}</h2>
            <p>apoiados por {{ project.supporters }} pessoas</p>
            <div class="progress mb-3 rounded-pill">
              <div class="progress-bar rounded-pill" role="progressbar" :style="{ width: project.progress + '%' }" :aria-valuenow="project.progress" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <p>{{ formattedProgress }}% financiado</p>
            <p>{{ project.daysLeft }} dias restantes</p>
            <h4>Meta R$ {{ formattedGoal }}</h4>
            <button v-if="!isExpired" class="btn btn-primary btn-block" @click="showSupportPopup = true">Apoiar esse projeto</button>
          </div>
        </div>
      </div>
    </div>
    <SupportPopup v-if="showSupportPopup" @close="showSupportPopup = false" :projectId="project._id" @update-project="fetchProjectDetails"/>
  </div>
</template>

<script>
import axios from 'axios';
import SupportPopup from './SupportPopup.vue';

export default {
  name: 'ProjectDetails',
  components: {
    SupportPopup
  },
  data() {
    return {
      project: {},
      showSupportPopup: false,
      isCreator: false,
      isExpired: false,
      formattedSupported: '0.00',
      formattedGoal: '0.00',
      formattedProgress: '0.0'
    };
  },
  methods: {
    async fetchProjectDetails() {
      try {
        const projectId = this.$route.params.id;
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`, {
          headers: {
            'x-auth-token': token
          }
        });
        this.project = response.data;

        // Formatar os valores com duas casas decimais
        this.formattedSupported = this.project.supported.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.formattedGoal = this.project.goal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        this.formattedProgress = this.project.progress.toFixed(1);

        // Verifica se o usuário logado é o criador do projeto
        this.isCreator = userId === this.project.creator;

        // Verifica se o prazo do projeto expirou
        const currentDate = new Date();
        const deadlineDate = new Date(this.project.deadline);
        this.isExpired = currentDate > deadlineDate;
      } catch (error) {
        console.error('Erro ao buscar detalhes do projeto:', error);
      }
    },
    async deleteProject() {
      try {
        const projectId = this.$route.params.id;
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
          headers: {
            'x-auth-token': token
          }
        });
        alert('Projeto deletado com sucesso!');
        this.$router.push('/home');
      } catch (error) {
        console.error('Erro ao deletar projeto:', error);
      }
    },
    editProject() {
      this.$router.push(`/edit-project/${this.project._id}`);
    },
    updateProject(updatedProject) {
      this.project = updatedProject;
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
.project-details-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
}

/* Navbar */
.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 20px;
  z-index: 1000; /* Ensure the navbar stays on top */
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
  background-color: #5bc0de; /* Verde azulado claro */
  border-color: #5bc0de; /* Verde azulado claro */
}

.btn-primary:hover {
  background-color: #31b0d5; /* Verde azulado mais escuro */
  border-color: #31b0d5; /* Verde azulado mais escuro */
}

.mr-3 {
  margin-right: 1rem !important;
}
</style>
