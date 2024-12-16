export const categorizeIngredients = (ingredient = []) => {
    if (!Array.isArray(ingredient)) {
        throw new TypeError('Expected an array of ingredients');
    }

    return ingredient.reduce((acc, ingredient) => {
        const { category } = ingredient;
        if (!acc[category.name]) {
            acc[category.name] = [];
        }
        acc[category.name].push(ingredient);
        return acc;
    }, {});
};
