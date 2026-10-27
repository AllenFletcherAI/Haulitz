# Security Threat Model & Abuse Scenarios

> List who could try to abuse the system and how your locks stop them (Habit 18).
> An admitted gap is safe. A hidden gap is a future headline. Probe with Strix Security.

## The 5 Attackers
1. **The Stranger on the Internet:** An unauthenticated visitor trying to guess passwords or flood the server with spam requests.
2. **The Sneaky Logged-in User:** A registered customer who tries to change an ID number in the web address to peek at someone else's invoices.
3. **The Poisoned Package:** A bad third-party software library attempting to steal passwords or environment keys in the background.
4. **The Fake Partner Message:** A forged webhook message pretending to be a bank or shipping company without a valid digital signature.
5. **The Rogue Insider:** Someone trying to modify database rows directly or delete audit trails.

## Doors and Locks Table
| Door / Endpoint | Attacker | Worst Thing They Could Try | The Lock Stopping Them | Known Honest Gap | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Login Form | Stranger | Guessing passwords with a computer script | Rate limiter stops guesses after 5 attempts; strong hashing | Rate limiter runs on one machine; needs Redis for many servers | Active |
| Invoice View | Logged-in User | Changing invoice ID to view another company's bill | Database query strictly checks user's company ID | None; strict company isolation enforced | Active |
| Webhook Listener | Fake Partner | Sending fake "Payment Succeeded" notifications | Digital signature (HMAC-SHA256) checked with secret key | Key must be kept safe in environment vault | Active |
