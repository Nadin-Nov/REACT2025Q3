import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { z } from 'zod';

import type { RootState } from '../../app/store';
import { Modal } from '../../shared/ui/Modal/Modal';
import { ModalButtons } from '../mainPage/components/ModalButton/ModalButton';

import { FormTiles } from './components/FormTiles/FormTiles';
import { UncontrolledForm } from './components/UncontrolledForm';
import type { formSchema } from './components/formConfig';
import styles from './mainPage.module.css';

export const MainPage = () => {
  const [modal, setModal] = useState<'hook' | 'uncontrolled' | null>(null);
  const uncontrolledData = useSelector(
    (state: RootState) => state.forms.uncontrolled
  );

  const handleUncontrolledSubmit = (data: z.infer<typeof formSchema>) => {
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
