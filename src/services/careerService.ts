import type { CareerService } from './contracts'
import { apiService } from './apiService'
import { mockService } from './mockService'
// Các trang không cần biết dữ liệu đến từ mock hay backend.
export const isMockMode = import.meta.env.VITE_USE_MOCK !== 'false'
export const careerService: CareerService = isMockMode ? mockService : apiService
