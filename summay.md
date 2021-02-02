# Approch to complete the task.

project structure
src
├── App.tsx
├── components
│   ├── educationDetails
│   │   ├── educationList.tsx
│   │   ├── modalForm.tsx
│   │   └── sidebar.tsx
│   └── home
│       └── welcomeForm.tsx
├── index.css
├── index.tsx
├── react-app-env.d.ts
├── reportWebVitals.ts
├── routes
│   └── route.tsx
├── store
│   ├── counter
│   │   ├── CounterActions.ts
│   │   ├── CounterReducer.ts
│   │   └── models
│   │       ├── action.ts
│   │       └── Counter.ts
│   ├── educationDetails
│   │   ├── educationDetailsActions.ts
│   │   ├── educationDetailsReducer.ts
│   │   └── models
│   │       ├── action.ts
│   │       └── educationDetails.ts
│   ├── home
│   │   ├── homeActions.ts
│   │   ├── homeReducer.ts
│   │   └── models
│   │       ├── action.ts
│   │       └── home.ts
│   ├── models
│   │   └── actions.ts
│   └── rootStore.ts
└── view
    ├── educationDetails.tsx
    └── homePage.tsx
# Application Flow
    => home page => enter his name => dispatch action to store => change ui to education details page => add button => open modal => submit form => dispatch action to store => update store data 
    => change ui


the project is completed see below for deployment

➜ ✗ npm run build

The build folder is ready to be deployed.
You may serve it with a static server:

  ✗ npm i -g serve

  ✗ serve -s build

Find out more about deployment here:

  https://cra.link/deployment
    