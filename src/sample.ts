import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { GetReport, ReportRequest } from "./application/report";

/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */

// Imports the Google Analytics Data API client library.

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.
export async function runReport() {
  const propertyId = process.env.PROPERTY_ID;
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "2025-04-10",
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "deviceCategory",
      },
      {
        name: "defaultChannelGroup",
      },
    ],
    metrics: [
      {
        name: "activeUsers",
      },
    ],
  });
  console.log("Request result:");
  console.log(response);

  console.log("Report result:");
  if (response.rows)
    response.rows.forEach((row: any) => {
      console.log(row);
    });
}

const report = new GetReport(process.env.PROPERTY_ID!);

const req: ReportRequest = {
  dateRanges: {
    startDate: "2025-01-01",
    endDate: "2025-01-31",
  },
  dimensions: [
    {
      name: "deviceCategory",
    },
  ],
  metrics: [
    {
      name: "activeUsers",
    },
  ],
};

report
  .execute(req)
  .then((data) => {
    console.log(data);
    if (data.rows) {
      for (const row of data.rows) {
        console.log(row);
      }
    }
  })
  .catch((error) => {
    console.error("Error executing report:", error);
  });
const reports = new GetReport(process.env.PROPERTY_ID!);

const reqs: ReportRequest = {
  dateRanges: {
    startDate: "2025-01-01",
    endDate: "2025-01-31",
  },
  dimensions: [
    {
      name: "deviceCategory",
    },
  ],
  metrics: [
    {
      name: "activeUsers",
    },
  ],
};

reports
  .execute(req)
  .then((data) => {
    console.log(data);
    if (data.rows) {
      for (const row of data.rows) {
        console.log(row);
      }
    }
  })
  .catch((error) => {
    console.error("Error executing report:", error);
  });
