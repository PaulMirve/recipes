import { StepEntity } from "../schema/step/step.entity";
import { Step, StepUpdateInput } from "../schema/step/step.types";

export const updateSteps = async (steps: StepEntity[], updatedSteps: StepUpdateInput[]) => {
    const toDeleteSteps = steps.filter(step => !updatedSteps.some(step2 => step.idStep === step2.idStep));
    await StepEntity.remove(toDeleteSteps);
    const toUpdateSteps = updatedSteps.filter(step => !toDeleteSteps.some(step2 => step.idStep === step2.idStep))
        .map(el => {
            if (el.idStep !== 0) return el;
            const { idStep, ...step } = el;
            return step;
        }) as StepEntity[];
    return toUpdateSteps;
}