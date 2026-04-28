Feature: Add List Successfully
As an admin
I want to add List
So I can easily add card to it

Background:
Given the admin user has logged in to the dashboard
  | email | password |
  | demo  | demo     |
And the user has navigated to the board page

Scenario: Add List Successfully
When the user clicks on Add Board button and enters following credentials
 |name    |
 |Madhavi |

Then then the list should appear in the board page
