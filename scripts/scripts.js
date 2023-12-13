// select nodes
const dairyChoices = Array.from(document.getElementsByName("dairy"));
const vegetableChoices = Array.from(document.getElementsByName("vegetables"));
const proteinChoices = Array.from(document.getElementsByName("protein"));
const carbChoices = Array.from(document.getElementsByName("carbs"));
const _resultOutput = document.querySelector("#resultOutput");
const showButton = document.getElementById("showBtn");

// add to bowl functionality
document.addEventListener("DOMContentLoaded", function () {
  const bowl = document.getElementById("bowl");

  const ingredientRadios = document.querySelectorAll(".ingredient-radio");
  ingredientRadios.forEach((radio) => {
    radio.addEventListener("click", function () {
      const category = this.name;
      const item = this.value;
      selectedItems[category] = item;
      displayInBowl();
    });
  });

  const selectedItems = {};

  function addItemToBowl(item, category) {
    const newItem = document.createElement("li");
    const image = document.createElement("img");
    image.src = `./images/${item.toLowerCase()}.png`;
    image.alt = item;
    newItem.appendChild(image);

    bowl.appendChild(newItem);
  }

  function displayInBowl() {
    bowl.innerHTML = "";

    for (const key in selectedItems) {
      const item = selectedItems[key];
      addItemToBowl(item, key);
    }
  }
  document.getElementById("reset").addEventListener("click", function () {
    for (const key in selectedItems) {
      delete selectedItems[key];
    }
    // Unselect checked radio buttons
    const checkedRadios = document.querySelectorAll(
      ".ingredient-radio:checked"
    );
    checkedRadios.forEach((radio) => {
      radio.checked = false;
    });
    displayInBowl();
  });
});
//END: add to bowl functionality


function getUserChoices() {
  let choices = {
    dairy: null,
    vegetables: null,
    carbs: null,
    protein: null,
  };
  // loop through each group and find out which item is selected(checked) and save it as a propterty in the object
  dairyChoices.forEach((item) => {
    if (item.checked) {
      choices.dairy = item.value;
    }
  });
  vegetableChoices.forEach((item) => {
    if (item.checked) {
      choices.vegetables = item.value;
    }
  });
  proteinChoices.forEach((item) => {
    if (item.checked) {
      choices.protein = item.value;
    }
  });
  carbChoices.forEach((item) => {
    if (item.checked) {
      choices.carbs = item.value;
    }
  });
  // test to see if we are getting expected input from user

  // call getRecipes to filter our recipe data to find matching recipes
  getRecipes(choices);
  console.log(choices);
  return choices; // Add this line
}

