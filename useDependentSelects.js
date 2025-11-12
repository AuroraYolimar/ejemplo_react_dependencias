import { useState, useEffect } from 'react';
import { grupoService, subgrupoService, estadoService } from '../services/apiService';

export const useDependentSelects = () => {
  const [data, setData] = useState({
    grupos: [],
    subgrupos: [],
    estados: []
  });
  
  const [selected, setSelected] = useState({
    grupo: '',
    subgrupo: '',
    estado: ''
  });

  const [loading, setLoading] = useState({
    grupos: false,
    subgrupos: false,
    estados: false
  });

  useEffect(() => {
    const loadGrupos = async () => {
      setLoading(prev => ({ ...prev, grupos: true }));
      try {
        const grupos = await grupoService.getAll();
        setData(prev => ({ ...prev, grupos }));
      } catch (error) {
        console.error('Error cargando grupos:', error);
      } finally {
        setLoading(prev => ({ ...prev, grupos: false }));
      }
    };

    loadGrupos();
  }, []);

  useEffect(() => {
    if (!selected.grupo) {
      setData(prev => ({ ...prev, subgrupos: [], estados: [] }));
      setSelected(prev => ({ ...prev, subgrupo: '', estado: '' }));
      return;
    }

    const loadSubgrupos = async () => {
      setLoading(prev => ({ ...prev, subgrupos: true }));
      try {
        const subgrupos = await subgrupoService.getByGrupo(selected.grupo);
        setData(prev => ({ ...prev, subgrupos, estados: [] }));
        setSelected(prev => ({ ...prev, subgrupo: '', estado: '' }));
      } catch (error) {
        console.error('Error cargando subgrupos:', error);
        setData(prev => ({ ...prev, subgrupos: [] }));
      } finally {
        setLoading(prev => ({ ...prev, subgrupos: false }));
      }
    };

    loadSubgrupos();
  }, [selected.grupo]);

  useEffect(() => {
    if (!selected.subgrupo) {
      setData(prev => ({ ...prev, estados: [] }));
      setSelected(prev => ({ ...prev, estado: '' }));
      return;
    }

    const loadEstados = async () => {
      setLoading(prev => ({ ...prev, estados: true }));
      try {
        const estados = await estadoService.getBySubgrupo(selected.subgrupo);
        setData(prev => ({ ...prev, estados }));
        setSelected(prev => ({ ...prev, estado: '' }));
      } catch (error) {
        console.error('Error cargando estados:', error);
        setData(prev => ({ ...prev, estados: [] }));
      } finally {
        setLoading(prev => ({ ...prev, estados: false }));
      }
    };

    loadEstados();
  }, [selected.subgrupo]);

  const handleChange = (type, value) => {
    setSelected(prev => ({ ...prev, [type]: value }));
  };

  return { 
    data, 
    selected, 
    loading, 
    handleChange 
  };
};
