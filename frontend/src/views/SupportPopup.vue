<template>
  <div class="support-popup">
    <div class="popup-content">
      <h3 class="text-center">Apoiar Projeto</h3>
      <input type="number" v-model="amount" placeholder="Digite o valor" class="form-control my-3"/>
      <div class="text-center">
        <button class="btn btn-primary my-2" @click="generateQRCode">Gerar QR Code</button>
        <button class="btn btn-secondary my-2" @click="$emit('close')">Voltar</button>
      </div>
      <div v-if="qrCodeImage" class="text-center mt-3">
        <img :src="qrCodeImage" alt="QR Code" class="img-fluid"/>
        <button class="btn btn-success my-2" @click="confirmSupport">Confirmar Pagamento</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      amount: '',
      qrCodeImage: ''
    };
  },
  methods: {
    async generateQRCode() {
      try {
        const response = await axios.post('http://localhost:5000/api/projects/support', {
          projectId: this.$route.params.id,
          amount: this.amount
        }, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        this.qrCodeImage = response.data.qrCodeImage;
      } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
      }
    },
    async confirmSupport() {
      try {
        const response = await axios.post('http://localhost:5000/api/projects/confirm-support', {
          projectId: this.$route.params.id,
          amount: this.amount
        }, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        this.$emit('update-project', response.data);
        this.$emit('close');
      } catch (error) {
        console.error('Erro ao confirmar apoio:', error);
      }
    }
  }
};
</script>

<style scoped>
.support-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 400px;
}

.form-control {
  border-radius: 20px;
  padding: 10px;
}

.btn-primary {
  background-color: #5bc0de; /* Verde azulado claro */
  border-color: #5bc0de; /* Verde azulado claro */
}

.btn-primary:hover {
  background-color: #31b0d5; /* Verde azulado mais escuro */
  border-color: #31b0d5; /* Verde azulado mais escuro */
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
