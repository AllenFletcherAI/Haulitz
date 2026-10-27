# Data Structures & Schemas

> Explain how your information is kept and why that shape fits (Habit 20).
> The AI picked a data structure. You need to know why it was a smart pick.

## Core Data Models
### Model: PrimaryRecord
- **What It Contains:** Unique ID, Creation Date, Company ID, Status (Draft, Active, Archived).
- **How Often It Is Read vs. Written:** Read 90% of the time, written only 10% of the time.
- **How Big It Gets:** Expected to grow from 50,000 to 1,000,000 rows in the first year.
- **The Trade-Off We Made:** We added an index on Company ID and Status. This makes lookups take less than 1 millisecond, at the small cost of 15% slower initial creation.
- **Who Is Allowed To Touch It:** Written strictly by our internal service; read only by authorized team members.
