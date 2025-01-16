export type MonitorType = {
  id: string,
  name: string,
  user_id: string,
  type: 'WEBSITE' | 'API',
  is_active: boolean,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  payload: object,
  headers: object,
  endpoint: string,
  createdAt: Date,
  updatedAt: Date
}