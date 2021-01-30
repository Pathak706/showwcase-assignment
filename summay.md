# Approch to complete the task.

project structure
    - src/
        - components
            - homeComponent
                - welcomeForm
            - educationDetailsComponent
                - sidebar
                - educationList
                - modalFrom
        - view
            - homePage
            - educationDetailsPage
        - routes
            / => homePage
            /education => educationDetailsPage
        - stores
            - rootStore.ts
            - models
                - actions.ts
            - homePage
                - models
                    - action.ts
                    - home.ts
                - homeActions.ts
                - homeReducer.ts
            - educationDetails
                - models
                    - action.ts
                    - educationDetails.ts
                - educationDetailsAction.ts
                - educationDetailsReducer.ts

# Application Flow
    => home page => enter his name => dispatch action to store => change ui to education details page => add button => open modal => submit form => dispatch action to store => update store data 
    => change ui


    