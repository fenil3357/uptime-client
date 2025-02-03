export type MonitorType = {
  id: string,
  name: string,
  user_id: string,
  type: 'WEBSITE' | 'API',
  is_active: boolean,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  payload?: object | null,
  headers?: object | null,
  endpoint: string,
  createdAt: Date,
  updatedAt: Date
}

export type MonitorFormType = Omit<MonitorType, 'id' | 'user_id' | 'is_active' | 'headers' | 'payload' | 'createdAt' | 'updatedAt'> & {
  headers?: string,
  payload?: string
}