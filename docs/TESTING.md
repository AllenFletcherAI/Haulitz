# Test Checklist & Real Proof

> Exact commands to run and real screen output (Habit 08).
> An AI saying "it works" and code actually working are two different facts. Show the receipt.

## The Verification Commands
```bash
# 1. Check code formatting and syntax
npm run lint

# 2. Run automated tests (Unit, Integration, Security)
npm test

# 3. Security vulnerability probe (Strix)
# Run strix_probe_target on modified routes
```

## The Customer Journey Test (Done By Hand End-to-End)
1. Start the application locally.
2. Log in as a real user would.
3. Walk through the entire journey: create a record, view it, edit it, and verify the result.
4. Open the database directly to confirm the record was truly saved.
5. Check that confirmation messages and receipts appear cleanly on screen.
