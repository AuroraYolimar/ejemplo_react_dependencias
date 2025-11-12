import React, { useState, useEffect } from 'react';
import { grupoService, subgrupoService, estadoService } from '../services/apiService';

const DependentSelects = () => {
  const [grupos, setGrupos] = useState([]);
  const [subgrupos, setSubgrupos] = useState([]);
  const [estados, setEstados] = useState([]);
  
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const [selectedSubgrupo, setSelectedSubgrupo] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');

  const [loading, setLoading] = useState({
    grupos: false,
    subgrupos: false,
    estados: false
  });

  const [errors, setErrors] = useState({
    grupos: null,
    subgrupos: null,
    estados: null
  });

  // Cargar grupos al montar el componente
  useEffect(() => {
    const loadGrupos = async () => {
      setLoading(prev => ({ ...prev, grupos: true }));
      setErrors(prev => ({ ...prev, grupos: null }));
      
      try {
        const gruposData = await grupoService.getAll();
        setGrupos(gruposData);
      } catch (error) {
        setErrors(prev => ({ ...prev, grupos: 'Error cargando grupos' }));
        console.error('Error:', error);
      } finally {
        setLoading(prev => ({ ...prev, grupos: false }));
      }
    };

    loadGrupos();
  }, []);

  // Cargar subgrupos cuando se selecciona un grupo
  useEffect(() => {
    if (!selectedGrupo) {
      setSubgrupos([]);
      setSelectedSubgrupo('');
      return;
    }

    const loadSubgrupos = async () => {
      setLoading(prev => ({ ...prev, subgrupos: true }));
      setErrors(prev => ({ ...prev, subgrupos: null }));
      
      try {
        const subgruposData = await subgrupoService.getByGrupo(selectedGrupo);
        setSubgrupos(subgruposData);
        setSelectedSubgrupo('');
        setSelectedEstado('');
        setEstados([]);
      } catch (error) {
        setErrors(prev => ({ ...prev, subgrupos: 'Error cargando subgrupos' }));
        setSubgrupos([]);
      } finally {
        setLoading(prev => ({ ...prev, subgrupos: false }));
      }
    };

    loadSubgrupos();
  }, [selectedGrupo]);

  // Cargar estados cuando se selecciona un subgrupo
  useEffect(() => {
    if (!selectedSubgrupo) {
      setEstados([]);
      setSelectedEstado('');
      return;
    }

    const loadEstados = async () => {
      setLoading(prev => ({ ...prev, estados: true }));
      setErrors(prev => ({ ...prev, estados: null }));
      
      try {
        const estadosData = await estadoService.getBySubgrupo(selectedSubgrupo);
        setEstados(estadosData);
        setSelectedEstado('');
      } catch (error) {
        setErrors(prev => ({ ...prev, estados: 'Error cargando estados' }));
        setEstados([]);
      } finally {
        setLoading(prev => ({ ...prev, estados: false }));
      }
    };

    loadEstados();
  }, [selectedSubgrupo]);

  const handleGrupoChange = (event) => {
    setSelectedGrupo(event.target.value);
  };

  const handleSubgrupoChange = (event) => {
    setSelectedSubgrupo(event.target.value);
  };

  const handleEstadoChange = (event) => {
    setSelectedEstado(event.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Selección Dependiente</h2>
      
      {/* Select de Grupo */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="grupo">Grupo: </label>
        <select 
          id="grupo"
          value={selectedGrupo} 
          onChange={handleGrupoChange}
          disabled={loading.grupos}
          style={{ padding: '5px', marginLeft: '10px' }}
        >
          <option value="">
            {loading.grupos ? 'Cargando grupos...' : 'Seleccione un grupo'}
          </option>
          {grupos.map(grupo => (
            <option key={grupo.id} value={grupo.id}>
              {grupo.nombre}
            </option>
          ))}
        </select>
        {errors.grupos && <span style={{ color: 'red', marginLeft: '10px' }}>{errors.grupos}</span>}
      </div>

      {/* Select de Subgrupo */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="subgrupo">Subgrupo: </label>
        <select 
          id="subgrupo"
          value={selectedSubgrupo} 
          onChange={handleSubgrupoChange}
          disabled={!selectedGrupo || loading.subgrupos}
          style={{ 
            padding: '5px', 
            marginLeft: '10px',
            backgroundColor: (!selectedGrupo || loading.subgrupos) ? '#f0f0f0' : 'white'
          }}
        >
          <option value="">
            {loading.subgrupos ? 'Cargando subgrupos...' : 
             !selectedGrupo ? 'Seleccione un grupo primero' : 'Seleccione un subgrupo'}
          </option>
          {subgrupos.map(subgrupo => (
            <option key={subgrupo.id} value={subgrupo.id}>
              {subgrupo.nombre}
            </option>
          ))}
        </select>
        {errors.subgrupos && <span style={{ color: 'red', marginLeft: '10px' }}>{errors.subgrupos}</span>}
      </div>

      {/* Select de Estado */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="estado">Estado: </label>
        <select 
          id="estado"
          value={selectedEstado} 
          onChange={handleEstadoChange}
          disabled={!selectedSubgrupo || loading.estados}
          style={{ 
            padding: '5px', 
            marginLeft: '10px',
            backgroundColor: (!selectedSubgrupo || loading.estados) ? '#f0f0f0' : 'white'
          }}
        >
          <option value="">
            {loading.estados ? 'Cargando estados...' : 
             !selectedSubgrupo ? 'Seleccione un subgrupo primero' : 'Seleccione un estado'}
          </option>
          {estados.map(estado => (
            <option key={estado.id} value={estado.id}>
              {estado.nombre}
            </option>
          ))}
        </select>
        {errors.estados && <span style={{ color: 'red', marginLeft: '10px' }}>{errors.estados}</span>}
      </div>

      {/* Mostrar selección actual */}
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <h3>Selección Actual:</h3>
        <p><strong>Grupo:</strong> {selectedGrupo || 'No seleccionado'}</p>
        <p><strong>Subgrupo:</strong> {selectedSubgrupo || 'No seleccionado'}</p>
        <p><strong>Estado:</strong> {selectedEstado || 'No seleccionado'}</p>
      </div>
    </div>
  );
};

export default DependentSelects;
