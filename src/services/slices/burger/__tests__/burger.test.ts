import store, { rootReducer } from '@redux-store';
import {
  mockIngredientBun,
  mockIngredientMain,
  mockIngredientSauce
} from './__mocks__/burgerData';
import {
  initialStateBurger,
  burgerSlice,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  selectBurgerItems
} from '@slices';
import { TConstructorIngredient } from '@utils-types';

describe('burgerSlice: Redux store and actions', () => {
  describe('Actions on reducers in burgerSlice', () => {
    it('should return the initial state', () => {
      expect(burgerSlice.reducer(undefined, { type: '' })).toEqual(
        initialStateBurger
      );
    });

    describe('addIngredient', () => {
      it('should handle adding a bun', () => {
        const burger = burgerSlice.reducer(
          initialStateBurger,
          addIngredient(mockIngredientBun)
        );

        expect(burger.bun).toEqual({
          ...mockIngredientBun,
          id: expect.any(String)
        });

        expect(burger.ingredients).toHaveLength(0);
      });

      it('should handle adding a main ingredient', () => {
        const burger = burgerSlice.reducer(
          initialStateBurger,
          addIngredient(mockIngredientMain)
        );

        expect(burger.bun).toBeNull();

        expect(burger.ingredients).toEqual([
          {
            ...mockIngredientMain,
            id: expect.any(String)
          }
        ]);
      });
    });

    describe('removeIngredient', () => {
      it('should remove ingredient by id', () => {
        const initialIngredients = [
          { ...mockIngredientMain, id: 'ingredient-1' },
          { ...mockIngredientMain, id: 'ingredient-2' },
          { ...mockIngredientSauce, id: 'ingredient-3' }
        ] as TConstructorIngredient[];

        const initialState = {
          ...initialStateBurger,
          ingredients: initialIngredients,
          bun: { ...mockIngredientBun, id: 'bun-1' }
        } as typeof initialStateBurger;

        const result = burgerSlice.reducer(
          initialState,
          removeIngredient('ingredient-2')
        );

        expect(result.ingredients).toHaveLength(2);
        expect(result.ingredients[0]).toEqual(initialIngredients[0]);
        expect(result.ingredients[1]).toEqual(initialIngredients[2]);

        const Ids = result.ingredients.map((ing) => ing.id);

        expect(Ids).not.toContain('ingredient-2');
        expect(Ids).toEqual(['ingredient-1', 'ingredient-3']);
      });

      it('should not change state if id not found', () => {
        const state = {
          ...initialStateBurger,
          ingredients: [
            {
              ...mockIngredientMain,
              id: 'ingredient-1'
            },
            {
              ...mockIngredientSauce,
              id: 'ingredient-2'
            }
          ] as TConstructorIngredient[]
        };

        expect(
          burgerSlice.reducer(state, removeIngredient('ingredient-3'))
        ).toEqual(state);
      });
    });

    describe('moveIngredient', () => {
      it('', () => {
        const initialState = [
          { ...mockIngredientMain, id: 'ingredient-1' },
          { ...mockIngredientMain, id: 'ingredient-2' },
          { ...mockIngredientSauce, id: 'ingredient-3' }
        ] as TConstructorIngredient[];

        const state = {
          ...initialStateBurger,
          ingredients: initialState
        } as typeof initialStateBurger;

        const result = burgerSlice.reducer(
          state,
          moveIngredient({
            dragIndex: 0,
            hoverIndex: 2
          })
        );

        expect(result.ingredients.map((ing) => ing.id)).toEqual([
          'ingredient-2',
          'ingredient-3',
          'ingredient-1'
        ]);
      });
    });

    describe('clearConstructor', () => {
      it('should reset bun and ingredients to initial state', () => {
        const state = {
          bun: { ...mockIngredientBun, id: 'bun-1' } as TConstructorIngredient,
          ingredients: [
            {
              ...mockIngredientMain,
              id: 'ingredient-1'
            },
            {
              ...mockIngredientSauce,
              id: 'ingredient-2'
            }
          ] as TConstructorIngredient[]
        };

        expect(burgerSlice.reducer(state, clearConstructor())).toEqual(
          initialStateBurger
        );
      });
    });
  });

  describe('Selectors in burgerSlice', () => {
    const state = {
      burger: {
        bun: { ...mockIngredientBun, id: 'bun-1' } as TConstructorIngredient,
        ingredients: [
          {
            ...mockIngredientMain,
            id: 'ingredient-1'
          },
          {
            ...mockIngredientSauce,
            id: 'ingredient-2'
          }
        ] as TConstructorIngredient[]
      } as typeof initialStateBurger
    };

    it('selectBurgerItems should return burger state', () => {
      expect(selectBurgerItems(state)).toEqual(state.burger);
    });

    it('selectBurgerItems should work with empty state', () => {
      expect(selectBurgerItems({ burger: initialStateBurger })).toEqual(
        initialStateBurger
      );
    });
  });
});