const data = [
  {
    mealName: "Chicken Parmesan",
    protein: "chicken",
    dairy: "cheese",
    description:
      "<p>Chicken Parmesan is a classic Italian-American dish where breaded chicken breasts are fried to a golden crisp, then smothered in a tangy tomato sauce and topped with melted mozzarella and Parmesan cheese, creating a delightful blend of textures and flavors.</p> <p>Bread chicken breasts, fry until golden, and bake with marinara sauce and cheese until the cheese melts and the chicken is cooked through.</p>",
    recipeUrl: "https://www.wellplated.com/baked-chicken-parmesan/",
  },
  {
    mealName: "Herb Butter Steak",
    dairy: "butter",
    protein: "beef",
    description:
      "<p>This dish features a perfectly seared steak, enriched with a luxurious, herb-infused butter. The butter, melting over the hot steak, adds a rich, aromatic flavor that enhances the natural taste of the beef.</p><p>Season steak and sear in a hot pan. Prepare herb butter by mixing softened butter with chopped herbs. Place the herb butter on the hot steak to melt.</p>",
    recipeUrl: "https://www.carnaldish.com/recipes/garlic-herb-butter-steak/",
  },
  {
    mealName: "Creamy Fish Chowder",
    dairy: "milk",
    protein: "fish",
    description:
      "<p>A hearty and comforting soup, this chowder combines tender pieces of fish in a smooth, creamy milk-based broth, often with potatoes and vegetables, seasoned with herbs for a rich and satisfying seafood experience.</p><p>Sauté vegetables, add fish and broth, then stir in milk and seasonings, and simmer until the fish is cooked and the chowder is creamy.</p>",
    recipeUrl: "https://www.bowlofdelicious.com/fish-chowder/",
  },
  {
    mealName: "Classic French Omelette",
    dairy: "cheese",
    protein: "pork",
    description:
      "<p>A delicate and buttery omelette with a silky, tender texture. Made with just eggs and butter, it's often enjoyed with a variety of fillings like cheese or herbs, showcasing the eggs' natural flavor.</p><p>Whisk eggs, cook them in a buttered pan until slightly runny in the middle, fold the omelette, and serve immediately.</p>",
    recipeUrl: "https://www.seriouseats.com/classic-french-omelette-recipe",
  },
  {
    mealName: "Pork Chops with Cheese Sauce",
    dairy: "butter",
    protein: "eggs",
    description:
      "<p>Juicy pork chops are cooked to tender perfection and draped in a lusciously creamy cheese sauce. The sauce, often made with a blend of cheeses, adds a rich and comforting element to the succulent pork.</p><p>Cook pork chops in a pan, make a cheese sauce separately with cheese, milk, and seasonings, and pour the sauce over the cooked chops.</p>",
    recipeUrl:
      "https://www.beyerbeware.net/cheesy-garlic-brown-sugar-pork-chops/",
  },
  {
    mealName: "Beef Stroganoff",
    dairy: "milk",
    protein: "beef",
    description:
      "<p>Beef Stroganoff combines sautéed pieces of beef in a creamy, savory sauce made from milk, often with mushrooms and onions. It's typically served over pasta or rice, offering a comforting and hearty meal.</p><p>Sauté beef strips, add mushrooms and onions, stir in a sour cream and milk sauce, and serve over noodles or rice.</p>",
    recipeUrl:
      "https://thekitchengirl.com/homemade-beef-stroganoff-in-30-minutes/",
  },
  {
    mealName: "Lemon Butter Chicken",
    dairy: "butter",
    protein: "chicken",
    description:
      "<p>This dish features chicken breasts cooked in a zesty lemon butter sauce, creating a beautiful balance of tangy and rich flavors. The lemon adds a refreshing brightness, while the butter provides a smooth, indulgent base.</p><p>Cook chicken breasts in a pan, make a lemon butter sauce with lemon juice, butter, and seasonings, and pour it over the chicken.</p>",
    recipeUrl: "https://www.cookingclassy.com/lemon-butter-chicken/",
  },
  {
    mealName: "Cheese and Spinach Frittata",
    dairy: "cheese",
    protein: "eggs",
    description:
      "<p>A wholesome, oven-baked frittata filled with fresh spinach and melted cheese. The eggs create a fluffy, light texture, while the spinach adds a nutritious touch, and the cheese melts into gooey goodness.</p><p>Sauté spinach, mix eggs with cheese, combine with spinach, pour into a skillet, and bake until set.</p>",
    recipeUrl: "https://www.thekitchn.com/spinach-frittata-recipe-23173248",
  },
  {
    mealName: "Pork in Milk Sauce",
    dairy: "milk",
    protein: "pork",
    description:
      "<p>Tender pork cooked slowly in a subtly sweet, creamy milk sauce. This unique combination creates a tender, flavorful dish where the milk infuses the pork with a delicate, rich flavor.</p><p>Brown pork pieces, add milk and seasonings, and simmer until the pork is tender and the sauce is slightly thickened.</p>",
    recipeUrl: "https://www.foodandwine.com/recipes/pork-braised-in-milk",
  },
  {
    mealName: "Butter Poached Fish",
    dairy: "butter",
    protein: "fish",
    description:
      "<p>Delicate fish fillets are gently poached in a bath of butter, resulting in a dish that's incredibly moist and rich in flavor. The butter accentuates the fish's natural taste, making it a simple yet elegant meal.</p><p>Gently simmer fish fillets in a pan with melted butter, keeping the temperature low, until the fish is cooked through.</p>",
    recipeUrl: "https://copykat.com/butter-poached-fish/",
  },
  {
    mealName: "Milk and Herb Scrambled Eggs",
    dairy: "milk",
    protein: "eggs",
    description:
      "<p>Creamy and soft scrambled eggs infused with fresh herbs and a splash of milk, offering a velvety texture and a refreshing herbaceous flavor, perfect for a luxurious breakfast or brunch.</p><p>Whisk eggs with milk and herbs, cook in a pan over low heat, stirring constantly, until softly set.</p>",
    recipeUrl: "https://toriavey.com/how-to-make-scrambled-eggs/",
  },
  {
    mealName: "Beef and Cheese Quesadillas",
    dairy: "cheese",
    protein: "beef",
    description:
      "<p>Crispy tortillas filled with a flavorful mixture of seasoned beef and melted cheese. This Mexican-inspired dish is both hearty and satisfying, with the cheese adding a gooey, comforting element to the spiced beef.</p><p>Cook seasoned beef, place it on tortillas with cheese, fold, and cook until the tortillas are crispy and the cheese has melted.</p>",
    recipeUrl: "https://girlheartfood.com/cheesy-ground-beef-quesadillas/",
  },
  {
    mealName: "Creamy Garlic Chicken",
    dairy: "milk",
    protein: "chicken",
    description:
      "<p>Chicken breasts simmered in a rich, garlicky cream sauce made with milk. The garlic infuses the sauce with a warm, aromatic flavor, complementing the tender, moist chicken.</p><p>Cook chicken breasts, make a creamy garlic sauce with milk in the same pan, and simmer the chicken in the sauce until fully cooked.</p>",
    recipeUrl: "https://cafedelites.com/quick-easy-creamy-herb-chicken/",
  },
  {
    mealName: "Garlic Butter Pork Chops",
    dairy: "butter",
    protein: "pork",
    description:
      "<p>These pork chops are seared to perfection and finished with a decadent garlic butter sauce. The sauce adds a rich and savory depth to the succulent pork chops, making it a flavorful and satisfying dish.</p><p>Sear pork chops, make a garlic butter sauce in the same pan, and spoon the sauce over the cooked chops.</p>",
    recipeUrl: "https://theforkedspoon.com/pork-chop-recipe/",
  },
  {
    mealName: "Baked Fish with Cheese Crust",
    dairy: "cheese",
    protein: "fish",
    description:
      "<p>A delightful seafood dish where fish fillets are topped with a crispy cheese crust, offering a contrast of textures. The cheese adds a savory depth to the mild flavor of the fish, creating a simple yet elegant meal.</p><p>Place fish fillets in a baking dish, top with a mixture of cheese and breadcrumbs, and bake until the fish is cooked and the topping is golden.</p>",
    recipeUrl: "https://www.thespruceeats.com/parmesan-baked-fish-3058409",
  },
  {
    mealName: "Chicken Teriyaki over Rice",
    protein: "chicken",
    carbs: "rice",
    description:
      "<p>A popular Asian dish featuring sautéed chicken glazed in a sweet and savory teriyaki sauce, served over a bed of fluffy white rice.</p><p>Cook rice as per package instructions. In a separate pan, sauté chicken pieces until fully cooked, then add teriyaki sauce and simmer for a few minutes. Serve the chicken and sauce over the cooked rice.</p>",
    recipeUrl: "https://modernmealmakeover.com/teriyaki-chicken/",
  },
  {
    mealName: "Chicken Alfredo Spaghetti",
    protein: "chicken",
    carbs: "spaghetti",
    description:
      "<p>An Italian-American classic, this dish combines tender chicken strips with creamy Alfredo sauce, served over al dente spaghetti.</p><p>Boil spaghetti until al dente. In another pan, sauté chicken pieces, then mix in Alfredo sauce and warm it up. Combine the cooked spaghetti with the chicken and sauce.</p>",
    recipeUrl:
      "https://aflavorjournal.com/spaghetti-with-alfredo-sauce-and-chicken/",
  },
  {
    mealName: "Herb Roasted Chicken and Potatoes",
    protein: "chicken",
    carbs: "potatoes",
    description:
      "<p>A wholesome meal with chicken pieces and potatoes roasted with herbs like rosemary and thyme, creating a comforting and flavorful dish.</p><p>Season chicken pieces and potatoes with herbs, salt, and pepper. Roast in the oven at 375°F (190°C) until the chicken is cooked through and potatoes are tender.</p>",
    recipeUrl:
      "https://www.thriftyfrugalmom.com/easy-herb-roasted-chicken-potatoes/",
  },
  {
    mealName: "Beef Stir-Fry with Vegetables and Rice",
    protein: "beef",
    carbs: "rice",
    description:
      "<p>A quick and easy stir-fry dish featuring thinly sliced beef and colorful vegetables, seasoned with soy and sesame, served over steamed rice.</p><p>Cook rice as instructed. Stir-fry sliced beef and vegetables in a pan with a bit of oil, add soy sauce and sesame oil, and cook until beef is done. Serve over rice.</p>",
    recipeUrl:
      "https://www.tasteandtellblog.com/asian-rice-beef-stir-fry-recipe/",
  },
  {
    mealName: "Classic Bolognese Spaghetti",
    protein: "beef",
    carbs: "spaghetti",
    description:
      "<p>A hearty Italian pasta dish where spaghetti is topped with a rich and meaty tomato-based Bolognese sauce, often simmered for depth of flavor.</p><p>Cook spaghetti as per instructions. In a saucepan, cook ground beef until browned, add tomato sauce, and simmer. Serve the sauce over the spaghetti.</p>",
    recipeUrl: "https://anitalianinmykitchen.com/bolognese-sauce/",
  },
  {
    mealName: "Beef Stew with Roasted Potatoes",
    protein: "beef",
    carbs: "potatoes",
    description:
      "<p>A nourishing stew made with tender chunks of beef, slow-cooked in a savory broth, accompanied by perfectly roasted potatoes.</p><p>Brown chunks of beef in a pot, add broth and seasonings, and let it simmer until tender. Roast potatoes in the oven and serve them alongside the beef stew.</p>",
    recipeUrl:
      "https://www.blueapron.com/recipes/beef-mushroom-stew-with-roasted-potatoes",
  },
  {
    mealName: "Sweet and Sour Pork over Rice",
    protein: "pork",
    carbs: "rice",
    description:
      "<p>A popular Chinese dish with cubes of pork cooked in a tangy sweet and sour sauce, accompanied by bell peppers and onions, served over rice.</p><p>Cook rice as per instructions. In a pan, cook diced pork until browned, add bell peppers, onions, and sweet and sour sauce, cooking until sauce thickens. Serve over rice.</p>",
    recipeUrl: "https://playswellwithbutter.com/sweet-and-sour-pork-recipe/",
  },
  {
    mealName: "Pork Meatball Marinara Spaghetti",
    protein: "pork",
    carbs: "spaghetti",
    description:
      "<p>Flavorful pork meatballs simmered in a classic marinara sauce, served atop a bed of spaghetti, offering a delightful twist to traditional spaghetti dishes.</p><p>Make meatballs from ground pork and cook them in a pan. Boil spaghetti, and in a separate pot, heat marinara sauce. Combine spaghetti, meatballs, and sauce.</p>",
    recipeUrl:
      "https://www.couponclippingcook.com/pork-meatballs-with-pasta-in-tomato-wine-sauce/",
  },
  {
    mealName: "Grilled Pork Chops with Scalloped Potatoes",
    protein: "pork",
    carbs: "potatoes",
    description:
      "<p>Juicy grilled pork chops paired with creamy scalloped potatoes, a combination that provides both rich flavor and comforting texture.</p><p>Grill seasoned pork chops to desired doneness. Layer sliced potatoes in a baking dish with cream and cheese, and bake until golden and tender.</p>",
    recipeUrl:
      "https://www.tasteofhome.com/recipes/pork-chops-with-scalloped-potatoes/",
  },
  {
    mealName: "Lemon Dill Fish with Rice Pilaf",
    protein: "fish",
    carbs: "rice",
    description:
      "<p>A light and refreshing dish featuring fish fillets seasoned with lemon and dill, served alongside a flavorful rice pilaf.</p><p>Prepare rice pilaf as per package instructions. Season fish fillets with lemon and dill, then bake or grill until cooked. Serve with rice pilaf.</p>",
    recipeUrl: "https://www.food.com/recipe/lemon-dill-rice-250959",
  },
  {
    mealName: "Garlic Butter Fish Spaghetti",
    protein: "fish",
    carbs: "spaghetti",
    description:
      "<p>An elegant yet simple dish where spaghetti is tossed with garlic butter-coated fish, offering a light and zesty flavor profile.</p><p>Cook spaghetti. In a pan, cook fish fillets with garlic and butter. Toss the cooked spaghetti with the garlic butter fish.</p>",
    recipeUrl: "https://midwestfoodieblog.com/pan-fried-lemon-butter-fish/",
  },
  {
    mealName: "Herb-Crusted Fish with Mashed Potatoes",
    protein: "fish",
    carbs: "potatoes",
    description:
      "<p>Oven-baked fish fillets with a crispy herb crust, served with smooth and creamy mashed potatoes for a delightful contrast in textures.</p><p>Coat fish fillets with herbs and breadcrumbs, bake until crispy. Boil and mash potatoes with butter and milk. Serve fish over mashed potatoes.</p>",
    recipeUrl: "https://www.allonseat.com/mashed-potato-crusted-cod/",
  },
  {
    mealName: "Egg Fried Rice",
    protein: "eggs",
    carbs: "rice",
    description:
      "<p>A versatile and satisfying dish, combining rice stir-fried with eggs, vegetables, and a hint of soy sauce, perfect for a quick and easy meal.</p><p>Sauté cooked rice with scrambled eggs, vegetables, and soy sauce. Garnish with green onions and sesame seeds.</p>",
    recipeUrl: "https://healthynibblesandbits.com/easiest-egg-fried-rice/",
  },
  {
    mealName: "Spaghetti alla Carbonara",
    protein: "eggs",
    carbs: "spaghetti",
    description:
      "<p>A classic Roman pasta dish made with spaghetti, crispy pancetta or bacon, eggs, and Parmesan, known for its creamy texture without the use of cream.</p><p>Cook spaghetti and in a separate bowl, whisk together eggs and Parmesan. Combine the hot spaghetti with the egg mixture, adding cooked pancetta or bacon.</p>",
    recipeUrl:
      "https://www.foodnetwork.com/recipes/tyler-florence/spaghetti-alla-carbonara-recipe-1914140",
  },
  {
    mealName: "Spanish Potato Omelette",
    protein: "eggs",
    carbs: "potatoes",
    description:
      "<p>A traditional Spanish dish, also known as Tortilla Española, made with eggs, potatoes, and onions, often enjoyed as a tapas item or a light meal.</p><p>Thinly slice potatoes and onions, and fry until tender. Pour beaten eggs over the potatoes and onions in a pan, cook until set, then flip and cook the other side.</p>",
    recipeUrl: "https://cafedelites.com/spanish-omelette/",
  },
  {
    mealName: "Broccoli Chicken Stir-Fry",
    protein: "chicken",
    vegetables: "broccoli",
    description:
      "<p>This dish features tender pieces of chicken and fresh broccoli florets stir-fried in a savory sauce. The chicken is cooked to perfection, and the broccoli adds a crunchy texture, making it a balanced and flavorful meal.</p><p>Sauté chicken pieces until cooked, add broccoli florets and a savory sauce, stir-fry until the broccoli is tender-crisp.</p>",
    recipeUrl:
      "https://natashaskitchen.com/chicken-broccoli-and-mushroom-stir-fry/",
  },
  {
    mealName: "Beef and Cabbage Stew",
    protein: "beef",
    vegetables: "cabbage",
    description:
      "<p>A hearty stew combining slow-cooked beef and tender cabbage in a rich, flavorful broth. The beef becomes incredibly tender, and the cabbage contributes a mild, sweet flavor, perfect for a comforting meal.</p><p>Brown beef chunks, add chopped cabbage and broth, simmer until the beef is tender and the cabbage is softened.</p>",
    recipeUrl:
      "https://www.allrecipes.com/recipe/229255/beef-and-cabbage-stew/",
  },
  {
    mealName: "Pork and Onion Skillet",
    protein: "pork",
    vegetables: "onion",
    description:
      "<p>Juicy pork chops or slices are cooked with caramelized onions in a skillet. The sweetness of the onions complements the savory pork, creating a simple yet delicious dish.</p><p>Cook pork chops or slices in a skillet, add sliced onions and cook until caramelized, season as desired.</p>",
    recipeUrl: "https://www.inspiredtaste.net/37062/juicy-skillet-pork-chops/",
  },
  {
    mealName: "Broccoli and Cheddar Frittata",
    protein: "eggs",
    vegetables: "broccoli",
    description:
      "<p>A baked egg dish filled with nutritious broccoli and melted cheddar cheese. The eggs are fluffy and light, while the broccoli provides a pleasant crunch, and the cheddar adds a creamy, rich flavor.</p><p>Sauté broccoli, mix eggs with cheddar cheese, pour over broccoli in a skillet, bake in the oven until set.</p>",
    recipeUrl: "https://thewholecook.com/broccoli-cheddar-frittata/",
  },
  {
    mealName: "Onion Crusted Baked Fish",
    protein: "fish",
    vegetables: "onion",
    description:
      "<p>Tender fish fillets are coated with a crispy onion and breadcrumb crust, then baked until golden. The onion crust adds a delightful crunch and flavor to the delicate fish.</p><p>Coat fish fillets with a mixture of breadcrumbs and fried onions, bake until the crust is golden and the fish is cooked.</p>",
    recipeUrl: "https://www.food.com/recipe/tilapia-with-onion-crust-130894",
  },
  {
    mealName: "Broccoli and Pork Stir-Fry",
    protein: "pork",
    vegetables: "broccoli",
    description:
      "<p>Slices of pork are stir-fried with broccoli in a flavorful sauce. The pork is tender, and the broccoli adds a fresh, crunchy element to this quick and tasty meal.</p><p>Stir-fry sliced pork until cooked, add broccoli and a flavorful sauce, and cook until the broccoli is tender.</p>",
    recipeUrl:
      "https://kalynskitchen.com/pork-and-broccoli-stir-fry-recipe-with/",
  },
  {
    mealName: "Cabbage and Egg Hash",
    protein: "eggs",
    vegetables: "cabbage",
    description:
      "<p>A rustic and hearty dish where eggs are cooked with sautéed cabbage and onions, often with potatoes or other vegetables, creating a filling and nutritious meal.</p><p>Sauté cabbage and onions, crack eggs into the pan, and cook until the eggs are set to your liking.</p>",
    recipeUrl:
      "https://www.delish.com/cooking/recipe-ideas/a26044120/cabbage-hash-browns-recipe/",
  },
  {
    mealName: "Beef Broccoli Stir-Fry",
    protein: "beef",
    vegetables: "broccoli",
    description:
      "<p>Strips of beef and broccoli florets are stir-fried in a rich, savory sauce. The beef is succulent, and the broccoli soaks up the flavors of the sauce, making it a popular and satisfying dish.</p><p>Cook beef strips, add broccoli florets and a savory stir-fry sauce, cook until the broccoli is tender and the beef is coated with the sauce.</p>",
    recipeUrl: "https://natashaskitchen.com/beef-and-broccoli/",
  },
  {
    mealName: "Chicken Cabbage Soup",
    protein: "chicken",
    vegetables: "cabbage",
    description:
      "<p>A nourishing soup featuring chicken and cabbage, along with other vegetables, simmered in a flavorful broth. It's a light yet fulfilling soup, perfect for any season.</p><p>Cook chicken pieces, add chopped cabbage and vegetables, pour in broth, and simmer until everything is cooked through.</p>",
    recipeUrl:
      "https://www.eatingwell.com/recipe/7918152/one-pot-chicken-cabbage-soup/",
  },
  {
    mealName: "Broccoli Fish Bake",
    protein: "fish",
    vegetables: "broccoli",
    description:
      "<p>A wholesome dish where fish fillets are baked with broccoli and a creamy or cheesy topping. The fish is flaky and moist, and the broccoli complements it with its earthy flavor.</p><p>Place fish fillets and broccoli in a baking dish, top with a creamy or cheesy sauce, and bake until the fish is flaky.</p>",
    recipeUrl:
      "https://www.delish.com/cooking/recipe-ideas/recipes/a8571/broccoli-fish-bake-recipe-campbells-1109/",
  },
  {
    mealName: "Pork and Cabbage Skillet",
    protein: "pork",
    vegetables: "cabbage",
    description:
      "<p>This dish involves cooking pork with cabbage in a skillet. The pork adds richness, while the cabbage brings a comforting texture and a slightly sweet flavor.</p><p>Cook pork pieces in a skillet, add chopped cabbage, and cook until the cabbage is tender and the pork is fully cooked.</p>",
    recipeUrl: "https://wagonpilot.com/pork-and-cabbage-skillet/",
  },
  {
    mealName: "Onion and Egg Scramble",
    protein: "eggs",
    vegetables: "onion",
    description:
      "<p>A simple yet delicious scramble of eggs with sautéed onions. The onions add a sweet and savory depth to the fluffy, lightly seasoned eggs.</p><p>Sauté onions until soft, add beaten eggs, scramble until the eggs are cooked and fluffy.</p>",
    recipeUrl:
      "https://www.allrecipes.com/recipe/104815/perfect-scrambled-eggs/",
  },
  {
    mealName: "Cabbage Fried Rice",
    carbs: "rice",
    vegetables: "cabbage",
    dairy: "butter",
    description:
      "<p>This dish transforms simple ingredients into a delightful meal. It starts with sautéing cabbage in butter until it's tender and slightly caramelized, then mixing it with cooked rice. The butter adds a rich flavor to the rice, and the cabbage offers a pleasant, slightly crunchy texture.</p><p>Sauté chopped cabbage in butter until soft, add cooked rice and seasonings, and stir-fry until everything is well combined and heated through.</p>",
    recipeUrl:
      "https://natashaskitchen.com/cabbage-fried-rice-recipe-and-100-giveaway/",
  },
  {
    mealName: "Creamy Broccoli Spaghetti",
    carbs: "spaghetti",
    vegetables: "broccoli",
    dairy: "milk",
    description:
      "<p>A comforting pasta dish featuring spaghetti in a creamy, milk-based sauce with tender broccoli florets. The sauce, enriched with milk, coats the pasta and broccoli, creating a harmonious blend of flavors and textures.</p><p>Cook spaghetti, steam broccoli florets, prepare a creamy sauce using milk, combine everything, and simmer until the sauce thickens and coats the pasta.</p>",
    recipeUrl:
      "https://spainonafork.com/creamy-broccoli-spaghetti-easy-20-minute-recipe/",
  },
  {
    mealName: "Cabbage and Cheese Stuffed Rice Balls",
    carbs: "rice",
    vegetables: "cabbage",
    dairy: "cheese",
    description:
      "<p>These are delightful little bites where cooked rice and sautéed cabbage are combined, often with a melting cheese center, and then formed into balls and cooked until crispy on the outside. They offer a satisfying mix of creamy, cheesy flavors with the mild taste of cabbage.</p><p>Mix cooked rice with sautéed cabbage and cheese, form into balls, optionally coat with breadcrumbs, and fry or bake until golden and crispy.</p>",
    recipeUrl: "https://life-and-lemons.com/green-cabbage-arancini-balls/",
  },
  {
    mealName: "Broccoli and Butter Mashed Potatoes",
    carbs: "potatoes",
    vegetables: "broccoli",
    dairy: "butter",
    description:
      "<p>This dish elevates traditional mashed potatoes by incorporating steamed broccoli and rich butter into the mash. The result is a creamy, buttery side dish with flecks of green broccoli, combining the comforting taste of potatoes with the nutrition of broccoli.</p><p>Boil potatoes until tender, steam broccoli, mash the potatoes with butter, fold in the broccoli, and season to taste.</p>",
    recipeUrl: "https://vegetablerecipes.com/broccoli-mashed-potatoes/",
  },
  {
    mealName: "Cabbage and Potato Gratin",
    carbs: "potatoes",
    vegetables: "cabbage",
    dairy: "cheese",
    description:
      "<p>A baked casserole that layers thinly sliced potatoes and cabbage, topped with cheese and baked until golden and bubbly. The cheese melts into the vegetables, creating a creamy texture, while the top layer crisps up for a satisfying crunch.</p><p>Layer thinly sliced potatoes and sautéed cabbage in a baking dish, sprinkle with cheese, pour a milk or cream mixture over the top, and bake until the potatoes are tender and the top is golden and bubbly.</p>",
    recipeUrl:
      "https://cooking.nytimes.com/recipes/1018004-cabbage-and-potato-gratin",
  },
  {
    mealName: "Savory Grilled Chicken with Garlic Broccoli Mash",
    protein: "chicken",
    vegetables: "broccoli",
    carbs: "potatoes",
    description:
      "<p>This dish features perfectly grilled chicken breasts served with a side of creamy garlic-infused mashed potatoes and tender roasted broccoli.</p><p>Grill seasoned chicken breasts until fully cooked and juicy. For the mash, boil potatoes until tender, then mash with garlic, butter, and milk. Roast broccoli florets in the oven with olive oil and seasonings until tender and slightly crispy.</p>",
    recipeUrl: "https://gimmedelicious.com/garlic-butter-chicken-broccoli/",
  },
  {
    mealName: "Rainbow Chicken Veggie Stir-Fry over Rice",
    protein: "chicken",
    vegetables: "lettuce",
    carbs: "rice",
    description:
      "<p>A colorful stir-fry with juicy chicken pieces and a mix of fresh vegetables like lettuce, onion, and cabbage, all tossed in a savory sauce and served over fluffy white rice.</p><p>Sauté bite-sized chicken pieces in a pan until browned. Add chopped lettuce, onion, and cabbage, cooking until vegetables are tender. Serve the stir-fry over cooked white rice, drizzled with your favorite stir-fry sauce.</p>",
    recipeUrl: "https://www.madewithlau.com/recipes/rainbow-chicken-stir-fry",
  },
  {
    mealName: "Rainbow Chicken Veggie Stir-Fry over Rice",
    protein: "chicken",
    vegetables: "onion",
    carbs: "rice",
    description:
      "<p>A colorful stir-fry with juicy chicken pieces and a mix of fresh vegetables like lettuce, onion, and cabbage, all tossed in a savory sauce and served over fluffy white rice.</p><p>Sauté bite-sized chicken pieces in a pan until browned. Add chopped lettuce, onion, and cabbage, cooking until vegetables are tender. Serve the stir-fry over cooked white rice, drizzled with your favorite stir-fry sauce.</p>",
    recipeUrl: "https://www.madewithlau.com/recipes/rainbow-chicken-stir-fry",
  },
  {
    mealName: "Rainbow Chicken Veggie Stir-Fry over Rice",
    protein: "chicken",
    vegetables: "cabbage",
    carbs: "rice",
    description:
      "<p>A colorful stir-fry with juicy chicken pieces and a mix of fresh vegetables like lettuce, onion, and cabbage, all tossed in a savory sauce and served over fluffy white rice.</p><p>Sauté bite-sized chicken pieces in a pan until browned. Add chopped lettuce, onion, and cabbage, cooking until vegetables are tender. Serve the stir-fry over cooked white rice, drizzled with your favorite stir-fry sauce.</p>",
    recipeUrl: "https://www.madewithlau.com/recipes/rainbow-chicken-stir-fry",
  },
  {
    mealName: "Classic Chicken Meatballs with Spaghetti & Steamed Broccoli",
    protein: "chicken",
    vegetables: "broccoli",
    carbs: "spaghetti",
    description:
      "<p>Tender and flavorful chicken meatballs served atop al dente spaghetti, accompanied by lightly steamed, nutrient-rich broccoli.</p><p>Mix ground chicken with breadcrumbs, egg, and seasonings to form meatballs. Bake them until golden and cooked through. Cook spaghetti as per package instructions. Steam broccoli until tender. Serve meatballs over spaghetti with a sauce of your choice.</p>",
    recipeUrl:
      "https://www.recipetineats.com/baked-chicken-meatballs-spaghetti/",
  },
  {
    mealName: "Asian Fusion Beef & Broccoli with Jasmine Rice",
    protein: "beef",
    vegetables: "broccoli",
    carbs: "rice",
    description:
      "<p>This dish combines tender slices of beef and fresh broccoli in a rich, Asian-inspired sauce, served over aromatic jasmine rice.</p><p>Stir-fry thin slices of beef until browned, then add broccoli florets and cook until tender. Mix in a savory Asian sauce and serve over cooked jasmine rice.</p>",
    recipeUrl:
      "https://dinnerly.com/menu/44347-beef-broccoli-stir-fry-with-jasmine-rice",
  },
  {
    mealName: "Hearty Beef and Onion Pot Roast with Potato Wedges",
    protein: "beef",
    vegetables: "onion",
    carbs: "potatoes",
    description:
      "<p>A comforting meal featuring slow-cooked beef and onions, resulting in a tender, flavorful pot roast, accompanied by crispy potato wedges.</p><p>Slow cook a beef roast with onions, broth, and seasonings until tender. Cut potatoes into wedges, toss with oil and spices, and roast until crispy. Serve the pot roast with the potato wedges.</p>",
    recipeUrl:
      "https://www.thespruceeats.com/pot-roast-with-potatoes-carrots-3059820",
  },
  {
    mealName: "Bistro-Style Beef Cabbage Rolls with Buttered Spaghetti",
    protein: "beef",
    vegetables: "cabbage",
    carbs: "spaghetti",
    description:
      "<p>Savory beef-filled cabbage rolls, cooked to perfection, paired with buttery, lightly seasoned spaghetti.</p><p>Cook ground beef with seasonings, wrap in boiled cabbage leaves, and bake with tomato sauce. Boil spaghetti, then toss with butter, parsley, and salt. Serve the cabbage rolls with the spaghetti on the side.</p>",
    recipeUrl: "https://www.smalltownwoman.com/cabbage-rolls/",
  },
  {
    mealName: "Mediterranean Fish Fillet with Cabbage Slaw & Herbed Potatoes",
    protein: "fish",
    vegetables: "cabbage",
    carbs: "potatoes",
    description:
      "<p>A light and healthy dish featuring seasoned fish fillets, paired with a zesty cabbage slaw and herb-infused roasted potatoes.</p><p>Season fish fillets and bake until flaky. Combine shredded cabbage with a vinaigrette for the slaw. Roast diced potatoes with herbs and olive oil until golden.</p>",
    recipeUrl:
      "https://www.eatingwell.com/recipe/274830/provencal-baked-fish-with-roasted-potatoes-mushrooms/",
  },
  {
    mealName: "Lemon Butter Fish over Onion Rice Pilaf",
    protein: "fish",
    vegetables: "onion",
    carbs: "rice",
    description:
      "<p>Delicate fish fillets cooked in a lemon butter sauce, served over a bed of fragrant onion rice pilaf.</p><p>Sauté fish fillets in lemon butter sauce until cooked. Cook rice with onions and broth until fluffy. Serve the fish over the rice pilaf.</p>",
    recipeUrl: "https://www.culinaryhill.com/lemon-rice-pilaf/",
  },
  {
    mealName: "Sea Breeze Fish Tacos with Lettuce & Spaghetti Slaw",
    protein: "fish",
    vegetables: "lettuce",
    carbs: "spaghetti",
    description:
      "<p>A fun and flavorful meal with fish tacos, topped with a unique spaghetti and lettuce slaw, embodying the freshness of the sea.</p><p>Grill or fry fish fillets and break into pieces. Toss cooked spaghetti and lettuce with a light dressing. Fill tacos with fish and top with spaghetti slaw.</p>",
    recipeUrl: "https://www.lecremedelacrumb.com/best-fish-tacos-with-slaw/",
  },
  {
    mealName:
      "Smoky Pork Chops with Caramelized Onion & Creamy Mashed Potatoes",
    protein: "pork",
    vegetables: "onion",
    carbs: "potatoes",
    description:
      "<p>Juicy, smoky pork chops accompanied by sweet caramelized onions and smooth, creamy mashed potatoes.</p><p>Grill or pan-fry seasoned pork chops. Caramelize sliced onions in a pan. Boil and mash potatoes with milk, butter, and cream. Serve the chops with onions and mashed potatoes.</p>",
    recipeUrl:
      "https://www.rachelcooks.com/pork-chops-with-balsamic-caramelized-onions/",
  },
  {
    mealName: "Pork Tenderloin with Broccoli Rice Casserole",
    protein: "pork",
    vegetables: "broccoli",
    carbs: "rice",
    description:
      "<p>Juicy, smoky pork chops accompanied by sweet caramelized onions and smooth, creamy mashed potatoes.</p><p>Roast a pork tenderloin in the oven. Cook rice and broccoli, mix with a creamy sauce, and bake until bubbly. Slice the tenderloin and serve with the casserole.</p>",
    recipeUrl:
      "https://www.allrecipes.com/recipe/75475/pork-broccoli-and-rice-casserole/",
  },
  {
    mealName: "Sizzling Pork Stir-Fry with Rainbow Veggies over Spaghetti",
    protein: "pork",
    vegetables: "onion",
    carbs: "spaghetti",
    description:
      "<p>A vibrant and tasty stir-fry featuring tender pork strips and a medley of colorful vegetables, served over spaghetti.</p><p>Stir-fry pork strips and assorted vegetables (like bell peppers, carrots, onions) in a pan. Cook spaghetti, toss everything together with a savory sauce.</p>",
    recipeUrl:
      "https://www.seriouseats.com/stir-fried-lo-mein-noodles-pork-vegetables-recipe",
  },
  {
    mealName: "Fluffy Omelette with Broccoli and Cheesy Potatoes",
    protein: "eggs",
    vegetables: "broccoli",
    carbs: "potatoes",
    description:
      "<p>A light and fluffy omelette filled with broccoli and served with a side of cheesy, golden-brown potatoes.</p><p>Whisk eggs and cook in a pan to make a fluffy omelette, adding steamed broccoli florets. Cook diced potatoes until crispy, then sprinkle with cheese and let it melt.</p>",
    recipeUrl:
      "https://www.tasteofhome.com/recipes/mediterranean-broccoli-cheese-omelet/",
  },
  {
    mealName: "Egg Fried Rice with Mixed Veggies",
    protein: "eggs",
    vegetables: "onion",
    carbs: "rice",
    description:
      "<p>A quick and easy dish combining scrambled eggs, mixed vegetables, and rice, all stir-fried to create a comforting meal.</p><p>Scramble eggs in a pan, then add cooked rice and chopped vegetables. Stir-fry everything together, seasoning to taste.</p>",
    recipeUrl: "https://www.gimmesomeoven.com/fried-rice-recipe/",
  },
  {
    mealName: "Egg Fried Rice with Mixed Veggies",
    protein: "eggs",
    vegetables: "lettuce",
    carbs: "rice",
    description:
      "<p>A quick and easy dish combining scrambled eggs, mixed vegetables, and rice, all stir-fried to create a comforting meal.</p><p>Scramble eggs in a pan, then add cooked rice and chopped vegetables. Stir-fry everything together, seasoning to taste.</p>",
    recipeUrl: "https://www.gimmesomeoven.com/fried-rice-recipe/",
  },
  {
    mealName: "Egg Fried Rice with Mixed Veggies",
    protein: "eggs",
    vegetables: "cabbage",
    carbs: "rice",
    description:
      "<p>A quick and easy dish combining scrambled eggs, mixed vegetables, and rice, all stir-fried to create a comforting meal.</p><p>Scramble eggs in a pan, then add cooked rice and chopped vegetables. Stir-fry everything together, seasoning to taste.</p>",
    recipeUrl: "https://www.gimmesomeoven.com/fried-rice-recipe/",
  },
  {
    mealName: "Creamy Broccoli Chicken",
    dairy: "milk",
    protein: "chicken",
    vegetables: "broccoli",
    description:
      "<p>Tender chicken breasts are cooked with fresh broccoli florets and then smothered in a rich, creamy sauce made from milk. This dish balances the savory flavors of the chicken with the mild, earthy taste of broccoli, all brought together in a smooth, comforting milk-based sauce.</p><p>Cook chicken breasts in a pan, add steamed broccoli, pour in a milk-based creamy sauce, and simmer until the chicken is cooked through and the sauce thickens.</p>",
    recipeUrl: "https://healthyfitnessmeals.com/chicken-and-broccoli/",
  },
  {
    mealName: "Beef and Cabbage Casserole",
    dairy: "cheese",
    protein: "beef",
    vegetables: "cabbage",
    description:
      "<p>A hearty casserole featuring layers of ground beef, shredded cabbage, and melted cheese. The beef provides a robust flavor, the cabbage adds a tender texture, and the cheese creates a gooey, delicious topping that binds everything together.</p><p>Layer cooked ground beef, shredded cabbage, and cheese in a baking dish, bake until the cabbage is tender and the cheese is melted and bubbly.</p>",
    recipeUrl:
      "https://www.thespruceeats.com/ground-beef-and-cabbage-casserole-3057387",
  },
  {
    mealName: "Pork Chops in Milk Gravy with Caramelized Onions",
    dairy: "milk",
    protein: "pork",
    vegetables: "onion",
    description:
      "<p>Juicy pork chops are cooked to perfection and served with a creamy milk gravy and sweet caramelized onions. The milk gravy adds a silky, rich texture to the dish, while the onions offer a sweet contrast to the savory pork.</p><p>Sear pork chops, set aside. In the same pan, caramelize onions, then create a gravy with milk and pan drippings, return pork chops to the pan, and simmer until cooked through.</p>",
    recipeUrl: "https://www.butterbeready.com/southern-smothered-pork-chops/",
  },
  {
    mealName: "Broccoli and Cheese Frittata",
    dairy: "cheese",
    protein: "eggs",
    vegetables: "broccoli",
    description:
      "<p>A fluffy, baked egg dish filled with tender broccoli florets and melted cheese. The eggs provide a light, airy base, the broccoli introduces a burst of freshness, and the cheese adds a layer of creamy, rich flavor.</p><p>Sauté broccoli, whisk eggs with cheese, pour the mixture over the broccoli in a skillet, and bake in the oven until the eggs are set and slightly golden.</p>",
    recipeUrl: "https://thewholecook.com/broccoli-cheddar-frittata/",
  },
  {
    mealName: "Butter-Braised Chicken with Cabbage",
    dairy: "butter",
    protein: "chicken",
    vegetables: "cabbage",
    description:
      "<p>Chicken pieces are braised in butter until golden and succulent, then combined with tender, sweet cabbage. The butter adds a luxurious richness to the dish, complementing the natural flavors of the chicken and cabbage.</p><p>Braise chicken pieces in butter until golden, add shredded cabbage to the pan, cook until the cabbage is tender and the chicken is fully cooked.</p>",
    recipeUrl:
      "https://www.seriouseats.com/braised-chicken-thighs-cabbage-bacon-recipe",
  },
  {
    mealName: "Beef Lettuce Wraps with Milk Dressing",
    dairy: "milk",
    protein: "beef",
    vegetables: "lettuce",
    description:
      "<p>Spiced ground beef is served in crisp lettuce leaves and drizzled with a creamy milk-based dressing. The lettuce wraps offer a light, crunchy contrast to the warm, flavorful beef, and the milk dressing adds a smooth, cooling element.</p><p>Cook and season ground beef, prepare a creamy dressing with milk, and serve the beef in lettuce leaves, topped with the milk dressing.</p>",
    recipeUrl: "https://deliciouslittlebites.com/sesame-turkey-lettuce-wraps/",
  },
  {
    mealName: "Cheesy Onion Baked Fish",
    dairy: "cheese",
    protein: "fish",
    vegetables: "onion",
    description:
      "<p>Fish fillets are baked with a topping of caramelized onions and melted cheese. The fish is tender and flaky, the onions add a sweet depth of flavor, and the cheese creates a savory, golden crust.</p><p>Place fish fillets in a baking dish, top with caramelized onions and grated cheese, and bake until the fish is cooked through and the cheese is melted and golden.</p>",
    recipeUrl: "https://www.allrecipes.com/recipe/255951/cheesy-baked-fish/",
  },
  {
    mealName: "Pork Medallions with Buttered Broccoli",
    dairy: "butter",
    protein: "pork",
    vegetables: "broccoli",
    description:
      "<p>Tender pork medallions are served alongside broccoli florets sautéed in butter. The pork is rich and savory, and the butter enhances the broccoli's natural flavors, making for a simple yet elegant meal.</p><p>Cook pork medallions in a pan until done, sauté broccoli florets in butter until tender, and serve together.</p>",
    recipeUrl:
      "https://www.eazypeazymealz.com/pork-medallions-with-broccoli-one-pan-meal/",
  },
  {
    mealName: "Cheesy Chicken Lettuce Cups",
    dairy: "cheese",
    protein: "chicken",
    vegetables: "lettuce",
    description:
      "<p>Juicy chicken pieces mixed with melted cheese, served in crisp lettuce leaves for a light and flavorful meal.</p><p>Cook chicken pieces, mix with melted cheese, and spoon into lettuce leaves for a light and tasty meal.</p>",
    recipeUrl:
      "https://www.eatingwell.com/recipe/8029678/low-carb-chicken-and-cheddar-lettuce-wraps/",
  },
  {
    mealName: "Buttered Beef and Broccoli Stir-Fry",
    dairy: "butter",
    protein: "beef",
    vegetables: "broccoli",
    description:
      "<p>Savory beef strips stir-fried with fresh broccoli in a rich butter sauce, combining for a quick and tasty dish.</p><p>Sauté beef strips and broccoli in butter, season to taste, and serve as a quick stir-fry.</p>",
    recipeUrl: "https://playswellwithbutter.com/beef-and-broccoli-stir-fry/",
  },
  {
    mealName: "Cheesy Pork-Stuffed Cabbage Rolls",
    dairy: "cheese",
    protein: "pork",
    vegetables: "cabbage",
    description:
      "<p>Tender cabbage leaves filled with seasoned ground pork and cheese, baked to perfection.</p><p>Wrap seasoned ground pork and cheese in cabbage leaves, bake until the cabbage is tender and the filling is cooked.</p>",
    recipeUrl: "https://www.savorywithsoul.com/easy-stuffed-cabbage-rolls/",
  },
  {
    mealName: "Creamy Onion and Egg Scramble",
    dairy: "milk",
    protein: "eggs",
    vegetables: "onion",
    description:
      "<p>Soft scrambled eggs cooked with caramelized onions and a touch of creamy milk for a comforting breakfast.</p><p>Caramelize onions, then add beaten eggs and a splash of milk, cooking until the eggs are softly scrambled.</p>",
    recipeUrl: "https://www.recipegirl.com/creamy-scrambled-eggs/",
  },
  {
    mealName: "Creamy Broccoli Fish Bake",
    dairy: "milk",
    protein: "fish",
    vegetables: "broccoli",
    description:
      "<p>Flaky fish fillets baked with broccoli in a creamy milk sauce, creating a deliciously comforting casserole.</p><p>Lay fish fillets and broccoli in a baking dish, pour over a creamy milk sauce, and bake until the fish is flaky.</p>",
    recipeUrl: "https://www.food.com/recipe/broccoli-fish-bake-60914",
  },
  {
    mealName: "Creamy Onion Chicken Skillet",
    dairy: "milk",
    protein: "chicken",
    vegetables: "onion",
    description:
      "<p>Chicken breasts cooked in a skillet with a rich, creamy onion sauce, offering a simple yet flavorful meal.</p><p>Cook chicken breasts in a skillet, add a creamy onion sauce, and simmer until the chicken is tender.</p>",
    recipeUrl: "https://www.saltandlavender.com/sour-cream-and-onion-chicken/",
  },
  {
    mealName: "Broccoli Beef Cheese Melt",
    dairy: "cheese",
    protein: "beef",
    vegetables: "broccoli",
    description:
      "<p>Tender beef and broccoli topped with melted cheese, a satisfying and hearty combination.</p><p>Cook beef and broccoli, top with cheese until melted, and serve as a hearty and satisfying dish.</p>",
    recipeUrl: "https://wonkywonderful.com/ground-beef-and-broccoli-recipe/",
  },
  {
    mealName: "Buttered Pork Lettuce Wraps",
    dairy: "butter",
    protein: "pork",
    vegetables: "lettuce",
    description:
      "<p>Thinly sliced pork cooked in butter and wrapped in lettuce for a light, flavorful meal.</p><p>Cook thin pork slices in butter, wrap in lettuce leaves, and season for a flavorful, light meal.</p>",
    recipeUrl: "https://www.lecremedelacrumb.com/pork-lettuce-wraps/",
  },
  {
    mealName: "Buttered Cabbage Omelette",
    dairy: "butter",
    protein: "eggs",
    vegetables: "cabbage",
    description:
      "<p>A fluffy omelette filled with butter-sautéed cabbage, offering a unique twist on a breakfast classic.</p><p>Sauté cabbage in butter, pour in beaten eggs, and cook into a fluffy omelette.</p>",
    recipeUrl: "https://www.cookist.com/cabbage-omelette/",
  },
  {
    mealName: "Lettuce-Wrapped Fish Tacos with Cheese",
    dairy: "cheese",
    protein: "fish",
    vegetables: "lettuce",
    description:
      "<p>Grilled fish and cheese served in lettuce wraps for a healthy and tasty taco alternative.</p><p>Grill fish, place in lettuce leaves with cheese, and serve as a healthy taco variant.</p>",
    recipeUrl: "https://www.food.com/recipe/lettuce-wrap-fish-tacos-522517",
  },
  {
    mealName: "Chicken Broccoli Cheese Quiche",
    dairy: "cheese",
    protein: "chicken",
    vegetables: "broccoli",
    description:
      "<p>A savory quiche filled with chicken, broccoli, and cheese, perfect for brunch or a light dinner.</p><p>Combine chicken, broccoli, and cheese in a quiche mixture, bake until set and golden.</p>",
    recipeUrl: "https://fixedonfresh.com/broccoli-cheddar-and-chicken-quiche/",
  },
  {
    mealName: "Creamy Onion Beef Stroganoff",
    dairy: "milk",
    protein: "beef",
    vegetables: "onion",
    description:
      "<p>Beef strips cooked in a creamy onion sauce, served over pasta or rice for a classic comfort dish.</p><p>Sauté beef strips, add onions and a creamy sauce, and serve over your choice of pasta or rice.</p>",
    recipeUrl:
      "https://www.pillsbury.com/recipes/one-pot-creamy-beef-stroganoff/a6e2cc44-5326-45d5-9132-fb8f9894370a",
  },
  {
    mealName: "Milk-Braised Pork with Broccoli",
    dairy: "milk",
    protein: "pork",
    vegetables: "broccoli",
    description:
      "<p>Pork pieces braised in milk until tender, served with steamed broccoli for a wholesome meal.</p><p>Brown pork pieces, add milk and simmer until tender, serve with steamed broccoli.</p>",
    recipeUrl: "https://themom100.com/recipe/milk-braised-pork/",
  },
  {
    mealName: "Cheesy Onion Egg Muffins",
    dairy: "cheese",
    protein: "eggs",
    vegetables: "onion",
    description:
      "<p>Baked egg muffins with onions and cheese, ideal for a grab-and-go breakfast or snack.</p><p>Mix eggs, onions, and cheese, pour into muffin tins, and bake until set.</p>",
    recipeUrl:
      "https://www.allrecipes.com/recipe/222586/scrambled-egg-muffins/",
  },
  {
    mealName: "Buttered Cabbage with Herbed Fish",
    dairy: "butter",
    protein: "fish",
    vegetables: "cabbage",
    description:
      "<p>Lightly seasoned fish served with buttered cabbage, a simple yet elegant dish.</p><p>Season fish with herbs, cook with buttered cabbage until fish is tender and cabbage is slightly wilted.</p>",
    recipeUrl:
      "https://ooni.com/blogs/recipes/schlemmerfilet-herb-crusted-cod-with-creamed-savoy-cabbage",
  },
  {
    mealName: "Beef and Broccoli Spaghetti Casserole",
    dairy: "cheese",
    protein: "beef",
    vegetables: "broccoli",
    carbs: "spaghetti",
    description:
      "<p>A hearty casserole combining tender beef and broccoli with cooked spaghetti, all baked in a savory cheese sauce. The cheese melts into a delicious layer on top, creating a comforting and satisfying dish.</p><p>Cook spaghetti, sauté beef and broccoli, mix with cooked pasta and a cheese sauce, and bake until bubbly.</p>",
    recipeUrl:
      "https://therecipecritic.com/20-minute-garlic-beef-and-broccoli-lo-mein/",
  },
  {
    mealName: "Buttered Cabbage and Fish over Rice",
    dairy: "butter",
    protein: "fish",
    vegetables: "cabbage",
    carbs: "rice",
    description:
      "<p>Flaky fish and buttery, tender cabbage served over a bed of steamed rice. The butter enhances the flavors of the cabbage and fish, creating a simple yet elegant meal.</p><p>Sauté cabbage in butter, cook fish fillets separately, serve both over cooked rice.</p>",
    recipeUrl:
      "https://www.myburntorange.com/buttery-sauteed-cabbage-with-garlic-and-onions/",
  },
  {
    mealName: "Creamy Onion Chicken with Mashed Potatoes",
    dairy: "milk",
    protein: "chicken",
    vegetables: "onion",
    carbs: "potatoes",
    description:
      "<p>Chicken breasts cooked in a creamy onion sauce, served with a side of smooth, buttery mashed potatoes. The milk-based sauce provides a rich, comforting complement to the chicken.</p><p>Cook chicken in a creamy onion sauce, make mashed potatoes, and serve chicken over or alongside the potatoes.</p>",
    recipeUrl: "https://getonmyplate.com/creamy-chicken-with-mashed-potatoes/",
  },
  {
    mealName: "Pork and Rice Stuffed Lettuce Wraps",
    dairy: "cheese",
    protein: "pork",
    vegetables: "lettuce",
    carbs: "rice",
    description:
      "<p>Minced pork and rice seasoned and cooked with cheese, then wrapped in crisp lettuce leaves. The wraps are light and fresh, with the cheese adding a savory depth.</p><p>Cook pork with rice and cheese, cool, wrap in lettuce leaves, and serve.</p>",
    recipeUrl: "https://whatmollymade.com/pork-lettuce-wraps/",
  },
  {
    mealName: "Broccoli and Egg Spaghetti",
    dairy: "butter",
    protein: "eggs",
    vegetables: "broccoli",
    carbs: "spaghetti",
    description:
      "<p>A unique pasta dish featuring spaghetti mixed with scrambled eggs and sautéed broccoli, all bound together with a touch of butter for richness.</p><p>Cook spaghetti, scramble eggs with sautéed broccoli, toss together with butter.</p>",
    recipeUrl: "https://www.howsweeteats.com/2020/01/broccoli-lemon-carbonara/",
  },
  {
    mealName: "Fish Chowder with Cabbage and Potatoes",
    dairy: "milk",
    protein: "fish",
    vegetables: "cabbage",
    carbs: "potatoes",
    description:
      "<p>A hearty chowder combining fish, cabbage, and potatoes in a creamy milk-based broth. The ingredients meld together for a comforting, flavorful soup.</p><p>Simmer potatoes and cabbage in milk, add fish, and cook until tender.</p>",
    recipeUrl:
      "https://recipes.oregonlive.com/recipes/hearty-potato-cabbage-and-smoked-fish-soup",
  },
  {
    mealName: "Cheesy Beef and Onion Rice",
    dairy: "cheese",
    protein: "beef",
    vegetables: "onion",
    carbs: "rice",
    description:
      "<p>A rich and savory dish of seasoned ground beef and caramelized onions mixed with cooked rice, topped with melted cheese for a hearty and satisfying meal.</p><p>Cook beef with onions, mix with cooked rice, top with cheese, and heat until cheese melts.</p>",
    recipeUrl:
      "https://www.onehappyhousewife.com/instant-pot-cheesy-ground-beef-and-rice/",
  },
  {
    mealName: "Buttered Chicken Spaghetti Salad",
    dairy: "butter",
    protein: "chicken",
    vegetables: "lettuce",
    carbs: "spaghetti",
    description:
      "<p>A light and refreshing salad with butter-sautéed chicken and spaghetti, served over a bed of crisp lettuce. The butter adds a subtle richness to the dish.</p><p>Cook chicken in butter, toss with cooked spaghetti and lettuce, and serve as a salad.</p>",
    recipeUrl: "https://skinnyspatula.com/butter-chicken-pasta/",
  },
  {
    mealName: "Creamy Pork, Broccoli, and Potato Bake",
    dairy: "milk",
    protein: "pork",
    vegetables: "broccoli",
    carbs: "potatoes",
    description:
      "<p>A baked dish featuring layers of sliced potatoes, broccoli, and pork in a creamy milk sauce, baked until golden and bubbly.</p><p>Layer sliced potatoes, cooked pork, and broccoli in a dish, pour over a milk-based sauce, and bake.</p>",
    recipeUrl:
      "https://www.allrecipes.com/recipe/18803/pork-chop-and-potato-casserole/",
  },
  {
    mealName: "Cabbage and Egg Fried Rice with Cheese",
    dairy: "cheese",
    protein: "eggs",
    vegetables: "cabbage",
    carbs: "rice",
    description:
      "<p>A fulfilling fried rice dish with sautéed cabbage and scrambled eggs, topped with melted cheese for a comforting and cheesy twist.</p><p>Sauté cabbage, add cooked rice and scrambled eggs, top with cheese, and heat until cheese melts.</p>",
    recipeUrl: "https://www.slenderkitchen.com/recipe/cabbage-fried-rice",
  },
  {
    mealName: "Chicken Rice Casserole with Cheese and Onion",
    dairy: "cheese",
    protein: "chicken",
    vegetables: "onion",
    carbs: "rice",
    description:
      "<p>A baked casserole with layers of cooked chicken, rice, caramelized onions, and cheese, creating a rich and flavorful all-in-one meal.</p><p>Layer cooked chicken, rice, caramelized onions, and cheese in a casserole dish, bake until heated through.</p>",
    recipeUrl:
      "https://www.plainchicken.com/french-onion-chicken-and-rice-bake/",
  },
  {
    mealName: "Roasted Potatoes with Beef and Broccoli in Butter Sauce",
    dairy: "butter",
    protein: "beef",
    vegetables: "broccoli",
    carbs: "potatoes",
    description:
      "<p>Roasted potatoes and sautéed beef and broccoli, all drizzled with a luxurious butter sauce, combining for a hearty and satisfying dish.</p><p>Roast potatoes, cook beef and broccoli, make a butter sauce, combine all.</p>",
    recipeUrl:
      "https://www.deepfriedhoney.com/steak-and-broccoli-potato-skillet/",
  },
  {
    mealName: "Creamy Cabbage and Pork Spaghetti",
    dairy: "milk",
    protein: "pork",
    vegetables: "cabbage",
    carbs: "spaghetti",
    description:
      "<p>Tender pork and cabbage in a creamy sauce served over spaghetti, offering a comforting and rich pasta dish with a twist.</p><p>Cook spaghetti, sauté pork and cabbage, mix with a creamy sauce, and combine with pasta.</p>",
    recipeUrl:
      "https://www.slimmingeats.com/blog/creamy-garlic-pork-with-cabbage",
  },
  {
    mealName: "Cheesy Egg Fried Rice with Lettuce",
    dairy: "cheese",
    protein: "eggs",
    vegetables: "lettuce",
    carbs: "rice",
    description:
      "<p>A delightful fried rice dish with scrambled eggs and cheese, served with a side of fresh lettuce for a light and balanced meal.</p><p>Make fried rice with scrambled eggs, serve with cheese melted on top and a side of fresh lettuce.</p>",
    recipeUrl:
      "https://cooking.nytimes.com/recipes/1023802-bacon-egg-and-cheese-fried-rice",
  },
  {
    mealName: "Creamy Beef Potato Soup with Lettuce Ribbons",
    dairy: "milk",
    protein: "beef",
    vegetables: "lettuce",
    carbs: "potatoes",
    description:
      "<p>A rich and hearty soup featuring tender beef and soft potatoes in a creamy broth, garnished with delicate lettuce ribbons for a touch of freshness.</p><p>Cook diced beef and potatoes in a broth until tender, then stir in milk to achieve a creamy texture. Serve the soup hot, garnished with thinly sliced lettuce for freshness.</p>",
    recipeUrl: "https://deliciouslittlebites.com/creamy-steak-potato-soup/",
  },
  {
    mealName: "Cheesy Pork Spaghetti with Braised Cabbage",
    dairy: "cheese",
    protein: "pork",
    vegetables: "cabbage",
    carbs: "spaghetti",
    description:
      "<p>A comforting pasta dish that combines savory pork with braised cabbage, all intertwined with spaghetti and topped with melted cheese for a satisfying meal.</p><p>Boil spaghetti and set it aside. In a pan, sauté ground pork with chopped cabbage until fully cooked. Combine the cooked spaghetti with the pork and cabbage, top with cheese, and bake until the cheese is melted and bubbly.</p>",
    recipeUrl:
      "https://www.thespruceeats.com/pork-and-spaghetti-casserole-3052081",
  },
  {
    mealName: "Buttered Onion Rice with Grilled Fish",
    dairy: "butter",
    protein: "fish",
    vegetables: "onion",
    carbs: "rice",
    description:
      "<p>A delightful pairing of grilled fish served over a bed of buttery, onion-flavored rice, offering a simple yet flavorful seafood experience.</p><p>Grill seasoned fish fillets until fully cooked. Meanwhile, cook rice with butter and diced onions until the rice is fluffy. Serve the grilled fish over the buttered onion rice.</p>",
    recipeUrl: "https://www.indianhealthyrecipes.com/fish-rice-recipe/",
  },
  {
    mealName: "Chicken and Broccoli Alfredo Spaghetti",
    dairy: "milk",
    protein: "chicken",
    vegetables: "onion",
    carbs: "spaghetti",
    description:
      "<p>A creamy and indulgent pasta dish where tender chicken pieces and broccoli florets are tossed in a rich Alfredo sauce with spaghetti, perfect for a comforting dinner.</p><p>Cook spaghetti and set aside. Sauté chicken pieces in a pan, add steamed broccoli, and then mix in Alfredo sauce. Combine this mixture with the cooked spaghetti and serve.</p>",
    recipeUrl:
      "https://www.tasteslovely.com/broccoli-chicken-fettuccine-alfredo/",
  },
  {
    mealName: "Grilled Fish with Cheese-Topped Lettuce and Potato Salad",
    dairy: "cheese",
    protein: "fish",
    vegetables: "lettuce",
    carbs: "potatoes",
    description:
      "<p>A light and healthy dish featuring grilled fish served alongside a fresh lettuce and potato salad, topped with a sprinkle of cheese for added flavor.</p><p>Grill seasoned fish fillets to your liking. Make a salad by tossing boiled potatoes and lettuce with a vinaigrette dressing. Top the salad with the grilled fish and sprinkle with shredded cheese.</p>",
    recipeUrl:
      "https://www.bbcgoodfood.com/recipes/grilled-fish-new-potato-red-pepper-olive-salad",
  },
  {
    mealName: "Savory Cabbage and Egg Fried Rice",
    dairy: "butter",
    protein: "eggs",
    vegetables: "cabbage",
    carbs: "rice",
    description:
      "<p>A tasty and easy-to-make dish combining stir-fried rice with cabbage and scrambled eggs, seasoned for a savory and satisfying meal.</p><p>Stir-fry cooked rice with chopped cabbage and scrambled eggs, seasoning with soy sauce and your choice of spices. Serve this dish hot for a quick and satisfying meal.</p>",
    recipeUrl: "https://feedmephoebe.com/cabbage-fried-rice/",
  },
  {
    mealName: "Creamy Beef and Onion Risotto",
    dairy: "milk",
    protein: "beef",
    vegetables: "onion",
    carbs: "rice",
    description:
      "<p>A rich and creamy risotto infused with the flavors of beef and onion, creating a luxurious and comforting dish that's perfect for a cozy night in.</p><p>Start by sautéing diced onions and ground beef in a pan. Gradually add rice and broth to the mixture, stirring constantly. Once the rice is nearly cooked, stir in milk to create a creamy consistency.</p>",
    recipeUrl:
      "https://orwhateveryoudo.com/2020/07/easy-french-onion-risotto.html",
  },
  {
    mealName: "Pork and Broccoli Potato Gratin with Cheese",
    dairy: "cheese",
    protein: "pork",
    vegetables: "broccoli",
    carbs: "potatoes",
    description:
      "<p>A deliciously baked gratin featuring layers of sliced potatoes, pork, and broccoli, all smothered in a creamy cheese sauce for a decadent treat.</p><p>In a baking dish, create layers of sliced potatoes, cooked pork, and broccoli. Cover everything with a cheese sauce and bake in the oven until the top is golden and the sauce is bubbly.</p>",
    recipeUrl:
      "https://eatsmarter.com/recipes/potato-broccoli-and-smoked-pork-casserole",
  },
  {
    mealName: "Beef in Butter Sauce with Lettuce Spaghetti Toss",
    dairy: "butter",
    protein: "beef",
    vegetables: "lettuce",
    carbs: "spaghetti",
    description:
      "<p>Tender beef cooked in a flavorful butter sauce, served over a bed of lightly tossed spaghetti with fresh lettuce, combining richness with a hint of crispness.</p><p>Cook beef strips in a butter sauce, seasoning as desired. Separately, toss cooked spaghetti with chopped lettuce. Serve the beef over the spaghetti and lettuce mixture.</p>",
    recipeUrl: "https://iowagirleats.com/pasta-with-garlic-butter-caper-sauce/",
  },
  {
    mealName: "Chicken and Cabbage Stew with Creamy Potato Topping",
    dairy: "milk",
    protein: "chicken",
    vegetables: "cabbage",
    carbs: "potatoes",
    description:
      "<p>A homely stew made with chicken and cabbage, topped with a creamy mashed potato crust, perfect for a warming and filling meal.</p><p>Prepare a stew with chicken and cabbage. Once the stew is ready, top it with a layer of mashed potatoes and bake the dish until the potato topping is crispy and golden.</p>",
    recipeUrl: "https://thecozycook.com/creamy-chicken-soup/",
  },
  {
    mealName: "Baked Fish with Cheese and Onion Rice Pilaf",
    dairy: "cheese",
    protein: "fish",
    vegetables: "onion",
    carbs: "rice",
    description:
      "<p>Oven-baked fish served with a side of cheesy onion rice pilaf, creating a delightful balance of delicate fish flavor and rich, aromatic rice.</p><p>Oven-bake seasoned fish fillets until they are cooked through. In a separate pot, prepare a rice pilaf with onions, and stir in cheese until melted. Serve the baked fish over this cheesy onion rice.</p>",
    recipeUrl: "https://tiffycooks.com/creamy-seafood-baked-rice/",
  },
  {
    mealName: "Pork and Broccoli Rice Sautéed in Butter",
    vegetables: "broccoli",
    carbs: "rice",
    protein: "pork",
    dairy: "butter",
    description:
      "<p>A simple yet tasty dish featuring pork and broccoli sautéed in butter, served over a bed of fluffy rice, offering a quick and satisfying meal option.</p><p>In a skillet, sauté pork and broccoli in butter until both are cooked through. Serve this mixture over cooked rice for a simple, yet flavorful meal.</p>",
    recipeUrl: "https://www.wellplated.com/pork-fried-rice/",
  },
];

