import { useState } from 'react';

import { HookForm } from '../../entities/form/ControlledForm';
import { UncontrolledForm } from '../../entities/form/UncontrolledForm';
import { Modal } from '../../shared/ui/Modal/Modal';

import styles from './mainPage.module.css';

export const MainPage = () => {
  const [modal, setModal] = useState<'hook' | 'uncontrolled' | null>(null);

  return (
    <div className={styles.container}>
      <button onClick={() => setModal('hook')}>Open Hook Form</button>
      <button onClick={() => setModal('uncontrolled')}>
        Open Uncontrolled Form
      </button>

      <Modal open={modal === 'hook'} onClose={() => setModal(null)}>
        <HookForm onSuccess={() => setModal(null)} />
      </Modal>

      <Modal open={modal === 'uncontrolled'} onClose={() => setModal(null)}>
        <UncontrolledForm onSuccess={() => setModal(null)} />
      </Modal>
    </div>
  );
};
