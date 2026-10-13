# 🚢 RedLine Gateway
### Autonomous Freight Ingestion & Deterministic Customs Pre-Clearance Engine

[![Live Production](https://img.shields.io/badge/Production-Live%20Online-22c55e?style=for-the-badge&logo=render&logoColor=white)](https://redline-gateway.onrender.com)
[![Uptime Monitor](https://img.shields.io/badge/Uptime-24%2F7%20Monitored-0284c7?style=for-the-badge&logo=uptimerobot&logoColor=white)](https://redline-gateway.onrender.com/health)
[![Region](https://img.shields.io/badge/Region-Frankfurt%20(EU)--Central-4f46e5?style=for-the-badge&logo=googlecloud&logoColor=white)](https://redline-gateway.onrender.com)
[![Python Version](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-059669?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-0284c7?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Compliance](https://img.shields.io/badge/Standard-ADSp%202017%20%7C%20ISO%206346-e11d48?style=for-the-badge)](https://www.spediteure.de/adsp/)

Custom-engineered for **[Red Line Internationale Spedition GmbH](https://www.redline-spedition.de/)** & **[mw1group](https://www.mw1group.com/)**  
*Gewerbepark Kachtenhausen 1–10, 32791 Lage, Nordrhein-Westfalen, Germany*

---

> ### 🌐 Live Production Terminal
> **Production Service URL**: [https://redline-gateway.onrender.com](https://redline-gateway.onrender.com)  
> **Interactive Swagger / OpenAPI Documentation**: [https://redline-gateway.onrender.com/docs](https://redline-gateway.onrender.com/docs)  
> **System Health & Uptime Status Probe**: [https://redline-gateway.onrender.com/health](https://redline-gateway.onrender.com/health)

---

## 1. Overview & Business Value

**RedLine Gateway** is an enterprise-grade document ingestion and deterministic customs pre-clearance engine. It bridges overseas shipping documents (Ocean Bills of Lading, Air Waybills, Commercial Invoices, and Packing Lists) into mw1group’s internal **`myscm`** ERP system and German **ATLAS 9.1** customs infrastructure.

### The Operational Challenges Solved
1. **Demurrage & Port Detention Elimination:** Detects weight variances, container number check-digit errors, and missing tariff codes *before* ocean vessels berth at Hamburg or Rotterdam, halting container demurrage charges (€150–€350/day).
2. **Disponent Time Reclamation:** Eliminates 15–20 minutes of manual data-entry per shipment, replacing it with sub-second multimodal extraction into verified relational records.
3. **Deterministic "Steel Cage" Compliance:** AI never writes unverified data directly to the database. All extracted entities pass through deterministic mathematical algorithms (ISO 6346 Modulo-11, Physical Mass Conservation, Line-Item Arithmetic) before ERP staging.
4. **Zero ERP Disruption:** Emits native, parameterized Transact-SQL statements directly compatible with mw1’s internal Microsoft SQL Server 2022 database and C# / ASP.NET backend.

---

## 2. Architecture: Semantic AI + Deterministic Steel Cage

```mermaid
flowchart TD
    subgraph INTAKE["1. Document Ingestion"]
        A[Scanned Ocean B/L\nCommercial Invoice\nPacking List] --> B[Multimodal Vision Extraction\nGoogle Gemini Vision API]
        B --> C[Unverified Candidate JSON]
    end

    subgraph STEELCAGE["2. Deterministic Audit Harness (Zero-AI)"]
        C --> D{Rules & Math Engine}
        D --> D1[ISO 6346 Modulo-11 Checksum]
        D --> D2[Mass Conservation: Gross >= Net]
        D --> D3[Line-Item Mathematical Cross-Sum]
        D --> D4[ICC Incoterms 2020 Validation]
        D --> D5[HS / TARIC Tariff Code Syntax]
    end

    subgraph DISPATCH["3. Routing & Storage"]
        D1 & D2 & D3 & D4 & D5 -- "All Checks Pass (100%)" --> E[VERIFIED_CLEAN\nATLAS 9.1 Pre-Clearance Ready]
        D1 & D2 & D3 & D4 & D5 -- "Any Check Fails" --> F[QUARANTINE_HOLD\nDemurrage Clock Activated\nADSp 2017 Claim Notice Emitted]
        E --> G[(MS-SQL Server 2022\n[dbo].[myscm_Staging])]
        F --> H[Operations Quarantine Console\n1-Click Legal Notice to Carrier]
    end

    classDef clean fill:#065f46,stroke:#34d399,stroke-width:2px,color:#fff;
    classDef hold fill:#881337,stroke:#f43f5e,stroke-width:2px,color:#fff;
    classDef core fill:#1e293b,stroke:#64748b,stroke-width:1px,color:#fff;
    class E clean;
    class F hold;
    class A,B,C,D,G,H core;
```

---

## 3. Key Operational Modules

### 🔍 3-Way Cross-Document Reconciliation Matrix
Cross-audits the three primary ocean freight documents against each other:
* **Transport Document (B/L)** vs. **Commercial Invoice** vs. **Packing List**.
* Compares Container Numbers, Package Counts (Colli), Gross/Net Weights, and Currency/Incoterms.
* Automatically flags any discrepancy exceeding strict logistics limits (e.g., > 50 kg weight variance triggers immediate quarantine).

### 🛡️ ISO 6346 Modulo-11 Check Digit Engine
Validates 11-character intermodal container IDs (4 letters + 7 digits) using the official ISO 6346 Modulo-11 algorithm. Protects dispatchers against terminal gate-in rejection fines at Hamburg NTB / CTA and Rotterdam World Gateway.

### ⚖️ Physical Mass Conservation Law (§ 412 HGB)
Applies deterministic physics checks ensuring declared Gross Weight strictly exceeds Net Weight across all line-items and totals. Flagged variances are recorded in compliance with § 412 HGB (Shipper Packaging & Declaration Duty).

### 📋 Automated ADSp 2017 Carrier Claim Notice Generator
When discrepancies occur between the Ocean Carrier's Bill of Lading and supplier papers, the gateway generates a formal, legally grounded discrepancy memo citing **ADSp 2017 Section 19** and **§ 412 HGB** in 1 click, ready to dispatch to ocean shipping lines to halt storage accrual.

### 🧭 10-Step Interactive Guided Tour
Integrated executive walkthrough accessible directly from the top navigation bar. Steps stakeholders through live ingestion, 3-way reconciliation, demurrage risk quarantine, audit ledger forensics, and IT ERP integration.

---

## 4. Technology Stack

| Layer | Component | Specification |
| :--- | :--- | :--- |
| **Backend Framework** | FastAPI (ASGI) | Python 3.11, Pydantic v2, Uvicorn ASGI Runner |
| **Multimodal Extraction** | Google Gemini Vision | Official `google-genai` SDK with strict JSON schema constraints |
| **Audit Core** | Deterministic Engine | Pure Python ISO 6346 Modulo-11, arithmetic & Incoterm validators |
| **Persistence** | SQLite / MS-SQL | Local audit ledger with 100+ pre-seeded records; T-SQL bridge for ERP |
| **Frontend** | Responsive SPA | Tailwind CSS, RedLine Crimson (`#DC2626`) & mw1 Navy Blue theme |
| **Infrastructure** | Docker & Cloud Edge | Multi-stage Debian-slim container running in Frankfurt (EU-Central) |
| **Reliability** | Uptime Monitoring | Automated 5-minute HTTP keep-alive probes via UptimeRobot |

---

## 5. Quick Start (Running Locally)

### Prerequisites
* Python 3.11+
* Git

### Step 1: Clone Repository
```bash
git clone https://github.com/AllenFletcherAI/Redline-Gateway.git
cd Redline-Gateway
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Configure Environment
Create a `.env` file in the project root:
```env
GEMINI_API_KEY="your-google-gemini-api-key"
PORT=8000
HOST=0.0.0.0
ENVIRONMENT=development
COMPANY_NAME="Red Line Internationale Spedition GmbH"
PARTNER_NAME="mw1group"
```

### Step 4: Launch the Microservice
```bash
python run.py
```
* **Executive Web UI**: `http://localhost:8000`
* **Interactive OpenAPI Swagger Docs**: `http://localhost:8000/docs`
* **Health Check**: `http://localhost:8000/health`

### Alternative: Running with Docker
```bash
docker build -t redline-gateway .
docker run -p 7860:7860 -e GEMINI_API_KEY="your-key" redline-gateway
```

---

## 6. Production Cloud Deployment

The live instance is hosted on **Render** (Frankfurt, Germany) with an automated Docker multi-stage container build connected directly to the `main` branch of this repository.

### High-Availability Keep-Alive Monitor
To ensure zero cold-start delay for users and hiring teams:
* **Endpoint Monitored**: `https://redline-gateway.onrender.com/health`
* **Protocol**: HTTP `HEAD` / `GET`
* **Frequency**: Every 5 minutes (via UptimeRobot)
* **Result**: Render’s 15-minute free-tier idle sleep timer is permanently reset, guaranteeing instantaneous, 24/7 global availability.

---

## 7. REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET / HEAD` | `/` | Serves the primary executive single-page dashboard |
| `GET / HEAD` | `/health` | Cluster health and uptime probe |
| `GET` | `/api/v1/metrics` | Real-time KPI metrics (demurrage prevented, ATLAS rate, hold counts) |
| `POST` | `/api/v1/documents/process` | 5-stage document upload, OCR entity extraction & deterministic audit |
| `GET` | `/api/v1/sample/{doc_type}` | Loads pre-configured sample transport documents for testing |
| `GET` | `/api/v1/reconcile-samples` | Fetches 3-way dossier (Ocean B/L, Commercial Invoice, Packing List) |
| `POST` | `/api/v1/reconcile-simulation` | Executes live demurrage discrepancy simulation (€1,250 prevented) |
| `GET` | `/api/v1/recent` | Retrieves recent immutable audit ledger records |
| `POST` | `/api/v1/quarantine/override` | Records authorized supervisor release on a quarantined shipment |
| `GET` | `/api/v1/integration/mssql-ddl` | Generates MS-SQL Server DDL schema for `myscm_Staging` tables |
| `GET` | `/api/v1/integration/client-snippets` | Generates C#, Python, and cURL integration client snippets |

---

## 8. ERP Integration Specification (For Hermann Schmidt / mw1 IT)

### Target Database Schema ([dbo].[myscm_Staging_Shipments])
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

### C# / ASP.NET Ingestion Client
```csharp
using System.Net.Http.Json;

public async Task<RedLineStagingResponse> IngestFreightDocumentAsync(byte[] documentBytes, string fileName)
{
    using var client = new HttpClient { BaseAddress = new Uri("https://redline-gateway.onrender.com") };
    using var content = new MultipartFormDataContent();
    content.Add(new ByteArrayContent(documentBytes), "file", fileName);

    var response = await client.PostAsync("/api/v1/documents/process", content);
    response.EnsureSuccessStatusCode();

    return await response.Content.ReadFromJsonAsync<RedLineStagingResponse>();
}
```

---

## 9. Security & Compliance

* **DSGVO / GDPR Compliance:** Complies with German data protection standards. Document bytes are processed in memory and never retained on third-party cloud analytics or external training loops.
* **Non-Root Container Security:** The Docker image runs under a dedicated unprivileged user (`gateway`, UID `1000`) complying with CIS Docker benchmarks.
* **Audit Trail Immutability:** Every processed transaction receives a SHA-256 cryptographic digest binding document metadata, extraction timestamps, and deterministic validation outputs.

---

## 10. License

Proprietary prototype developed for **Red Line Internationale Spedition GmbH** & **mw1group**. All rights reserved.
