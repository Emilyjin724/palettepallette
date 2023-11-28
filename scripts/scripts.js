const bowl = document.getElementById('bowl');
const selectedItems = {};

function addItemToBowl(item, category) {
    const newItem = document.createElement('li');
    const image = document.createElement('img');
    image.src = `./images/${item.toLowerCase()}.png`;
    image.alt = item;
    newItem.appendChild(image);

    bowl.appendChild(newItem);
}

function selectItem(category, item) {
    selectedItems[category] = item;
    displayInBowl(item, category);
}
function generateRecipe() {
    console.log(selectedItems); 

    const dairy = selectedItems['dairy'];
    const protein = selectedItems['protein'];
    const vegetables = selectedItems['vegetables'];
    const carbs = selectedItems['carbs'];

    if (dairy && protein) {
        displayRecipe(getDairyProteinRecipe(dairy, protein));
    } else if (protein && vegetables) {
        displayRecipe(getProteinVegetablesRecipe(protein, vegetables));
    } else if (carbs && vegetables && dairy) {
        displayRecipe(getCarbsVegetablesDairyRecipe(carbs, vegetables, dairy));
    } else if (dairy && protein && vegetables) {
        displayRecipe(getDairyProteinVegetablesRecipe(dairy, protein, vegetables));
    } else if (dairy && protein && vegetables && carbs){
        displayRecipe(getDairyProteinVegetablesCarbsRecipe(dairy, protein, vegetables, carbs))
    }
    
    else {
        displayRecipe('No recipe available for the selected combination.');
    }
}
function displayRecipe(recipe) {
    openPopup(`<span class="details-span">Recipe Details:</span>\n${recipe}`);
}

