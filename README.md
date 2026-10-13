---
title: RedLine Gateway
emoji: 🚢
colorFrom: red
colorTo: slate
sdk: gradio
sdk_version: 6.30.0
app_file: gateway_app.py
pinned: false
license: mit
short_description: Autonomous Freight & Customs Gateway (Red Line & mw1group)
---

# RedLine Gateway

> **Autonomous Freight Ingestion & Deterministic Customs Pre-Clearance Engine**  
> Custom-tailored for **Red Line Internationale Spedition GmbH** & **mw1group**  
> Gewerbepark Kachtenhausen 1–10, 32791 Lage, Germany

---

## 1. Overview & Business Value

RedLine Gateway is an enterprise document ingestion and deterministic pre-clearance microservice built specifically to eliminate document friction between international overseas shipping agents (ULN network, LATAM, Middle East, Asia) and mw1group's internal **`myscm`** ERP infrastructure.

### The Core Problem Solved
1. **Demurrage & Detention Elimination:** Catches weight discrepancies, container misdeclarations, and missing HS tariff codes *before* vessels berth in Hamburg or Rotterdam, preventing €150–€350/day detention fees.
2. **Disponent Time Reclamation:** Replaces 15–20 minutes of manual data-entry per shipment with instant multi-modal extraction into structured relational records.
3. **Zero ERP Disruption for Hermann Schmidt:** Emits parameterized Transact-SQL statements directly compatible with mw1's existing Microsoft SQL Server and C# / ASP.NET backend.

---

## 2. Architecture: Semantic AI + Deterministic Steel Cage

```text
[Incoming Shipping PDF / Image] 
(Scanned B/L, Commercial Invoice, Packing List)
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. MULTIMODAL VISION INGESTION (Gemini API)                 │
│    • Ingests raw pixels / unstructured PDF bytes            │
│    • Identifies document type and maps entities to schema   │
│    • Returns Unverified Candidate JSON                      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. DETERMINISTIC AUDIT HARNESS (Zero AI - Pure Code)        │
│    • ISO 6346 Modulo-11 Checksum on Container IDs           │
│    • Physical Mass Conservation Law (Gross >= Net)          │
│    • Line-Item Commercial Arithmetic Integrity              │
│    • ICC Incoterms 2020 Standard Compliance (11 codes)      │
│    • Customs Tariff Code (HS / ATLAS) Syntax Check          │
└──────────────────────────────┬──────────────────────────────┘
                               │
         ┌─────────────────────┴─────────────────────┐
         ▼                                           ▼
[ALL CHECKS PASS: 100%]                      [ANY CHECK FAILS]
Auto-Staged for ATLAS                        Quarantine Hold Triggered
T-SQL Generated for [dbo].[myscm_Staging]    Demurrage Risk Flagged (€750.00)
Status: VERIFIED_CLEAN                       Status: QUARANTINE_HOLD
```

---

## 3. Technology Stack

* **Language:** Python 3.11+
* **Backend Framework:** FastAPI (Asynchronous ASGI Microservice)
* **Data Contracts:** Pydantic v2 (Strict typing, serialization)
* **Vision & OCR Engine:** Google Gemini Flash (Multimodal Vision API)
* **Database & Ledger:** SQLite (Local) / Transact-SQL Bridge for MS-SQL Server
* **Frontend:** Responsive SPA styled in RedLine Crimson & mw1 Navy Blue (Tailwind CSS, Vanilla JS)

---

## 4. Quick Start (Running Locally)

### Step 1: Clone & Enter Directory
```bash
cd "c:\Users\admin\Documents\RedLine Gateway"
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Configure Environment
Ensure your `.env` contains:
```env
GEMINI_API_KEY="your-gemini-api-key"
PORT=8000
HOST=0.0.0.0
```

### Step 4: Launch the Server
```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Open your browser at **`http://localhost:8000`** to access the interactive executive dashboard.  
API documentation is live at **`http://localhost:8000/docs`** (Interactive Swagger UI).

---

## 5. Free 24/7 Production Cloud Deployment

### Option A: Hugging Face Spaces (Recommended - Dedicated 16GB RAM, No Cold Starts)
1. In [Hugging Face](https://huggingface.co/spaces), click **Create new Space**.
2. Set Space Name: `redline-gateway`, License: `mit`, Space SDK: **Docker** (Blank).
3. Connect your GitHub repository (`AllenFletcherAI/Redline-Gateway`) or push directly to HF Git remote.
4. In Space **Settings** -> **Variables and secrets**, add:
   - Secret Name: `GEMINI_API_KEY`
   - Value: `your-google-gemini-api-key`
5. The container builds automatically and serves live at `https://<your-username>-redline-gateway.hf.space` with 16 GB RAM and zero cold-start latency.

### Option B: Koyeb / Render PaaS
1. Connect your GitHub repository to [Koyeb.com](https://koyeb.com).
2. Choose **Dockerfile** deployment type.
3. Add Environment Variable: `GEMINI_API_KEY`.
4. Koyeb deploys the container instantly with automated TLS/SSL.

---

## 6. MS-SQL Integration Specification (For Hermann Schmidt)

### Target Staging Schema:
```sql
CREATE TABLE [dbo].[myscm_Staging_Shipments] (
    [StagingID] INT IDENTITY(1,1) PRIMARY KEY,
    [ShipmentRef] NVARCHAR(50) NOT NULL,
    [ContainerNumber] NVARCHAR(11) NULL,
    [SealNumber] NVARCHAR(30) NULL,
    [GrossWeightKg] DECIMAL(10,2) NULL,
    [NetWeightKg] DECIMAL(10,2) NULL,
    [TotalPackages] INT NULL,
    [PackageType] NVARCHAR(50) NULL,
    [InvoiceTotal] DECIMAL(12,2) NULL,
    [CurrencyCode] CHAR(3) DEFAULT 'EUR',
    [Incoterm] CHAR(3) NULL,
    [OriginPort] NVARCHAR(50) NULL,
    [DestinationPort] NVARCHAR(50) NULL,
    [ShipperName] NVARCHAR(150) NULL,
    [ConsigneeName] NVARCHAR(150) NULL,
    [AuditStatus] NVARCHAR(30) NOT NULL,
    [AtlasReady] BIT DEFAULT 0,
    [IngestedAtUtc] DATETIME2 DEFAULT SYSUTCDATETIME()
);
```

### C# / ASP.NET Ingestion Call:
```csharp
using System.Net.Http.Json;

public async Task<RedLineStagingResponse> IngestFreightDocumentAsync(byte[] documentBytes, string fileName)
{
    using var client = new HttpClient { BaseAddress = new Uri("https://your-redline-gateway-url") };
    using var content = new MultipartFormDataContent();
    content.Add(new ByteArrayContent(documentBytes), "file", fileName);

    var response = await client.PostAsync("/api/v1/documents/process", content);
    response.EnsureSuccessStatusCode();

    return await response.Content.ReadFromJsonAsync<RedLineStagingResponse>();
}
```

---

## 7. License

Proprietary prototype developed for Red Line Internationale Spedition GmbH and mw1group. All rights reserved.
