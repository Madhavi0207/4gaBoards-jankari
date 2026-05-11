Feature: Delete Card
As a user
I want to delete the card
So that I can remove unwanted cards

Scenario: Delete Card
Given the admin user has logged in with the following credentials:
 | email | password |
 | demo  | demo     |
And the user is already in the card page
When the user deletes the card
Then the card must be removed from the list
