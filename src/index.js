import hh from "hyperscript-helpers";
import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

// allows using html tags as functions in javascript
const { div, button, p, h1, h2, input, table, tr, td} = hh(h);

// A combination of Tailwind classes which represent a (more or less nice) button style
const btnStyle = "inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline";

// Messages which can be used to update the model
const MSGS = {
  INPUT_MEAL: "INPUT_TEST",
  INPUT_CALORIE: "INPUT_CALORIE",
  SAVE_INPUT: "SAVE_INPUT",

  // ... ℹ️ additional messages
};

// View function which represents the UI as HTML-tag functions
function view(dispatch, model) {
  return div({ className: "flex flex-col gap-4 items-center" }, [
    h1({ className: "text-2xl" }, `My Title`),
    div({className: "flex gap-2"}, [
      div({className: "flex-col gap-2"}, [
        h2({ className: "text-1xl" }, `Meal`),
        input({ className: "shadow border-zinc-800", placeholder: "Enter meal name...", oninput: (event) => dispatch(generateMessage(MSGS.INPUT_MEAL, event.target.value)) }, ),
      ]),
      div({className: "flex-col gap-2"}, [
        h2({ className: "text-1xl" }, `calories`),
        input({ className: "shadow border-zinc-800", placeholder: "Enter calories number...", oninput: (event) => dispatch(generateMessage(MSGS.INPUT_CALORIE, event.target.value)) }, ),
      ]),
    ]),
    div({className: "flex gap-2"}, [
      button({ className: btnStyle, onclick: () => dispatch(MSGS.SAVE_INPUT)}, "Save"),
      button({ className: btnStyle, onclick: () => dispatch(MSGS.ADD_UPDATE_NUMBER) }, "Cancel"),
    ]),
    div({className: "min-w-full divide-y"}, [
    table({ className: "border-collapse: 1; " }, [
      tr([
        td({className: "w-1/3 h-12"}, "Meal"),
        td({className: "w-1/3 h-12"}, "Calories"),
        td({className: "w-1/3 h-12"}, "Delete"),
      ]),
      tr([
        td({className: "w-1/3 h-12"}, `${model.newEntries}`),
        td({className: "w-1/3 h-12"}, `${model.entries}`),
        td(button({ className: "", onclick: () => dispatch(MSGS.ADD_UPDATE_NUMBER) }, "🧨")),
      ]),

      
    ]),
  ]),
]);
}



const generateMessage = (msg, data) => {
  return {
    type: msg,
    data,
  };
};



// Update function which takes a message and a model and returns a new/updated model
function update(msg, model) {
  switch (msg.type) {
    case MSGS.INPUT_MEAL:
      return { ...model, nameMeal: msg.data,  };
    case MSGS.INPUT_CALORIE:
      const calorrieSave = parseInt(msg.data);
      if (!isNaN(calorrieSave)) {
        return { ...model, calorieNumber: calorrieSave };
      } 
      else {
        return { ...model, calorieNumber: 0 };
      }
    case MSGS.SAVE_INPUT:
      //let newEntery= {titel: nameMeal, calories: calorieNumber};
      //const newEntries = [...entries,{titel: nameMeal, calories: calorieNumber} ];
      return newEntries = [...entries,{titel: nameMeal, calories: calorieNumber} ];
    console.log(ne)
    }
}

// ⚠️ Impure code below (not avoidable but controllable)
function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

// The initial model when the app starts
const initModel = {
  calorieNumber: 0,
  nameMeal: "",
  entries: [],
};

// The root node of the app (the div with id="app" in index.html)
const rootNode = document.getElementById("app");

// Start the app
app(initModel, update, view, rootNode);
