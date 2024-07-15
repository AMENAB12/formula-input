// lib/store/store.ts
import create from 'zustand';

interface TimeSegment {
  startDate: string;
  endDate: string;
  items: string[];
}

interface Formula {
  formula: string;
  segments: TimeSegment[];
}

interface StoreState {
  formulas: Formula[];
  addFormula: (formula: string) => void;
  removeFormula: (index: number) => void;
  addTagToFormula: (index: number, tag: string) => void;
  addTimeSegment: (formulaIndex: number, segment: TimeSegment) => void;
  removeTimeSegment: (formulaIndex: number, segmentIndex: number) => void;
  removeTagFromFormula: (formulaIndex: number, tagIndex: number) => void;
  addItemToSegment: (formulaIndex: number, segmentIndex: number, item: string) => void;
  removeItemFromSegment: (formulaIndex: number, segmentIndex: number, itemIndex: number) => void;
  updateTagInFormula: (formulaIndex: number, tagIndex: number, newTag: string) => void;
}

const useStore = create<StoreState>((set) => ({
  formulas: [],
  addFormula: (formula) => set((state) => ({ formulas: [...state.formulas, { formula, segments: [] }] })),
  removeFormula: (index) => set((state) => ({
    formulas: state.formulas.filter((_, i) => i !== index)
  })),
  addTagToFormula: (index, tag) => set((state) => {
    const updatedFormulas = [...state.formulas];
    updatedFormulas[index].formula = `${updatedFormulas[index].formula} ${tag}`.trim();
    return { formulas: updatedFormulas };
  }),
  addTimeSegment: (formulaIndex, segment) => set((state) => {
    const updatedFormulas = [...state.formulas];
    updatedFormulas[formulaIndex].segments.push(segment);
    return { formulas: updatedFormulas };
  }),
  removeTimeSegment: (formulaIndex, segmentIndex) => set((state) => {
    const updatedFormulas = [...state.formulas];
    updatedFormulas[formulaIndex].segments = updatedFormulas[formulaIndex].segments.filter((_, i) => i !== segmentIndex);
    return { formulas: updatedFormulas };
  }),
  removeTagFromFormula: (formulaIndex, tagIndex) => set((state) => {
    const updatedFormulas = [...state.formulas];
    const tags = updatedFormulas[formulaIndex].formula.split(' ');
    tags.splice(tagIndex, 1);
    updatedFormulas[formulaIndex].formula = tags.join(' ');
    return { formulas: updatedFormulas };
  }),
  addItemToSegment: (formulaIndex, segmentIndex, item) => set((state) => {
    const updatedFormulas = [...state.formulas];
    updatedFormulas[formulaIndex].segments[segmentIndex].items.push(item);
    return { formulas: updatedFormulas };
  }),
  removeItemFromSegment: (formulaIndex, segmentIndex, itemIndex) => set((state) => {
    const updatedFormulas = [...state.formulas];
    updatedFormulas[formulaIndex].segments[segmentIndex].items = updatedFormulas[formulaIndex].segments[segmentIndex].items.filter((_, i) => i !== itemIndex);
    return { formulas: updatedFormulas };
  }),
  updateTagInFormula: (formulaIndex, tagIndex, newTag) => set((state) => {
    const updatedFormulas = [...state.formulas];
    const tags = updatedFormulas[formulaIndex].formula.split(' ');
    tags[tagIndex] = newTag;
    updatedFormulas[formulaIndex].formula = tags.join(' ');
    return { formulas: updatedFormulas };
  }),
}));

export default useStore;
