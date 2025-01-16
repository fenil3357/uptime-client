export type ReportType = {
  id: string,
  monitor_id: string,
  status: 'SUCCESS' | 'ERROR',
  statusCode: number | null,
  message: string | null,
  data: object,
  time_taken: number | null,
  createdAt: Date,
  updatedAt: Date
}