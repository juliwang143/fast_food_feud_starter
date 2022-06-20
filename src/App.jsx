import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import { createDataSet } from "./data/dataset"
import "./App.css"
import Header from "../src/components/Header/Header"; 
import Instructions from "../src/components/Instructions/Instructions";
import Chip from "../src/components/Chip/Chip";
import NutritionalLabel from "../src/components/NutritionalLabel/NutritionalLabel";

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

export function App() {
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedRestaurant, setSelectedRestaurant] = React.useState('');
  var currentMenuItems = data.filter(function (element) {
    return element.food_category == selectedCategory && element.restaurant == selectedRestaurant;
  });
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('');

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
            {categories.map((category, index) => {
              return <Chip key={index} label={category} onClick={() => {
                setSelectedCategory(category)}} isActive={selectedCategory == category} />
            })}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header 
          title={appInfo.title}
          tagline={appInfo.tagline}
          description={appInfo.description}
        ></Header>

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
              {restaurants.map((restaurant, index) => {
                return <Chip key={index} label={restaurant} onClick={() => {
                  setSelectedRestaurant(restaurant);
                }} isActive={selectedRestaurant == restaurant} />
              })}
          </div>
        </div>

        {/* INSTRUCTIONS GO HERE */}
        <Instructions
          instructions={appInfo.instructions.start}
        ></Instructions>

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.map((menuItem, index) => {
                return <Chip key={index} label={menuItem.item_name} onClick={() => {
                  setSelectedMenuItem(menuItem); 
                  console.log('selected menu item: ' + JSON.stringify(selectedMenuItem));
                
                }} isActive={selectedMenuItem == menuItem}/>
            })}

          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            {selectedMenuItem !== null && <NutritionalLabel item_name={selectedMenuItem.item_name} item={selectedMenuItem}></NutritionalLabel>}
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
