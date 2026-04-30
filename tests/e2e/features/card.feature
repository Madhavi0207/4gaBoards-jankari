Feature: Edit Card Details
As an admin
I want to add details to card
So that I can manage the task efficiently

Scenario: Edit Card
   Given the admin user has logged in with the following credentials:
   | email | password |
   | demo  | demo     |
   And the user has navigated to the boards page
   When the user edits the card with following details:
   | description    | task     |
   | this is task 1 | task One |
   Then the card should be updated with the new details
