Feature: Add Card Details Successfully
As an admin
I want to add details to card
So I can manage the task

Background:
Given the admin user is already loggedin with following credentials
  | email | password |
  | demo  | demo     |

Scenario: Edit Card Successfully
   Given the user is in the boards page
   When the user trys to add details to the card
   Then the user must be able to add details to the card
