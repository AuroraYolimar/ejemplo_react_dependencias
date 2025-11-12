import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost',
  timeout: 10000,
});

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('Error de API:', error);
    throw error;
  }
);

export const grupoService = {
  getAll: () => apiClient.get('/grupo')
};

export const subgrupoService = {
  getByGrupo: (grupoId) => apiClient.get(`/subgrupo/${grupoId}`)
};

export const estadoService = {
  getBySubgrupo: (subgrupoId) => apiClient.get(`/estado/${subgrupoId}`)
};
