# Data Path & Request Traces

> Trace the exact steps data takes through your files (Habit 04).
> Bugs hide in the gaps between files. If you can see the path, you can find the leak.

## Standard Customer Request Trail
1. **The Click:** Customer clicks submit on their screen.
2. **The Guard:** Security middleware verifies the user's login token and checks that inputs are valid.
3. **The Calculation:** Service logic processes the business operation (e.g., checks container weight tolerance).
4. **The Safe:** Repository code saves the clean record into the database.
5. **The Reply:** System sends back a clean confirmation message and HTTP 200/201 status code.

## Active Path Under Modification
- **What We Are Changing:** Document the active feature or bug path here.
- **Files Being Touched:** Name the exact files and functions being modified right now.
