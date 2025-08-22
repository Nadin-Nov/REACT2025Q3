import { useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../../app/store';
import { Modal } from '../../shared/ui/Modal/Modal';
import { ModalButtons } from '../mainPage/components/ModalButton/ModalButton';

import { FormTiles } from './components/FormTiles/FormTiles';
import { UncontrolledForm } from './components/UncontrolledForm';
import styles from './mainPage.module.css';
import type { UncontrolledFormData } from './types';

export const MainPage = () => {
  const [modal, setModal] = useState<'hook' | 'uncontrolled' | null>(null);
  const uncontrolledData = useSelector(
    (state: RootState) => state.forms.uncontrolled
  );

  const handleUncontrolledSubmit = (data: UncontrolledFormData) => {
    console.log('Form submitted:', data);
    setModal(null);
  };

  return (
    <div className={styles.container}>
      <ModalButtons
        onOpenHook={() => setModal('hook')}
        onOpenUncontrolled={() => setModal('uncontrolled')}
      />

      <Modal open={modal === 'hook'} onClose={() => setModal(null)}>
        <div>Hook Form Modal</div>
      </Modal>

      <Modal open={modal === 'uncontrolled'} onClose={() => setModal(null)}>
        <UncontrolledForm onSubmit={handleUncontrolledSubmit} />
      </Modal>

      <FormTiles data={uncontrolledData} />
    </div>
  );
};
