import { Solution, Connector } from '../types';

export const INITIAL_SOLUTIONS: Solution[] = [
  {
    id: 'demand-intelligence',
    name: 'Demand Intelligence',
    tagline: 'Autonomous demand sensing & multi-horizon forecasting',
    description: 'Forecast demand and identify future requirements.',
    category: 'operations',
    status: 'active',
    version: 'v2.4.1 Enterprise',
    leadTime: 'Real-time telemetry',
  },
  {
    id: 'inventory-intelligence',
    name: 'Inventory Intelligence',
    tagline: 'Multi-echelon inventory optimization & safety stock calibration',
    description: 'Optimize inventory and working capital.',
    category: 'operations',
    status: 'active',
    version: 'v3.1.0 Enterprise',
    leadTime: 'Hourly batch updates',
  },
  {
    id: 'manufacturing-excellence',
    name: 'Manufacturing Excellence',
    tagline: 'Predictive maintenance, OEE optimization & yield analytics',
    description: 'Improve plant performance and operational efficiency.',
    category: 'manufacturing',
    status: 'active',
    version: 'v1.8.2 Certified',
    leadTime: 'Sub-second SCADA ingest',
  },
  {
    id: 'cement-intelligence',
    name: 'Cement Intelligence',
    tagline: 'Kiln heat optimization, clinker quality & decarbonization analytics',
    description: 'Optimize cement manufacturing operations.',
    category: 'manufacturing',
    status: 'available',
    version: 'v2.0.4 Process-AI',
    leadTime: '15-min sensor cycles',
  },
  {
    id: 'supply-chain-intelligence',
    name: 'Supply Chain Intelligence',
    tagline: 'End-to-end multi-tier logistics visibility & disruption mitigation',
    description: 'Improve end-to-end supply chain performance.',
    category: 'supply_chain',
    status: 'coming_soon',
    version: 'Preview v0.9-alpha',
    leadTime: 'Q3 Enterprise Release',
  }
];

