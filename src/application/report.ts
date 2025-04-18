import { BetaAnalyticsDataClient } from "@google-analytics/data";

interface Dimension {
  name: string;
}

interface Metric {
  name: string;
}

export interface ReportRequest {
  dateRanges: {
    startDate: string;
    endDate: string;
  };
  dimensions: Array<Dimension>;
  metrics: Array<Metric>;
}

export class GetReport {
  private analyticsDataClient: BetaAnalyticsDataClient;

  constructor(private ga4Property: string) {
    this.analyticsDataClient = new BetaAnalyticsDataClient();
  }

  async execute(request: ReportRequest) {
    const [response] = await this.analyticsDataClient.runReport({
      property: `properties/${this.ga4Property}`,
      dateRanges: [request.dateRanges],
      dimensions: request.dimensions,
      metrics: request.metrics,
    });
    return response;
  }
}
