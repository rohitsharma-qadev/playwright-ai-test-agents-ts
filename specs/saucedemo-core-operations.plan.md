# SauceDemo Core User Operations Test Plan

## Application Overview

Functional coverage for the SauceDemo e-commerce demo at https://www.saucedemo.com. Each test starts from a fresh browser context and assumes the application is available, with standard_user / secret_sauce used for authenticated flows. The five suites represent the core operations a typical end user performs: sign in, browse and select products, manage the cart, complete checkout, and end the session.

## Test Scenarios

### 1. Core E-commerce User Operations

**Seed:** `tests/seed.spec.ts`

#### 1.1. Sign in with valid and invalid credentials

**File:** `tests/saucedemo-core/sign-in.spec.ts`

**Steps:**
  1. Open https://www.saucedemo.com in a fresh browser context.
    - expect: The Swag Labs login page is displayed with Username, Password, and Login controls.
  2. Submit the login form with both fields empty.
    - expect: The login is rejected.
    - expect: A required-field error is displayed and the user remains on the login page.
  3. Enter username `locked_out_user` and password `secret_sauce`, then select Login.
    - expect: The login is rejected.
    - expect: An account-locked error is displayed and the user does not reach the inventory page.
  4. Enter username `standard_user` and password `secret_sauce`, then select Login.
    - expect: The user is redirected to `/inventory.html`.
    - expect: The Products heading, product list, sort control, and cart control are visible.

#### 1.2. Browse, sort, and inspect a product

**File:** `tests/saucedemo-core/browse-products.spec.ts`

**Steps:**
  1. Sign in as `standard_user` with password `secret_sauce`.
    - expect: The inventory page displays six products with names, descriptions, prices, and Add to cart controls.
  2. Change the sort selection to `Price (low to high)`.
    - expect: Products are ordered from the lowest price to the highest price: Onesie, Bike Light, Bolt T-Shirt/Test.allTheThings() T-Shirt, Backpack, then Fleece Jacket.
  3. Change the sort selection to `Name (Z to A)`.
    - expect: Products are displayed in reverse alphabetical order.
  4. Select the Sauce Labs Backpack product name or image.
    - expect: The product detail page opens.
    - expect: The backpack image, name, description, price, and Add to cart control are shown.
  5. Select Back to products.
    - expect: The user returns to the inventory page and the selected product list remains available.

#### 1.3. Add and manage items in the cart

**File:** `tests/saucedemo-core/manage-cart.spec.ts`

**Steps:**
  1. Sign in as `standard_user` with password `secret_sauce`, then open the inventory page.
    - expect: The cart is initially empty and no item count is shown.
  2. Select Add to cart for Sauce Labs Backpack and Sauce Labs Bike Light.
    - expect: The cart count becomes 2.
    - expect: Each selected product changes to a Remove control.
  3. Open the shopping cart.
    - expect: The cart page lists both selected products with quantity 1 and their correct names and prices.
    - expect: Continue Shopping and Checkout controls are available.
  4. Select Continue Shopping, then remove the Backpack from the inventory page.
    - expect: The backpack is removed from the cart.
    - expect: The cart count decreases to 1 and the Bike Light remains selected.
  5. Open the cart again and select Checkout.
    - expect: The cart contains only the Bike Light.
    - expect: The checkout information page opens with First Name, Last Name, and Zip/Postal Code fields.

#### 1.4. Complete checkout and verify the order

**File:** `tests/saucedemo-core/complete-checkout.spec.ts`

**Steps:**
  1. Sign in as `standard_user`, add Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: The checkout information form is displayed.
  2. Select Continue without entering any customer information.
    - expect: The user remains on the information step.
    - expect: An error states that First Name is required.
  3. Enter `Ada` as First Name, `Lovelace` as Last Name, and `10101` as Zip/Postal Code, then select Continue.
    - expect: The checkout overview opens.
    - expect: The selected item, SauceCard payment information, free shipping information, item total, tax, and final total are displayed.
  4. Select Finish.
    - expect: The order is completed.
    - expect: The page displays Checkout: Complete!, Thank you for your order!, and the dispatched-order confirmation message.
    - expect: Back Home and Generate PDF order controls are available.
  5. Select Back Home.
    - expect: The user returns to the inventory page.
    - expect: The completed order's cart state is cleared.

#### 1.5. Log out and verify session termination

**File:** `tests/saucedemo-core/logout.spec.ts`

**Steps:**
  1. Sign in as `standard_user` with password `secret_sauce`.
    - expect: The authenticated inventory page is displayed.
  2. Open the navigation menu and select Logout.
    - expect: The user is redirected to the Swag Labs login page.
    - expect: Username and Password fields and the Login button are visible.
  3. Navigate directly to `https://www.saucedemo.com/inventory.html` without signing in again.
    - expect: The authenticated inventory page is not accessible.
    - expect: The user is returned to the login page or shown an unauthenticated-access response.
