Feature: Create user
    Scenario: Valid user details
        Given I provide valid details
        When I attempt to create a user
        Then I should get a successful response