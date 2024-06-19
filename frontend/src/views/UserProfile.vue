<template>
  <div class="user-profile-container">
    <h1>Perfil de Usuário</h1>
    <form @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="bio">Biografia</label>
        <textarea id="bio" v-model="profile.bio" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label for="website">Website</label>
        <input id="website" v-model="profile.website" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="facebook">Facebook</label>
        <input id="facebook" v-model="profile.socialLinks.facebook" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="twitter">Twitter</label>
        <input id="twitter" v-model="profile.socialLinks.twitter" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="instagram">Instagram</label>
        <input id="instagram" v-model="profile.socialLinks.instagram" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="avatar">Avatar URL</label>
        <input id="avatar" v-model="profile.avatar" type="text" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Atualizar Perfil</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserProfile',
  data() {
    return {
      profile: {
        bio: '',
        website: '',
        socialLinks: {
          facebook: '',
          twitter: '',
          instagram: ''
        },
        avatar: ''
      }
    };
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await axios.get('/api/userprofile');
        this.profile = response.data;
      } catch (error) {
        console.error('Erro ao buscar perfil', error);
      }
    },
    async updateProfile() {
      try {
        await axios.put('/api/userprofile', this.profile);
        alert('Perfil atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar perfil', error);
      }
    }
  },
  mounted() {
    this.fetchProfile();
  }
};
</script>

<style scoped>
.user-profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
}

.btn-primary {
  background-color: #5bc0de;
  border-color: #5bc0de;
}

.btn-primary:hover {
  background-color: #31b0d5;
  border-color: #31b0d5;
}
</style>