export const INITIAL_CONNECTORS: Connector[] = [
  // ERP
  {
    id: 'sap-erp',
    name: 'SAP S/4HANA / ECC',
    category: 'ERP',
    description: 'Native RFC & OData extractor for Sales Orders, Material Master, Plant inventories, and BOM hierarchies.',
    state: 'connected',
    popular: true,
    docsUrl: 'https://docs.aitek.ai/connectors/sap',
    defaultHost: 'sap-prd-us-east.corp.enterprise.com:8443',
    entities: ['VBAK (Sales Documents Header)', 'VBAP (Sales Document Items)', 'MARA (General Material Data)', 'MARD (Storage Location Stock)'],
    lastSync: '18 minutes ago',
    recordCount: 2481090,
    mappings: [
      { id: 'm1', aitekField: 'AITEK Demand Date', sourceField: 'VBAK.ERDAT (Creation Date)', dataType: 'TIMESTAMP', required: true, sampleValue: '2026-09-08 09:30:00', status: 'valid' },
      { id: 'm2', aitekField: 'AITEK Product ID', sourceField: 'VBAP.MATNR (Material Number)', dataType: 'VARCHAR(40)', required: true, sampleValue: 'MAT-99824-AX', status: 'valid' },
      { id: 'm3', aitekField: 'AITEK Quantity', sourceField: 'VBAP.KWMENG (Order Quantity)', dataType: 'DECIMAL(13,3)', required: true, sampleValue: '450.000', status: 'valid' },
      { id: 'm4', aitekField: 'AITEK Location', sourceField: 'VBAP.WERKS (Plant Code)', dataType: 'VARCHAR(4)', required: true, sampleValue: '1000', status: 'valid' },
      { id: 'm5', aitekField: 'AITEK Unit Price', sourceField: 'VBAP.NETPR (Net Price)', dataType: 'DECIMAL(11,2)', required: false, sampleValue: '128.50', status: 'valid' }
    ]
  },
  {
    id: 'oracle-erp',
    name: 'Oracle Fusion Cloud ERP',
    category: 'ERP',
    description: 'Enterprise REST & BICC integration for supply chain management, work orders, and inventory transactions.',
    state: 'not_connected',
    popular: true,
    docsUrl: 'https://docs.aitek.ai/connectors/oracle',
    defaultHost: 'fa-enterprise.oraclecloud.com',
    entities: ['SupplyChainOrders', 'InventoryItems', 'WorkOrderHeaders', 'PurchaseOrders'],
    mappings: [
      { id: 'm1', aitekField: 'AITEK Demand Date', sourceField: 'order_date', dataType: 'TIMESTAMP', required: true, status: 'unmapped' },
      { id: 'm2', aitekField: 'AITEK Product ID', sourceField: 'item_number', dataType: 'VARCHAR', required: true, status: 'unmapped' },
      { id: 'm3', aitekField: 'AITEK Quantity', sourceField: 'requested_quantity', dataType: 'DECIMAL', required: true, status: 'unmapped' },
      { id: 'm4', aitekField: 'AITEK Location', sourceField: 'organization_code', dataType: 'VARCHAR', required: true, status: 'unmapped' }
    ]
  },
  {
    id: 'ms-dynamics',
    name: 'Microsoft Dynamics 365',
    category: 'ERP',
    description: 'Dataverse & Synapse Link synchronization for Supply Chain Management, warehouse ops, and sales telemetry.',
    state: 'not_connected',
    entities: ['SalesOrderLines', 'InventDim', 'InventTrans', 'CustTable'],
    mappings: [
      { id: 'm1', aitekField: 'AITEK Demand Date', sourceField: 'DeliveryDate', dataType: 'DATETIME', required: true, status: 'unmapped' },
      { id: 'm2', aitekField: 'AITEK Product ID', sourceField: 'ItemId', dataType: 'NVARCHAR', required: true, status: 'unmapped' },
      { id: 'm3', aitekField: 'AITEK Quantity', sourceField: 'SalesQty', dataType: 'NUMERIC', required: true, status: 'unmapped' },
      { id: 'm4', aitekField: 'AITEK Location', sourceField: 'InventLocationId', dataType: 'NVARCHAR', required: true, status: 'unmapped' }
    ]
  },

  // Databases
  {
    id: 'postgresql',
    name: 'PostgreSQL Enterprise',
    category: 'Databases',
    description: 'Direct JDBC/CDC pipeline supporting read-replicas, partitioning, and automated transactional changelog capture.',
    state: 'connected',
    popular: true,
    defaultHost: 'pg-warehouse-primary.internal.enterprise.com:5432',
    entities: ['public.orders_historical', 'public.skus_catalog', 'public.dc_inventory', 'public.shipment_logs'],
    lastSync: '2 hours ago',
    recordCount: 6194200,
    mappings: [
      { id: 'm1', aitekField: 'AITEK Demand Date', sourceField: 'orders_historical.created_at', dataType: 'TIMESTAMPTZ', required: true, sampleValue: '2026-09-08T08:15:22Z', status: 'valid' },
      { id: 'm2', aitekField: 'AITEK Product ID', sourceField: 'orders_historical.sku_code', dataType: 'VARCHAR(64)', required: true, sampleValue: 'SKU-5049-CR', status: 'valid' },
      { id: 'm3', aitekField: 'AITEK Quantity', sourceField: 'orders_historical.qty_units', dataType: 'INTEGER', required: true, sampleValue: '120', status: 'valid' },
      { id: 'm4', aitekField: 'AITEK Location', sourceField: 'orders_historical.node_id', dataType: 'VARCHAR(32)', required: true, sampleValue: 'NODE_CHI_01', status: 'valid' }
    ]
  },
  {
    id: 'sql-server',
    name: 'Microsoft SQL Server',
    category: 'Databases',
    description: 'High-throughput bulk ingestion via SQL Server CDC or Always On Availability Group listener endpoints.',
    state: 'not_connected',
    entities: ['dbo.FactSales', 'dbo.DimProduct', 'dbo.FactInventorySnapshot'],
    mappings: [
      { id: 'm1', aitekField: 'AITEK Demand Date', sourceField: 'OrderDateKey', dataType: 'DATETIME2', required: true, status: 'unmapped' },
      { id: 'm2', aitekField: 'AITEK Product ID', sourceField: 'ProductCode', dataType: 'VARCHAR', required: true, status: 'unmapped' },
      { id: 'm3', aitekField: 'AITEK Quantity', sourceField: 'UnitQuantity', dataType: 'DECIMAL', required: true, status: 'unmapped' },
      { id: 'm4', aitekField: 'AITEK Location', sourceField: 'WarehouseId', dataType: 'VARCHAR', required: true, status: 'unmapped' }
    ]
  },

  // Cloud/Data platforms
  {
    id: 'snowflake',
    name: 'Snowflake Data Cloud',
    category: 'Cloud/Data platforms',
    description: 'Direct Snowpipe Streaming & zero-copy warehouse query connector with RBAC and encrypted session tokens.',
    state: 'not_connected',
    popular: true,
    entities: ['PROD_DB.ANALYTICS.DEMAND_TIMESERIES', 'PROD_DB.OPERATIONS.PLANT_METRICS', 'PROD_DB.SUPPLY.CARRIER_TRANSIT'],
    mappings: [
      { id: 'm1', aitekField: 'AITEK Demand Date', sourceField: 'TRANSACTION_TIMESTAMP', dataType: 'TIMESTAMP_NTZ', required: true, status: 'unmapped' },
      { id: 'm2', aitekField: 'AITEK Product ID', sourceField: 'MATERIAL_NUMBER', dataType: 'VARCHAR', required: true, status: 'unmapped' },
      { id: 'm3', aitekField: 'AITEK Quantity', sourceField: 'BATCH_QUANTITY', dataType: 'NUMBER(12,2)', required: true, status: 'unmapped' },
      { id: 'm4', aitekField: 'AITEK Location', sourceField: 'OPERATING_UNIT_CODE', dataType: 'VARCHAR', required: true, status: 'unmapped' }
    ]
  },
  {
    id: 'databricks',
    name: 'Databricks Delta Lake',
    category: 'Cloud/Data platforms',
    description: 'Unity Catalog managed Delta table reader with token authentication and vector-optimized stream querying.',
    state: 'not_connected',
    popular: true,
    entities: ['gold.supply_chain.unified_orders', 'gold.manufacturing.telemetry_scada'],
    mappings: [
      { id: 'm1', aitekField: 'AITEK Demand Date', sourceField: 'event_time', dataType: 'TIMESTAMP', required: true, status: 'unmapped' },
      { id: 'm2', aitekField: 'AITEK Product ID', sourceField: 'part_id', dataType: 'STRING', required: true, status: 'unmapped' },
      { id: 'm3', aitekField: 'AITEK Quantity', sourceField: 'volume', dataType: 'DOUBLE', required: true, status: 'unmapped' },
      { id: 'm4', aitekField: 'AITEK Location', sourceField: 'facility_code', dataType: 'STRING', required: true, status: 'unmapped' }
    ]
  },

  // Files
  {
    id: 'csv-upload',
    name: 'Delimited CSV / TSV',
    category: 'Files',
    description: 'High-speed client-side and cloud batch parser with automated delimiter detection, header sniffing, and row sanity validation.',
    state: 'not_connected',
    entities: ['Single Flat File (CSV / TSV)'],
    mappings: [
      { id: 'm1', aitekField: 'AITEK Demand Date', sourceField: 'order_date', dataType: 'STRING', required: true, status: 'unmapped' },
      { id: 'm2', aitekField: 'AITEK Product ID', sourceField: 'material_code', dataType: 'STRING', required: true, status: 'unmapped' },
      { id: 'm3', aitekField: 'AITEK Quantity', sourceField: 'order_quantity', dataType: 'FLOAT', required: true, status: 'unmapped' },
      { id: 'm4', aitekField: 'AITEK Location', sourceField: 'plant_code', dataType: 'STRING', required: true, status: 'unmapped' }
    ]
  },
  {
    id: 'excel-upload',
    name: 'Microsoft Excel (XLSX / XLS)',
    category: 'Files',
    description: 'Multi-sheet workbook parsing with automated table detection and formula calculation normalization.',
    state: 'not_connected',
    entities: ['Workbook Sheet 1 (Demand Data)'],
    mappings: [
      { id: 'm1', aitekField: 'AITEK Demand Date', sourceField: 'Date', dataType: 'DATE', required: true, status: 'unmapped' },
      { id: 'm2', aitekField: 'AITEK Product ID', sourceField: 'SKU', dataType: 'STRING', required: true, status: 'unmapped' },
      { id: 'm3', aitekField: 'AITEK Quantity', sourceField: 'Units', dataType: 'FLOAT', required: true, status: 'unmapped' },
      { id: 'm4', aitekField: 'AITEK Location', sourceField: 'Site', dataType: 'STRING', required: true, status: 'unmapped' }
    ]
  },
  {
    id: 'json-upload',
    name: 'JSON / NDJSON Stream',
    category: 'Files',
    description: 'Hierarchical nested JSON object unnesting and newline-delimited stream ingest for microservice telemetry.',
    state: 'not_connected',
    entities: ['Payload Root Array or Object Stream'],
    mappings: [
      { id: 'm1', aitekField: 'AITEK Demand Date', sourceField: 'timestamp', dataType: 'ISO8601', required: true, status: 'unmapped' },
      { id: 'm2', aitekField: 'AITEK Product ID', sourceField: 'payload.item_id', dataType: 'STRING', required: true, status: 'unmapped' },
      { id: 'm3', aitekField: 'AITEK Quantity', sourceField: 'payload.qty', dataType: 'NUMBER', required: true, status: 'unmapped' },
      { id: 'm4', aitekField: 'AITEK Location', sourceField: 'metadata.facility_id', dataType: 'STRING', required: true, status: 'unmapped' }
    ]
  },
  {
    id: 'parquet-upload',
    name: 'Apache Parquet / ORC',
    category: 'Files',
    description: 'Columnar compressed format ingestion for big-data lakehouse dumps with embedded statistics and schema metadata.',
    state: 'not_connected',
    entities: ['Partitioned Parquet Dataset Directory'],
    mappings: [
      { id: 'm1', aitekField: 'AITEK Demand Date', sourceField: 'date_key', dataType: 'TIMESTAMP_MICROS', required: true, status: 'unmapped' },
      { id: 'm2', aitekField: 'AITEK Product ID', sourceField: 'sku_hash', dataType: 'FIXED_LEN_BYTE_ARRAY', required: true, status: 'unmapped' },
      { id: 'm3', aitekField: 'AITEK Quantity', sourceField: 'net_qty', dataType: 'INT64', required: true, status: 'unmapped' },
      { id: 'm4', aitekField: 'AITEK Location', sourceField: 'loc_id', dataType: 'INT32', required: true, status: 'unmapped' }
    ]
  },

  // APIs
  {
    id: 'rest-api',
    name: 'Enterprise REST / Webhook API',
    category: 'APIs',
    description: 'Configurable HTTP poll endpoints or inbound Webhook receivers with HMAC signature verification and OAuth2 client creds.',
    state: 'not_connected',
    popular: true,
    entities: ['GET /v2/orders/stream', 'GET /v1/inventory/balances'],
    mappings: [
      { id: 'm1', aitekField: 'AITEK Demand Date', sourceField: 'data[].timestamp', dataType: 'STRING', required: true, status: 'unmapped' },
      { id: 'm2', aitekField: 'AITEK Product ID', sourceField: 'data[].productId', dataType: 'STRING', required: true, status: 'unmapped' },
      { id: 'm3', aitekField: 'AITEK Quantity', sourceField: 'data[].volume', dataType: 'NUMBER', required: true, status: 'unmapped' },
      { id: 'm4', aitekField: 'AITEK Location', sourceField: 'data[].plantLocation', dataType: 'STRING', required: true, status: 'unmapped' }
    ]
  }
];
