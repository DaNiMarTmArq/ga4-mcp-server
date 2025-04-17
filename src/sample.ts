import { BetaAnalyticsDataClient } from "@google-analytics/data";

/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
const propertyId = process.env.PROPERTY_ID;

// Imports the Google Analytics Data API client library.

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.
async function runReport() {
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
    ],
    metrics: [
      {
        name: "activeUsers",
      },
    ],
  });

  console.log("Report result:");
  if (response.rows)
    response.rows.forEach((row: any) => {
      console.log(row);
    });
}

runReport();
