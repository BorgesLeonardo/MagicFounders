<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="message in messages" :key="message._id" class="message">
        <strong>{{ message.username }}</strong>: {{ message.content }}
      </div>
    </div>
    <div class="input-group">
      <input v-model="newMessage" @keyup.enter="sendMessage" type="text" class="form-control" placeholder="Digite sua mensagem" />
      <div class="input-group-append">
        <button @click="sendMessage" class="btn btn-primary">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProjectChat',
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      messages: [],
      newMessage: ''
    };
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await axios.get(`/api/messages/${this.projectId}`);
        this.messages = response.data;
      } catch (error) {
        console.error('Erro ao buscar mensagens', error);
      }
    },
    async sendMessage() {
      if (!this.newMessage.trim()) return;
      
      try {
        const response = await axios.post('/api/messages', {
          projectId: this.projectId,
          content: this.newMessage
        });
        this.messages.push(response.data);
        this.newMessage = '';
      } catch (error) {
        console.error('Erro ao enviar mensagem', error);
      }
    }
  },
  mounted() {
    this.fetchMessages();
  }
};
</script>

<style scoped>
.chat-container {
  margin-top: 20px;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  margin-bottom: 10px;
}

.input-group {
  display: flex;
}

.input-group .form-control {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.input-group .input-group-append .btn {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