function getRecipes(ingredients) {
  let matchedRecipes = [];
  let recommendedRecipes = [];

  data.forEach((recipe) => {
    let matchScore = 0;

    if (recipe.dairy === ingredients.dairy) {
      matchScore += 1;
    }
    if (recipe.vegetables === ingredients.vegetables) {
      matchScore += 1;
    }
    if (recipe.protein === ingredients.protein) {
      matchScore += 1;
    }
    if (recipe.carbs === ingredients.carbs) {
      matchScore += 1;
    }

    // If it's a perfect match, add to matchedRecipes
    if (matchScore >= 3) {
      matchedRecipes.push(recipe);
    } else {
      // Add a property to store the match score
      recipe.matchScore = matchScore;
      recommendedRecipes.push(recipe);
    }
  });

  // Sort recommendedRecipes based on matchScore in descending order
  recommendedRecipes.sort((a, b) => b.matchScore - a.matchScore);

  // Display results
  if (matchedRecipes.length > 0) {
    displayRecipes(matchedRecipes);
  } else if (recommendedRecipes.length > 0) {
    // Display top recommended recipes
    displayRecipes(recommendedRecipes.slice(0, 3));
  } else {
    _resultOutput.innerHTML = "No matching or similar recipes found.";
  }
}
// The popup content
const popupContainer = document.getElementById("resultOutput-container");
function displayRecipes(recipes) {
  popupContainer.style.display = "block";
  document.getElementById("main").style.filter = "blur(5px)";
  _resultOutput.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.setAttribute("id", "recipe");
    recipeElement.classList.add("swiper-slide");
    recipeElement.innerHTML = `
    <h2>${recipe.mealName}</h2>
    ${recipe.description}<p>
    <div class="button-container"><a href="${recipe.recipeUrl}" target="_blank">Get inspired by this recipe</a></div>`;
    _resultOutput.appendChild(recipeElement);
  });
}

function displayRecipesInPopup(recipes) {
  recipes.forEach((recipe) => {
    openRecipePopup(recipe);
  });
}

const closeBtn = document.getElementById("close-btn")
if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    popupContainer.style.display = "none";
    document.getElementById("main").style.filter = "blur(0px)";
  });
}


// Event listener
const showBtn = document.getElementById("showBtn")
if (showBtn) {
  showBtn.addEventListener("click", () => {
    const userChoices = getUserChoices();
    getRecipes(userChoices);

    // swiper slider
    var swiper = new Swiper(".mySwiper", {
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });
}

// navbar
/*
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  toggleButton.addEventListener("click", function () {
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  });
});
*/