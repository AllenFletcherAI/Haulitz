# Hard Safety Constraints (Haulitz)
Standard: ASD-STE100 Simplified Technical English · Habit 07

## 1. NEVER Rules
- **NEVER** write or commit API keys, database passwords, or private access tokens into git-tracked files.
- **NEVER** write AI-extracted records directly into primary production ERP tables without prior deterministic validation.
- **NEVER** approve an invoice where declared Gross Total does not equal Net Subtotal plus calculated Statutory VAT ($\pm 0.01$ EUR tolerance).
- **NEVER** approve an ocean freight container where the ISO 6346 Modulo-11 check digit calculation fails.
- **NEVER** approve a delivery where declared Gross Weight is less than Net Weight.
- **NEVER** force a recruiter to download or upload local files to evaluate the software.
- **NEVER** delete, disable, or weaken failing verification tests to force a build to pass.

## 2. ALWAYS Rules
- **ALWAYS** compute and append a SHA-256 cryptographic digest for every verified record to satisfy GoBD § 147 AO compliance requirements.
- **ALWAYS** provide 1-click pre-cached canonical scenarios (Clean Pass, Math Trap, Legal Exception) for all 10 enterprise domains.
- **ALWAYS** generate formal, pre-drafted carrier and vendor discrepancy notices citing German commercial law (ADSp 2017, § 412 HGB, § 14 UStG, LkSG § 7, GOÄ § 12) whenever checks fail.
- **ALWAYS** keep the user workspace aligned with Hick's Law: clear one-click actions in the idle state, revealing detailed audit panes only after loading a scenario.
- **ALWAYS** generate safe, parameterized Transact-SQL (T-SQL) staging scripts for SAP and Microsoft SQL Server to prevent SQL injection vulnerabilities.

## 3. ONLY Rules
- **ONLY** stage verified data into designated staging tables (`[dbo].[Staging_...]`), never direct production tables.
- **ONLY** mark a document status as `VERIFIED_CLEAN` when all deterministic mathematical and regulatory rules pass with zero defects.
- **ONLY** execute core verification logic in zero-latency deterministic client modules on Cloudflare Pages to maintain $0/month cost and 100% global uptime.
