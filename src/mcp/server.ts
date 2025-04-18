import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { GetReport } from "../application/report";
import { config } from "dotenv";
import { z } from "zod";

config();

const reportClient = new GetReport("294371273");

const dimensionSchema = z.object({
  name: z.string().min(1, "Dimension name is required"),
});

const metricSchema = z.object({
  name: z.string().min(1, "Metric name is required"),
});

const server = new McpServer({
  name: "GA4-MCP",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "execute-report",
  "Execute a report on GA4 and get the data",
  {
    dimensions: z
      .array(dimensionSchema)
      .min(1, "At least one dimension is required")
      .describe("Dimensions to group the data by"),
    metrics: z
      .array(metricSchema)
      .min(1, "At least one metric is required")
      .describe("Metrics to aggregate the data"),
    dateRange: z
      .object({
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().min(1, "End date is required"),
      })
      .describe("Date range for the report. Format: YYYY-MM-DD"),
  },
  async (args) => {
    const { dimensions, metrics, dateRange } = args;
    const response = await reportClient.execute({
      dimensions,
      metrics,
      dateRanges: dateRange,
    });

    const textResponse = JSON.stringify(response);

    return {
      content: [
        {
          type: "text",
          text: textResponse,
        },
      ],
    };
  }
);

export default server;
