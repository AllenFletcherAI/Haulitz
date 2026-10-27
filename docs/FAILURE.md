# Failure Modes & Outage Map

> Ask what happens if each part breaks: what if it is slow, down, sends garbage, or sends an empty box? (Habit 19).
> Where does this break is the question that separates true engineers from casual deployers.

## The 4 Breakdown States
| Part | When It Is Slow (>2s) | When It Stops Completely | When It Sends Garbage | When It Sends An Empty Box | How We Find Out (Alarms) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Primary Database | Stops waiting after 3 seconds so screen does not freeze | Shows friendly message: "Service busy, please retry" | Rejects corrupted data and logs an error | Shows clean empty list with zero errors | Database latency alarm alerts on-call engineer |
| Payment Gateway | Opens safety fuse after 3 timeouts to avoid blocking users | Saves transaction in retry queue to send later | Discards bad message and flags security warning | Treats as failed payment cleanly | Payment failure counter triggers alert |
| Memory / Cache | Bypasses cache and reads directly from main database | System continues running safely without cache | Wipes bad cache key and loads fresh copy | Loads fresh copy from database | Cache miss rate alarm |

## Our Hard Practical Limits
- **Traffic Limit:** 500 visitors clicking at the exact same second before queues form.
- **Payload Limit:** 10MB maximum file size allowed at the front door.
- **Timeout Limit:** 5 seconds maximum before stopping a stuck request.
