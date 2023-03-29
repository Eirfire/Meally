import React from 'react';
import styles from '@styles/modules/RecipePage.module.scss';

interface StepProps {
  steps: string[];
  step: string;
}

const Step = ({ steps, step }: StepProps) => {
  return (
    <>
      <section key={steps.indexOf(step)} className={styles.steps}>
        <h1 className="font-medium font-Roboto text-step--2">
          Step {steps.indexOf(step) + 1}
        </h1>
        <h1 className={styles.step_method}>{step}</h1>
      </section>
    </>
  );
};

export default Step;