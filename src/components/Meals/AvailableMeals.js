import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';



const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://food-order-app-b08e7-default-rtdb.firebaseio.com/meals.json');
        const data = await response.json();
        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
          })
        }
        setMeals(loadedMeals);
      } catch (err) {
        console.log(err)
      }
    }
    fetchMeals();

  }, [])
  const mealsList = meals.map(meal =>
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price} />);
  return <section className={classes.meals}>
    <Card>

      <ul>
        {mealsList}
      </ul>
    </Card>
  </section>
}


export default AvailableMeals;