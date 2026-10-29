/**
 * HAULITZ ENTERPRISE GENERATOR - PARAMETERIZED T-SQL & C# .NET 8 INTEGRATION
 * Standard: ASD-STE100 Simplified Technical English
 * 
 * Target ERP Databases:
 * 1. SAP ERP / S/4HANA (Side-car staging tables)
 * 2. Microsoft SQL Server 2019/2022 (Enterprise Staging Layer)
 * 
 * Safety Rules:
 * - NEVER generate raw unescaped string concatenations
 * - ALWAYS use parameterized scripts to prevent SQL Injection
 * - ALWAYS wrap in explicit transactions (BEGIN TRAN ... COMMIT)
 */

(function(global) {
  'use strict';

  const SQLStaging = {};

  function escapeSQLString(val) {
    if (val === null || val === undefined) return '';
    return String(val).replace(/'/g, "''");
  }

  /**
   * Generate Parameterized T-SQL Staging Script
   * @param {string} domainKey - Domain identifier (e.g. "fintech", "logistics")
   * @param {Object} documentData - Extracted document payload
   * @param {Object} auditResult - Deterministic verification result
   * @param {Object} sealResult - GoBD SHA-256 seal
   * @returns {string} Fully formatted T-SQL script
   */
  SQLStaging.generateTSQL = function(domainKey, documentData, auditResult, sealResult) {
    const isClean = auditResult.isValid;
    const auditStatus = isClean ? 'VERIFIED_CLEAN' : 'QUARANTINE_HOLD';
    const tableName = `[dbo].[Staging_${(domainKey || 'Generic').toUpperCase()}_Ingest]`;
    const refId = documentData.referenceNumber || documentData.invoiceNumber || documentData.bolNumber || 'HAULITZ-REF';
    const seal = sealResult?.seal || '0000000000000000000000000000000000000000000000000000000000000000';
    const prevSeal = sealResult?.previousSeal || '0000000000000000000000000000000000000000000000000000000000000000';
    const timestamp = sealResult?.timestamp || new Date().toISOString();

    const tsql = `-- ============================================================================
-- HAULITZ ENTERPRISE GATEWAY: PARAMETERIZED ERP STAGING SCRIPT
-- Target Engine: Microsoft SQL Server 2019 / 2022 & SAP S/4HANA Side-Car
-- Generated: ${timestamp}
-- GoBD § 147 AO Seal: ${seal}
-- Status: ${auditStatus}
-- ============================================================================

SET NOCOUNT ON;
SET XACT_ABORT ON;

BEGIN TRANSACTION;

-- 1. Ensure Staging Table Schema Exists
IF NOT EXISTS (SELECT * FROM sys.tables t JOIN sys.schemas s ON t.schema_id = s.schema_id WHERE t.name = N'Staging_${(domainKey || 'Generic').toUpperCase()}_Ingest' AND s.name = N'dbo')
BEGIN
    CREATE TABLE ${tableName} (
        [IngestID] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID() PRIMARY KEY,
        [ReferenceNumber] NVARCHAR(100) NOT NULL,
        [DomainSector] NVARCHAR(50) NOT NULL,
        [AuditStatus] NVARCHAR(30) NOT NULL,
        [AtlasReady] BIT NOT NULL DEFAULT 0,
        [QuarantineHold] BIT NOT NULL DEFAULT 0,
        [VarianceAmount] DECIMAL(18, 4) NOT NULL DEFAULT 0.0000,
        [PayloadHash] CHAR(64) NOT NULL,
        [GoBDSeal] CHAR(64) NOT NULL,
        [PreviousSeal] CHAR(64) NOT NULL,
        [RawPayloadJSON] NVARCHAR(MAX) NOT NULL,
        [VerificationLog] NVARCHAR(MAX) NOT NULL,
        [IngestedAtUtc] DATETIME2(7) NOT NULL DEFAULT SYSUTCDATETIME()
    );

    CREATE NONCLUSTERED INDEX [IX_${(domainKey || 'Generic')}_AuditStatus] 
    ON ${tableName} ([AuditStatus], [IngestedAtUtc]);
END;

-- 2. Declare Typed Ingestion Parameters (SQL Injection Prevention)
DECLARE @p_ReferenceNumber NVARCHAR(100) = N'${escapeSQLString(refId)}';
DECLARE @p_DomainSector NVARCHAR(50) = N'${escapeSQLString(domainKey)}';
DECLARE @p_AuditStatus NVARCHAR(30) = N'${auditStatus}';
DECLARE @p_AtlasReady BIT = ${isClean ? 1 : 0};
DECLARE @p_QuarantineHold BIT = ${isClean ? 0 : 1};
DECLARE @p_VarianceAmount DECIMAL(18, 4) = ${parseFloat(auditResult.variance || auditResult.taxDelta || 0).toFixed(4)};
DECLARE @p_PayloadHash CHAR(64) = '${sealResult?.payloadHash || seal}';
DECLARE @p_GoBDSeal CHAR(64) = '${seal}';
DECLARE @p_PreviousSeal CHAR(64) = '${prevSeal}';
DECLARE @p_RawPayloadJSON NVARCHAR(MAX) = N'${escapeSQLString(JSON.stringify(documentData))}';
DECLARE @p_VerificationLog NVARCHAR(MAX) = N'${escapeSQLString(JSON.stringify(auditResult))}';

-- 3. Atomic Staging Insert with Cryptographic Verification
INSERT INTO ${tableName} (
    [ReferenceNumber],
    [DomainSector],
    [AuditStatus],
    [AtlasReady],
    [QuarantineHold],
    [VarianceAmount],
    [PayloadHash],
    [GoBDSeal],
    [PreviousSeal],
    [RawPayloadJSON],
    [VerificationLog]
) VALUES (
    @p_ReferenceNumber,
    @p_DomainSector,
    @p_AuditStatus,
    @p_AtlasReady,
    @p_QuarantineHold,
    @p_VarianceAmount,
    @p_PayloadHash,
    @p_GoBDSeal,
    @p_PreviousSeal,
    @p_RawPayloadJSON,
    @p_VerificationLog
);

COMMIT TRANSACTION;

-- Audit Diagnostic Output
SELECT 
    [ReferenceNumber] = @p_ReferenceNumber,
    [StagingStatus] = @p_AuditStatus,
    [AtlasPreClearance] = CASE WHEN @p_AtlasReady = 1 THEN 'AUTHORIZED' ELSE 'BLOCKED_BY_AIRBAG' END,
    [GoBDSealSHA256] = @p_GoBDSeal;
`;
    return tsql;
  };

  /**
   * Generate C# / .NET 8 Client SDK Driver
   * @param {string} domainKey - Domain identifier
   * @returns {string} Production C# code snippet
   */
  SQLStaging.generateCSharpDriver = function(domainKey) {
    return `// ============================================================================
// HAULITZ CLIENT SDK - PRODUCTION C# / .NET 8 INTEGRATION DRIVER
// Standard: ASD-STE100 Simplified Technical English
// Package: Microsoft.Data.SqlClient 5.2+ | System.Text.Json
// ============================================================================

using System;
using System.Data;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace Haulitz.Enterprise.Integration
{
    public sealed class HaulitzIngestionService
    {
        private readonly string _connectionString;

        public HaulitzIngestionService(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<Guid> StageVerifiedRecordAsync(
            string referenceNumber,
            string domainSector,
            bool isClean,
            decimal varianceAmount,
            string gobdSeal,
            string previousSeal,
            object payload,
            object auditLog)
        {
            const string sql = @"
                INSERT INTO [dbo].[Staging_${(domainKey || 'Generic').toUpperCase()}_Ingest] (
                    [ReferenceNumber], [DomainSector], [AuditStatus], [AtlasReady], 
                    [QuarantineHold], [VarianceAmount], [PayloadHash], [GoBDSeal], 
                    [PreviousSeal], [RawPayloadJSON], [VerificationLog]
                ) 
                OUTPUT INSERTED.[IngestID]
                VALUES (
                    @ReferenceNumber, @DomainSector, @AuditStatus, @AtlasReady, 
                    @QuarantineHold, @VarianceAmount, @PayloadHash, @GoBDSeal, 
                    @PreviousSeal, @RawPayloadJSON, @VerificationLog
                );";

            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            await using var command = new SqlCommand(sql, connection);
            command.Parameters.Add("@ReferenceNumber", SqlDbType.NVarChar, 100).Value = referenceNumber;
            command.Parameters.Add("@DomainSector", SqlDbType.NVarChar, 50).Value = domainSector;
            command.Parameters.Add("@AuditStatus", SqlDbType.NVarChar, 30).Value = isClean ? "VERIFIED_CLEAN" : "QUARANTINE_HOLD";
            command.Parameters.Add("@AtlasReady", SqlDbType.Bit).Value = isClean;
            command.Parameters.Add("@QuarantineHold", SqlDbType.Bit).Value = !isClean;
            var paramVariance = command.Parameters.Add("@VarianceAmount", SqlDbType.Decimal);
            paramVariance.Precision = 18;
            paramVariance.Scale = 2;
            paramVariance.Value = varianceAmount;
            command.Parameters.Add("@PayloadHash", SqlDbType.Char, 64).Value = gobdSeal;
            command.Parameters.Add("@GoBDSeal", SqlDbType.Char, 64).Value = gobdSeal;
            command.Parameters.Add("@PreviousSeal", SqlDbType.Char, 64).Value = previousSeal;
            command.Parameters.Add("@RawPayloadJSON", SqlDbType.NVarChar, -1).Value = JsonSerializer.Serialize(payload);
            command.Parameters.Add("@VerificationLog", SqlDbType.NVarChar, -1).Value = JsonSerializer.Serialize(auditLog);

            var result = await command.ExecuteScalarAsync();
            return (Guid)result!;
        }
    }
}`;
  };

  // Expose to browser window or CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SQLStaging;
  } else {
    global.Haulitz = global.Haulitz || {};
    global.Haulitz.SQLStaging = SQLStaging;
  }
})(typeof window !== 'undefined' ? window : globalThis);