function getDairyProteinRecipe(dairy, protein) {
    if (dairy === 'Cheese' && protein === 'Chicken') {
        const recipeName = '<h2>Chicken Parmesan</h2>';
        const recipeDetails = `
            <p>Chicken Parmesan is a classic Italian-American dish where breaded chicken breasts are fried to a golden crisp, then smothered in a tangy tomato sauce and topped with melted mozzarella and Parmesan cheese, creating a delightful blend of textures and flavors.</p>
            <p>Bread chicken breasts, fry until golden, and bake with marinara sauce and cheese until the cheese melts and the chicken is cooked through.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Butter' && protein === 'Beef') {
        const recipeName = '<h2>Herb Butter Steak</h2>';
        const recipeDetails = `
           <p>This dish features a perfectly seared steak, enriched with a luxurious, herb-infused butter. The butter, melting over the hot steak, adds a rich, aromatic flavor that enhances the natural taste of the beef.</p>
           <p>Season steak and sear in a hot pan. Prepare herb butter by mixing softened butter with chopped herbs. Place the herb butter on the hot steak to melt.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Milk' && protein === 'Fish') {
        const recipeName = '<h2>Creamy Fish Chowder</h2>';
        const recipeDetails = `
           <p>A hearty and comforting soup, this chowder combines tender pieces of fish in a smooth, creamy milk-based broth, often with potatoes and vegetables, seasoned with herbs for a rich and satisfying seafood experience.</p>
           <p>Sauté vegetables, add fish and broth, then stir in milk and seasonings, and simmer until the fish is cooked and the chowder is creamy.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Butter' && protein === 'Eggs') {
        const recipeName = '<h2>Classic French Omelette</h2>';
        const recipeDetails = `
           <p>A delicate and buttery omelette with a silky, tender texture. Made with just eggs and butter, it's often enjoyed with a variety of fillings like cheese or herbs, showcasing the eggs' natural flavor.</p>
           <p>Whisk eggs, cook them in a buttered pan until slightly runny in the middle, fold the omelette, and serve immediately.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Cheese' && protein === 'Pork') {
        const recipeName = '<h2>Pork Chops with Cheese Sauce</h2>';
        const recipeDetails = `
           <p>Juicy pork chops are cooked to tender perfection and draped in a lusciously creamy cheese sauce. The sauce, often made with a blend of cheeses, adds a rich and comforting element to the succulent pork.</p>
           <p>Cook pork chops in a pan, make a cheese sauce separately with cheese, milk, and seasonings, and pour the sauce over the cooked chops.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Milk' && protein === 'Beef') {
        const recipeName = '<h2>Beef Stroganoff</h2>';
        const recipeDetails = `
           <p>Beef Stroganoff combines sautéed pieces of beef in a creamy, savory sauce made from milk, often with mushrooms and onions. It's typically served over pasta or rice, offering a comforting and hearty meal.</p>
           <p>Sauté beef strips, add mushrooms and onions, stir in a sour cream and milk sauce, and serve over noodles or rice.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Butter' && protein === 'Chicken') {
        const recipeName = '<h2>Lemon Butter Chicken</h2>';
        const recipeDetails = `
           <p>This dish features chicken breasts cooked in a zesty lemon butter sauce, creating a beautiful balance of tangy and rich flavors. The lemon adds a refreshing brightness, while the butter provides a smooth, indulgent base.</p>
           <p>Cook chicken breasts in a pan, make a lemon butter sauce with lemon juice, butter, and seasonings, and pour it over the chicken.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Cheese' && protein === 'Eggs') {
        const recipeName = '<h2>Cheese and Spinach Frittata</h2>';
        const recipeDetails = `
           <p>A wholesome, oven-baked frittata filled with fresh spinach and melted cheese. The eggs create a fluffy, light texture, while the spinach adds a nutritious touch, and the cheese melts into gooey goodness.</p>
           <p>Sauté spinach, mix eggs with cheese, combine with spinach, pour into a skillet, and bake until set.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Milk' && protein === 'Pork') {
        const recipeName = '<h2>Pork in Milk Sauce</h2>';
        const recipeDetails = `
           <p>Tender pork cooked slowly in a subtly sweet, creamy milk sauce. This unique combination creates a tender, flavorful dish where the milk infuses the pork with a delicate, rich flavor.</p>
           <p>Brown pork pieces, add milk and seasonings, and simmer until the pork is tender and the sauce is slightly thickened.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Butter' && protein === 'Fish') {
        const recipeName = '<h2>Butter Poached Fish</h2>';
        const recipeDetails = `
           <p>Delicate fish fillets are gently poached in a bath of butter, resulting in a dish that's incredibly moist and rich in flavor. The butter accentuates the fish's natural taste, making it a simple yet elegant meal.</p>
           <p>Gently simmer fish fillets in a pan with melted butter, keeping the temperature low, until the fish is cooked through.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Milk' && protein === 'Eggs') {
        const recipeName = '<h2>Milk and Herb Scrambled Eggs</h2>';
        const recipeDetails = `
           <p>Creamy and soft scrambled eggs infused with fresh herbs and a splash of milk, offering a velvety texture and a refreshing herbaceous flavor, perfect for a luxurious breakfast or brunch.</p>
           <p>Whisk eggs with milk and herbs, cook in a pan over low heat, stirring constantly, until softly set.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Cheese' && protein === 'Beef') {
        const recipeName = '<h2>Beef and Cheese Quesadillas</h2>';
        const recipeDetails = `
           <p>Crispy tortillas filled with a flavorful mixture of seasoned beef and melted cheese. This Mexican-inspired dish is both hearty and satisfying, with the cheese adding a gooey, comforting element to the spiced beef.</p>
           <p>Cook seasoned beef, place it on tortillas with cheese, fold, and cook until the tortillas are crispy and the cheese has melted.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Milk' && protein === 'Chicken') {
        const recipeName = '<h2>Creamy Garlic Chicken</h2>';
        const recipeDetails = `
           <p>Chicken breasts simmered in a rich, garlicky cream sauce made with milk. The garlic infuses the sauce with a warm, aromatic flavor, complementing the tender, moist chicken.</p>
           <p>Cook chicken breasts, make a creamy garlic sauce with milk in the same pan, and simmer the chicken in the sauce until fully cooked.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Butter' && protein === 'Pork') {
        const recipeName = '<h2>Garlic Butter Pork Chops</h2>';
        const recipeDetails = `
           <p>These pork chops are seared to perfection and finished with a decadent garlic butter sauce. The sauce adds a rich and savory depth to the succulent pork chops, making it a flavorful and satisfying dish.</p>
           <p>Sear pork chops, make a garlic butter sauce in the same pan, and spoon the sauce over the cooked chops.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Cheese' && protein === 'Fish') {
        const recipeName = '<h2>Baked Fish with Cheese Crust</h2>';
        const recipeDetails = `
           <p>A delightful seafood dish where fish fillets are topped with a crispy cheese crust, offering a contrast of textures. The cheese adds a savory depth to the mild flavor of the fish, creating a simple yet elegant meal.</p>
           <p>Place fish fillets in a baking dish, top with a mixture of cheese and breadcrumbs, and bake until the fish is cooked and the topping is golden.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    }

    return 'No recipe available for the selected combination.';
}
function getProteinVegetablesRecipe(protein, vegetables) {
    if (protein === 'Chicken' && vegetables === 'Broccoli') {
        const recipeName = '<h2>Broccoli Chicken Stir-Fry</h2>';
        const recipeDetails = `
            <p>This dish features tender pieces of chicken and fresh broccoli florets stir-fried in a savory sauce. The chicken is cooked to perfection, and the broccoli adds a crunchy texture, making it a balanced and flavorful meal.</p>
            <p>Sauté chicken pieces until cooked, add broccoli florets and a savory sauce, stir-fry until the broccoli is tender-crisp.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (protein === 'Beef' && vegetables === 'Cabbage') {
        const recipeName = '<h2>Beef and Cabbage Stew</h2>';
        const recipeDetails = `
           <p>A hearty stew combining slow-cooked beef and tender cabbage in a rich, flavorful broth. The beef becomes incredibly tender, and the cabbage contributes a mild, sweet flavor, perfect for a comforting meal.</p>
           <p>Brown beef chunks, add chopped cabbage and broth, simmer until the beef is tender and the cabbage is softened.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (protein === 'Pork' && vegetables === 'Onion') {
        const recipeName = '<h2>Pork and Onion Skillet</h2>';
        const recipeDetails = `
           <p>Juicy pork chops or slices are cooked with caramelized onions in a skillet. The sweetness of the onions complements the savory pork, creating a simple yet delicious dish.</p>
           <p>Cook pork chops or slices in a skillet, add sliced onions and cook until caramelized, season as desired.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (protein === 'Eggs' && vegetables === 'Broccoli') {
        const recipeName = '<h2>Broccoli and Cheddar Frittata</h2>';
        const recipeDetails = `
           <p>A baked egg dish filled with nutritious broccoli and melted cheddar cheese. The eggs are fluffy and light, while the broccoli provides a pleasant crunch, and the cheddar adds a creamy, rich flavor.</p>
           <p>Sauté broccoli, mix eggs with cheddar cheese, pour over broccoli in a skillet, bake in the oven until set.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (protein === 'Fish' && vegetables === 'Onion') {
        const recipeName = '<h2>Onion Crusted Baked Fish</h2>';
        const recipeDetails = `
           <p>Tender fish fillets are coated with a crispy onion and breadcrumb crust, then baked until golden. The onion crust adds a delightful crunch and flavor to the delicate fish.</p>
           <p>Coat fish fillets with a mixture of breadcrumbs and fried onions, bake until the crust is golden and the fish is cooked.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (protein === 'Pork' && vegetables === 'Broccoli') {
        const recipeName = '<h2>Broccoli and Pork Stir-Fry</h2>';
        const recipeDetails = `
           <p>Slices of pork are stir-fried with broccoli in a flavorful sauce. The pork is tender, and the broccoli adds a fresh, crunchy element to this quick and tasty meal.</p>
           <p>Stir-fry sliced pork until cooked, add broccoli and a flavorful sauce, and cook until the broccoli is tender.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (protein === 'Eggs' && vegetables === 'Cabbage') {
        const recipeName = '<h2>Cabbage and Egg Hash</h2>';
        const recipeDetails = `
           <p>A rustic and hearty dish where eggs are cooked with sautéed cabbage and onions, often with potatoes or other vegetables, creating a filling and nutritious meal.</p>
           <p>Sauté cabbage and onions, crack eggs into the pan, and cook until the eggs are set to your liking.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (protein === 'Beef' && vegetables === 'Broccoli') {
        const recipeName = '<h2>Beef Broccoli Stir-Fry</h2>';
        const recipeDetails = `
           <p>Strips of beef and broccoli florets are stir-fried in a rich, savory sauce. The beef is succulent, and the broccoli soaks up the flavors of the sauce, making it a popular and satisfying dish.</p>
           <p>Cook beef strips, add broccoli florets and a savory stir-fry sauce, cook until the broccoli is tender and the beef is coated with the sauce.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (protein === 'Chicken' && vegetables === 'Cabbage') {
        const recipeName = '<h2>Chicken Cabbage Soup</h2>';
        const recipeDetails = `
           <p>A nourishing soup featuring chicken and cabbage, along with other vegetables, simmered in a flavorful broth. It's a light yet fulfilling soup, perfect for any season.</p>
           <p>Cook chicken pieces, add chopped cabbage and vegetables, pour in broth, and simmer until everything is cooked through.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (protein === 'Fish' && vegetables === 'Broccoli') {
        const recipeName = '<h2>Broccoli Fish Bake</h2>';
        const recipeDetails = `
           <p>A wholesome dish where fish fillets are baked with broccoli and a creamy or cheesy topping. The fish is flaky and moist, and the broccoli complements it with its earthy flavor.</p>
           <p>Place fish fillets and broccoli in a baking dish, top with a creamy or cheesy sauce, and bake until the fish is flaky.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (protein === 'Pork' && vegetables === 'Cabbage') {
        const recipeName = '<h2>Pork and Cabbage Skillet</h2>';
        const recipeDetails = `
           <p>This dish involves cooking pork with cabbage in a skillet. The pork adds richness, while the cabbage brings a comforting texture and a slightly sweet flavor.</p>
           <p>Cook pork pieces in a skillet, add chopped cabbage, and cook until the cabbage is tender and the pork is fully cooked.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (protein === 'Eggs' && vegetables === 'Onion') {
        const recipeName = '<h2>Onion and Egg Scramble</h2>';
        const recipeDetails = `
           <p>A simple yet delicious scramble of eggs with sautéed onions. The onions add a sweet and savory depth to the fluffy, lightly seasoned eggs.</p>
           <p>Sauté onions until soft, add beaten eggs, scramble until the eggs are cooked and fluffy.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } 
    return 'No recipe available for the selected combination.';
}
function getCarbsVegetablesDairyRecipe (carbs, vegetables, dairy) {
    if (carbs === 'Rice' && vegetables === 'Cabbage' && dairy === 'Butter') {
        const recipeName = '<h2>Cabbage Fried Rice</h2>';
        const recipeDetails = `
            <p>This dish transforms simple ingredients into a delightful meal. It starts with sautéing cabbage in butter until it's tender and slightly caramelized, then mixing it with cooked rice. The butter adds a rich flavor to the rice, and the cabbage offers a pleasant, slightly crunchy texture.</p>
            <p>Sauté chopped cabbage in butter until soft, add cooked rice and seasonings, and stir-fry until everything is well combined and heated through.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (carbs === 'Spaghetti' && vegetables === 'Broccoli' && dairy === 'Milk') {
        const recipeName = '<h2>Creamy Broccoli Spaghetti</h2>';
        const recipeDetails = `
           <p>A comforting pasta dish featuring spaghetti in a creamy, milk-based sauce with tender broccoli florets. The sauce, enriched with milk, coats the pasta and broccoli, creating a harmonious blend of flavors and textures.</p>
           <p>Cook spaghetti, steam broccoli florets, prepare a creamy sauce using milk, combine everything, and simmer until the sauce thickens and coats the pasta.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (carbs === 'Rice' && vegetables === 'Cabbage' && dairy === 'Cheese') {
        const recipeName = '<h2>Cabbage and Cheese Stuffed Rice Balls</h2>';
        const recipeDetails = `
           <p>These are delightful little bites where cooked rice and sautéed cabbage are combined, often with a melting cheese center, and then formed into balls and cooked until crispy on the outside. They offer a satisfying mix of creamy, cheesy flavors with the mild taste of cabbage.</p>
           <p>Mix cooked rice with sautéed cabbage and cheese, form into balls, optionally coat with breadcrumbs, and fry or bake until golden and crispy.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (carbs === 'Potatoes' && vegetables === 'Broccoli' && dairy === 'Butter') {
        const recipeName = '<h2>Broccoli and Butter Mashed Potatoes</h2>';
        const recipeDetails = `
           <p>This dish elevates traditional mashed potatoes by incorporating steamed broccoli and rich butter into the mash. The result is a creamy, buttery side dish with flecks of green broccoli, combining the comforting taste of potatoes with the nutrition of broccoli.</p>
           <p>Boil potatoes until tender, steam broccoli, mash the potatoes with butter, fold in the broccoli, and season to taste.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (carbs === 'Potatoes' && vegetables === 'Cabbage' && dairy === 'Cheese') {
        const recipeName = '<h2>Cabbage and Potato Gratin</h2>';
        const recipeDetails = `
           <p>A baked casserole that layers thinly sliced potatoes and cabbage, topped with cheese and baked until golden and bubbly. The cheese melts into the vegetables, creating a creamy texture, while the top layer crisps up for a satisfying crunch.</p>
           <p>Layer thinly sliced potatoes and sautéed cabbage in a baking dish, sprinkle with cheese, pour a milk or cream mixture over the top, and bake until the potatoes are tender and the top is golden and bubbly.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    }
    return 'No recipe available for the selected combination.';
}
function getDairyProteinVegetablesRecipe(dairy, protein, vegetables){
    if (dairy === 'Milk' && protein === 'Chicken' && vegetables === 'Broccoli') {
        const recipeName = '<h2>Creamy Broccoli Chicken</h2>';
        const recipeDetails = `
            <p>Tender chicken breasts are cooked with fresh broccoli florets and then smothered in a rich, creamy sauce made from milk. This dish balances the savory flavors of the chicken with the mild, earthy taste of broccoli, all brought together in a smooth, comforting milk-based sauce.</p>
            <p>Cook chicken breasts in a pan, add steamed broccoli, pour in a milk-based creamy sauce, and simmer until the chicken is cooked through and the sauce thickens.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Cheese' && protein === 'Beef' && vegetables === 'Cabbage') {
        const recipeName = '<h2>Beef and Cabbage Casserole</h2>';
        const recipeDetails = `
           <p>A hearty casserole featuring layers of ground beef, shredded cabbage, and melted cheese. The beef provides a robust flavor, the cabbage adds a tender texture, and the cheese creates a gooey, delicious topping that binds everything together.</p>
           <p>Layer cooked ground beef, shredded cabbage, and cheese in a baking dish, bake until the cabbage is tender and the cheese is melted and bubbly.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Milk' && protein === 'Pork' && vegetables === 'Onion') {
        const recipeName = '<h2>Pork Chops in Milk Gravy with Caramelized Onions</h2>';
        const recipeDetails = `
           <p>Juicy pork chops are cooked to perfection and served with a creamy milk gravy and sweet caramelized onions. The milk gravy adds a silky, rich texture to the dish, while the onions offer a sweet contrast to the savory pork.</p>
           <p>Sear pork chops, set aside. In the same pan, caramelize onions, then create a gravy with milk and pan drippings, return pork chops to the pan, and simmer until cooked through.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Cheese' && protein === 'Eggs' && vegetables === 'Broccoli') {
        const recipeName = '<h2>Broccoli and Cheese Frittata</h2>';
        const recipeDetails = `
           <p>A fluffy, baked egg dish filled with tender broccoli florets and melted cheese. The eggs provide a light, airy base, the broccoli introduces a burst of freshness, and the cheese adds a layer of creamy, rich flavor.</p>
           <p>Sauté broccoli, whisk eggs with cheese, pour the mixture over the broccoli in a skillet, and bake in the oven until the eggs are set and slightly golden.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Butter' && protein === 'Chicken' && vegetables === 'Cabbage') {
        const recipeName = '<h2>Butter-Braised Chicken with Cabbage</h2>';
        const recipeDetails = `
           <p>Chicken pieces are braised in butter until golden and succulent, then combined with tender, sweet cabbage. The butter adds a luxurious richness to the dish, complementing the natural flavors of the chicken and cabbage.</p>
           <p>Braise chicken pieces in butter until golden, add shredded cabbage to the pan, cook until the cabbage is tender and the chicken is fully cooked.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Milk' && protein === 'Beef' && vegetables === 'Lettuce') {
        const recipeName = '<h2>Beef Lettuce Wraps with Milk Dressing</h2>';
        const recipeDetails = `
           <p>Spiced ground beef is served in crisp lettuce leaves and drizzled with a creamy milk-based dressing. The lettuce wraps offer a light, crunchy contrast to the warm, flavorful beef, and the milk dressing adds a smooth, cooling element.</p>
           <p>Cook and season ground beef, prepare a creamy dressing with milk, and serve the beef in lettuce leaves, topped with the milk dressing.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Cheese' && protein === 'Fish' && vegetables === 'Onion') {
        const recipeName = '<h2>Cheesy Onion Baked Fish</h2>';
        const recipeDetails = `
           <p>Fish fillets are baked with a topping of caramelized onions and melted cheese. The fish is tender and flaky, the onions add a sweet depth of flavor, and the cheese creates a savory, golden crust.</p>
           <p>Place fish fillets in a baking dish, top with caramelized onions and grated cheese, and bake until the fish is cooked through and the cheese is melted and golden.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Butter' && protein === 'Pork' && vegetables === 'Broccoli') {
        const recipeName = '<h2>Pork Medallions with Buttered Broccoli</h2>';
        const recipeDetails = `
           <p>Tender pork medallions are served alongside broccoli florets sautéed in butter. The pork is rich and savory, and the butter enhances the broccoli's natural flavors, making for a simple yet elegant meal.</p>
           <p>Cook pork medallions in a pan until done, sauté broccoli florets in butter until tender, and serve together.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } 
    return 'No recipe available for the selected combination.';
}
function getDairyProteinVegetablesCarbsRecipe(dairy, protein, vegetables, carbs){
    if (dairy === 'Cheese' && protein === 'Beef' && vegetables === 'Broccoli' && carbs === 'Spaghetti') {
        const recipeName = '<h2>Beef and Broccoli Spaghetti Casserole</h2>';
        const recipeDetails = `
            <p>A hearty casserole combining tender beef and broccoli with cooked spaghetti, all baked in a savory cheese sauce. The cheese melts into a delicious layer on top, creating a comforting and satisfying dish.</p>
            <p>Cook spaghetti, sauté beef and broccoli, mix with cooked pasta and a cheese sauce, and bake until bubbly.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Butter' && protein === 'Fish' && vegetables === 'Cabbage' && carbs === 'Rice') {
        const recipeName = '<h2>Buttered Cabbage and Fish over Rice</h2>';
        const recipeDetails = `
           <p>Flaky fish and buttery, tender cabbage served over a bed of steamed rice. The butter enhances the flavors of the cabbage and fish, creating a simple yet elegant meal.</p>
           <p>Sauté cabbage in butter, cook fish fillets separately, serve both over cooked rice.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Milk' && protein === 'Chicken' && vegetables === 'Onion' && carbs === 'Potatoes') {
        const recipeName = '<h2>Creamy Onion Chicken with Mashed Potatoes</h2>';
        const recipeDetails = `
           <p>Chicken breasts cooked in a creamy onion sauce, served with a side of smooth, buttery mashed potatoes. The milk-based sauce provides a rich, comforting complement to the chicken.</p>
           <p>Cook chicken in a creamy onion sauce, make mashed potatoes, and serve chicken over or alongside the potatoes.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Cheese' && protein === 'Pork' && vegetables === 'Lettuce' && carbs === 'Rice') {
        const recipeName = '<h2>Pork and Rice Stuffed Lettuce Wraps</h2>';
        const recipeDetails = `
           <p>Minced pork and rice seasoned and cooked with cheese, then wrapped in crisp lettuce leaves. The wraps are light and fresh, with the cheese adding a savory depth.</p>
           <p>Cook pork with rice and cheese, cool, wrap in lettuce leaves, and serve.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Butter' && protein === 'Eggs' && vegetables === 'Broccoli' && carbs === 'Spaghetti') {
        const recipeName = '<h2>Broccoli and Egg Spaghetti</h2>';
        const recipeDetails = `
           <p>A unique pasta dish featuring spaghetti mixed with scrambled eggs and sautéed broccoli, all bound together with a touch of butter for richness.</p>
           <p>Cook spaghetti, scramble eggs with sautéed broccoli, toss together with butter.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Milk' && protein === 'Fish' && vegetables === 'Cabbage' && carbs === 'Potatoes') {
        const recipeName = '<h2>Fish Chowder with Cabbage and Potatoes</h2>';
        const recipeDetails = `
           <p>A hearty chowder combining fish, cabbage, and potatoes in a creamy milk-based broth. The ingredients meld together for a comforting, flavorful soup.</p>
           <p>Simmer potatoes and cabbage in milk, add fish, and cook until tender.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Cheese' && protein === 'Beef' && vegetables === 'Onion' && carbs === 'Rice') {
        const recipeName = '<h2>Cheesy Beef and Onion Rice</h2>';
        const recipeDetails = `
           <p>A rich and savory dish of seasoned ground beef and caramelized onions mixed with cooked rice, topped with melted cheese for a hearty and satisfying meal.</p>
           <p>Cook beef with onions, mix with cooked rice, top with cheese, and heat until cheese melts.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Butter' && protein === 'Chicken' && vegetables === 'Lettuce' && carbs === 'Spaghetti') {
        const recipeName = '<h2>Buttered Chicken Spaghetti Salad</h2>';
        const recipeDetails = `
           <p>A light and refreshing salad with butter-sautéed chicken and spaghetti, served over a bed of crisp lettuce. The butter adds a subtle richness to the dish.</p>
           <p>Cook chicken in butter, toss with cooked spaghetti and lettuce, and serve as a salad.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Milk' && protein === 'Pork' && vegetables === 'Broccoli' && carbs === 'Potatoes') {
        const recipeName = '<h2>Creamy Pork, Broccoli, and Potato Bake</h2>';
        const recipeDetails = `
           <p>A baked dish featuring layers of sliced potatoes, broccoli, and pork in a creamy milk sauce, baked until golden and bubbly.</p>
           <p>Layer sliced potatoes, cooked pork, and broccoli in a dish, pour over a milk-based sauce, and bake.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Cheese' && protein === 'Eggs' && vegetables === 'Cabbage' && carbs === 'Rice') {
        const recipeName = '<h2>Cabbage and Egg Fried Rice with Cheese</h2>';
        const recipeDetails = `
           <p>A fulfilling fried rice dish with sautéed cabbage and scrambled eggs, topped with melted cheese for a comforting and cheesy twist.</p>
           <p>Sauté cabbage, add cooked rice and scrambled eggs, top with cheese, and heat until cheese melts.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Cheese' && protein === 'Chicken' && vegetables === 'Onion' && carbs === 'Rice') {
        const recipeName = '<h2>Chicken Rice Casserole with Cheese and Onion</h2>';
        const recipeDetails = `
           <p>A baked casserole with layers of cooked chicken, rice, caramelized onions, and cheese, creating a rich and flavorful all-in-one meal.</p>
           <p>Layer cooked chicken, rice, caramelized onions, and cheese in a casserole dish, bake until heated through.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Butter' && protein === 'Beef' && vegetables === 'Broccoli' && carbs === 'Potatoes') {
        const recipeName = '<h2>Roasted Potatoes with Beef and Broccoli in Butter Sauce</h2>';
        const recipeDetails = `
           <p>Roasted potatoes and sautéed beef and broccoli, all drizzled with a luxurious butter sauce, combining for a hearty and satisfying dish.</p>
           <p>Roast potatoes, cook beef and broccoli, make a butter sauce, combine all.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Milk' && protein === 'Pork' && vegetables === 'Cabbage' && carbs === 'Spaghetti') {
        const recipeName = '<h2>Creamy Cabbage and Pork Spaghetti</h2>';
        const recipeDetails = `
           <p>Tender pork and cabbage in a creamy sauce served over spaghetti, offering a comforting and rich pasta dish with a twist.</p>
           <p>Cook spaghetti, sauté pork and cabbage, mix with a creamy sauce, and combine with pasta.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    } else if (dairy === 'Cheese' && protein === 'Eggs' && vegetables === 'Lettuce' && carbs === 'Rice') {
        const recipeName = '<h2>Cheesy Egg Fried Rice with Lettuce</h2>';
        const recipeDetails = `
           <p>A delightful fried rice dish with scrambled eggs and cheese, served with a side of fresh lettuce for a light and balanced meal.</p>
           <p>Make fried rice with scrambled eggs, serve with cheese melted on top and a side of fresh lettuce.</p>
        `;
        return `${recipeName}\n\n${recipeDetails}`;
    }
    return 'No recipe available for the selected combination.';
}

function getRecipeDetails(items) {
    if (items.length === 0) {
        return 'No items selected';
    }

    return `Recipe Details:\n${items.join('\n')}`;
}

function openPopup(content) {
    document.getElementById('popupContent').innerHTML = content;
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    document.getElementById("main-container").style.filter = "blur(5px)"
}

function closePopup() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
    document.getElementById("main-container").style.filter = "blur(0px)"

}

function resetBowl() {
    for (const key in selectedItems) {
        delete selectedItems[key];
    }
    displayInBowl();
}


function displayInBowl() {
    bowl.innerHTML = '';

    for (const key in selectedItems) {
        const item = selectedItems[key];
        addItemToBowl(item, key);
    }
}


