import React from 'react'
import style from './BuildControls.module.css';
import BuildControl from './BuildControl';

const controls = [
   { label: 'Salad', type: 'salad' },
   { label: 'Bacon', type: 'bacon' },
   { label: 'Cheese', type: 'cheese' },
   { label: 'Meat', type: 'meat' }
];

const BuildControls = (props) => (
   <div className={style.BuildControls}>
      <p>Current Price: <strong></strong></p>
      {controls.map(ctrl => (
         <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            removed={() => props.ingredientRemoved(ctrl.type)}
            added={() => props.ingredientAdded(ctrl.type)}
            disabled={props.disabled[ctrl.type]}


         />
      ))}

      <button
         className={style.OrderButton}
      >ORDER NOW</button>

   </div>

)

export default BuildControls