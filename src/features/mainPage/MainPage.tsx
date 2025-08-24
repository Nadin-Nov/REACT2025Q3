import { useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../../app/store';
import { Modal } from '../../shared/ui/Modal/Modal';

import { ControlledForm } from './components/ControlledForm';
import { FormTiles } from './components/FormTiles/FormTiles';
import { ModalButtons } from './components/ModalButton/ModalButton';
import { UncontrolledForm } from './components/UncontrolledForm';
import styles from './mainPage.module.css';
import type { UncontrolledFormData, ControlledFormData } from './types';

export const MainPage = () => {
  const [modal, setModal] = useState<'hook' | 'uncontrolled' | null>(null);
  const uncontrolledData = useSelector(
    (state: RootState) => state.forms.uncontrolled
  );

  const handleUncontrolledSubmit = (data: UncontrolledFormData) => {
    console.log('Uncontrolled form submitted:', data);
    setModal(null);
  };

  const handleControlledSubmit = (data: ControlledFormData) => {
    console.log('Controlled form submitted:', data);
    setModal(null);
  };

  return (
    <div className={styles.container}>
      <ModalButtons
        onOpenHook={() => setModal('hook')}
        onOpenUncontrolled={() => setModal('uncontrolled')}
      />

      <Modal
        open={modal === 'hook'}
        onClose={() => setModal(null)}
        ariaLabel="Hook form example"
      >
        <div>
          <h2>Controlled Form</h2>
          <ControlledForm onSubmit={handleControlledSubmit} />
        </div>
      </Modal>

      <Modal
        open={modal === 'uncontrolled'}
        onClose={() => setModal(null)}
        labelledById="uncontrolled-form-title"
      >
        <div>
          <h2 id="uncontrolled-form-title">Uncontrolled Form</h2>
          <UncontrolledForm onSubmit={handleUncontrolledSubmit} />
        </div>
      </Modal>

      <FormTiles data={uncontrolledData} />
    </div>
  );
};
