import React, { useState, useEffect } from 'react';
import { 
  IDependentSelectsProps, 
  IDependentSelectsState,
  ISelectedValues 
} from '../interfaces';
import { grupoService, subgrupoService, estadoService } from '../services/apiService';

const DependentSelects: React.FC<IDependentSelectsProps> = ({
  onSelectionChange,
  disabled = false,
  className = '',
  apiUrls
}) => {
  const [state, setState] = useState<IDependentSelectsState>({
    data: {
      grupos: [],
      subgrupos: [],
      estados: []
    },
    selected: {
      grupo: '',
      subgrupo: '',
      estado: ''
    },
    loading: {
      grupos: false,
      subgrupos: false,
      estados: false
    },
    errors: {
      grupos: null,
      subgrupos: null,
      estados: null
    }
  });

  // Notificar cambios en la selección
  useEffect(() => {
    onSelectionChange(state.selected);
  }, [state.selected, onSelectionChange]);

  const handleSelectChange = (key: keyof ISelectedValues, value: string) => {
    setState(prevState => {
      const newSelected = { ...prevState.selected, [key]: value };
      
      // Resetear selects dependientes
      if (key === 'grupo') {
        newSelected.subgrupo = '';
        newSelected.estado = '';
      } else if (key === 'subgrupo') {
        newSelected.estado = '';
      }

      return {
        ...prevState,
        selected: newSelected
      };
    });
  };

  return (
    <div className={`dependent-selects ${className}`}>
      {/* Implementación de los selects */}
      <Select
        label="Grupo"
        options={state.data.grupos}
        value={state.selected.grupo}
        onChange={(value) => handleSelectChange('grupo', value)}
        disabled={disabled || state.loading.grupos}
        error={state.errors.grupos}
      />
      
      <Select
        label="Subgrupo"
        options={state.data.subgrupos}
        value={state.selected.subgrupo}
        onChange={(value) => handleSelectChange('subgrupo', value)}
        disabled={!state.selected.grupo || disabled || state.loading.subgrupos}
        error={state.errors.subgrupos}
      />
      
      <Select
        label="Estado"
        options={state.data.estados}
        value={state.selected.estado}
        onChange={(value) => handleSelectChange('estado', value)}
        disabled={!state.selected.subgrupo || disabled || state.loading.estados}
        error={state.errors.estados}
      />
    </div>
  );
};

export default DependentSelects;
