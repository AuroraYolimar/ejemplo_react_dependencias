const BASE_URL = 'http://localhost';

// Función genérica para hacer requests
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
};

// Servicios específicos
export const grupoService = {
  getAll: () => fetchData('/grupo')
};

export const subgrupoService = {
  getByGrupo: (grupoId) => fetchData(`/subgrupo/${grupoId}`)
};

export const estadoService = {
  getBySubgrupo: (subgrupoId) => fetchData(`/estado/${subgrupoId}`)
};

// También puedes exportar todo junto
export default {
  grupos: grupoService,
  subgrupos: subgrupoService,
  estados: estadoService
};
