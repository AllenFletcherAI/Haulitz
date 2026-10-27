# Emergency U-Turn (Rollback Plan)

> Confidence to make changes comes from knowing exactly how to undo them (Habit 09).
> Always know your last working commit before starting risky work.

## Safe Baseline Checkpoint
- **Last Known Working Commit SHA:** `HEAD~1` (Update with specific 40-character commit ID before launching)
- **Last Working Release Tag:** `v1.0.0`

## Step-by-Step Emergency U-Turn
1. **Undo the Git Commit:**
   ```bash
   git revert <commit-sha> --no-edit
   git push origin main
   ```
2. **Undo Database Migrations:**
   - Run the migration down-step command if database tables were altered.
   - Confirm table structure matches the previous working version.
3. **Turn Off Feature Flag:**
   - If the new feature is behind a toggle switch, flip it off in settings to instantly cut off traffic without re-deploying.
4. **Smoke-Test Customer Path:**
   - Run the manual test in docs/TESTING.md to confirm the system is healthy again.
